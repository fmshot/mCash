import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
// import {HttpClient} from '@angular/common/http';
import { map, tap, retryWhen, delayWhen } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs-compat/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
// import {RestfulHttpService} from '../httpService/service.service';
import {HttpClient, HttpParams} from '@angular/common/http';
// import * as jwt_decode from 'jwt-decode';

import { environment as env } from '../../../../environments/environment';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {

  constructor(private http: HttpClient) { }


  // getRequest(api: string) {
  //   let ENDPOINT;
  //   if (!isNullOrUndefined(method)) {
  //      ENDPOINT = env.API_URL_getMerchants;
  //   } else {
  //      ENDPOINT = env.API_URL + '/' + '/' + api;
  //   }
  //   return super.get(ENDPOINT, params).retryWhen(error => {
  //     return error.mergeMap(err => this.errorHandler(err))
  //       .delay(1000)
  //       .take(2);
  //   }).catch(this.errorHandler).map(res => {
  //     return res;
  //   });
  // }

  getAdminProduct() {
    let ENDPOINT;
    ENDPOINT = env.API_URL_getMerchants;
    return this.http.get(env.API_URL_getMerchants);
  }





}
