import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    const isMetaMask = isMetaMaskInstalled();
    if (!isMetaMask) {
      return;
    }

    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  function isMetaMaskInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* Left Side - Social Media Icons */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="https://www.facebook.com">
          <Image src={FacebookIcon} boxSize="42px" margin="0 15px" />
        </Link>

        <Link href="https://www.twitter.com">
          <Image src={TwitterIcon} boxSize="42px" margin="0 15px" />
        </Link>

        <Link href="https://www.gmail.com">
          <Image src={EmailIcon} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>
      {/* Right Side - Sections And Connect */}
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />

        {/*Connect Wallet*/}
        {isConnected ? (
          <div>
            <Box margin="0 15px">
              {accounts[0].slice(0, 6)}...{accounts[0].slice(39)}
            </Box>
          </div>
        ) : (
          <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default NavBar;
