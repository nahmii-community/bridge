import { SUPPORTED_NETWORKS } from "./constants";

/**
 * Retrieves the first block explorer URL for a given network.
 * 
 * @param {string} chainId Hexadecimal string of the chain to find the block explorer URL for.
 * @returns Block explorer URL.
 */
export const getExplorerUrl = (chainId) => {
    let networkInfo = SUPPORTED_NETWORKS.find(val => {
        return val.chainId == chainId;
    });
    // TODO: Add error handling and/or return array of block explorer URLs.
    return networkInfo.blockExplorerUrls[0];
}

/**
 * Finds the fraud proof window for a given network.
 * 
 * @param {string} chainId Hexadecimal string of the chain to find the fraud proof window for.
 * @returns The fraud proof window in seconds.
 */
export const getFraudProofWindow = (chainId) => {
    let networkInfo = SUPPORTED_NETWORKS.find(val => {
        return val.chainId == chainId;
    });
    return networkInfo.fraudProofWindow;
}

/**
 * Finds the companion network for a given network.
 * 
 * @param {string} chainId Hexadecimal string of the chain to find the companion chain for.
 * @returns Object of the companion networks metadata.
 */
export const findCompanionNetwork = async (chainId) => {
    let networkInfo = SUPPORTED_NETWORKS.find(val => {
        return val.chainId == chainId;
    });
    let companionNetworkInfo = SUPPORTED_NETWORKS.find(val => {
        return val.chainId == networkInfo.companionChainId;
    })
    if (!networkInfo) {
        networkInfo = {
            chainId,
            chainName: "Unsupported",
            isSupported: false
        }
    }
    return companionNetworkInfo;
}