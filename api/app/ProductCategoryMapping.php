<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductCategoryMapping extends Model {

    protected $table = 'productcategorymapping';
	protected $insertElements = ['prod_id','cat_id'];

	public function getCategoryProducts($catId) {
		$productList = Self::selectRaw('productcategorymapping.prod_id, prod.sku, prod.name, prod.qty, prod.imagepath, prod.desc, prod.rate')
		            ->leftJoin('product as prod', 'productcategorymapping.prod_id', '=', 'prod.prod_id')
		                ->where([['productcategorymapping.cat_id', '=', $catId]])->get()->toArray();
		return $productList;
	}

}