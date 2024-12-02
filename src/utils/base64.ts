/**
 * Decodes a base64 string in the browser environment
 */
export function decodeBase64(str: string): string {
    // Remove whitespace from the base64 string
    const cleanStr = str.replace(/\s/g, '');
    return globalThis.atob(cleanStr);
}
