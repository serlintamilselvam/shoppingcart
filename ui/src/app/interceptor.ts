import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
@Injectable()
export class Interceptor implements HttpInterceptor {
  
constructor(private cookieservice: CookieService) {}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.cookieservice.check('user-details')) {
        var userId = this.cookieservice.get('user-details')
        const headers = new HttpHeaders().set('authId', userId)
        const authRequest = request.clone( { headers: headers})
        return next.handle(authRequest)
    } else {
        return next.handle(request);
    }
  }
}