<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
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
			"main_color_type",
			"outside-color",
			"outside-frezer",
			"outside-view",
			"zadvijka",
			"width",
			"height",
			"door_side");
$TVs = $modx->getTemplateVars($params, '*', 189);

//получаем список всех цветов
$childs_color = $modx->getActiveChildren(208);

$childs_frezer_6 = $modx->getActiveChildren(204);
$childs_frezer_10 = $modx->getActiveChildren(212);
$childs_frezer_10z = $modx->getActiveChildren(407);

$childs_standart_color = $modx->getActiveChildren(196);
$childs_antik_color = $modx->getActiveChildren(198);
$childs_spec_color = $modx->getActiveChildren(200);

$result['child_color']["value"] = $childs_color[0]["id"];
$result['child_frezer_6']["value"] = $childs_frezer_6[0]["id"];
$result['child_frezer_10']["value"] = $childs_frezer_10[0]["id"];
$result['child_frezer_10z']["value"] = $childs_frezer_10z[0]["id"];
$result['child_standart_color']["value"] = $childs_standart_color[0]["id"];
$result['child_antik_color']["value"] = $childs_antik_color[0]["id"];
$result['child_spec_color']["value"] = $childs_spec_color[0]["id"];

foreach($childs_color as $key => $value){
	$txtTV = $modx->getTemplateVars(Array("laminat_name"), '*', $value["id"]);
	if($txtTV[0]["value"]!=""){
		$result['child_color_l']["value"] = $value["id"];
		break;
	}
}

foreach ($TVs as $key => $value){

	$page = $modx->getDocument($value["value"]);

	$result[$value["name"]."_id"]["value"] = $page["id"];
	$result[$value["name"]."_id"]["changable"] = true;

}

$result['width']["value"] = $TVs[1]['value'];
$result['width']["changable"] = true;
$result['height']["value"] = $TVs[0]['value'];
$result['height']["changable"] = true;
$door_side = $TVs[2]['value'];
if ($door_side == 'налево'){
	$result['door_side']["value"] = 'left';
}else if($door_side == 'направо'){
	$result['door_side']["value"] = 'right';
}
$result['door_side']["changable"] = true;

$special_offer = $modx->getDocument($special);
if($special_offer["parent"]==506 || $special_offer["parent"]==29 || $special_offer["parent"]==30 || $special_offer["parent"]==31 || $special_offer["parent"]==32 || $special_offer["parent"]==33 || $special_offer["parent"]==9 || $special_offer["parent"]==1022){

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
				"main_color_type",
				"outside-color",
				"outside-frezer",
				"outside-view",
				"zadvijka",
				"width",
				"height",
				"door_side");
	$specialTVs = $modx->getTemplateVars($params, '*', $special);
	$inside_frezer_check = $modx->getTemplateVars(Array('inside_frezer_check'), '*', $special);
	$outside_frezer_check = $modx->getTemplateVars(Array('outside_frezer_check'), '*', $special);
	$cena_main_color = $modx->getTemplateVars(Array('cena_main-color'), '*', $special);
	$cena_inside_color = $modx->getTemplateVars(Array('cena_inside-color'), '*', $special);
	$cena_outside_color = $modx->getTemplateVars(Array('cena_outside-color'), '*', $special);
	$cena_add_lock = $modx->getTemplateVars(Array('cena_add-lock'), '*', $special);
	$cena_dovodchik = $modx->getTemplateVars(Array('cena_dovodchik'), '*', $special);
	$cena_glazok = $modx->getTemplateVars(Array('cena_glazok'), '*', $special);
	$cena_main_lock = $modx->getTemplateVars(Array('cena_main-lock'), '*', $special);
	$cena_metallokonstr = $modx->getTemplateVars(Array('cena_metallokonstr'), '*', $special);
	$cena_nalichnik = $modx->getTemplateVars(Array('cena_nalichnik'), '*', $special);
	$cena_zadvijka = $modx->getTemplateVars(Array('cena_zadvijka'), '*', $special);
	$cena_ruchka = $modx->getTemplateVars(Array('cena_ruchka'), '*', $special);

	foreach ($specialTVs as $key => $value){

		if($value["value"]!=""){

			$page = $modx->getDocument($value["value"]);

			$result[$value["name"]."_id"]["value"] = $page["id"];
			$result[$value["name"]."_id"]["changable"] = false;
		}

	}
	if($specialTVs[1]['value']!=""){
		$result['width']["value"] = $specialTVs[1]['value'];
		$result['width']["changable"] = true;
	}
	if($specialTVs[0]['value']!=""){
		$result['height']["value"] = $specialTVs[0]['value'];
		$result['height']["changable"] = true;
	}
	if($specialTVs[2]['value']!=""){
		$door_side = $specialTVs[2]['value'];
		if ($door_side == 'налево'){
			$result['door_side']["value"] = 'left';
		}else if($door_side == 'направо'){
			$result['door_side']["value"] = 'right';
		}
		$result['door_side']["changable"] = true;
	}

	//если не заполнено окрашивание, приваиваем первого ребенка из заполненного типа цвета
	if($specialTVs[4]["value"]==""){
		if($result["main_color_type_id"]["value"]==196){
			$result["okrashivanie_id"]["value"] = $result['child_standart_color']["value"];
		} else if($result["main_color_type_id"]["value"]==198){
			$result["okrashivanie_id"]["value"] = $result['child_antik_color']["value"];
		} else if($result["main_color_type_id"]["value"]==200){
			$result["okrashivanie_id"]["value"] = $result['child_spec_color']["value"];
		}
	}

	//если внешняя отделка не "Покраска"
	if($result['outside-view_id']['value']!=195){
		//проверяем, заполнен ли цвет
		if($specialTVs[7]["value"]==""){
			//если не заполнен, то меняем цвет на тот, что есть в мдф
			
			//присваиваем первый цвет из списка
			$result['outside-color_id']['value'] = $result['child_color']["value"];
		}

		//проверяем, заполнена ли фрезеровка
		if($specialTVs[9]["value"]==""){
			if($result['outside-view_id']['value']==202){
				$result['outside-frezer_id']['value'] = $result['child_frezer_6']["value"];
			} else if($result['outside-view_id']['value']==210){
				$result['outside-frezer_id']['value'] = $result['child_frezer_10']["value"];
			}  else if($result['outside-view_id']['value']==215){
				$result['outside-frezer_id']['value'] = $result['child_frezer_10z']["value"];
			}
		}
	} else {
		$result['outside-color_id']['value'] = $result['okrashivanie_id']['value'];
	}

	//если внутренняя отделка не "Покраска"
	if($result['inside-view_id']['value']!=195){
		//проверяем, заполнен ли цвет
		if($specialTVs[11]["value"]==""){
			//получаем список всех цветов
			// $childs = $modx->getActiveChildren(208);
			//присваиваем первый цвет из списка
			if ($result['inside-view_id']['value'] == 231){
				$result['inside-color_id']['value'] = $result['child_color_l']["value"];
			}else{
				$result['inside-color_id']['value'] = $result['child_color']["value"];
			}
		}

		//проверяем, заполнена ли фрезеровка
		if($specialTVs[12]["value"]==""){
			if($result['inside-view_id']['value']==202){
				$result['inside-frezer_id']['value'] = $result['child_frezer_6']["value"];
			} else if($result['inside-view_id']['value']==210){
				$result['inside-frezer_id']['value'] = $result['child_frezer_10']["value"];
			} else if($result['inside-view_id']['value']==215){
				$result['inside-frezer_id']['value'] = $result['child_frezer_10z']["value"];
			}
		}
	} else {
		$result['inside-color_id']['value'] = $result['okrashivanie_id']['value'];
	}

	for($i=13;$i<=17;$i++){
		if($specialTVs[$i]["value"]=="-"){
			$result[$specialTVs[$i]["name"]."_id"]["value"] = "";
			$result[$specialTVs[$i]["name"]."_id"]["changable"] = true;
		}
	}
	if ($cena_main_color[0]['value'] != ''){
		$result['okrashivanie_id']['changable'] = false;
	}else{
		$result['okrashivanie_id']['changable'] = true;
	}
	if ($cena_outside_color[0]['value'] != ''){
		$result['outside-color_id']['changable'] = false;
	}else{

		$result['outside-color_id']['changable'] = true;
	}
	if ($cena_inside_color[0]['value'] != ''){
		$result['inside-color_id']['changable'] = false;
	}else{
		$result['inside-color_id']['changable'] = true;
	}
	if ($cena_add_lock[0]['value'] != ''){
		$result['add-lock_id']['changable'] = false;
	} else {
		$result['add-lock_id']['changable'] = true;
	}
	if ($cena_dovodchik[0]['value'] != ''){
		$result['dovodchik_id']['changable'] = false;
	} else {
		$result['dovodchik_id']['changable'] = true;
	}
	if ($cena_glazok[0]['value'] != ''){
		$result['glazok_id']['changable'] = false;
	} else {
		$result['glazok_id']['changable'] = true;
	}
	if ($cena_main_lock[0]['value'] != ''){
		$result['main-lock_id']['changable'] = false;
	} else {
		$result['main-lock_id']['changable'] = true;
	}
	if ($cena_metallokonstr[0]['value'] != ''){
		$result['metallokonstrikcii_id']['changable'] = false;
	} else {
		$result['metallokonstrikcii_id']['changable'] = true;
	}
	if ($cena_nalichnik[0]['value'] != ''){
		$result['nalichnik_id']['changable'] = false;
	} else {
		$result['nalichnik_id']['changable'] = true;
	}
	if ($cena_zadvijka[0]['value'] != ''){
		$result['zadvijka_id']['changable'] = false;
	} else {
		$result['zadvijka_id']['changable'] = true;
	}
	if ($cena_ruchka[0]['value'] != ''){
		$result['ruchka_id']['changable'] = false;
	} else {
		$result['ruchka_id']['changable'] = true;
	}
	if ($inside_frezer_check[0]['value'] == 'true'){
		$result['inside-frezer_id']['changable'] = false;
	}else{
		$result['inside-frezer_id']['changable'] = true;
	}
	if ($outside_frezer_check[0]['value'] == 'true'){
		$result['outside-frezer_id']['changable'] = false;
	}else{
		$result['outside-frezer_id']['changable'] = true;
	}
}


print json_encode($result);

?>