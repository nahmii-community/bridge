import { SUPPORTED_NETWORKS } from "./constants";
import { L1L2_NETWORKS } from "./constants";

/**
 * Finds the umbrella term used for a set of networks based on the chain ID.
 * 
 * @param {string} chainId Hexadecimal representation of the chain ID for a given network to find the umbrella term for.
 * @returns The umbrella term for a given network.
 */
export const findUmbrellaNetwork = (chainId) => {
    for (let network in L1L2_NETWORKS) {
        if (L1L2_NETWORKS[network].includes(chainId.toLowerCase())) {
            return network;
        }
    }
}

/**
 * Retrieves the first block explorer URL for a given network.
 * 
 * @param {string} chainId Hexadecimal representation of the chain ID for a given network to find the block explorer URL for.
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
 * @param {string} chainId Hexadecimal representation of the chain ID for a given network to find the fraud proof window for.
 * @returns The fraud proof window in seconds.
 */
export const getFraudProofWindow = (chainId) => {
    let networkInfo = SUPPORTED_NETWORKS.find(val => {
        return val.chainId == chainId;
    });
    return networkInfo.fraudProofWindow;
}

/**
 * 
 * @param {string} chainId Hexadecimal representation of the chain ID for a given network to find all metadata for.
 * @returns All metadata for a given network if the network is available, 
 *          else return an array stating the network is unsupported.
 */
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

/**
 * Finds the companion network for a given network.
 * 
 * @param {string} chainId Hexadecimal representation of the chain ID for a given network to find the companion chain for.
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