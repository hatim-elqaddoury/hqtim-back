var CryptoJS = require("crypto-js");

const keys       = "aesEncryptionKey";
const initVector = "encryptionIntVec";


module.exports = {


//The set method is use for encrypt the value.
encrypt: (JSONvalue) => {
    if (JSONvalue) {
        JSONvalue = JSON.stringify(JSONvalue);
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(initVector);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSONvalue.toString()), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return { _: encrypted.toString() };
    }
},

//The get method is use for decrypt the value.
decrypt: (value) => {
    if (value) {
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(initVector);
        var decrypted = CryptoJS.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        try {
            return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            return decrypted.toString(CryptoJS.enc.Utf8)
        }
    }
},

}
