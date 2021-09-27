import { writable } from "svelte/store";

export const network = writable("");
export const wallet = writable("0x");
export const isConnected = writable(false);

function handleChainChanged(chainId) {
    network.set(chainId);
}

async function handleAccountsChanged(accounts) {
    let currentAccount;
    const unsubscribe = wallet.subscribe((value) => {
        currentAccount = value[0];
    });
    if (accounts.length === 0) {

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
                method: 'eth_chainId'
            });
            network.set(chainId);
            provider.on("chainChanged", await handleChainChanged);
            console.log(chainId);
            const details = await provider.request({
                method: 'eth_requestAccounts'
            });
            console.log(details);
            wallet.set(details);
            provider.on("accountsChanged", handleAccountsChanged);
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
            networkInfo = { chainId, name: "Ropsten" }
            break;
        case "0x15b1":
            networkInfo = { chainId, name: "Nahmii Testnet" }
            break;
        default:
            networkInfo = { chainId, name: "Unsupported" }
            break;
    }
    return networkInfo;
}

