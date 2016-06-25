<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

//получаем информацию
$main_color = isset($_POST['main_color']) ? IntVal($_POST['main_color']) : "";
$outside_view = isset($_POST['outside_view']) ? IntVal($_POST['outside_view']) : "";
$outside_color = isset($_POST['outside_color']) ? IntVal($_POST['outside_color']) : "";
$outside_frezer = isset($_POST['outside_frezer']) ? IntVal($_POST['outside_frezer']) : ""; 
$inside_view = isset($_POST['inside_view']) ? IntVal($_POST['inside_view']) : ""; 
$inside_color = isset($_POST['inside_color']) ? IntVal($_POST['inside_color']) : ""; 
$inside_frezer = isset($_POST['inside_frezer']) ? IntVal($_POST['inside_frezer']) : "";
$main_lock = isset($_POST['main_lock']) ? IntVal($_POST['main_lock']) : "";
$add_lock = isset($_POST['add_lock']) ? IntVal($_POST['add_lock']) : "";
$glazok = isset($_POST['glazok']) ? IntVal($_POST['glazok']) : "";
$zadvijka = isset($_POST['zadvijka']) ? IntVal($_POST['zadvijka']) : "";
$ruchka = isset($_POST['ruchka']) ? IntVal($_POST['ruchka']) : "";

//Shade

$inside_shade = "Dark";
$outside_shade = "Dark";
//------- MAIN COLOR --------

//информация о странице $main_color
$main_color_page = $modx->getDocument($main_color);

//Получаем оба параметра цвета
$main_color_ral = $modx->getTemplateVars(Array("cvet_RAL"), '*', $main_color_page["id"]);
$main_color_antic = $modx->getTemplateVars(Array("option_image"), '*', $main_color_page["id"]);

//Проверяем кто пустой и определяем тип цвета
if ($main_color_ral[0]["value"] != ""){
	$result["main_color_type"] = "tablicza-czvetov-ral1";
	$result["main_color_color"] = $main_color_ral[0]["value"];
}else if($main_color_antic[0]["value"] != ""){
	$result["main_color_type"] = "antik";
	$result["main_color_color"] = $main_color_antic[0]["value"];
}
$main_color_tv = $modx->getTemplateVars(Array("color"), '*', $main_color_page['id']);
$result["main_color_shade"] = $main_color_tv[0]["value"];

//------- INSIDE COLOR --------

//информация о странице $inside_color
$inside_color_page = $modx->getDocument($inside_color);

//информация о родителе $inside_color
$inside_color_parent = $modx->getDocument($inside_color_page["parent"]);

//сохраняем алиас родителя $inside_color в результат
$result["inside_color_type"] = $inside_color_parent["alias"];
//получаем цвета
if ($result["inside_color_type"] != 'czvet'){
	$inside_color_ral = $modx->getTemplateVars(Array("cvet_RAL"), '*', $inside_color_page["id"]);
}
$inside_color_antic = $modx->getTemplateVars(Array("option_image"), '*', $inside_color_page["id"]);
//получаем цвет или картинку $inside_color
if ($result["inside_color_type"] == 'czvet'){
	$result["inside_color_color"] = $inside_color_antic[0]["value"];
}else{
	if ($inside_color_ral[0]["value"] != ""){
		$result["inside_color_type"] = "tablicza-czvetov-ral1";
		$result["inside_color_color"] = $inside_color_ral[0]["value"];
	}else if($inside_color_ral[0]["value"] != ""){
		$result["inside_color_type"] = "antik";
		$result["inside_color_color"] = $inside_color_antic[0]["value"];
	}
}
//Проверяем оттенок цвета
$inside_color_tv = $modx->getTemplateVars(Array("color"), '*', $inside_color);
$result["inside_shade"] = $inside_color_tv[0]["value"];

//------- OUTSIDE COLOR --------

//информация о странице $outside_color
$outside_color_page = $modx->getDocument($outside_color);

//информация о родителе $outside_color
$outside_color_parent = $modx->getDocument($outside_color_page["parent"]);

//сохраняем алиас родителя $outside_color в результат
$result["outside_color_type"] = $outside_color_parent["alias"];
//получаем цвета
if ($result["outside_color_type"] != 'czvet'){
	$outside_color_ral = $modx->getTemplateVars(Array("cvet_RAL"), '*', $outside_color_page["id"]);
}
$outside_color_antic = $modx->getTemplateVars(Array("option_image"), '*', $outside_color_page["id"]);
//получаем цвет или картинку $outside_color
if ($result["outside_color_type"] == 'czvet'){
	$result["outside_color_color"] = $outside_color_antic[0]["value"];
}else{
	if ($inside_color_ral[0]["value"] != ""){
		$result["outside_color_type"] = "tablicza-czvetov-ral1";
		$result["outside_color_color"] = $outside_color_ral[0]["value"];
	}else if($outside_color_ral[0]["value"] != ""){
		$result["outside_color_type"] = "antik";
		$result["outside_color_color"] = $outside_color_antic[0]["value"];
	}
}
//проверяем оттенок цвета
$outside_color_tv = $modx->getTemplateVars(Array("color"), '*', $outside_color);
$result["outside_shade"] = $outside_color_tv[0]["value"];

//------- INSIDE FREZER --------

if($inside_view==202 || $inside_view == 210 || $inside_view == 215){

	$inside_color_tv = $modx->getTemplateVars(Array("color"), '*', $inside_color);
	if($inside_color_tv[0]["value"]=="Dark"){
		$inside_frezer_picture = $modx->getTemplateVars(Array("frezerovka_image_dark"), '*', $inside_frezer);
		$inside_shade = "Dark";
	} else if($inside_color_tv[0]["value"]=="Light"){
		$inside_frezer_picture = $modx->getTemplateVars(Array("frezerovka_image_light"), '*', $inside_frezer);
		$inside_shade = "Light";
	}
	if ($inside_view == 215){
		$result['inside_mirror'] = 'true';
	}else{
		$result['inside_mirror'] = 'false';
	}
	// $inside_mirror_tv = $modx->getTemplateVars(Array("isMirror"), '*', $inside_frezer);
	// $result["inside_mirror"] = $inside_mirror_tv[0]['value'];
	$result["inside_shade"] = $inside_shade;
	$result["inside_frezer"] = $inside_frezer_picture[0]["value"];

} else {
	$result["inside_frezer"] = "";
}

//------- OUTSIDE FREZER --------

if($outside_view==202 || $outside_view == 210 || $outside_view == 215){

	$outside_color_tv = $modx->getTemplateVars(Array("color"), '*', $outside_color);
	if($outside_color_tv[0]["value"]=="Dark"){
		$outside_frezer_picture = $modx->getTemplateVars(Array("frezerovka_image_dark"), '*', $outside_frezer);
		$outside_shade = "Dark";
	} else if($outside_color_tv[0]["value"]=="Light"){
		$outside_frezer_picture = $modx->getTemplateVars(Array("frezerovka_image_light"), '*', $outside_frezer);
		$outside_shade = "Light";
	}
	$outside_mirror_tv = $modx->getTemplateVars(Array("isMirror"), '*', $outside_frezer);
	$result["outside_mirror"] = $outside_mirror_tv[0]['value'];
	$result["outside_frezer"] = $outside_frezer_picture[0]["value"];
	$result["outside_shade"] = $outside_shade;

} else {
	$result["outside_frezer"] = "";
}
//------MAIN LOCK --------

if($main_lock!=""){
	$main_lock_picture = $modx->getTemplateVars(Array("zamok_image"), '*', $main_lock);
	$main_lock_outside_picture = $modx->getTemplateVars(Array("zamok_image_syst"), '*', $main_lock);
	$furniture_color = $modx->getTemplateVars(Array("zamok_color"), '*', $main_lock);
	$main_lock_type = $modx->getTemplateVars(Array("zamok_type"), '*', $main_lock);
	$main_lock_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $main_lock);
	$main_lock_ruchka_image = $modx->getTemplateVars(Array("ruchka_image"), '*', $main_lock);
	$main_lock_inside_bottom = $modx->getTemplateVars(Array("image_zamok_inside"), '*', $main_lock);
	$main_lock_inside_top = $modx->getTemplateVars(Array("image_zamok_syst_inside"), '*', $main_lock);
	$main_lock_isCloser = $modx->getTemplateVars(Array("is_closer"), '*', $main_lock);
	$main_lock_isBarier = $modx->getTemplateVars(Array("isBarier"), '*', $main_lock);

	if ($main_lock_type[0]["value"] == '2-сист'){
		$result['is_main_lock_syst'] = true;
	}else{
		$result['is_main_lock_syst'] = false;
	}
	if($main_lock_isBarier[0]['value']=="'true'"){
		$result["is_main_lock_barier"] = true;
	} else {
		$result["is_main_lock_barier"] = false;
	}
	$result["main_lock"] = $main_lock_picture[0]["value"];
	$result["main_lock_outside_picture"] = $main_lock_outside_picture[0]["value"];
	$result["main_lock_type"] = $main_lock_type[0]["value"];
	$result["main_lock_ruchka"] = $main_lock_ruchka[0]["value"];
	$result["main_lock_ruchka_image"] = $main_lock_ruchka_image[0]["value"];
	$result["main_lock_inside_bottom"] = $main_lock_inside_bottom[0]["value"];
	$result["main_lock_inside_top"] = $main_lock_inside_top[0]["value"];
	$result["furniture_color"] = $furniture_color[0]["value"];
	$result["main_lock_isCloser"] = $main_lock_isCloser[0]["value"];
} else {
	$result["main_lock"] = "";
	$result["main_lock_outside_picture"] = "";
	$result["main_lock_type"] = "";
	$result["main_lock_ruchka"] = "";
	$result["main_lock_ruchka_image"] = "";
	$result["main_lock_inside_bottom"] = "";
	$result["main_lock_inside_top"] = "";
	$result["furniture_color"] = "";
	$result["main_lock_isCloser"] = "";
	$result['is_main_lock_syst'] = false;
	$result["is_main_lock_barier"] = false;
}

//-----ADD LOCK ----------
if($add_lock!=""){
	$add_lock_picture = $modx->getTemplateVars(Array("zamok_image"), '*', $add_lock);
	$add_lock_type = $modx->getTemplateVars(Array("zamok_type"), '*', $add_lock);
	$add_lock_color = $modx->getTemplateVars(Array("zamok_color"), '*', $add_lock);
	$add_lock_image = $modx->getTemplateVars(Array("option_image"), '*', $add_lock);
	$add_image_zamok_syst_inside = $modx->getTemplateVars(Array("image_zamok_syst_inside"), '*', $add_lock);
	$add_image_zamok_inside = $modx->getTemplateVars(Array("image_zamok_inside"), '*', $add_lock);
	$add_lock_isBarier = $modx->getTemplateVars(Array("isBarier"), '*', $add_lock);

	if($add_lock_isBarier[0]['value']=="'true'"){
		$result["is_add_lock_barier"] = true;
	} else {
		$result["is_add_lock_barier"] = false;
	}
	$result['add_lock_color'] = $add_lock_color[0]["value"];
	$result["add_lock"] = $add_lock_picture[0]["value"];
	$result["add_lock_type"] = $add_lock_type[0]["value"];
	$result["add_lock_image"] = $add_lock_image[0]["value"];
	$result["add_image_zamok_syst_inside"] = $add_image_zamok_syst_inside[0]["value"];
	$result["add_image_zamok_inside"] = $add_image_zamok_inside[0]["value"];
} else {
	$result["add_lock"] = "";
	$result["add_lock_type"] = "";
	$result["add_lock_image"] = "";
	$result['add_lock_color'] = "";
	$result["add_image_zamok_syst_inside"] = "";
	$result["add_image_zamok_inside"] = "";
	$result["is_add_lock_barier"] = false;
}

//-----GLAZOK----------
if($glazok!=""){
	$glazok_picture = $modx->getTemplateVars(Array("option_image"), '*', $glazok);
	$result["glazok"] = $glazok_picture[0]["value"];
} else {
	$result["glazok"] = "";
}

//----ZADVIJKA----------
if($zadvijka!=""){
	$zadvijka_picture = $modx->getTemplateVars(Array("zadvijka_image"), '*', $zadvijka);
	if($zadvijka_picture[0]["value"]!=""){
		$result["zadvijka"] = $zadvijka_picture[0]["value"];
	} else {
		$result["zadvijka"] = "";
	}
} else {
	$result["zadvijka"] = "";
}

print json_encode($result);

?>