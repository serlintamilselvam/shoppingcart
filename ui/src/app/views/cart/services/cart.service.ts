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

  public deleteCartItems(id) {
    var requesturl = apiUrl + environment.product.deleteItem + '/' + id
    return this.http.delete(requesturl)
  }

  public cartCount(data) {
    var resquestedurl = apiUrl + environment.product.cartCount
    return this.http.post(resquestedurl, data)
  }

}
