export const DEPOSIT_ETH_GAS_LIMIT = "330000";
export const DEPOSIT_ERC20_GAS_LIMIT = "375000";
export const L1L2_NETWORKS = {
    testnet: ["0x5", "0x1A4"]
};
export const MAX_APPROVAL_AMOUNT = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"; // Unlimited approval
export const NVM_ETH = "0x4200000000000000000000000000000000000006";
export const WARNING_L2_ETH_BALANCE = "10000000000000000"; // 0.01 ETH
export const ZERO = "0";

export const SUPPORTED_NETWORKS = [
    {
        chainId: "0x5",
        chainName: "Goerli Testnet",
        isSupported: true,
        L2: false,
        rpcUrls: ["https://goerli.infura.io/v3/74e02b65ab2d43c0a1c0cb45742fc7d7"],
        blockExplorerUrls: ["https://goerli.etherscan.io"],
        companionChainId: "0x1A4",
        standardBridge: "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8",
        crossDomainMessenger: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294",
        fraudProofWindow: 360
    },
    {
        chainId: "0x1A4",
        chainName: "Optimism Testnet",
        isSupported: true,
        L2: true,
        companionChainId: "0x5",
        rpcUrls: ["https://optimism-goerli.infura.io/v3/74e02b65ab2d43c0a1c0cb45742fc7d7"],
        blockExplorerUrls: ["https://goerli-optimistic.etherscan.io/"],
        fraudProofWindow: 360
    }
]