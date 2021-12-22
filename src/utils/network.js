import { SUPPORTED_NETWORKS } from "./constants";

export const getExplorerUrl = (chainId) => {
    let networkInfo = SUPPORTED_NETWORKS.find(val => {
        return val.chainId == chainId;
    });
    return networkInfo.blockExplorerUrls[0];
}

export const getFraudProofWindow = (chainId) => {
    let networkInfo = SUPPORTED_NETWORKS.find(val => {
        return val.chainId == chainId;
    });
    return networkInfo.fraudProofWindow;
}

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