const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = process.env.SALT || 10;
const wrapper = require("../../../helpers/utils/wrapper");
const { SUCCESS, ERROR } = require("../../../helpers/http-status/status_code");


const verify = async (payload, hashPlaintext) => {

    const plainText = await decrypt(hashPlaintext, process.env.IV_PASS, process.env.KEY_PASS)
    if (plainText.data == payload) {
        return wrapper.data(true, "success", SUCCESS.OK);
    }
    return wrapper.error("fail", "Password incorrect", ERROR.FORBIDDEN);
};

const encrypt = async (plaintext, iv, key) => {
    try {
        const IV = iv.toString('hex').slice(0,16);
        
        const encrypter = crypto.createCipheriv("aes-256-cbc", key, IV);

        let encrypted = encrypter.update(plaintext, "utf-8", "hex");
        encrypted += encrypter.final("hex");
        
        return wrapper.data(encrypted, "success", SUCCESS.OK);
    } catch (error) {
        return wrapper.error("fail", error, ERROR.INTERNAL_ERROR);
    }
}

const decrypt = async (hashPlainText, iv, key) => {
    try {
        const IV = iv.toString('hex').slice(0,16);
        
        const decrypter = crypto.createDecipheriv("aes-256-cbc", key, IV);
        let decrypted = decrypter.update(hashPlainText, "hex", "utf8");
        decrypted += decrypter.final("utf8");
        
        return wrapper.data(decrypted, "success", SUCCESS.OK);
    } catch (error) {
        return wrapper.error("fail", error, ERROR.INTERNAL_ERROR);
    }
}

module.exports = { verify, encrypt, decrypt };