import React from 'react';
import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import solmintNFT from './SolmintNFT.json';

// style
import {Box, Button, Flex, Input, Text} from '@chakra-ui/react';

const solmintNFTAddress = "0xbD5D53FA86540A27D6aCeCeD551794bb3E0e9e19";

const MainMint = ({accounts, setAccounts}) => {

    // num of quant user is selecting
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            // connect to blockchain
            const provider = new ethers
                .providers
                .Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(solmintNFTAddress, solmintNFT.abi, signer);

            try {
                // actuall smart contract call -> eth needs big numbers
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers
                        .utils
                        .parseEther((0.02 * mintAmount).toString())
                });

                console.log("✔ response: ", response);
            } catch (error) {
                console.log("❌ error: ", error);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) 
            return;
        
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) 
            return;
        
        setMintAmount(mintAmount + 1);
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000">
                        It's 2100. Can the RoboPunks NFT save humans from destructive scam NFTs? Mint
                        RoboPunks to find out.
                    </Text>
                </div>

                {
                    isConnected
                        ? (<div>
                            <Flex align="center" justify="center">
                                <Button
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleDecrement}>
                                    -
                                </Button>
                                <Input
                                    readOnly="readOnly"
                                    fontFamily="inherit"
                                    width="100px"
                                    height="40px"
                                    textAlign="center"
                                    paddingLeft="19px"
                                    marginTop="10px"
                                    type="number"
                                    value={mintAmount}/>
                                <Button
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleIncrement}>
                                    +
                                </Button>
                            </Flex>
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleMint}>
                                Mint Now
                            </Button>

                            ) : (
                            <Text
                                marginTop="70px"
                                fontSize="30px"
                                letterSpacing="-5.5%"
                                fontFamily="VT323"
                                textShadow="0 2px 2px #000000"
                                color="#D6517D">
                                You Must Connect To Mint.
                            </Text>
                            )
                }
            </Box>
        </Flex>
    )
}
export default MainMint