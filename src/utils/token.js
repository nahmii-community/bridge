export const getTokenDetails = (tokenList, filter) => {
    const result = tokenList.filter((token) => {
        for (const key in filter) {
            if (token[key] === undefined || token[key] != filter[key]) {
                return false;
            }
        }
        return true;
    });
    return result;
};

export const getTokenBridge = (selectedToken, chainId, tokenList) => {
    const filter = {
        symbol: selectedToken,
        chainId: parseInt(chainId, 16),
    };
    const result = getTokenDetails(tokenList, filter);
    if (result) {
        return result[0]["extensions"]["nahmiiBridgeAddress"];
    } else {
        return false;
    }
};