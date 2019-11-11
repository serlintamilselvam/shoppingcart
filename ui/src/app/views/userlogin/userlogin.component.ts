import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserloginService } from './userlogin.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {

  public nestedForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  public onSubmit() {
    var data = this.nestedForm.value
    this.api.loginAccount(data).subscribe((data: any)=>{
      console.log('Login Form JSON ', data)
      if (data.response.result.toLowerCase() === 'success') {
        var customerId = data.response.data.cust_id
        if (typeof customerId == "undefined" || customerId == null) {
          this.toastr.error("Error while Logging In")
        } else {
          this.setCustomerSession(customerId)
          this.toastr.success("Logged In Successfully")
          window.location.href = '/'
          // this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['']);
          // }); 
        }
      } else {
        this.toastr.error("Invalid e-mail address or password")
      }
    })
  }

  private setCustomerSession(userData) {
    var expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + 2) //2 days for user session
    this.cookieservice.delete('user-details')
    this.cookieservice.set('user-details', userData, expireDate)
  }

  constructor(
    private api: UserloginService,
    private toastr: ToastrService, 
    private router: Router, 
    private cookieservice: CookieService
    ) { }

  ngOnInit() {
  }
}
