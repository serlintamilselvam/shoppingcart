import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const localUrl = 'http://localhost/sample/checkdb.php/';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  constructor(private http: HttpClient) { }

  loginAccount(data) {
    this.http.post(localUrl, data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

  }
}
