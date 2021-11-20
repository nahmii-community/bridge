export const shorten = (address) => {
    let shortAddress = "";
    return shortAddress.concat(
        address.slice(0, 7),
        "...",
        address.slice(-5)
    );
}