<?php

require_once("../manager/includes/config.inc.php");

require_once("../manager/includes/protect.inc.php");

define("MODX_API_MODE", true);

require_once("../manager/includes/document.parser.class.inc.php");

$modx = new DocumentParser;

$modx->db->connect();

$modx->getSettings();



$order = $_POST["order"];

$special = $_POST["special"];



$price = Array();

$special_price = Array();



//Площадь

$S = ($order["height_total"]*$order["width_total"])/1000000;



//Округляем до десятых

function ceil3($number, $precision = 0) {

    return ceil($number * pow(10, $precision)) / pow(10, $precision);

}

$S = ceil3($S, 2);



//профильная часть

if($order["bars_type"]==1 || $order["bars_type"]==3){

	$stvorki_count = 1;

} else {

	$stvorki_count = 2;

}

$price["profile"] = ceil((($order["height_total"]*2*$order["quantity_cells"]*40/1000)+($order["prolety"]*$order["quantity_cells"]*50))/10)*10*$stvorki_count;

if($price["profile"]<1500*$stvorki_count){

	$price["profile"] = 1500*$stvorki_count;

}

//стоимость окрашивания

//стоимость окрашивания из админки
$price_standart_tv = $modx->getTemplateVars(Array("price_standart"), '*', 1017);
$price_other_tv = $modx->getTemplateVars(Array("price_other"), '*', 1017);
$price_ral_tv = $modx->getTemplateVars(Array("price_ral"), '*', 1017);

if($order["main_color_type"]==196){

	$price["main_color"] = $price_standart_tv[0]["value"] * $S;

	if($price["main_color"]<$price_standart_tv[0]["value"]*$stvorki_count){

		$price["main_color"] = $price_standart_tv[0]["value"]*$stvorki_count;

	}

} else {

	$price["main_color"] = $price_ral_tv[0]["value"] * $S;

	if($price["main_color"]<$price_ral_tv[0]["value"]*$stvorki_count){

		$price["main_color"] = $price_ral_tv[0]["value"]*$stvorki_count;

	}

}

//стоимость петель

if($order["bars_type"]==3){

	$price["petli"] = 150*2;

} else if($order["bars_type"]==4){

	$price["petli"] = 150*4;

} else {

	$price["petli"] = 0;

}



//стоимость планок

if($order["bars_type"]==1 || $order["bars_type"]==3){

	$price["planki"] = (80*$order["height_total"])/1000*2;

} else {

	$price["planki"] = (80*$order["height_total"])/1000*4;

}



//стоимость несущ. профиля

if($order["bars_type"]==1){

	$price["nes_profile"] = (80*$order["height_total"])/1000*1;

} else if($order["bars_type"]==3 || $order["bars_type"]==4){

	$price["nes_profile"] = (80*$order["height_total"])/1000*2;

} else {

	$price["nes_profile"] = 0;

}



//Проуш. Нав.замок

if($order["proushina"] == 'true'){

	$proushina = 1;

} else {

	$proushina = 0;

}

$price["nav_zamok"] = 100*$proushina;



//стоимость поворотного ролика

if($order["rolik"] == 'true'){

	$rolik = 1;

} else {

	$rolik = 0;

}

if($order["bars_type"]==1 || $order["bars_type"]==3){

	$price["rolik"] = 250*1*$rolik;

} else {

	$price["rolik"] = 250*2*$rolik;

}



$total_price = 0;

foreach($price as $key=>$value){

	$total_price += $value;

}



$price["total"] = $total_price;

$price["S"] = $S;



print json_encode($price); 



?>