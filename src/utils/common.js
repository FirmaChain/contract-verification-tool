import { getIpfsURL } from "./firma";

export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};


export const convertFileSize = (size) => {
    return Number(size / 1024).toFixed(2);
}

export const copyToClipboard = (textToCopy) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
      } else {
        let textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.position = 'absolute';
        textArea.style.opacity = '0';
  
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
  
        return new Promise((res, rej) => {
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
        });
      }
    } catch (e) {}
  };

  export const openCertificatePDF = async(privateKey, metaJson) => {
    try {
        let url = '';
        for(var i=0; i<metaJson.encryptIpfsHash.length; i++){
            url = await getIpfsURL(privateKey, metaJson.encryptIpfsHash[i]);
            if(url !== '') return window.open(url, "_blank");
        }

        if(url === ''){
          throw "Invalid private key";
        }
    } catch (error) {
      throw error;
    }
};