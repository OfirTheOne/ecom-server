
export function cleanNonAsciiCharacters(str: string) {
    return str && typeof str == 'string' ? str.replace(/[^\x20-\x7E]/g, '') : str;
}