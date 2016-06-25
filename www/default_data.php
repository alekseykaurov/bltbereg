<?php
require_once('manager/includes/config.inc.php');
require_once('manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$special = $_POST['special'];
$product = $_POST['product'];

$params = Array(
			"add-lock",
			"dovodchik",
			"glazok-konstr",
			"inside-color",
			"inside-frezer",
			"inside-view",
			"main-lock",
			"metallokonstrikcii",
			"nalichniki",
			"okrashivanie",
			"outside-color",
			"outside-frezer",
			"outside-view",
			"zadvijka",
			"width",
			"height",
			"door_side");
$TVs = $modx->getTemplateVars($params, '*', 238);

foreach ($TVs as $key => $value){

	$page = $modx->getDocument($value["value"]);

	$result[$value["name"]."_id"]["value"] = $page["id"];
	$result[$value["name"]."_id"]["changable"] = true;


}

$result['width']["value"] = $TVs[0]['value'];
$result['width']["changable"] = true;
$result['height']["value"] = $TVs[1]['value'];
$result['height']["changable"] = true;
$door_side = $TVs[2]['value'];
if ($door_side == 'налево'){
	$result['door_side']["value"] = 'left';
}else if($door_side == 'направо'){
	$result['door_side']["value"] = 'right';
}
$result['door_side']["changable"] = true;

$special_offer = $modx->getDocument($special);
if($special_offer["parent"]==290 || $special_offer["parent"]==29 || $special_offer["parent"]==30 || $special_offer["parent"]==31 || $special_offer["parent"]==32 || $special_offer["parent"]==33){

	$result["special_name"] = $special_offer["pagetitle"];

	$params = Array(
				"add-lock",
				"dovodchik",
				"glazok-konstr",
				"inside-color",
				"inside-frezer",
				"inside-view",
				"main-lock",
				"metallokonstrikcii",
				"nalichniki",
				"okrashivanie",
				"outside-color",
				"outside-frezer",
				"outside-view",
				"zadvijka",
				"width",
				"height",
				"door_side");
	$specialTVs = $modx->getTemplateVars($params, '*', $special);

	foreach ($specialTVs as $key => $value){

		if($value["value"]!=""){

			$page = $modx->getDocument($value["value"]);

			$result[$value["name"]."_id"]["value"] = $page["id"];
			$result[$value["name"]."_id"]["changable"] = false;
		}

	}
	if($specialTVs[0]['value']!=""){
		$result['width']["value"] = $specialTVs[0]['value'];
		$result['width']["changable"] = false;
	}
	if($specialTVs[1]['value']!=""){
		$result['height']["value"] = $specialTVs[1]['value'];
		$result['height']["changable"] = false;
	}
	if($speciaTVs[2]['value']!=""){
		$door_side = $speciaTVs[2]['value'];
		if ($door_side == 'налево'){
			$result['door_side']["value"] = 'left';
		}else if($door_side == 'направо'){
			$result['door_side']["value"] = 'right';
		}
		$result['door_side']["changable"] = false;
	}


	//если внешняя отделка не "Покраска"
	if($result['outside-view_id']['value']!=190){
		//проверяем, заполнен ли цвет
		if($specialTVs[6]["value"]==""){
			//если не заполнен, то меняем цвет на тот, что есть в мдф
			$result['outside-color_id']['value'] = "198";
		}

		//проверяем, заполнена ли фрезеровка
		if($specialTVs[8]["value"]==""){
			if($result['outside-view_id']['value']==191){
				$result['outside-frezer_id']['value'] = "255";
			} else if($result['outside-view_id']['value']==252){
				$result['outside-frezer_id']['value'] = "231";
			} else if($result['outside-view_id']['value']==295){
				$result['outside-frezer_id']['value'] = "294";
			}
		}
	} else {
		$result['outside-color_id']['value'] = $result['okrashivanie_id']['value'];
	}

	//если внутренняя отделка не "Покраска"
	if($result['inside-view_id']['value']!=190){
		//проверяем, заполнен ли цвет
		if($specialTVs[10]["value"]==""){
			$result['inside-color_id']['value'] = "198";
		}

		//проверяем, заполнена ли фрезеровка
		if($specialTVs[11]["value"]==""){
			if($result['inside-view_id']['value']==191){
				$result['inside-frezer_id']['value'] = "255";
			} else if($result['inside-view_id']['value']==252){
				$result['inside-frezer_id']['value'] = "231";
			}  else if($result['inside-view_id']['value']==295){
				$result['inside-frezer_id']['value'] = "294";
			}
		}
	} else {
		$result['inside-color_id']['value'] = $result['okrashivanie_id']['value'];
	}

	for($i=12;$i<=16;$i++){
		if($specialTVs[$i]["value"]=="-"){
			$result[$specialTVs[$i]["name"]."_id"]["value"] = "";
		}
	}

}
	
// $product_info = $modx->getDocument($product);
// if($product_info["parent"]==29 || $product_info["parent"]==30 || $product_info["parent"]==31 || $product_info["parent"]==32 || $product_info["parent"]==33){

// 	$params = Array(
// 				"add-lock",
// 				"dovodchik",
// 				"glazok-konstr",
// 				"inside-color",
// 				"inside-frezer",
// 				"inside-view",
// 				"main-lock",
// 				"metallokonstrikcii",
// 				"nalichniki",
// 				"okrashivanie",
// 				"outside-color",
// 				"outside-frezer",
// 				"outside-view",
// 				"zadvijka",
// 				"width",
// 				"height",
// 				"door_side");
// 	$specialTVs = $modx->getTemplateVars($params, '*', $product);

// 	foreach ($specialTVs as $key => $value){

// 		if($value["value"]!=""){

// 			$page = $modx->getDocument($value["value"]);

// 			$result[$value["name"]."_id"]["value"] = $page["id"];
// 			$result[$value["name"]."_id"]["changable"] = true;
// 		} else {
// 			$result[$value["name"]."_id"]["value"] = "";
// 			$result[$value["name"]."_id"]["changable"] = true;
// 		}

// 	}

// 	if($specialTVs[0]['value']!=""){
// 		$result['width']["value"] = $specialTVs[0]['value'];
// 		$result['width']["changable"] = true;
// 	}
// 	if($specialTVs[1]['value']!=""){
// 		$result['height']["value"] = $specialTVs[1]['value'];
// 		$result['height']["changable"] = true;
// 	}
// 	if($speciaTVs[2]['value']!=""){
// 		$door_side = $speciaTVs[2]['value'];
// 		if ($door_side == 'налево'){
// 			$result['door_side']["value"] = 'left';
// 		}else if($door_side == 'направо'){
// 			$result['door_side']["value"] = 'right';
// 		}
// 		$result['door_side']["changable"] = true;
// 	}

// }
	//print json_encode($specialTVs);


print json_encode($result);


// echo "<pre>";
// print_r($result);
// echo "</pre>";
?>