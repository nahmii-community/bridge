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