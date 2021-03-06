import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './services/header.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../api.service';

interface customerInformation {
  cust_id: number,
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  phone_no: string
}

interface categoryList {
  cat_id: number,
  name: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  customerInfo$: Observable<customerInformation[]>
  categoryInfo$: Observable<categoryList[]>
  isLoggedIn: boolean = false
  faShoppingCart = faShoppingCart
  cartValue: number

  constructor(private api: HeaderService, private router: Router, private cookieservice: CookieService, private dataSharingService: ApiService) {
    this.cartValue = 0
    this.dataSharingService.cartValueUpdated.subscribe( value => {
      this.cartValue = value
    });
   }

  public getCustomerDetails() {
    var customerId = this.getCustomerIdFromCookie()
    console.log('customerId is ', customerId)
    if (typeof customerId != "undefined" && customerId != null && customerId != '') {
      this.api.customerDetails(customerId).subscribe((data: any)=>{
        console.log('customer details JSON ', data)
        if (data.response.result.toLowerCase() === 'success') {
          var customerId = data.response.data.cust_id
          if (typeof customerId == "undefined" || customerId == null) {
            console.log('Customer Id not found')
          } else {
              this.isLoggedIn = true 
              this.customerInfo$ = _.cloneDeep(data.response.data)
          }
        } else {
          console.log('please try again after sometime')
        }
      })
    } else {
      console.log('Dont do anything')
    }
  }

  public getCategoryCollection() {
    this.api.categories().subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        this.categoryInfo$ = _.cloneDeep(data.response.data)
        console.log('categoryInfo is ', this.categoryInfo$)
      } else {
        console.log('please try again after sometime')
      }
    })
  }

  public getCartCount() {
    var data = {}
    this.api.cartCount(data).subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        var tempCart = data.response.data.total_product
        if (typeof tempCart != "undefined" && tempCart != null && tempCart != '') {
          this.cartValue = tempCart
        }
      } else {
        console.log('empty cart')
      }
    })
  }

  public getCustomerIdFromCookie() {
    return this.cookieservice.get('user-details')
  }
  
  public loggedInState() {
    return this.isLoggedIn
  }

  public logOutCustomer() {
    this.cookieservice.delete('user-details')
    window.location.href = '/login'
  }


  ngOnInit() {
    this.getCustomerDetails()
    this.getCategoryCollection()
    this.getCartCount()
  }

}
