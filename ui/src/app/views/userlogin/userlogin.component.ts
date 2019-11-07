import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    // if(this.nestedForm.invalid){
    //   return
    // }
    this.api.loginAccount(JSON.stringify(this.nestedForm.value))
  }

  constructor(private api: UserloginService) { }

  ngOnInit() {
  }
}
