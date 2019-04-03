import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {isNullOrUndefined} from 'util';
import {CacheService} from '../cacheService/cache.service';
import { environment as env } from '../../../../environments/environment';

@Injectable()
export class EncryptDataService {
key: string;
  constructor(
    private cacheService: CacheService
  ) {
  }

  /**
   * Encrypt User object
   * @param data
   * @returns {boolean}
   */
  encryptUserObject(data: any) {
    console.log('Hello world');
    this.key = env.PRIVATE_KEY;
    // Encrypt the Password
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);

    // Save the Login in to an array
      this.cacheService.setSession('token', encrypted);
      return true;
  }

  /**
   * Encrypt organisation obj
   * @param data
   * @returns {boolean}
   */
  encryptOrgObject(data: any) {
    this.key = env.PRIVATE_KEY;
    // Encrypt the Password
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);
      this.cacheService.setStorage('token_organisation', encrypted);
      return true;
  }
  encryptIncompleteOrg(data: any) {
    this.key = env.PRIVATE_KEY;
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);
      this.cacheService.setStorage('signup_inprogress', encrypted);
      return true;
  }

  /**
   * Encrypt status---org-creation
   * @param data
   * @returns {boolean}
   */
  encryptOrgStatus(data: any) {
    this.key = env.PRIVATE_KEY;
    // Encrypt the Password
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);
      this.cacheService.setStorage('organisation-process', encrypted);
      return true;
  }

  /**
   * Encrypt pending request
   * @param data
   * @returns {boolean}
   */
  encryptUserPendingRequest(data: any) {
    this.key = env.PRIVATE_KEY;
    // Encrypt the Password
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);
      this.cacheService.setStorage('myPendingRequest', encrypted);
      return true;
  }

  /**
   * Encrypt org you may now object
   * @param data
   * @returns {boolean}
   */
  encryptUserOrgKnown(data: any) {
    this.key = env.PRIVATE_KEY;
    // Encrypt the Password
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);
      this.cacheService.setStorage('OrganisationKnown', encrypted);
      return true;
  }

  /**
   * Encrypt User privileges
   * @param data
   * @returns {boolean}
   */
  encryptUserPrivilege(data: any) {
    this.key = env.PRIVATE_KEY;
    // Encrypt the Password
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);
      this.cacheService.setStorage('privilegeOption', encrypted);
      return true;
  }

  /**
   * Encrypt system organisation search result object
   * @param data
   * @returns {boolean}
   */
  encryptOrgSearchObjectResult(data: any) {
    this.key = env.PRIVATE_KEY;
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);
      this.cacheService.setStorage('searched', encrypted);
      return true;
  }

  /**
   * Encrypt String
   * @param data
   * @returns {boolean}
   */
  encryptString(data: any) {
    this.key = env.PRIVATE_KEY;
    const encrypted = CryptoJS.AES.encrypt(data, this.key);
    this.cacheService.setStorage('organisationLoggedInEntity', encrypted);
    return true;
  }

  /**
   * Encrypt access token
   * @param data
   * @returns {boolean}
   */
  encryptAccessToken(data: any) {
    this.key = env.PRIVATE_KEY;
    const object = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(object, this.key);
      this.cacheService.setStorage('userAccessToken', encrypted);
      return true;
  }
}


export class DecryptDataService {
key = env.PRIVATE_KEY;
  constructor(  ) { }
  // Helps decrypt the user object

  /**
   * Decrypt object back
   * @param {string} key
   * @returns {any}
   */
  decryptUserObject(key: string) {
    // console.log('KEY::', key);
    const code = sessionStorage.getItem(key);
    const userEncryption = code.toString();
    const decrypted = CryptoJS.AES.decrypt( userEncryption , this.key);
    const finalData = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    // console.log('DECRYPTED::', finalData);
    return finalData;
  }

  /**
   * Decryt strings back
   * @param {string} key
   * @returns {any}
   */
  decryptString(key: string) {
    if (!isNullOrUndefined(localStorage.getItem(key))) {
      const code = localStorage.getItem(key);
      const userEncryption = code.toString();
      const decrypted = CryptoJS.AES.decrypt( userEncryption , this.key);
      const finalString = decrypted.toString(CryptoJS.enc.Utf8);
      return finalString;
    } else { return false; }

  }

}
