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