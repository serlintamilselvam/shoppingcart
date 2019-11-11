<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    protected $table = 'product';
	protected $insertElements = ['sku','name','qty','imagepath','desc','rate'];
}
