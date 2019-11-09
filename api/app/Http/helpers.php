<?php

if (!function_exists('assetUrl')) {

    /**
     * Function to get assets URL.
     *
     * @param string $path
     * @return string
     */
    function assetUrl($path = '') {
        return config('app.baseUrl') . '/' . $path;
    }

}

if (!function_exists('basicConfig')) {

    /**
     * Function to get details from the basic config.
     *
     * @param  string  $key
     * @return string
     */
    function basicConfig($key = '') {
        return config("ars.$key");
    }

}

if (!function_exists('initResponse')) {

    /**
     * Function to initialize an error response.
     *
     * @param string $errorMsg
     * @return array
     */
    function initResponse($errorMsg = "invalid_method") {
        return array('result' => 'error', 'errors' => array('msg' => $errorMsg));
    }

}

if (!function_exists('initValidationResponse')) {

    /**
     * Function to initialize a custom error response.
     *
     * @param string $errorMsg
     * @return array
     */
    function initValidationResponse($errorMsg) {
        return array('result' => 'error', 'errors' => $errorMsg);
    }

}

if (!function_exists('getExceptionResponse')) {

    /**
     * Function to initialize an exception handling response.
     *
     * @param array $ex
     * @return array
     */
    function getExceptionResponse($ex) {
//         return array('result' => 'error', 'errors' => array('msg' => 'unexpected'));
        return array('result' => 'error', 'errors' => array('msg' => $ex->getMessage()));
//        return array('result' => 'error', 'errors' => array('msg' => $ex->getTraceAsString()));
    }

}

if (!function_exists('getSuccessResponse')) {

    /**
     * Function to return a success response.
     *
     * @param string $response
     * @return array
     */
    function getSuccessResponse($response) {
        $response['result'] = 'success';
        unset($response['errors']);
        return $response;
    }

}

if (!function_exists('addJSONResponseWrapper')) {

    /**
     * Function to create the wrapper for the response.
     *
     * @param string $response
     * @return JSON
     */
    function addJSONResponseWrapper($response) {
        $data = array(
            'response' => $response
        );
        return response()->json($data);
    }

}

if (!function_exists('encodeHTMLElements')) {

    /**
     * Function to encode the HTML elements.
     *
     * @param string $value
     * @return string
     */
    function encodeHTMLElements($value) {
        return htmlentities($value, ENT_QUOTES | ENT_HTML5);
    }

}

if (!function_exists('decodeHTMLElements')) {

    /**
     * Function to decode the HTML elements.
     *
     * @param string $value
     * @return string
     */
    function decodeHTMLElements($value) {
        return html_entity_decode($value, ENT_QUOTES | ENT_HTML5);
    }

}

if (!function_exists('getDateTimeISOString')) {

    /**
     * Function to return the timestamp in a standard that JS can understand.
     *
     * @param string $dateTime
     * @return string
     */
    function getDateTimeISOString($dateTime) {
        return date('c', strtotime($dateTime));
    }

}

if (!function_exists('str_ordinal')) {

    /**
     * Append an ordinal indicator to a numeric value.
     *
     * @param  string|int  $value
     * @param  bool  $superscript
     * @return string
     */
    function str_ordinal($value, $superscript = false) {
        $number = abs($value);
        $indicators = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
        $suffix = $superscript ? '<sup>' . $indicators[$number % 10] . '</sup>' : $indicators[$number % 10];
        if ($number % 100 >= 11 && $number % 100 <= 13) {
            $suffix = $superscript ? '<sup>th</sup>' : 'th';
        }
        return number_format($number) . $suffix;
    }

}