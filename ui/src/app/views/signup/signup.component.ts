import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public nestedForm: FormGroup = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  public onSubmit() {
    var data = this.nestedForm.value
    this.api.createAccount(data).subscribe((data: any)=>{
      console.log('Account Creation JSON ', data)
      if (data.response.result.toLowerCase() === 'success') {
        this.toastr.success("Account created successfully!")
      } else {
        this.toastr.error("Already signed up user")
        this.router.navigate(['/login'])
      }
    })
  }

  constructor(private api: SignupService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

}
