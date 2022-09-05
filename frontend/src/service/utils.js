const CryptoJS = require("crypto-js");
String.prototype.hexEncode = function () {
    var hex, i;

    var result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }

    return result;
};

String.prototype.hexDecode = function () {
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
};

export const encryptWithAES = (text, passphrase) => {
    // const passphrase = "123";
    return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decryptWithAES = (ciphertext, passphrase) => {
    // const passphrase = "123";
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};
