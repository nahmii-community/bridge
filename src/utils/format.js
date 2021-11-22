/**
 * Shortens a given hash/string. 
 * 
 * It takes the first n characters and the last n characters,
 * and replaces all other characters with 3 dots.
 * 
 * @param {string} input - The value to shorten.
 * @param {number} [start=7] - The first n characters to take from the string. (Default: 7)
 * @param {number} [end=5] - The last n characters to take from the string. (Default: 5)
 */
export const shorten = (input, start = 7, end = 5) => {
    let shortenedInput = "";
    return shortenedInput.concat(
        input.slice(0, start),
        "...",
        input.slice(-Math.abs(end))
    );
}

/**
 * Formats a timestamp into a locale based datetime.
 * 
 * @param {number} seconds The number of seconds from unix time since the timestamp has been generated.
 * @returns A string containing the formatted timestamp.
 */
export const timestampToDateTime = (seconds) => {
    let date = new Date(0);
    date.setSeconds(seconds, 0);
    return new Intl.DateTimeFormat('default', { dateStyle: "short", timeStyle: "short" }).format(date);
}
