// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// "SECURE" Standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SolmintNFT is ERC721, Ownable {
    // minimize variable creation for less gas fees
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;

    // helps distribute nfts to more people
    uint256 public maxPerWallet;

    bool public isPublicMintEnabled;

    // open sea useses this to know where are the images located
    string internal baseTokenUri;

    address payable public withdrawWallet;

    // keep track of all the mints
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // todo: set withdraw wallet address
    }

    // only owner can call this function => owner === deployer
    function setIsPublicMintEnabled(bool isPublicMintEnabled_)
        external
        onlyOwner
    {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    // predefined function [opensea grabs any single uri img in json]
    function tokenURI(uint256 tokenId_)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId_), "Token does not exist!");
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(tokenId_),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw failed");
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "minting not enabled");
        require(msg.value == quantity_ * mintPrice, "wrong mint value");
        require(totalSupply + quantity_ <= maxSupply, "sold out");
        require(
            walletMints[msg.sender] + quantity_ <= maxPerWallet,
            "exceed max wallet"
        );

        for (uint256 i = 0; i < quantity_; i++) {
            // prevent reentrancy
            // check effects (any time you change a var in storage) interaction pattern - needs to happen before you interact with senders
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
