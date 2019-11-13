<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Cart extends Model {
    protected $table = 'cart';
	protected $insertElements = ['cart_id','cust_id'];

	public function createCartForCustomer($custId) {
		DB::insert('insert into cart (cust_id) values(?)',[$custId]);
	}
}
