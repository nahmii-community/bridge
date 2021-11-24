import { writable } from "svelte/store";
import { SUPPORTED_NETWORKS } from "../utils/constants";

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
        isConnected.set(false);
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

export const findSupportedNetwork = async (chainId) => {
    let networkInfo = SUPPORTED_NETWORKS.find(val => {
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
                const { chainName, rpcUrls, blockExplorerUrls } = await findSupportedNetwork(chainId);
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

export const addAsset = async (address, symbol, decimals, image) => {
    const provider = window.ethereum;
    let tokenAdded;
    if (provider) {
        try {
            tokenAdded = await provider.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address,
                        symbol,
                        decimals,
                        image
                    }
                }
            });
            if (tokenAdded) {
                // User added token
                return tokenAdded;
            } else {
                // User didn't add token
                return tokenAdded;
            }
        } catch (error) {
            console.log(error);
        }
    }
};