<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model {
	protected $table = 'customers';
	protected $insertElements = ['first_name','last_name','email','phone_no','password'];
}