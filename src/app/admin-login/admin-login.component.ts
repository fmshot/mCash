import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
declare const $: any;


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
// To create year for footer
anio: number = new Date().getFullYear();
// End To create year for footer

  public adminAccessFormGroup: FormGroup;
  public load = {requesting: false };
  static adminAccessForm = () => {
    return {
      username: ['', Validators.required],
      password: ['', Validators.required],
      otp: ['', Validators.required],
    };
  }
    constructor(private activeRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { this.adminAccessFormGroup = this.fb.group(AdminLoginComponent.adminAccessForm()); }




  ngOnInit() {
    this.checkFullPageBackgroundImage();
    setTimeout(function() {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }

  // onSubmitUserAccess() {
  //   this.load.requesting = true;
  //   this.currentonlineuserService.postCurrentonlineuser(this.adminAccessForm.value).subscribe(
  //     (res) => {
  //      localStorage.setItem('current_user', JSON.stringify(res));
  //       this.router.navigateByUrl('/admin-dashboard');
  //     },
  //     (error) => {
  //       this.load.requesting = false;
  //       console.log('nooo userr' );
  //     },
  //     () => {
  //     });
  // }

public checkFullPageBackgroundImage() {
    const page = $('.full-page');
    const image_src = page.data('image');
    if (image_src !== undefined) {
      const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
      page.append(image_container);
    }
  }
}
