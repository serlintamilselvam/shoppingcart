import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
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

  productInfo$: Observable<productDetails[]>

  constructor(
    private api: CartService,
    private dataSharingService: ApiService,
    private toastr: ToastrService
  ) { }

  public getCartItemList() {
    this.api.getCartItems().subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        this.productInfo$ = _.cloneDeep(data.response.data)
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
        if (typeof tempCart != "undefined" && tempCart != null && tempCart != '') {
          this.dataSharingService.cartValueUpdated.next(tempCart);
        }
      } else {
        console.log('empty cart')
      }
    })
  }

  public calculateProductPrice(count: number, productPrice: number) {
    return (count*productPrice)
  }

  ngOnInit() {
    this.getCartItemList()
  }

}
