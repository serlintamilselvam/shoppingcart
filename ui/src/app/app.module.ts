import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from  'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Interceptor } from './interceptor';

/*
  Custom component declaration
*/
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './views/signup/signup.component';
import { UserloginComponent } from './views/userlogin/userlogin.component';
import { ProductlistComponent } from './views/productlist/productlist.component';
import { CartComponent } from './views/cart/cart.component';

/*
  Custom Service
*/
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    UserloginComponent,
    ProductlistComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center'
    }),
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    ApiService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
