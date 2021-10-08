import TokenList from "../nahmii.tokenlist.json";

export const getTokens = () => {
    return TokenList.tokens;
};

export const getTokenListMetadata = () => {
    return {
        name: TokenList.name,
        keywords: TokenList.keywords,
        logoURI: TokenList.logoURI,
        timestamp: TokenList.timestamp,
    }
};

export const filterTokenList = (tokenList, filter) => {
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
    const result = filterTokenList(tokenList, filter);
    if (result) {
        return result[0]["extensions"]["nahmiiBridgeAddress"];
    } else {
        return false;
    }
};

export const getTokenDetails = (selectedToken, chainId, tokenList) => {
    const filter = {
        symbol: selectedToken,
        chainId: parseInt(chainId, 16),
    };
    const result = filterTokenList(tokenList, filter);
    if (result) {
        const { name, symbol, logoURI, address, decimals } = result[0];
        return {
            name,
            symbol,
            logoURI,
            address,
            decimals
        };
    } else {
        return false;
    }
}

export const getTokensForChain = (chainId, tokenList) => {
    const filter = {
        chainId: parseInt(chainId, 16),
    };
    const result = filterTokenList(tokenList, filter);
    if (result) {
        return result;
    } else {
        return [];
    }
}