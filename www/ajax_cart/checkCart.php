<?php
require_once("../manager/includes/config.inc.php");
require_once("../manager/includes/protect.inc.php");
define("MODX_API_MODE", true);
require_once("../manager/includes/document.parser.class.inc.php");
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

//получаем Cookie
if(isset($_COOKIE['products'])){
	$cookie = explode("|", $_COOKIE['products']);
} else {
	$cookie = false;
}

//считаем количество товаров и общую стоимость
$result["products"] = 0;
$result["price"] = 0;
if($cookie!=false){
	foreach($cookie as $key => $value){
		$item = explode("-", $value);
		$items[] = $item;
		//$items[0] - id, $items[1] - count, $items[2] - isPay
	}
	foreach($items as $key => $value){
		$result["products"] = $result["products"]+$value[1];
		$result["price"] = $result["price"]+($value[1]*$value[3]);
	}
	$result["price"] = number_format($result["price"], 0, '.', ' ');
}

print json_encode($result);

?>