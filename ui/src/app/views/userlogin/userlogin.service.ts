import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
const apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  constructor(private http: HttpClient) { }

  loginAccount(data) {
    var requesturl = apiUrl + environment.customer.login
    return this.http.post(requesturl, data)
  }
}
