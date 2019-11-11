<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\ProductCategoryMapping;

class ProductController extends Controller {

	private $productCategoryMap;

	function __construct(ProductCategoryMapping $productCategoryMap) {
        $this->productCategoryMap = $productCategoryMap;
    }
	
	public function getProductDetails($id) {
    	try {
    		$response = initResponse();
    		$response['data'] = $this->productCategoryMap->getCategoryProducts($id);
    		$response = getSuccessResponse($response);
    	} catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
    }
   
}