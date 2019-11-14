<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With, authId');

Route::prefix('customer')->group(function () {
	Route::get('/get/{id}', 'CustomerController@customerDetails');
	Route::post('/signup', 'CustomerController@create');
	Route::post('/login', 'CustomerController@login');
});

Route::prefix('category')->group(function () {
	Route::get('/getcollection', 'CategoryController@getCollection');
});

Route::prefix('product')->group(function(){
	Route::get('/cartitems', 'CartController@getProductListInCart');
	Route::get('/getlist/{id}','ProductController@getProductDetails');
	Route::delete('/deletecartitem/{id}', 'CartController@deleteCartItem');
	Route::post('/addtocart', 'CartController@addProductToCart');
	Route::post('/cartcount', 'CartController@getCountOfTotalProductsInCart');
});