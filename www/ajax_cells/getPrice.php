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
$S = ($order["total_height"]*$order["total_width"])/1000000;

//Округляем до десятых
function ceil3($number, $precision = 0) {
    return ceil($number * pow(10, $precision)) / pow(10, $precision);
}
$S = ceil3($S, 2);

//стоимость окрашивания
$price["color"] = 700 * $S;

//профильная часть
if($order["bars_type"]==1 || $order["bars_type"]==3){
	$stvorki_count = 1;
} else {
	$stvorki_count = 2;
}
$price["profile"] = ceil((($order["total_height"]*2*$order["quantity_cells"]*40/1000)+($order["prolety"]*$order["quantity_cells"]*50))/10)*10*$stvorki_count;

//стоимость петель
if($order["bars_type"]==3){
	$price["petli"] = 150*2;
} else if($order["bars_type"]==4){
	$price["petli"] = 150*4;
} else {
	$price["petli"] = 0;
}

//стоимость планок
if($order["bars_type"]==1 || $order["bars_type"]==2){
	$price["planki"] = 144*2;
} else {
	$price["planki"] = 144*4;
}

//стоимость несущ. профиля
if($order["bars_type"]==1){
	$price["nes_profile"] = 144*1;
} else if($order["bars_type"]==3 || $order["bars_type"]==4){
	$price["nes_profile"] = 144*2;
} else {
	$price["nes_profile"] = 0;
}

//Проуш. Нав.замок
$price["nav_zamok"] = 100;

//стоимость поворотного ролика
if($order["bars_type"]==1 || $order["bars_type"]==3){
	$price["rolik"] = 250*1;
} else {
	$price["rolik"] = 250*2;
}

$total_price = 0;
foreach($price as $key=>$value){
	$total_price += $value;
}

$price["total"] = $total_price;

$price["S"] = $S;

print json_encode($price); 

?>