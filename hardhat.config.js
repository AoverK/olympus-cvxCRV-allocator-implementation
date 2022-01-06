require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

const { ALCHEMY_API_URL_ROPSTEN, ALCHEMY_API_URL_RINKEBY, ALCHEMY_API_URL_MAINNET, METAMASK_PRIVATE_KEY_ROPSTEN_PERSONAL_WALLET, METAMASK_PRIVATE_KEY_RINKEBY_PERSONAL_WALLET, METAMASK_PRIVATE_KEY_MAINNET_MINTERS_WALLET, ETHERSCAN_API_KEY } = process.env;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.0;",
    defaultNetwork: "rinkeby",
    networks: {
        hardhat: {},
        mainnet: {
            url: ALCHEMY_API_URL_MAINNET,
            accounts: [`0x${METAMASK_PRIVATE_KEY_MAINNET_MINTERS_WALLET}`]
        },
        ropsten: {
            url: ALCHEMY_API_URL_ROPSTEN,
            accounts: [`0x${METAMASK_PRIVATE_KEY_ROPSTEN_PERSONAL_WALLET}`]
        },
        rinkeby: {
            url: ALCHEMY_API_URL_RINKEBY,
            accounts: [`0x${METAMASK_PRIVATE_KEY_RINKEBY_PERSONAL_WALLET}`]
        }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY
    },
    mocha: {
        timeout: 80000
    }

};