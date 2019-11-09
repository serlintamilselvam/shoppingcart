import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
const apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  public createAccount(data) {
    var requesturl = apiUrl + environment.customer.addCustomers
    return this.http.post(requesturl, data)
  }
}
