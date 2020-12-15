//function for locating the number for each character image
export function getLastNumber(url) {
    let end = url.lastIndexOf('/');
    let start = end -2;
    if (url.charAt(start) === '/') {
        start++;
    }
    return url.slice(start, end);
}