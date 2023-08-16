"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCrypto = void 0;
/**
 * SimpleCryptoJS
 *
 * Simplified AES cryptography for safer and easier encryption and decryption processes
 * of any JavaScript objects.
 **/
var crypto_js_1 = require("crypto-js");
/**
 * SimpleCrypto
 *
 * @class
 */
var SimpleCrypto = /** @class */ (function () {
    /**
     * Represent a SimpleCrypto instance
     *
     * @constructor
     * @param	{string}	secret		The secret key for cryptographic process.
     */
    function SimpleCrypto(secret) {
        if (secret === void 0) {
            throw new Error("SimpleCrypto object MUST BE initialised with a SECRET KEY.");
        }
        this._dataBuffer = "";
        this._encoder = crypto_js_1.enc.Utf8;
        this._secret = (0, crypto_js_1.SHA3)(typeof secret === "string" ? secret : secret.toString());
        this._keySize = 256;
        this._iterations = 100;
    }
    SimpleCrypto.sanitiseData = function (data) {
        if (data === void 0 || data === null) {
            throw new Error("There is no data provided. Process halted.");
        }
        var sanitised = typeof data === "object"
            ? JSON.stringify(data)
            : typeof data === "string" || typeof data === "number" || typeof data === "boolean"
                ? data.toString()
                : null;
        if (null === sanitised) {
            throw new Error("Invalid data type. Only object, string, number and boolean data types are allowed.");
        }
        return sanitised;
    };
    SimpleCrypto.transform = function (src) {
        if (src.toLowerCase() === "true" || src.toLowerCase() === "false") {
            return src.toLowerCase() === "true";
        }
        try {
            return JSON.parse(src);
        }
        catch (jsonError) {
            return /^-?[\d.]+(?:e-?\d+)?$/.test(src) && !isNaN(parseFloat(src)) ? parseFloat(src) : src;
        }
    };
    Object.defineProperty(SimpleCrypto, "encoders", {
        /**
         * Encoders
         *
         * Get Encoder instance available.
         *
         * @since		2017.10.16
         * @access		public
         *
         * @memberOf    SimpleCrypto
         *
         * @see     WordArray
         *
         * @return  {Encoders}  Returns object of Encoder instances.
         */
        get: function () {
            return __assign({ Default: crypto_js_1.enc.Utf8 }, crypto_js_1.enc);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Generate Random
     *
     * Generate a random string or WordArray.
     *
     * @since		2017.10.16
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @see     WordArray
     *
     * @param   {number}    length      		The length of random to be generated.
     * @param   {boolean}   expectsWordArray	Set to true to return WordArray instance.
     * Default is false and return a string.
     *
     * @return  {string | WordArray}  Returns a random string or WordArray.
     */
    SimpleCrypto.generateRandom = function (length, expectsWordArray) {
        if (length === void 0) { length = 128; }
        if (expectsWordArray === void 0) { expectsWordArray = false; }
        var random = crypto_js_1.lib.WordArray.random(length / 8);
        return expectsWordArray ? random : random.toString();
    };
    /**
     * Generate Random String
     *
     * Generate a random string
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @see     WordArray
     *
     * @param   {number}    length      		The length of random to be generated.
     *
     * @return  {string | WordArray}  Returns a random string.
     */
    SimpleCrypto.generateRandomString = function (length) {
        if (length === void 0) { length = 128; }
        return SimpleCrypto.generateRandom(length, false);
    };
    /**
     * Generate Random Word Array
     *
     * Generate a random WordArray.
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @see     WordArray
     *
     * @param   {number}    length      		The length of random to be generated.
     *
     * @return  {string | WordArray}  Returns a random WordArray.
     */
    SimpleCrypto.generateRandomWordArray = function (length) {
        if (length === void 0) { length = 128; }
        return SimpleCrypto.generateRandom(length, true);
    };
    SimpleCrypto.prototype._decrypt = function () {
        if (this._dataBuffer.length <= 64) {
            throw new Error("Invalid cipher text. Decryption halted.");
        }
        var salt = crypto_js_1.enc.Hex.parse(this._dataBuffer.substring(0, 32));
        var initialVector = crypto_js_1.enc.Hex.parse(this._dataBuffer.substring(32, 64));
        var encrypted = this._dataBuffer.substring(64, this._dataBuffer.length - 64);
        var key = (0, crypto_js_1.PBKDF2)(this._secret.toString(), salt, {
            keySize: this._keySize / 32,
            iterations: this._iterations,
        });
        var hashedCipherText = this._dataBuffer.substring(this._dataBuffer.length - 64);
        var cipherText = this._dataBuffer.substring(0, this._dataBuffer.length - 64);
        if (hashedCipherText != (0, crypto_js_1.HmacSHA256)(cipherText, key).toString()) {
            throw new Error("Invalid encrypted text received. Decryption halted.");
        }
        var decrypted = crypto_js_1.AES.decrypt(encrypted, key, {
            iv: initialVector,
            padding: crypto_js_1.pad.Pkcs7,
            mode: crypto_js_1.mode.CBC,
        });
        return SimpleCrypto.transform(decrypted.toString(SimpleCrypto.encoders.Default));
    };
    SimpleCrypto.prototype._encrypt = function () {
        var salt = SimpleCrypto.generateRandom(128, true);
        var initialVector = SimpleCrypto.generateRandom(128, true);
        var key = (0, crypto_js_1.PBKDF2)(this._secret.toString(), salt, {
            keySize: this._keySize / 32,
            iterations: this._iterations,
        });
        var encrypted = crypto_js_1.AES.encrypt(this._dataBuffer, key, {
            iv: initialVector,
            padding: crypto_js_1.pad.Pkcs7,
            mode: crypto_js_1.mode.CBC,
        });
        // Combining the encrypted string with salt and IV to form cipher-text
        var cipherText = salt.toString() + initialVector.toString() + encrypted.toString();
        // Generate authentication tag and append that to the cipher-text using the key derived from PBKDF2.
        // (Optional TODO: Include a module to generate authentication key. Possibly HKDF-SHA256.)
        var hashedCipherText = (0, crypto_js_1.HmacSHA256)(cipherText, key).toString();
        return cipherText + hashedCipherText;
    };
    SimpleCrypto.prototype.decrypt = function (cipher, secondArg, thirdArg) {
        var _this = this;
        var setDecryptionOption = function (arg) {
            if (typeof arg !== "boolean")
                _this.setEncoder(arg);
        };
        try {
            if (cipher !== void 0) {
                this.update(cipher);
            }
            if (secondArg !== void 0) {
                setDecryptionOption(secondArg);
            }
            if (thirdArg !== void 0) {
                setDecryptionOption(thirdArg);
            }
            return this._decrypt();
        }
        catch (error) {
            throw error;
        }
    };
    SimpleCrypto.prototype.encrypt = function (data) {
        try {
            if (data !== void 0) {
                this.update(data);
            }
            return this._encrypt();
        }
        catch (error) {
            throw error;
        }
    };
    /**
     * Decrypt Object
     *
     * Decrypt a encrypted string and try to convert it back to object.
     *
     * @since		2017.10.16
     * @access		public
     * @deprecated	Since version 2.0.0, use decrypt(cipher: CipherText) instead.
     *
     * @memberOf    SimpleCrypto
     *
     * @see		decrypt
     *
     * @param   {string}	cipher		The encrypted string of the data.
     *
     * @return  {string}	The decrypted data of the encrypted string in the form
     * of object.
     */
    SimpleCrypto.prototype.decryptObject = function (cipher) {
        return this.update(cipher).decrypt();
    };
    /**
     * Encrypt Object
     *
     * Encrypt an object.
     *
     * @since		2017.10.16
     * @access		public
     * @deprecated	Since version 2.0.0, use encrypt(data: PlainData) instead.
     *
     * @memberOf    SimpleCrypto
     *
     * @see		encrypt
     *
     * @param   {object}	object		The object to be encrypted.
     *
     * @return  {string}	The encrypted string of the object.
     */
    SimpleCrypto.prototype.encryptObject = function (object) {
        return this.update(object).encrypt();
    };
    /**
     * Append
     *
     * Append the data to be encrypted or decrypted.
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {object | string | number | boolean}	data	Data to be encrypted or decrypted.
     *
     * @return  {SimpleCrypto}		Current SimpleCrypto instance.
     */
    SimpleCrypto.prototype.append = function (data) {
        try {
            this._dataBuffer = this._dataBuffer + SimpleCrypto.sanitiseData(data);
            return this;
        }
        catch (error) {
            throw error;
        }
    };
    /**
     * Update
     *
     * Change data to be encrypted or decrypted.
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {object | string | number | boolean}	data	Data to be encrypted or decrypted.
     *
     * @return  {SimpleCrypto}		Current SimpleCrypto instance.
     */
    SimpleCrypto.prototype.update = function (data) {
        try {
            this._dataBuffer = SimpleCrypto.sanitiseData(data);
            return this;
        }
        catch (error) {
            throw error;
        }
    };
    /**
     * Set Encoder
     *
     * Change the default encoding type for the decryption process.
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {Encoder}	encoder		The new Encoder object.
     *
     * @return  {SimpleCrypto}		Current SimpleCrypto instance.
     */
    SimpleCrypto.prototype.setEncoder = function (encoder) {
        /*
         * TODO: Encoding support is dropped at the moment, both for encryption
         *  and decryption. We should figure out how we have to implement encoding
         *  support in the simplest way possible.
         * */
        this._encoder = encoder;
        return this;
    };
    /**
     * Set Secret
     *
     * Change the secret key by setting a new one. By changing the secret key,
     * any encrypted string that encrypted by previous secret key will not be
     * able to decrypted, unless the secret key is set to the one used to
     * encrypt the data.
     *
     * @since		2017.10.16
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {string}	secret		The new secret key as string.
     *
     * @return  {SimpleCrypto}		Current SimpleCrypto instance.
     */
    SimpleCrypto.prototype.setSecret = function (secret) {
        this._secret = (0, crypto_js_1.SHA3)(typeof secret === "string" ? secret : secret.toString());
        return this;
    };
    return SimpleCrypto;
}());
exports.SimpleCrypto = SimpleCrypto;
exports.default = SimpleCrypto;
//# sourceMappingURL=SimpleCrypto.js.map