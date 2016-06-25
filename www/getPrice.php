<?php
require_once('manager/includes/config.inc.php');
require_once('manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$order = $_POST["order"];
$special = $_POST["special"];

//Площадь
$S = ($order["height_door"]*$order["width_door"])/1000000;

//Округляем до десятых
function ceil3($number, $precision = 0) {
    return ceil($number * pow(10, $precision)) / pow(10, $precision);
}
$S = ceil3($S, 1);

//если пришел id спецпредложения, получаем цены
$special_offer = $modx->getDocument($special);
if($special_offer["parent"]==290 || $special_offer["parent"]==29 || $special_offer["parent"]==30 || $special_offer["parent"]==31 || $special_offer["parent"]==32 || $special_offer["parent"]==33){

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
	$specialTVs = $modx->getTemplateVars($params, '*', $special);
}

//Узнаем цену на металлоконструкцию
$metallkonstr_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $order["metallokonstr"]);
if($specialTVs[0]["value"]==""){
	$price["metallkonstr_price"] = ceil($metallkonstr_price_tv[0]["value"]*$S/10)*10;
} else {
	$price["metallkonstr_price"] = ceil($specialTVs[0]["value"]==""*$S/10)*10;
}

//Узнаем цену на противосъем
if($order["metallokonstr"]==207){
	//если Основа
	$price["protivosem_price"] = 2*150;
} else if($order["metallokonstr"]==208){
	//если Элит
	$price["protivosem_price"] = 3*150;
} else if($order["metallokonstr"]==209){
	//если Профи
	$price["protivosem_price"] = 4*150;
}

//Узнаем цену на петли
if($order["metallokonstr"]==207){
	//если Основа
	$price["petli_price"] = 2*150;
} else {
	//если не основа
	$price["petli_price"] = 3*150;
}

//узнаем цену на задвижки
if($order["zadvijka"]!="" && $order["zadvijka"]!=null){
	$zadvijka_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $order["zadvijka"]);
	if($specialTVs[9]["value"]==""){
		$price["zadvijka_price"] = $zadvijka_price_tv[0]["value"];
	} else {
		$price["zadvijka_price"] = $specialTVs[9]["value"];
	}
} else {
	$price["zadvijka_price"] = 0;
}

//узнаем цену на основной замки
if($order["main_lock"]!="" && $order["main_lock"]!=null){
	$main_lock_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $order["main_lock"]);
	if($specialTVs[5]["value"]==""){
		$price["main_lock_price"] = $main_lock_price_tv[0]["value"];
	} else {
		$price["main_lock_price"] = $specialTVs[5]["value"];
	}
} else {
	$price["main_lock_price"] = 0;
}

//узнаем цену на дополнительный замки
if($order["add_lock"]!="" && $order["add_lock"]!=null){
	$add_lock_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $order["add_lock"]);
	if($specialTVs[6]["value"]==""){
		$price["add_lock_price"] = $add_lock_price_tv[0]["value"];
	} else {
		$price["add_lock_price"] = $specialTVs[6]["value"];
	}
} else {
	$price["add_lock_price"] = 0;
}

//узнаем цену на доводчик
if($order["dovodchik"]!="" && $order["dovodchik"]!=null){
	$dovodchik_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $order["dovodchik"]);
	if($specialTVs[8]["value"]==""){
		$price["dovodchik_price"] = $dovodchik_price_tv[0]["value"];
	} else {
		$price["dovodchik_price"] = $specialTVs[8]["value"];
	}
} else {
	$price["dovodchik_price"] = 0;
}

//Узнаем цену на ручку
if($order["main_lock"]!="" && $order["main_lock"]!=null){
	$is_ruchka_tv = $modx->getTemplateVars(Array("ruchka"), '*', $order["main_lock"]);
	if($is_ruchka_tv[0]["value"]=="Без ручки"){
		$price["rucka_price"] = 200;
	} else {
		$price["rucka_price"] = 0;
	}
} else {
	$price["rucka_price"] = 200;
}

//Узнаем цену на глазок
if($order["glazok"]!="" && $order["glazok"]!=null){
	$glazok_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $order["glazok"]);
	if($specialTVs[7]["value"]==""){
		$price["glazok_price"] = $glazok_price_tv[0]["value"];
	} else {
		$price["glazok_price"] = $specialTVs[7]["value"];
	}
} else {
	$price["glazok_price"] = 0;
}

//Узнаем цену на уплотнитель
if($order["metallokonstr"]==207){
	//если Основа
	$price["uplotnitel_price"] = 1*210;
} else if($order["metallokonstr"]==208){
	//если Элит
	$price["uplotnitel_price"] = 2*210;
} else if($order["metallokonstr"]==209){
	//если Профи
	$price["uplotnitel_price"] = 2*210;
}

//Узнаем цену для покраски
if($order["inside_view"]==190){
	//Если покраска

	//информация о странице $inside_color
	$inside_color_page = $modx->getDocument($order["inside_color"]);

	//информация о родителе $inside_color
	$inside_color_parent = $modx->getDocument($inside_color_page["parent"]);

	//сохраняем алиас родителя $inside_color в результат
	$result["inside_color_type"] = $inside_color_parent["alias"];
	$inside_color_type_id = $inside_color_parent["id"];

	//узнаем раздел покраски
	// if($result["inside_color_type"]=="tablicza-czvetov-ral1" || $result["inside_color_type"]=="antik"){
	// 	$price["inside_color_price"] = $S*700;
	// } else {
	// 	$price["inside_color_price"] = $S*1200;
	// }
	$inside_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $inside_color_type_id);
	$inside_color_price = $inside_color_price_tv[0]['value'];
	if($specialTVs[4]["value"]==""){
		$price['inside_color_price'] = $S*$inside_color_price;
	} else {
		$price['inside_color_price'] = $S*$specialTVs[4]["value"];
	}
} else {
	// if($order["inside_view"]==191){
	// 	//Если МДФ-6
	// 	$price["inside_color_price"] = $S*2700;
	// } else if($order["inside_view"]==252){
	// 	//Если МДФ-10
	// 	$price["inside_color_price"] = $S*3065;
	// } else if($order["inside_view"]==254){
	// 	//Если Ламинат
	// 	$price["inside_color_price"] = $S*1200;
	// }

	//Проверяем, если пленка глянцевая, то берем соответствующую стоимость у прародителя
	$inside_color_glanz_tv = $modx->getTemplateVars(Array("isGlanz"), '*', $order['inside_color']);
	if ($inside_color_glanz_tv[0]['value'] == 'Матовый'){
		$inside_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $order['inside_view']);
	}else if($inside_color_glanz_tv[0]['value'] == 'Глянец'){
		$inside_color_price_tv = $modx->getTemplateVars(Array("glanz_price"), '*', $order['inside_view']);
	}
	$inside_color_price = $inside_color_price_tv[0]['value'];
	if($specialTVs[4]["value"]==""){
		$price['inside_color_price'] = ceil($S*$inside_color_price/10)*10;
	} else {
		$price['inside_color_price'] = ceil($S*$specialTVs[4]["value"]/10)*10;
	}
	if ($order['inside_view'] == 295){ //если МДФ-10,то смотрим цену зеркала
		$mirror_price_tv = $modx->getTemplateVars(Array("mirror_price"), '*', $order['inside_view']);
		$mirror_price = $mirror_price_tv[0]['value'];
		$price['inside_color_price'] = $price['inside_color_price'] + $mirror_price;
	}
}

if($order["outside_view"]==190){
	//Если покраска

	//информация о странице $inside_color
	$outside_color_page = $modx->getDocument($order["outside_color"]);

	//информация о родителе $inside_color
	$outside_color_parent = $modx->getDocument($outside_color_page["parent"]);

	//сохраняем алиас родителя $inside_color в результат
	$result["outside_color_type"] = $outside_color_parent["alias"];
	$outside_color_type_id = $outside_color_parent["id"];

	//получаем раздел покраски
	$outside_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $outside_color_type_id);
	$outside_color_price = $outside_color_price_tv[0]['value'];
	if($specialTVs[2]["value"]==""){
		$price['outside_color_price'] = $S*$outside_color_price;
	} else {
		$price['outside_color_price'] = $S*$specialTVs[2]["value"];
	}
	// if($result["outside_color_type"]=="tablicza-czvetov-ral1" || $result["outside_color_type"]=="antik"){
	// 	$price["outside_color_price"] = ($S+1.5)*700;
	// } else {
	// 	$price["outside_color_price"] = ($S+1.5)*1200;
	// }
} else {
	//Проверяем, если пленка глянцевая, то берем соответствующую стоимость у прародителя
	$outside_color_glanz_tv = $modx->getTemplateVars(Array("isGlanz"), '*', $order['outside_color']);
	if ($outside_color_glanz_tv[0]['value'] == 'Матовый'){
		$outside_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $order['outside_view']);
	}else if($outside_color_glanz_tv[0]['value'] == 'Глянец'){
		$outside_color_price_tv = $modx->getTemplateVars(Array("glanz_price"), '*', $order['outside_view']);
	}
	$outside_color_price = $outside_color_price_tv[0]['value'];

	if($specialTVs[2]["value"]==""){
		$price['outside_color_price'] = ceil($S*$outside_color_price/10)*10;
	} else {
		$price['outside_color_price'] = ceil($S*$specialTVs[2]["value"]/10)*10;
	}
}

//Узнаем цену наличников
if($order["outside_nalichnik"]==240){
	//Если МДФ 
	if ($outside_color_glanz_tv[0]['value'] == 'Матовый'){
		$nalichnik_tv = $modx->getTemplateVars(Array("nalichnik_price"), '*', $order['outside_view']);
	}else if($outside_color_glanz_tv[0]['value'] == 'Глянец'){
		$nalichnik_tv = $modx->getTemplateVars(Array("nalichnik_glanz_price"), '*', $order['outside_view']);
	}
	$nalichnik_price = $nalichnik_tv[0]['value'];
	if($specialTVs[3]["value"]==""){
		$price['nalichnik_price'] = $nalichnik_price;
	} else {
		$price['nalichnik_price'] = $specialTVs[3]["value"];
	}
	// if($order["outside_view"]==191){
	// 	//Если МДФ-6
	// 	$price["nalichnik_price"] = 2000;
	// } else if($order["outside_view"]==252){
	// 	//Если МДФ-10
	// 	$price["nalichnik_price"] = 2500;
	// }
} else {
	$price["nalichnik_price"] = 0;
}
//Окрашиваемые части

//информация о странице $main_color
$main_color_page = $modx->getDocument($order["main_color"]);

//информация о родителе $main_color
$main_color_parent = $modx->getDocument($main_color_page["parent"]);

//сохраняем id родителя $main_color в результат
$main_color_type_id = $main_color_parent["id"];

//узнаем раздел покраски
$main_color_price_tv = $modx->getTemplateVars(Array("cena_konstr"), '*', $main_color_type_id);
$main_color_price = $main_color_price_tv[0]['value'];
if($specialTVs[1]["value"]==""){
	$price['main_color_price'] = 1.5*$main_color_price;
} else {
	$price['main_color_price'] = 1.5*$specialTVs[1]["value"];
}
$total_price = 0;
foreach($price as $key => $value){
	$total_price = $total_price + $value;
}
$price["clear"] = $total_price;
$price["skidka_percent"] = "";
$price["skidka_ruble"] = "";

if($specialTVs[11]["value"]==""){
	$price["total"] = $total_price;
} else {
	if($specialTVs[10]["value"]=="В процентах"){
		$skidka = ($total_price/100)*$specialTVs[11]["value"];
		$price["total"] = $total_price - $skidka;
		$price["skidka_percent"] = $specialTVs[11]["value"];
	} else if($specialTVs[10]["value"]=="В рублях"){
		$skidka = $specialTVs[11]["value"];
		$price["total"] = $total_price - $skidka;
		$price["skidka_ruble"] = $skidka;
	}
}


print json_encode($price); 

?>