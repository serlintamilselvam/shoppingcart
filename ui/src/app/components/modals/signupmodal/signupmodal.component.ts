import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-signupmodal',
  templateUrl: './signupmodal.component.html',
  styleUrls: ['./signupmodal.component.scss']
})
export class SignupmodalComponent implements OnInit {

  public nestedForm: FormGroup = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  public onSubmit() {
    // if(this.nestedForm.invalid){
    //   return
    // }

    console.log(' Billing Form', this.nestedForm);
  }

  constructor() { }

  ngOnInit() {
  }

}
