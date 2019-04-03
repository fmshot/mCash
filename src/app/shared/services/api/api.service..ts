import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { map, tap, retryWhen, delayWhen } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs-compat/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import {RestfulHttpService} from '../httpService/service.service';
import {HttpClient, HttpParams} from '@angular/common/http';
// import * as jwt_decode from 'jwt-decode';

import { environment as env } from '../../../../environments/environment';
import {isNullOrUndefined} from 'util';
/**
 *
 * Service to handle all api calls to api backend
 */
@Injectable()
export class ApiService extends RestfulHttpService {
  constructor(http: HttpClient) {
    super(http);
  }


  /**
   * Handler error types
   * @param error
   */

  errorHandler(error) {
    try {
      console.log('Error ', error);
      if (error.status === 401) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/';
        return throwError(error || {msg: 'Unknown error type occurred'});
      }
      return throwError(error || {msg: 'Unknown error type occurred'});
    } catch (error) {
        console.log('Type error occurred');
    }
  }


  public decode(res, auth?: string) {
    const data = res.data;
    // console.log('Real Response: ', res);
    if (res && !isNullOrUndefined(res.data)) {
      if (auth.includes('login') || auth === 'signup') {
        // const decode =  jwt_decode(res.data);
        sessionStorage.setItem('access', data);
        // res.data = decode;

      }
      return res;
    } else {
      return res;
    }
  }



  deleteRequest(api: string , method: string , data?: any) {
    let ENDPOINT;
    if (!isNullOrUndefined(method)) {
       ENDPOINT = env.API_URL + '/' + '/' + api + '/' + method;
    } else {
       ENDPOINT = env.API_URL + '/' + '/' + api;
    }
    return super.delete(ENDPOINT, data).retryWhen(error => {
    return error.mergeMap((err) => this.errorHandler(err))
        .delay(1000)
        .take(2);
    }).catch(this.errorHandler).map(res => {
      return res;
    });
  }



  putRequest(api: string , method: string , data: any) {
    let ENDPOINT;
    if (!isNullOrUndefined(method)) {
       ENDPOINT = env.API_URL + '/' + '/' + api + '/' + method;
    } else {
       ENDPOINT = env.API_URL + '/' + '/' + api;
    }
    return super.put(ENDPOINT, data).retryWhen(error => {
      return error.mergeMap((err) => this.errorHandler(err))
        .delay(1000)
        .take(2);
    }).catch(this.errorHandler).map(res => {
      return res;
    });

  }



  patchRequest(api: string, method: string , data: any) {
    let ENDPOINT;
    if (!isNullOrUndefined(method)) {
       ENDPOINT = env.API_URL + '/' + '/' + api + '/' + method;
    } else {
       ENDPOINT = env.API_URL + '/' + '/' + api;
    }
    return super.patch(ENDPOINT, data).retryWhen(error => {
      return error.mergeMap((err) => this.errorHandler(err))
        .delay(1000)
        .take(2);
    }).catch(this.errorHandler).map(res => {
      return res;
    });
  }



  getRequest(api: string , method: string , params?: HttpParams) {
    let ENDPOINT;
    if (!isNullOrUndefined(method)) {
       ENDPOINT = env.API_URL + '/' + '/' + api + '/' + method;
    } else {
       ENDPOINT = env.API_URL + '/' + '/' + api;
    }
    return super.get(ENDPOINT, params).retryWhen(error => {
      return error.mergeMap(err => this.errorHandler(err))
        .delay(1000)
        .take(2);
    }).catch(this.errorHandler).map(res => {
      return res;
    });
  }


  postRequest(api: string, data: any) {
    let ENDPOINT;

    if (!isNullOrUndefined(data)) {
       ENDPOINT = env.API_URL + '/' + api;
    } else {
       ENDPOINT = env.API_URL + '/' + api;
    }
      return super.post(ENDPOINT, data).retryWhen(error => {
        return error.mergeMap((err) => this.errorHandler(err))
          .delay(1000)
          .take(2);
      }).catch(this.errorHandler).map(res => this.decode(res));

    }
}
