<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$url = $_GET['url'];

// Modified from https://stackoverflow.com/questions/2280394/how-can-i-check-if-a-url-exists-via-php/12628971#12628971

if(! $url || ! is_string($url) || filter_var($url, FILTER_VALIDATE_URL) === FALSE){
    return false;
}
$ch = @curl_init($url);
if($ch === false){
    return false;
}
@curl_setopt($ch, CURLOPT_HEADER         ,true);    // we want headers
@curl_setopt($ch, CURLOPT_RETURNTRANSFER ,true);    // catch output (do NOT print!)
@curl_setopt($ch, CURLOPT_FOLLOWLOCATION ,true);
@curl_setopt($ch, CURLOPT_MAXREDIRS      ,10);  // fairly random number, but could prevent unwanted endless redirects with followlocation=true
@curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,5);   // fairly random number (seconds)... but could prevent waiting forever to get a result
@curl_setopt($ch, CURLOPT_TIMEOUT        ,6);   // fairly random number (seconds)... but could prevent waiting forever to get a result
@curl_setopt($ch, CURLOPT_USERAGENT      ,"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1");   // pretend we're a regular browser
@curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
@curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
@curl_setopt($ch, CURLOPT_FAILONERROR, 0);

$response = @curl_exec($ch);

if(@curl_errno($ch)){   // should be 0
    @curl_close($ch);
    return false;
}

$code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); // note: php.net documentation shows this returns a string, but really it returns an int

$headersize = @curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$body = substr($response, $headersize, strlen($response) - $headersize);

@curl_close($ch);

$output = [
    'http_status' => $code,
    'body' => $body
];

echo json_encode($output);


?>
