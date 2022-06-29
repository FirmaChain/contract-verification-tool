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