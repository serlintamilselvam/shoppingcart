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

    public function login(Request $request) {
    	try {
    		$response = initResponse();
    		$customerDetails = Customer::select('*')->where('email',$request->input('email'))->first();
    		if(strcmp($request->input('password'), $customerDetails['password']) != 0) {
    			$response = initValidationResponse('password incorrect');
    		} else {
    			$response = getSuccessResponse($response);
	    		$response['data'] = $customerDetails;
    		}
    	} catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
    }

    public function customerDetails($cust_id) {
    	try {
    		$response = initResponse();
    		$customer = $this->getCustomerById($cust_id);
    		if(isset($customer['cust_id']) && $customer['cust_id'] != '') {
    			$response = getSuccessResponse($response);
    			$response['data'] = $customer;
    		} else {
    			$response = initValidationResponse('Customer not found');
    		}
    	} catch(\Exception $ex) {
	    	$response = getExceptionResponse($ex);
	    }
	    return addJSONResponseWrapper($response);
    }

    public function getCustomerById($id) {
    	return Customer::select('*')->where('cust_id',$id)->first();
    }
}
