const hre = require("hardhat");

async function main() {
    // We get the contract to deploy
    const RoboPunksNFT = await hre.ethers.getContractFactory("RoboPunksNFT");
    const roboPunksNFT = await RoboPunksNFT.deploy();

    // deploy argument is the argument in constructor
    await roboPunksNFT.deployed();

    console.log("RoboPunksNFT deployed to:", roboPunksNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });