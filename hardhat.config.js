
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const optimizerSettings = {
    enabled: true,
    runs: 1000,
    details: {
        peephole: process.env.COVERAGE === undefined,
        inliner: process.env.COVERAGE === undefined,
        jumpdestRemover: true,
        orderLiterals: true,
        deduplicate: true,
        cse: process.env.COVERAGE === undefined,
        constantOptimizer: true,
        yul: true,
        yulDetails: {
            stackAllocation: true,
        },
    },
};

const compilerSettings = {
    version: '0.8.9',
    settings: {
        evmVersion: process.env.EVM_VERSION || 'london',
        optimizer: optimizerSettings,
    },
};

module.exports = {
    solidity: {
        compilers: [compilerSettings],
    },
    defaultNetwork: 'hardhat',
    networks: {
        evmos: {
            url: "https://evmos-testnet.lava.build",
            accounts: [process.env.PRIVATE_KEY],
        },
        fantom: {
            url: "https://rpc.testnet.fantom.network",
            accounts: [process.env.PRIVATE_KEY],
        }
    },
}