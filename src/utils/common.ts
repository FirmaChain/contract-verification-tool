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
        const restoredBase64 = Array.from(obfuscated)
            .map((char) => String.fromCharCode(char.charCodeAt(0) >> 1))
            .join('');
        return atob(restoredBase64);
    } catch (error) {
        console.error('The key is broken or something bad happend.', error);
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
