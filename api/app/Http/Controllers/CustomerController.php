<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class CustomerController extends Controller {

    public function create(Request $request) {
    	try {
    		$response = initResponse();
	    	$customer = new Customer();
	    	$customer->first_name = $request->input('fname');
	    	$customer->last_name = $request->input('lname');
	    	$customer->email = $request->input('email');
	    	$customer->phone_no = $request->input('phone_no');
	    	$customer->password = $request->input('password');
	    	$customer->save();
	    	$response = getSuccessResponse($response);
	    	$response['data'] = $customer;

	    } catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
    }
}
