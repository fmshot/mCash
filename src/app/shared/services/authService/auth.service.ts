/**
 *
 * Created By Arokoyu Olalekan Ojo <arokoyuolalekan@gmail.com> @ 8/9/2017
 *
 */
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DecryptDataService} from '../encryption/encrypt-data.service';
import {isNullOrUndefined} from 'util';
import {CacheService} from '../cacheService/cache.service';
import {HttpClient} from '@angular/common/http';
import { environment as ENV } from '../../../../environments/environment';


@Injectable()
export class AuthService {
  public redirectUrl = '/member-routes/member/feeds'; // Here is where the requested url is stored
  constructor(
    private router: Router,
    private http: HttpClient,
    private decryptData: DecryptDataService,
    private activatedRoute: ActivatedRoute, private cache: CacheService) {}

  public loggedIn(): boolean {
    return  this.checkUserLogin();
  }
  public checkOrg(): boolean {
    return  this.checkOrgToken();
  }
  public checkPrivilege(): boolean {
    return this.checkUserPrivilege();
  }
  public isPrivilegeMode(): boolean {
    return this.checkUserPrivilegeMode();
  }

  public redirect(): void {
    this.router.navigate([ this.redirectUrl ]); // use the stored url here
  }
  public redirect_login(): void {
    this.router.navigate([ '/login' ]); // use this url
  }
  public redirect_signup(email): void {
    this.router.navigate([ '/home/' + email ]); // use this url
  }
  public redirector(url: string): void {
    this.router.navigate([ url ]); // use this url
  }
 public checkBrowserSession () {
    if (isNullOrUndefined(this.cache.getSession('Kolanut-Application-running'))) {
     // Since a user can decide to use the app on two tabs, session will only appear on the particular tab log in
      /* localStorage.removeItem('userAccessToken');
      localStorage.removeItem('token');
      localStorage.removeItem('token_organisation');
      localStorage.removeItem('organisationLoggedInEntity');*/
    } else {}
 }
  /**
   * Ensure user / member sign in
   * @returns {boolean}
   */
  public checkUserLogin(): boolean {
    const userObject: string = this.cache.getSession('token');
    if (userObject === undefined || userObject === '' || userObject === null ) {
      this.cache.deleteSession('token');
      return false;
    } else {
      // return true;
     const userDataDecrypted =  this.decryptData.decryptUserObject('token');
    console.log('userDataDecrypted:', userDataDecrypted);
     const actionKey = userDataDecrypted.ActionKey;
     console.log('USERTOKENS', ENV.USERTOKENS, actionKey);
     if (actionKey !== ENV.USERTOKENS) {
       this.cache.deleteSession('token');
       return false;
     }
      return true;
    }
  }
 public checkUserPrivilege(): boolean {
   const userPrivilege: string = this.cache.getStorage('privilegeOption');
   if (userPrivilege === undefined || userPrivilege === '' || userPrivilege === null) {
     this.cache.deleteStorage('privilegeOption');
     // this.guardService.logOut();
     return false;
   } else {
     //  userObject
     const userDataDecrypted = this.decryptData.decryptUserObject('privilegeOption');
     //   console.log('userDataDecrypted:', userDataDecrypted);
     const actionKey = userDataDecrypted.saveKeyIndex;
     // console.log('ActionKey::', actionKey);
     if (actionKey !== '25Aw6}-098yhnbvuiAr_poi876y!@34567vcrffghgfdssdf') {
       this.cache.deleteStorage('privilegeOption');
       return false;
     } else {
       return true;
     }
   }
 }
 public checkUserPrivilegeMode(): boolean {
   const userPrivilege: string = this.cache.getStorage('privilegeOption');
   if (userPrivilege === undefined || userPrivilege === '' || userPrivilege === null || isNullOrUndefined(userPrivilege)) {
     this.cache.deleteStorage('privilegeOption');
     return false;
   } else {
     this.cache.deleteStorage('privilegeOption');
    return true;
   }
 }

  /**
   * Ensure an admin role is selected to use the organisation dashboard
   * @returns {boolean}
   */
  public checkOrgToken(): boolean {
   if (!isNullOrUndefined(this.cache.getStorage('organisationLoggedInEntity'))) {
     const orgId: string = this.cache.getStorage('organisationLoggedInEntity');
     if (orgId === undefined || orgId === '' || orgId === null || isNullOrUndefined(orgId)) {
       this.cache.deleteStorage('token_organisation');
       this.cache.deleteStorage('organisationLoggedInEntity');
       return false;
     } else {
       const userDataDecrypted =  this.decryptData.decryptString('organisationLoggedInEntity');
       // console.log('Number:', userDataDecrypted);
       if (isNaN(parseInt(userDataDecrypted, 10)) || isNullOrUndefined(userDataDecrypted)
         || userDataDecrypted === '' || userDataDecrypted === null) {
         this.cache.deleteStorage('organisationLoggedInEntity');
         this.cache.deleteStorage('token_organisation');
         return false;
       } else {
         this.cache.deleteStorage('privilegeOption');
         return true; }
     }
   } else {
     this.cache.deleteStorage('token_organisation');
     this.cache.deleteStorage('organisationLoggedInEntity');
     return false; }

  }
  public logOut() {
    this.cache.clearSession();
    this.cache.clearStorage();
    return true;
  }
}
