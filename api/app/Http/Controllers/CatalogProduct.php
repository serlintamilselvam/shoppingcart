<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CatalogProduct extends Controller
{
    //to get list of products 

    function getProductCollection() {
    	return 'this is productList';
    }
}
