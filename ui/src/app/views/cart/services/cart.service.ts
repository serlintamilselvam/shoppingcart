import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
const apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public getCartItems() {
    var requesturl = apiUrl + environment.product.getCartItems
    return this.http.get(requesturl)
  }

}
