import { writable } from "svelte/store";

export const network = writable("");
export const wallet = writable("0x");
export const isConnected = writable(false);

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
            return false;
        }
    } else {
        return false;
    }
};

export const networks = async (chainId) => {
    let networkInfo;
    switch (chainId) {
        case "0x3":
            networkInfo = { chainId, name: "Ropsten", isSupported: true }
            break;
        case "0x15b1":
            networkInfo = { chainId, name: "Nahmii Testnet", isSupported: true }
            break;
        default:
            networkInfo = { chainId, name: "Unsupported", isSupported: false }
            break;
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
                // supportedNetworks(chainId) -> addNetwork(...)
            }
            console.log(error);
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