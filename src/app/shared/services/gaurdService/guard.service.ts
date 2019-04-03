import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../authService/auth.service';
import {Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {CacheService} from '../cacheService/cache.service';
import {EventsService} from '../eventServices/event.service';

@Injectable()
export class GuardService implements CanActivate {
  url: string;
  constructor( private router: Router, private eventsService: EventsService,
               private authService: AuthService, private cache_: CacheService, private cacheService: CacheService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.url = state.url;
    return this.checkLogin(this.url);
  }

  /**
   * Check member login
   * @param {string} url
   * @returns {boolean}
   */
  checkLogin(url?: string): boolean {
    if (this.authService.loggedIn()) { return true; }
   // this.authService.redirectUrl = url; // set url in authService here
    this.router.navigate([ '/' ]); // then ask user to login
    return false;
  }

  /**
   * Check organisation login
   * @param {string} url
   * @returns {boolean}
   */
  checkOrganisation(url: string): boolean {
    if (this.authService.checkOrg()) { return true; }
    this.router.navigate([ '/member-routes/member/feeds' ]);
    return false;
  }

  /**
   * Check if any org property exist on the member screen and remove it. just to protect organisation property
   * @param {string} url
   * @returns {boolean}
   */
  checkOrgPropertyForMember(url: string): boolean {
    if (isNullOrUndefined( this.cacheService.getStorage('organisationLoggedInEntity'))
      || isNullOrUndefined(this.cacheService.getStorage('token_organisation'))) {
      this.cacheService.deleteStorage('token_organisation');
      this.cacheService.deleteStorage('organisationLoggedInEntity');
      return true;
    } else {
      this.cacheService.deleteStorage('token_organisation');
      this.cacheService.deleteStorage('organisationLoggedInEntity');
      return true;
    }
  }
  /**
   * Ensure login user can't be at home screen
   */
  checkLoginHome() {
    const userToken =    this.cacheService.getStorage('token');
    if ((userToken === '') || isNullOrUndefined(userToken)) {
      // this.logOut();
    } else {
      this.logOut();
      // this.router.navigate([ '/member-routes/member/feeds' ]);
    }
  }
  canLoadChildren(): boolean {

    if (this.authService.checkPrivilege()) { return true; }
    this.router.navigate([ '/member-routes/member/feeds' ]);
    return false;
  }
  checkIfInPrivilegeMode(): boolean {
    this.cache_.deleteStorage('privilegeOption');
    return true;
  }

  /**
   * Log out from system
   */
  logOut() {
   const location = this.cache_.getStorage('MemberLocationCode');
    this.cache_.clearStorage();
    this.cache_.clearSession();
    this.cache_.setStorage('MemberLocationCode', location);
     this.router.navigate([ '/' ]);
  }

}
