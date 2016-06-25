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
$S = ($order["height_door"]*$order["width_door"])/1000000;

//Округляем до десятых
function ceil3($number, $precision = 0) {
    return ceil($number * pow(10, $precision)) / pow(10, $precision);
}
$S = ceil3($S, 1);

//если пришел id спецпредложения, получаем цены
$special_offer = $modx->getDocument($special);
if($special_offer["parent"]==506 || $special_offer["parent"]==29 || $special_offer["parent"]==30 || $special_offer["parent"]==31 || $special_offer["parent"]==32 || $special_offer["parent"]==33){

	$params = Array(
				"cena_metallokonstr", //0+
				"cena_main-color", //1+
				"cena_outside-color", //2+
				"cena_nalichnik", //3+
				"cena_inside-color", //4+
				"cena_main-lock", //5+
				"cena_add-lock", //6+
				"cena_glazok", //7+
				"cena_dovodchik", //8+
				"cena_zadvijka", //9+
				"sale_type", //10
				"sale_value"); //11
	$specialTVs = $modx->getTemplateVars($params, "*", $special);
}

//Узнаем цену на металлоконструкцию
$metallkonstr_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $order["metallokonstr"]);
$price["metallkonstr_price"] = ceil($metallkonstr_price_tv[0]["value"]*$S/10)*10;
if($specialTVs[0]["value"]==""){
	$special_price["metallkonstr_price"] = $price["metallkonstr_price"];
} else {
	$special_price["metallkonstr_price"] = ceil($specialTVs[0]["value"]*$S/10)*10;
}

//Узнаем цену на противосъем
if($order["metallokonstr"]==191){
	//если Основа
	$price["protivosem_price"] = 2*150;
} else if($order["metallokonstr"]==192){
	//если Элит
	$price["protivosem_price"] = 3*150;
} else if($order["metallokonstr"]==193){
	//если Профи
	$price["protivosem_price"] = 4*150;
}
$special_price["protivosem_price"] = $price["protivosem_price"];

//Узнаем цену на петли
if($order["metallokonstr"]==191){
	//если Основа
	$price["petli_price"] = 2*150;
} else {
	//если не основа
	$price["petli_price"] = 3*150;
}
$special_price["petli_price"] = $price["petli_price"];
//узнаем цену на задвижки
if($order["zadvijka"]!="" && $order["zadvijka"]!=null){
	$zadvijka_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $order["zadvijka"]);
	$price["zadvijka_price"] = $zadvijka_price_tv[0]["value"];
	if($specialTVs[9]["value"]==""){
		$special_price["zadvijka_price"] = $price["zadvijka_price"];
	} else {
		$special_price["zadvijka_price"] = $specialTVs[9]["value"];
	}
} else {
	$price["zadvijka_price"] = 0;
	$special_price["zadvijka_price"] = 0;
}

//узнаем цену на основной замки
if($order["main_lock"]!="" && $order["main_lock"]!=null && $order["main_lock"]!=0){
	$main_lock_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $order["main_lock"]);
	$price["main_lock_price"] = IntVal($main_lock_price_tv[0]["value"]);
	if($specialTVs[5]["value"]==""){
		$special_price["main_lock_price"] = $price["main_lock_price"];
	} else {
		$special_price["main_lock_price"] = IntVal($specialTVs[5]["value"]);
	}
} else {
	$price["main_lock_price"] = 0;
	$special_price["main_lock_price"] = 0;
}

//узнаем цену на дополнительный замки
if($order["add_lock"]!="" && $order["add_lock"]!=null && $order["add_lock"]!=0){
	$add_lock_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $order["add_lock"]);
	$price["add_lock_price"] = IntVal($add_lock_price_tv[0]["value"]);
	if($specialTVs[6]["value"]==""){
		$special_price["add_lock_price"] = $price["add_lock_price"];
	} else {
		$special_price["add_lock_price"] = IntVal($specialTVs[6]["value"]);
	}
} else {
	$price["add_lock_price"] = 0;
	$special_price["add_lock_price"] = 0;
}

//узнаем цену на доводчик
if($order["dovodchik"]!="" && $order["dovodchik"]!=null){
	$dovodchik_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $order["dovodchik"]);
	$price["dovodchik_price"] = $dovodchik_price_tv[0]["value"];
	if($specialTVs[8]["value"]==""){
		$special_price["dovodchik_price"] = $price["dovodchik_price"];
	} else {
		$special_price["dovodchik_price"] = $specialTVs[8]["value"];
	}
} else {
	$price["dovodchik_price"] = 0;
	$special_price["dovodchik_price"] = 0;
}

//Узнаем цену на ручку
if($order["main_lock"]!="" && $order["main_lock"]!=null){
	$is_ruchka_tv = $modx->getTemplateVars(Array("ruchka"), "*", $order["main_lock"]);
	if($is_ruchka_tv[0]["value"]=="Без ручки"){
		$price["rucka_price"] = 200;
		$special_price["ruchka_price"] = 200;
	} else {
		$price["rucka_price"] = 0;
		$special_price["ruchka_price"] = 0;
	}
} else {
	$price["rucka_price"] = 200;
	$special_price["ruchka_price"] = 200;
}

//Узнаем цену на глазок
if($order["glazok"]!="" && $order["glazok"]!=null){
	$glazok_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $order["glazok"]);
	$price["glazok_price"] = $glazok_price_tv[0]["value"];
	if($specialTVs[7]["value"]==""){
		$special_price["glazok_price"] = $price["glazok_price"];
	} else {
		$special_price["glazok_price"] = $specialTVs[7]["value"];
	}
} else {
	$price["glazok_price"] = 0;
	$special_price["glazok_price"] = 0;
}

//Узнаем цену на уплотнитель
$uplotnitel_price = ceil(2*($order["width_door"] + $order["height_door"])*35/10000)*10;
if($order["metallokonstr"]==191){
	//если Основа
	$price["uplotnitel_price"] = 1*$uplotnitel_price;
} else if($order["metallokonstr"]==192){
	//если Элит
	$price["uplotnitel_price"] = 2*$uplotnitel_price;
} else if($order["metallokonstr"]==193){
	//если Профи
	$price["uplotnitel_price"] = 2*$uplotnitel_price;
}
$special_price["uplotnitel_price"] = $price["uplotnitel_price"];
//Узнаем цену для покраски
if($order["inside_view"]==195){
	//Если покраска

	//информация о странице $inside_color
	$inside_color_page = $modx->getDocument($order["inside_color"]);

	//информация о родителе $inside_color
	$inside_color_parent = $modx->getDocument($inside_color_page["parent"]);

	//сохраняем алиас родителя $inside_color в результат
	$result["inside_color_type"] = $inside_color_parent["alias"];
	$inside_color_type_id = $inside_color_parent["id"];

	//узнаем раздел покраски
	$inside_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $inside_color_type_id);
	$inside_color_price = $inside_color_price_tv[0]["value"];
	$price["inside_color_price"] = $S*$inside_color_price;
	if($specialTVs[1]["value"]==""){
		$special_price["inside_color_price"] = $price["inside_color_price"];
	} else {
		$special_price["inside_color_price"] = $S*$specialTVs[1]["value"];
	}
} else {

	//Проверяем, если пленка глянцевая, то берем соответствующую стоимость у прародителя
	$inside_color_glanz_tv = $modx->getTemplateVars(Array("isGlanz"), "*", $order["inside_color"]);
	if ($inside_color_glanz_tv[0]["value"] == "Матовый"){
		$inside_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $order["inside_view"]);
	}else if($inside_color_glanz_tv[0]["value"] == "Глянец"){
		$inside_color_price_tv = $modx->getTemplateVars(Array("glanz_price"), "*", $order["inside_view"]);
	}
	$inside_color_price = $inside_color_price_tv[0]["value"];
	$price["inside_color_price"] = ceil($S*$inside_color_price/10)*10;
	if($specialTVs[4]["value"]==""){
		$special_price["inside_color_price"] = $price["inside_color_price"];
	} else {
		$special_price["inside_color_price"] = ceil($S*$specialTVs[4]["value"]/10)*10;
	}
	if ($order["inside_view"] == 215){ //если МДФ-10,то смотрим цену зеркала
		$mirror_price_tv = $modx->getTemplateVars(Array("mirror_price"), "*", $order["inside_view"]);
		$mirror_price = $mirror_price_tv[0]["value"];
		$price["inside_color_price"] = $price["inside_color_price"] + $mirror_price;
		$special_price["inside_color_price"] = $special_price["inside_color_price"] + $mirror_price;
	}
}

if($order["outside_view"]==195){
	//Если покраска

	//информация о странице $inside_color
	$outside_color_page = $modx->getDocument($order["outside_color"]);

	//информация о родителе $inside_color
	$outside_color_parent = $modx->getDocument($outside_color_page["parent"]);

	//сохраняем алиас родителя $inside_color в результат
	$result["outside_color_type"] = $outside_color_parent["alias"];
	$outside_color_type_id = $outside_color_parent["id"];

	//получаем раздел покраски
	$outside_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $outside_color_type_id);
	$outside_color_price = $outside_color_price_tv[0]["value"];
	$price["outside_color_price"] = $S*$outside_color_price;
	if($specialTVs[1]["value"]==""){
		$special_price["outside_color_price"] = $price["outside_color_price"];
	} else {
		$special_price["outside_color_price"] = $S*$specialTVs[1]["value"];
	}
} else {
	//Проверяем, если пленка глянцевая, то берем соответствующую стоимость у прародителя
	$outside_color_glanz_tv = $modx->getTemplateVars(Array("isGlanz"), "*", $order["outside_color"]);
	if ($outside_color_glanz_tv[0]["value"] == "Матовый"){
		$outside_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $order["outside_view"]);
	}else if($outside_color_glanz_tv[0]["value"] == "Глянец"){
		$outside_color_price_tv = $modx->getTemplateVars(Array("glanz_price"), "*", $order["outside_view"]);
	}
	$outside_color_price = $outside_color_price_tv[0]["value"];
	$price["outside_color_price"] = ceil($S*$outside_color_price/10)*10;
	if($specialTVs[2]["value"]==""){
		$special_price["outside_color_price"] = $price["outside_color_price"];
	} else {
		$special_price["outside_color_price"] = ceil($S*$specialTVs[2]["value"]/10)*10;
	}
}

//Узнаем цену наличников
if($order["outside_nalichnik"]==221){
	//Если МДФ 
	if ($outside_color_glanz_tv[0]["value"] == "Матовый"){
		$nalichnik_tv = $modx->getTemplateVars(Array("nalichnik_price"), "*", $order["outside_view"]);
	}else if($outside_color_glanz_tv[0]["value"] == "Глянец"){
		$nalichnik_tv = $modx->getTemplateVars(Array("nalichnik_glanz_price"), "*", $order["outside_view"]);
	}
	$nalichnik_price = $nalichnik_tv[0]["value"];
	$price["nalichnik_price"] = $nalichnik_price;
	if($specialTVs[3]["value"]==""){
		$special_price["nalichnik_price"] = $price["nalichnik_price"];
	} else {
		$special_price["nalichnik_price"] = $specialTVs[3]["value"];
	}
} else {
	$price["nalichnik_price"] = 0;
	$special_price["nalichnik_price"] = 0;
}
//Окрашиваемые части

//информация о странице $main_color
$main_color_page = $modx->getDocument($order["main_color"]);

//информация о родителе $main_color
$main_color_parent = $modx->getDocument($main_color_page["parent"]);

//сохраняем id родителя $main_color в результат
$main_color_type_id = $main_color_parent["id"];

//узнаем раздел покраски
$main_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), "*", $main_color_type_id);
$main_color_price = $main_color_price_tv[0]["value"];
$price["main_color_price"] = 1.5*$main_color_price;
if($specialTVs[1]["value"]==""){
	$special_price["main_color_price"] = $price["main_color_price"];
} else {
	$special_price["main_color_price"] = 1.5*$specialTVs[1]["value"];
}
$total_price = 0;
$total_special_price = 0;
foreach($price as $key => $value){
	$total_price = $total_price + $value;
}
foreach($special_price as $key => $value){
	$total_special_price = $total_special_price + $value;
}
$price["spec"] = $special_price;
$price["clear"] = $total_price;
$price["skidka_percent"] = "";
$price["skidka_ruble"] = "";
$default_special_type = $modx->getTemplateVars(Array("sale_type"), "*", 189);
$default_special_value = $modx->getTemplateVars(Array("sale_value"), "*", 189);
if($specialTVs[11]["value"]==""){
	$price["total"] = $total_special_price;
	if ($default_special_value[0]['value'] != '' && $default_special_type[0]['value'] == 'В процентах'){
		$sum_special = $default_special_value[0]['value'];
		$skidka = ($total_special_price/100)*$sum_special;
		$price["total"] = ceil(($total_special_price - $skidka)/10)*10;
		$price["skidka_percent"] = $sum_special;
	}else if ($default_special_value[0]['value'] != '' && $default_special_type[0]['value'] == 'В рублях'){
		$skidka = $default_special_value[0]['value'];
		$price["total"] = $total_special_price - $skidka;
		$price["skidka_ruble"] = $skidka;
	}
} else {
	if($specialTVs[10]["value"]=="В процентах"){
		$sum_special = $specialTVs[11]["value"];
		if ($default_special_value[0]['value'] != '' && $default_special_type[0]['value'] == 'В процентах'){
			$sum_special = $default_special_value[0]['value'] + $specialTVs[11]["value"];
		}
		$skidka = ($total_special_price/100)*$sum_special;
		$price["total"] = ceil(($total_special_price - $skidka)/10)*10;
		$price["skidka_percent"] = $sum_special;
	} else if($specialTVs[10]["value"]=="В рублях"){
		$skidka = $specialTVs[11]["value"];
		if ($default_special_value[0]['value'] != '' && $default_special_type[0]['value'] == 'В рублях'){
			$skidka = $default_special_value[0]['value'] + $specialTVs[11]["value"];
		}
		$price["total"] = $total_special_price - $skidka;
		$price["skidka_ruble"] = $skidka;
	}
}

print json_encode($price); 

?>