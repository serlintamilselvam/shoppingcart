import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
const apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productCollections(id) {
    var requesturl = apiUrl + environment.product.getList + '/' + id
    return this.http.get(requesturl)
  }

  constructor(private http: HttpClient) { }
}
