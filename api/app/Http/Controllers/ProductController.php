<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\ProductCategoryMapping;
use App\Category;

class ProductController extends Controller {

	private $productCategoryMap, $category;

	function __construct(ProductCategoryMapping $productCategoryMap, Category $category) {
        $this->productCategoryMap = $productCategoryMap;
        $this->category = $category;
    }
	
	public function getProductDetails($id) {
    	try {
    		$response = initResponse();
    		$response['data'] = $this->productCategoryMap->getCategoryProducts($id);
    		$response['catgeory_title'] = $this->category->getCategoryNameFromId($id);
    		$response = getSuccessResponse($response);
    	} catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
    }
   
}