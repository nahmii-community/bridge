export const DEPOSIT_ETH_GAS_LIMIT = "330000";
export const DEPOSIT_ERC20_GAS_LIMIT = "375000";
export const L1L2_NETWORKS = {
    mainnet: ["0x1", "0x15af"],
    testnet: ["0x5", "0x15b1"]
};
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
        crossDomainMessenger: "0x01dF38E20738c58aF8141504aa6C88013d3D6C5A",
        fraudProofWindow: 604800
    },
    {
        chainId: "0x5",
        chainName: "Goerli Testnet",
        isSupported: true,
        L2: false,
        rpcUrls: ["https://goerli.infura.io/v3/c3085639e2374fa6b9614bd1c5e0e50d"],
        blockExplorerUrls: ["https://ropsten.etherscan.io"],
        companionChainId: "0x15b1",
        standardBridge: "0x044F4B5189fbA20A0D1bf939672509Ae8e7C8F42",
        crossDomainMessenger: "0xC340EFD49Cb4d9054e62Ceeda98722138b5b5790",
        fraudProofWindow: 360
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
        fraudProofWindow: 360
    }
]