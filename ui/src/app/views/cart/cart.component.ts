import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { CartService } from './services/cart.service';
import { ApiService } from '../../api.service'

interface productDetails {
  id: number,
  prod_id: number,
  qty: number,
  product_qty: number, //number of quantities added in cart
  rate: number,
  name: string,
  desc: string,
  imagepath: string
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isCartEmpty: boolean = false
  productInfo$: Observable<productDetails[]>
  orderValue: number = 0

  public nestedForm: FormGroup = new FormGroup({
    product_qty: new FormControl('', [Validators.required])
  });

  constructor(
    private api: CartService,
    private dataSharingService: ApiService,
    private toastr: ToastrService
  ) { }

  public getCartItemList() {
    this.api.getCartItems().subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        this.productInfo$ = _.cloneDeep(data.response.data)
        if(data.response.data.length > 0) {
          this.isCartEmpty = true
          this.orderValue = data.response.total_value
        }
      } else {
        console.log('please try again after sometime')
      }
    })
  }

  public removeProductFromCart(productincart: number) {
    if(confirm("Are you sure to remove this product from cart?") == true) {
      this.api.deleteCartItems(productincart).subscribe((data: any)=>{
        if (data.response.result.toLowerCase() === 'success') {
          this.getCartItemList()
          this.getCartCount()
          this.toastr.success("Removed product from cart successfully")
        } else {
          this.toastr.error("Error in deleting product")
        }
      })
    }
  }

  public getCartCount() {
    var data = {}
    this.api.cartCount(data).subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        var tempCart = data.response.data.total_product
        this.isCartEmpty = false
        this.dataSharingService.cartValueUpdated.next(0);
        if (typeof tempCart != "undefined" && tempCart != null && tempCart != '') {
          this.dataSharingService.cartValueUpdated.next(tempCart);
          this.isCartEmpty = true
        }
      } else {
        console.log('empty cart')
      }
    })
  }

  public onSubmit(productincart: number, availableQty: number) {
    var data = this.nestedForm.value
    if(data.product_qty <= availableQty) {
      var ajaxData = {
        id: productincart,
        qty: data.product_qty
      }
      this.api.updateQuantity(ajaxData).subscribe((data: any)=>{
        if (data.response.result.toLowerCase() === 'success') {
          this.getCartItemList()
          this.getCartCount()
          this.toastr.success("Updated cart successfully")
        } else {
          this.toastr.error("Error while updating product")
        }
      })
    } else {
      var responseText = "Only "+availableQty+ " quantities are available, so couln't add it in your cart"
      this.toastr.error(responseText)
    }
  }

  public checkIsCartEmpty() {
    return this.isCartEmpty
  }

  public calculateProductPrice(count: number, productPrice: number) {
    return (count*productPrice).toFixed(2)
  }

  ngOnInit() {
    this.getCartItemList()
  }

}
