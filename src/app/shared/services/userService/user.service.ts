/**
 * Created by Arokoyu Olalekan Ojo
 */

import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import { map, tap, retryWhen, delayWhen } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IResponse} from '../../interfaces/Iresponse';
import {ApiService} from '../api/api.service.';
import {isNullOrUndefined} from 'util';

@Injectable()
export class UserService {

  constructor(private api: ApiService) {

  }

  /**
   *
   * Api used to sign up a user .
   * @param {User} user
   * @returns {Observable<IResponse>}
   */
  // userSignUp(user: User): Observable<IResponse> {
    // return this.api.postRequest('auth', 'signup', user).map((res: IResponse) => {
      // return res ;
    // });
  }

  /**
   *
   *
   * Login the user
   * @param {string} email
   * @param {string} password
   * @returns {Observable<IResponse>} Which is the authentication token required by the application for
   * subsequent  requests .
   */
  // auth(email: string , password: string ): Observable<IResponse> {
    // return this.api.postRequest('auth', 'login' , {email: email, password: password}).map((res: IResponse)  => {
      // return res ;
    // });

  // }

  // googleAuth(accessToken: any): Observable<IResponse> {
    // return this.api.postRequest('auth', 'googlelogin' , accessToken).map((res: IResponse)  => {
      // return res ;
    // });

  // }

// }
