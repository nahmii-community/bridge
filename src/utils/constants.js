export const DEFAULT_GAS_L1 = 330_000;
export const DEFAULT_GAS_L2 = 1_300_000;
export const L1L2_NETWORKS = {
    mainnet: ["0x1", "0x15af"],
    testnet: ["0x3", "0x15b1"]
};
export const L2_STANDARD_BRIDGE = "0x4200000000000000000000000000000000000010";
export const MAX_APPROVAL_AMOUNT = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"; // Unlimited approval
export const NVM_ETH = "0x4200000000000000000000000000000000000006";
export const WARNING_L2_ETH_BALANCE = "10000000000000000"; // 0.01 ETH
export const ZERO = "0";

export const SUPPORTED_NETWORKS = [
    {
        chainId: "0x1",
        chainName: "Ethereum Mainnet",
        isSupported: true,
        L2: false,
        rpcUrls: ["https://mainnet.infura.io/v3/f36942ff00514b7fb154a652fa510972"],
        blockExplorerUrls: ["https://etherscan.io"],
        companionChainId: "0x15af",
        standardBridge: "0x2fCE9b92a64c1DDf14a1A9E5Ec6D4e4C7C9F4Fdd",
        fraudProofWindow: 604800
    },
    {
        chainId: "0x3",
        chainName: "Ropsten Testnet",
        isSupported: true,
        L2: false,
        rpcUrls: ["https://ropsten.infura.io/v3/f36942ff00514b7fb154a652fa510972"],
        blockExplorerUrls: ["https://ropsten.etherscan.io"],
        companionChainId: "0x15b1",
        standardBridge: "0x21De2607E90edb1736bc460a4cd58c0FCd74ABcc",
        fraudProofWindow: 604800
    },
    {
        chainId: "0x15af",
        chainName: "Nahmii Mainnet",
        isSupported: true,
        L2: true,
        companionChainId: "0x1",
        rpcUrls: ["https://l2.nahmii.io"],
        blockExplorerUrls: ["https://explorer.nahmii.io"],
        fraudProofWindow: 604800
    },
    {
        chainId: "0x15b1",
        chainName: "Nahmii Testnet",
        isSupported: true,
        L2: true,
        companionChainId: "0x3",
        rpcUrls: ["https://l2.testnet.nahmii.io"],
        blockExplorerUrls: ["https://explorer.testnet.nahmii.io"],
        fraudProofWindow: 604800
    }
]