import { writable } from "svelte/store";

export const network = writable("");
export const wallet = writable("0x");
export const isConnected = writable(false);

const supportedNetworkList = [
    {
        chainId: "0x1",
        chainName: "Mainnet",
        isSupported: true,
        L2: false,
        rpcUrls: ["https://mainnet.infura.io/v3/f36942ff00514b7fb154a652fa510972"],
        companionChainId: "0x15af",
        companionChainName: "Nahmii"
    },
    {
        chainId: "0x3",
        chainName: "Ropsten",
        isSupported: true,
        L2: false,
        rpcUrls: ["https://ropsten.infura.io/v3/f36942ff00514b7fb154a652fa510972"],
        companionChainId: "0x15b1",
        companionChainName: "Nahmii Testnet"
    },
    {
        chainId: "0x15af",
        chainName: "Nahmii",
        isSupported: true,
        L2: true,
        companionChainId: "0x1",
        companionChainName: "Mainnet",
        rpcUrls: ["https://l2.nahmii.io"],
        blockExplorerUrls: ["https://explorer.nahmii.io"]
    },
    {
        chainId: "0x15b1",
        chainName: "Nahmii Testnet",
        isSupported: true,
        L2: true,
        companionChainId: "0x3",
        companionChainName: "Ropsten",
        rpcUrls: ["https://l2.testnet.nahmii.io"],
        blockExplorerUrls: ["https://explorer.testnet.nahmii.io"]
    }
]


async function handleChainChanged(chainId) {
    network.set(chainId);
}

async function handleAccountsChanged(accounts) {
    let currentAccount;
    const unsubscribe = wallet.subscribe((value) => {
        currentAccount = value[0];
    });

    if (accounts.length === 0) {
        // User has not connected any account or MetaMask is locked.
    } else if (accounts[0] !== currentAccount) {
        wallet.set(accounts);
    }

    unsubscribe();
}

export const connectWallet = async () => {
    const provider = window.ethereum;
    if (provider) {
        try {
            const chainId = await provider.request({
                method: "eth_chainId"
            });
            network.set(chainId);
            provider.on("chainChanged", await handleChainChanged);

            const details = await provider.request({
                method: "eth_requestAccounts"
            });
            provider.on("accountsChanged", await handleAccountsChanged);
            wallet.set(details);

            isConnected.set(true);
            return true;
        } catch (error) {
            if (error.code === 4001) {
                console.log("User rejected request");
            }
            return false;
        }
    } else {
        return false;
    }
};

export const supportedNetworks = async (chainId) => {
    let networkInfo = supportedNetworkList.find(val => {
        return val.chainId == chainId;
    });
    if (!networkInfo) {
        networkInfo = {
            chainId,
            chainName: "Unsupported",
            isSupported: false
        }
    }
    return networkInfo;
}

export const switchNetwork = async (chainId) => {
    const provider = window.ethereum;
    if (provider) {
        try {
            await provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: chainId }],
            });
        } catch (error) {
            // 4902 - Unrecognized chain error
            if (error.code === 4902) {
                // Handle adding of chain separately.
                const { chainName, rpcUrls, blockExplorerUrls } = await supportedNetworks(chainId);
                await addNetwork(chainId, chainName, rpcUrls, blockExplorerUrls);
            } else {
                console.error(error);
            }
        }
    } else {
        console.log("User does not have an Ethereum provider installed");
    }
}

export const addNetwork = async (chainId, chainName, rpcUrls, blockExplorerUrls) => {
    const provider = window.ethereum;
    if (provider) {
        try {
            await provider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId,
                        chainName,
                        rpcUrls,
                        blockExplorerUrls,
                        nativeCurrency: {
                            name: "Ethereum",
                            symbol: "ETH",
                            decimals: 18
                        }
                    }
                ]
            });
        } catch (error) {
            console.log(error);
        }
    }
}