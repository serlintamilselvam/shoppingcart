<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cart;
use App\Productincart;

class CartController extends Controller {

	private $cart;

	function __construct(Cart $cart, Productincart $productincart) {
        $this->cart = $cart;
        $this->productincart = $productincart;
    }

    private function getCartIdFromCustomerId($customerId) {
 		return Cart::select('*')->where('cust_id',$customerId)->first();
 	}

 	private function checkCartIdAndAddProductToCart($customerId, $productId, $qty=1, $source='product') {
 		$row = $this->getCartIdFromCustomerId($customerId);
 		if(!isset($row['cust_id']) && $row['cust_id'] == '') {
 			$this->cart->createCartForCustomer($customerId);
 			$row = $this->getCartIdFromCustomerId($customerId);
 		}
 		return $this->productincart->mapProductToCartId($row['cart_id'], $productId, $qty, $source);
 	}
 	
 	public function addProductToCart(Request $request) {
 		try {
    		$response = initResponse();
	    	$customerId = $request->header('authId');
	    	if(isset($customerId) && $customerId != '') {
	    		$productId = $request->input('productId');
	    		$qty = $request->input('qty');
	    		$source = $request->input('page');
	    		$response['data'] = $this->checkCartIdAndAddProductToCart($customerId, $productId, $qty, $source);
	    		$response = getSuccessResponse($response);
	    	} else {
	    		$response = initValidationResponse('invalid customer');
	    	}

	    } catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
 	}

 	public function getCountOfTotalProductsInCart(Request $request) {
 		try {
    		$response = initResponse();
	    	$customerId = $request->header('authId');
	    	if(isset($customerId) && $customerId != '') {
	    		$row = $this->getCartIdFromCustomerId($customerId);
 				if(!isset($row['cust_id']) && $row['cust_id'] == '') {
 					$response = initValidationResponse('empty cart');
 				} else {
 					$response['data'] = $this->productincart->getTotalProductsInCart($row['cart_id']);
	    			$response = getSuccessResponse($response);
 				}
	    	} else {
	    		$response = initValidationResponse('invalid customer');
	    	}

	    } catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
 	}

 	public function getProductListInCart(Request $request) {
 		try {
 			$response = initResponse();
	    	$customerId = $request->header('authId');
	    	if(isset($customerId) && $customerId != '') {
	    		$row = $this->getCartIdFromCustomerId($customerId);
 				if(!isset($row['cust_id']) && $row['cust_id'] == '') {
 					$response = initValidationResponse('empty cart');
 				} else {
 					$response['data'] = $this->productincart->getProductListFromCart($row['cart_id']);
	    			$response = getSuccessResponse($response);
 				}
	    	} else {
	    		$response = initValidationResponse('invalid customer');
	    	}
 		} catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
 	}

 	public function deleteCartItem($id) {
 		try {
 			$response = initResponse();
	    	if(isset($id) && $id != '') {
	    		$this->productincart->deleteAProductFromCart($id);
	    		$response['msg'] = 'deleted successfully';
	    		$response = getSuccessResponse($response);
	    	} else {
	    		$response = initValidationResponse('Error occurred while deleting!!');
	    	}
 		} catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
 	}
}