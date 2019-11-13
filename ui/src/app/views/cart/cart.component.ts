import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private api: CartService
  ) { }

  public getCartItemList() {
    this.api.getCartItems().subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        console.log('Data is ', data.response.data)
      } else {
        console.log('please try again after sometime')
      }
    })
  }

  ngOnInit() {
    this.getCartItemList()
  }

}
