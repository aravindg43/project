// A common utility file for handling file previews in a web application.

/**
 * Converts a Base64 string to a Blob object.
 * This is useful for creating a local URL to preview or download files.
 *
 * @param base64 The Base64-encoded string of the file data.
 * @param mime The MIME type of the file (e.g., 'application/pdf', 'image/jpeg').
 * @returns A Blob object representing the file data.
 */
export const base64ToBlob = (base64: string, mime: string): Blob => {
  try {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
  } catch (error) {
    console.error('Error converting base64 to Blob:', error);
    throw new Error('Invalid Base64 string or MIME type.');
  }
};

/**
 * Creates and returns a URL for a given Base64 file.
 * The URL can be used in iframes or for opening files in a new tab.
 *
 * @param base64 The Base64-encoded string of the file data.
 * @param mime The MIME type of the file.
 * @returns A string containing the object URL.
 */
export const createObjectURLFromBase64 = (base64: string, mime: string): string => {
  const blob = base64ToBlob(base64, mime);
  return URL.createObjectURL(blob);
};

/**
 * Revokes an object URL to free up memory.
 *
 * @param url The object URL to revoke.
 */
export const revokeObjectURL = (url: string): void => {
  URL.revokeObjectURL(url);
};

// You can add more utilities here, such as:
// - A function to handle different file types (e.g., displaying images, PDFs, etc.).
// - Helper for generating download links.
