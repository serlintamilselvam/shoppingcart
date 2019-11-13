import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import {ProductService} from './service/product.service';
import {ApiService} from '../../api.service'

interface productDetails {
  prod_id: number,
  qty: number,
  rate: number,
  sku: string,
  desc: string,
  name: string,
  imagepath: string
}

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  categoryId: number
  categoryName: string
  productInfo$: Observable<productDetails[]>

  public getCategoryCollection(id: number) {
    this.api.productCollections(id).subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        this.productInfo$ = _.cloneDeep(data.response.data)
        this.categoryName = data.response.catgeory_title.name
      } else {
        console.log('please try again after sometime')
      }
    })
  }

  public addToCart(productId: number) {
    var dataJson = {
      "productId": productId,
      "page": "product",
	    "qty": 1
    }
    this.api.addProductToCart(dataJson).subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        this.toastr.success("Product added to cart successfully")
        this.dataSharingService.cartValueUpdated.next(data.response.data.total_product);
      } else {
        this.toastr.error("Error while adding to cart")
      }
    })
  }

  constructor(
    private api: ProductService, 
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private dataSharingService: ApiService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.categoryId = parseInt(params.get("categoryId"));
      this.getCategoryCollection(this.categoryId);
    })
  }

}
