<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller {

	public function getCollection() {
		try {
			$response = initResponse();
			$categories = Category::all();
			if(sizeof($categories) > 0) {
				$response = getSuccessResponse($response);
				$response['data'] = $categories;
			} else {
				$response = initValidationResponse('Category Empty');
			}
		} catch(\Exception $ex) {
			$response = getExceptionResponse($ex);
		}
		return addJSONResponseWrapper($response);
	}
}