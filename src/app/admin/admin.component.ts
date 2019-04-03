import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // To get full year for footer copyright;
  anio: number = new Date().getFullYear();
    // End To get full year for footer copyright;

  public productsFormGroup: FormGroup;
  public loads = {
    requesting: false,
  };
  static productsForm = () => {
    return {
      first_name: ['', ],
      last_name: ['', ],
      other_name: ['', ],
      bank_name: ['' ],
      account_no: ['', ],
      address: ['', ],
      phone: ['', ],
      business_name: ['', ],
    };
  }

  constructor(    private activatedRoute: ActivatedRoute, private fb: FormBuilder

  ) {     this.productsFormGroup = this.fb.group(AdminComponent.productsForm());
  }

  ngOnInit() {
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

}
