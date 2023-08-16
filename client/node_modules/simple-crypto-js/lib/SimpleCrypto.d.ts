/**
 * SimpleCryptoJS
 *
 * Simplified AES cryptography for safer and easier encryption and decryption processes
 * of any JavaScript objects.
 **/
import { enc, lib } from "crypto-js";
export declare type Encoder = typeof enc.Base64;
export declare type Encoders = typeof enc & {
    Default: Encoder;
};
export declare type PlainData = object | string | number | boolean;
export declare type PlainText = string;
export declare type CipherText = string;
/**
 * SimpleCrypto
 *
 * @class
 */
export declare class SimpleCrypto {
    private _dataBuffer;
    private _encoder;
    private _secret;
    private readonly _keySize;
    private readonly _iterations;
    /**
     * Represent a SimpleCrypto instance
     *
     * @constructor
     * @param	{string}	secret		The secret key for cryptographic process.
     */
    constructor(secret: string | lib.WordArray);
    private static sanitiseData;
    private static transform;
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
    static get encoders(): Encoders;
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
    static generateRandom(length?: number, expectsWordArray?: boolean): string | lib.WordArray;
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
    static generateRandomString(length?: number): string;
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
    static generateRandomWordArray(length?: number): lib.WordArray;
    private _decrypt;
    private _encrypt;
    /**
     * Decrypt
     *
     * Decrypt a encrypted string backs to its proper type, either it JavaScript
     * object, string, number, or boolean.
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @return  {string}	The decrypted data of the encrypted string.
     */
    decrypt(): PlainData;
    /**
     * Decrypt
     *
     * Decrypt a encrypted string backs to its proper type, either it JavaScript
     * object, string, number, or boolean.
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {string}	cipher			The encrypted string of the data.
     *
     * @return  {string}	The decrypted data of the encrypted string.
     */
    decrypt(cipher: string): PlainData;
    /**
     * Decrypt
     *
     * Decrypt a encrypted string backs to its proper type, either it JavaScript
     * object, string, number, or boolean.
     *
     * @since		2020.05.09
     * @access		public
     * @deprecated	Since version 2.4.0, use decrypt(cipher: CipherText, encoder: Encoder) instead.
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {string}	cipher			The encrypted string of the data.
     * @param   {boolean}	expectsObject	Setting this to true will return an object instead of string.
     *
     * @return  {string}	The decrypted data of the encrypted string.
     */
    decrypt(cipher: CipherText, expectsObject: boolean): PlainData;
    /**
     * Decrypt
     *
     * Decrypt a encrypted string backs to its proper type, either it JavaScript
     * object, string, number, or boolean.
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {string}	cipher			The encrypted string of the data.
     * @param   {Encoder}	encoder			Set the encoding for the string conversion.
     *
     * @return  {string}	The decrypted data of the encrypted string.
     */
    decrypt(cipher: CipherText, encoder: Encoder): PlainData;
    /**
     * Decrypt
     *
     * Decrypt a encrypted string backs to its proper type, either it JavaScript
     * object, string, number, or boolean.
     *
     * @since		2017.10.16
     * @access		public
     * @deprecated	Since version 2.4.0, use decrypt(cipher: CipherText, encoder: Encoder) instead.
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {string}	cipher			The encrypted string of the data.
     * @param   {boolean}	expectsObject	Setting this to true will return an object instead of string.
     * @param   {Encoder}	encoder			Set the encoding for the string conversion.
     *
     * @return  {string}	The decrypted data of the encrypted string.
     */
    decrypt(cipher: CipherText, expectsObject: boolean, encoder: Encoder): PlainData;
    /**
     * Encrypt
     *
     * Encrypt the data provided using append() or update.
     *
     * @since		2020.05.09
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @return  {string}	The encrypted string of the data.
     */
    encrypt(): CipherText;
    /**
     * Encrypt
     *
     * Encrypt any JavaScript object, string, number or boolean.
     *
     * @since		2017.10.16
     * @access		public
     *
     * @memberOf    SimpleCrypto
     *
     * @param   {object | string | number | boolean}	data	The data to be encrypted.
     *
     * @return  {string}	The encrypted string of the data.
     */
    encrypt(data: PlainData): CipherText;
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
    decryptObject(cipher: CipherText): object;
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
    encryptObject(object: object): string;
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
    append(data: PlainData): SimpleCrypto;
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
    update(data: PlainData): SimpleCrypto;
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
    setEncoder(encoder: Encoder): SimpleCrypto;
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
    setSecret(secret: string | lib.WordArray): SimpleCrypto;
}
export default SimpleCrypto;
