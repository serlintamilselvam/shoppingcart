<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Productincart extends Model {
    protected $table = 'productincart';
	protected $insertElements = ['cart_id','prod_id','product_qty'];

	public function getAvailableProductCount($productId) {
		$list = DB::table('product')->select('*')->where('prod_id', $productId)->get()->toArray();
		return json_decode(json_encode($list), True);
	}

	public function mapProductToCartId($cartId, $productId, $qty, $source = 'product') {
		$availableQty = $this->getAvailableProductCount($productId);
		$productList = $this->getProductList($cartId, $productId);
		$responseData = array(
					"status" => 'available',
					"data" => '',
					"currentqty" => $availableQty[0]['qty']
				);
		if($availableQty[0]['qty'] > 0):
			if(sizeof($productList) > 0) {
				if($source == 'product') {
					$qty = $productList[0]['product_qty']+$qty;
				}
				if($qty < $availableQty[0]['qty']):
					$this->updateCartQuantity($cartId, $productId, $qty);
				else: 
					$responseData['status'] = 'unavailable';
				endif;
			} else {
				$data = array(array('cart_id'=>$cartId, 'prod_id'=>$productId, 'product_qty'=>$qty));
				DB::table('productincart')->insert($data);
			}
		else: 
			$responseData['status'] = 'unavailable';
		endif;
		$responseData['data'] = $this->getTotalProductsInCart($cartId);
		return $responseData;
	}

	public function getProductList($cartId, $productId) {
		return Self::selectRaw('prod_id, cart_id, product_qty')
		    ->where([['cart_id', '=', $cartId], ['prod_id', '=', $productId]])->get()->toArray();
	}

	public function getTotalProductsInCart($cartId) {
		return Self::selectRaw('SUM(product_qty) as total_product')
			->where([['cart_id', '=', $cartId]])->first();
	}

	public function updateCartQuantity($cartId, $productId, $qty) {
		DB::table('productincart')
            ->where([['cart_id', '=', $cartId], ['prod_id', '=', $productId]])
            ->update(['product_qty' => $qty]);
	}

	public function getProductListFromCart($cartId) {
		return Self::selectRaw('productincart.id, productincart.prod_id, productincart.product_qty, prod.name, prod.qty, prod.imagepath, prod.rate, prod.desc')
				->leftJoin('product as prod', 'productincart.prod_id', '=', 'prod.prod_id')
					->where([['productincart.cart_id', '=', $cartId]])->get()->toArray();
	}

	public function deleteAProductFromCart($id) {
		DB::table('productincart')->where('id', '=', $id)->delete();
	}
}