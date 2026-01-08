// import { getIpfsURL } from './firma';

export const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const convertFileSize = (size: any) => {
    return Number(size / 1024).toFixed(2);
};

export const copyToClipboard = async (text: string): Promise<void | string> => {
    if (!navigator.clipboard) {
        //? If clipboard api is not provided (http or some reasons)

        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;

            //? Make hidden textarea to copy text
            textArea.style.position = 'fixed';
            textArea.style.top = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback copy method failed. Try latest browser.', err);
            }

            document.body.removeChild(textArea);
        } catch (error) {
            return 'Failed to copy text to clipboard';
        }
    } else {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error('Failed to copy text to clipboard', error);
            return 'Failed to copy text to clipboard';
        }
    }
};

export function revealKey(obfuscated: string): string {
    try {
        // Check if input is empty or invalid
        if (!obfuscated || obfuscated.length === 0) {
            return '';
        }

        // Restore obfuscated string
        const restoredBase64 = Array.from(obfuscated)
            .map((char) => {
                const charCode = char.charCodeAt(0);
                // Restore using bit shift (reverse of << 1 in obfuscateKey)
                const restoredCharCode = charCode >> 1;
                // Verify that restored charCode is within valid ASCII range
                if (restoredCharCode < 0 || restoredCharCode > 127) {
                    throw new Error('Invalid character code after restoration');
                }
                return String.fromCharCode(restoredCharCode);
            })
            .join('');

        // Verify that restored string is valid base64
        if (!restoredBase64 || restoredBase64.length === 0) {
            throw new Error('Restored base64 string is empty');
        }

        // Attempt base64 decoding
        try {
            return atob(restoredBase64);
        } catch (base64Error) {
            // If base64 decoding fails, input might already be a restored string
            // In this case, return the original string as-is
            console.warn('Failed to decode as base64. Input might already be a plain mnemonic:', base64Error);
            return obfuscated;
        }
    } catch (error) {
        console.error('The key is broken or something bad happend.', error);
        // On error, return original string (might already be a restored string)
        return obfuscated;
    }
}

export function obfuscateKey(original: string): string {
    try {
        const base64 = btoa(original);
        return Array.from(base64)
            .map((char) => String.fromCharCode(char.charCodeAt(0) << 1))
            .join('');
    } catch (error) {
        console.error('Failed to obfuscate key:', error);
        return '';
    }
}

//! Not used anywhere for now :(
// export const openCertificatePDF = async (privateKey: string, metaJson: any) => {
//     try {
//         let url = '';
//         for (var i = 0; i < metaJson.encryptIpfsHash.length; i++) {
//             url = await getIpfsURL(privateKey, metaJson.encryptIpfsHash[i]);
//             if (url !== '') return window.open(url, '_blank');
//         }

//         if (url === '') {
//             throw 'Invalid private key';
//         }
//     } catch (error) {
//         throw error;
//     }
// };
