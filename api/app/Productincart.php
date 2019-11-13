<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Productincart extends Model {
    protected $table = 'productincart';
	protected $insertElements = ['cart_id','prod_id','product_qty'];

	public function mapProductToCartId($cartId, $productId, $qty, $source = 'product') {
		$productList = $this->getProductList($cartId, $productId);
		if(sizeof($productList) > 0) {
			if($source == 'product') {
				$qty = $productList[0]['product_qty']+$qty;
			}
			$this->updateCartQuantity($cartId, $productId, $qty);
		} else {
			$data = array(array('cart_id'=>$cartId, 'prod_id'=>$productId, 'product_qty'=>$qty));
			DB::table('productincart')->insert($data);
		}
		return $this->getTotalProductsInCart($cartId);
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
}
