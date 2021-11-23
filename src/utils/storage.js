import { sismember, set, get } from "lockr";

export const getTransactions = (chainId, wallet) => {
    const networks = get(wallet.toLowerCase(), null);
    let deposits = [];
    let withdrawals = [];

    if (networks && networks.hasOwnProperty(chainId)) {
        const network = networks[chainId];
        if (network.deposits) {
            deposits = networks[chainId].deposits;
        }
        if (network.withdrawals) {
            withdrawals = networks[chainId].withdrawals;
        }
    }

    return {
        deposits,
        withdrawals,
    }
}

export const storeTransaction = (chainId, wallet, token, transaction, status, type) => {
    const networks = get(wallet.toLowerCase(), null);
    
    if (networks && networks.hasOwnProperty(chainId)) {
        const network = networks[chainId];
        if (network.hasOwnProperty(type)) {
            network[type].push({
                hash: transaction.hash,
                status,
                timestamp: transaction.timestamp,
                token
            });
        }
    } else {
        networks[chainId] = {
            withdrawals: [],
            deposits: [],
        };
        networks[chainId][type].push({
            hash: transaction.hash,
            status,
            timestamp: transaction.timestamp,
            token
        });
    }
    
    set(wallet.toLowerCase(), networks);
}