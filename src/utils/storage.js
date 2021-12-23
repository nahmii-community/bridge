import { sismember, set, get } from "lockr";
import { findUmbrellaNetwork } from "./network";

/**
 * Retrieve transactions for a given wallet on a given network based on property keys and values.
 * This allows for filtering on transaction types, status, hash, timestamps and symbol/ticker in a generalized way.
 * 
 * @param {string} chainId Hexadecimal string representation of the chain ID for a given network.
 * @param {string} wallet Address for a wallet to filter on.
 * @param {string} type Transaction type. Can be `deposits` or `withdrawals`.
 * @param {string} propName Property value to filter on. Can be: `hash`, `status`, `timestamp` or `token`.
 * @param {string} propValue Property value to filter on.
 * @returns A list of filtered transactions for a given address and network based on the given filters.
 */
export const getTransactionsByProperty = (chainId, wallet, type, propName, propValue) => {
    const umbrellaNetwork = findUmbrellaNetwork(chainId);
    const networks = get(wallet.toLowerCase(), null);

    let transactions = [];
    if (networks && networks.hasOwnProperty(umbrellaNetwork)) {
        const network = networks[umbrellaNetwork];
        if (network[type]) {
            for (const tx of network[type]) {
                if (tx[propName].toLowerCase() == propValue.toLowerCase()) {
                    transactions.push(tx);
                }
            }
        }
    }

    return transactions;
}

/**
 * Retrieve all withdrawal and deposit transactions for a given wallet on a given network.
 * 
 * @param {string} chainId Hexadecimal string representation of the chain ID for a given network.
 * @param {string} wallet Address for a wallet to filter on
 * @returns Object containing two arrays containing deposit and withdrawal transactions.
 */
export const getTransactions = (chainId, wallet) => {
    const umbrellaNetwork = findUmbrellaNetwork(chainId);
    const networks = get(wallet.toLowerCase(), null);
    let deposits = [];
    let withdrawals = [];

    if (networks && networks.hasOwnProperty(umbrellaNetwork)) {
        const network = networks[umbrellaNetwork];
        if (network.deposits) {
            deposits = networks[umbrellaNetwork].deposits;
        }
        if (network.withdrawals) {
            withdrawals = networks[umbrellaNetwork].withdrawals;
        }
    }

    return {
        deposits,
        withdrawals,
    }
}

/**
 * Stores a users transaction in local storage under a given wallet for a given network.
 * 
 * @param {string} chainId Hexadecimal string representation of the chain ID for a given network.
 * @param {string} wallet Address to store the transaction for.
 * @param {string} token Symbol/ticker for the token to store a transaction for.
 * @param {object} transaction Object containing the hash and timestamp for a transaction.
 * @param {string} status Status for a given transaction. Can be `in progress`, `claimable`, `failed` or `complete`.
 * @param {string} type Transaction type. Can be `deposits` or `withdrawals`.
 */
export const storeTransaction = (chainId, wallet, token, transaction, status, type) => {
    const umbrellaNetwork = findUmbrellaNetwork(chainId);
    const networks = get(wallet.toLowerCase(), {});

    if (networks && networks.hasOwnProperty(umbrellaNetwork)) {
        const network = networks[umbrellaNetwork];
        if (network.hasOwnProperty(type)) {
            // Prepend new transaction
            network[type] = [{
                hash: transaction.hash,
                status,
                timestamp: transaction.timestamp,
                token
            }, ...network[type]];
        }
    } else {
        networks[umbrellaNetwork] = {
            withdrawals: [],
            deposits: [],
        };

        networks[umbrellaNetwork][type].push({
            hash: transaction.hash,
            status,
            timestamp: transaction.timestamp,
            token
        });
    }

    set(wallet.toLowerCase(), networks);
}