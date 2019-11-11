import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  categoryId: number

  public getCategoryCollection(id: number) {
    this.api.productCollections(id).subscribe((data: any)=>{
      if (data.response.result.toLowerCase() === 'success') {
        console.log('api success')
        // this.categoryInfo$ = _.cloneDeep(data.response.data)
        // console.log('categoryInfo is ', this.categoryInfo$)
      } else {
        console.log('please try again after sometime')
      }
    })
  }

  constructor(private api: ProductService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.categoryId = parseInt(params.get("categoryId"));
      this.getCategoryCollection(this.categoryId);
    })
  }

}
