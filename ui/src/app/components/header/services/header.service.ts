import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
const apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  public customerDetails(id) {
    var requesturl = apiUrl + environment.customer.getCustomerDetails + '/' + id
    return this.http.get(requesturl)
  }

  public categories() {
    var resquestedurl = apiUrl + environment.category.getList
    return this.http.get(resquestedurl)
  }

  public cartCount(data) {
    var resquestedurl = apiUrl + environment.product.cartCount
    return this.http.post(resquestedurl, data)
  }

}
