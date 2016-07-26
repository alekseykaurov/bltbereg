<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$product = $_POST['special'];
$product = $_POST['product'];


$total_width_tv = $modx->getTemplateVars(Array("total_width"), '*', 1005);
$total_height_tv = $modx->getTemplateVars(Array("total_height"), '*', 1005);
$bars_type_tv = $modx->getTemplateVars(Array("bars_type"), '*', 1005);
$okrashivanie_tv = $modx->getTemplateVars(Array("okrashivanie"), '*', 1005);
$main_color_value = $modx->getTemplateVars(Array("cvet_RAL"), '*', $okrashivanie_tv[0]["value"]);
$main_color_type_tv = $modx->getTemplateVars(Array("main_color_type"), '*', 1005);
$main_lock_tv = $modx->getTemplateVars(Array("main-lock_type"), '*', 1005);

//получаем список всех цветов
$childs_color = $modx->getActiveChildren(208);
$childs_standart_color = $modx->getActiveChildren(196);
$childs_spec_color = $modx->getActiveChildren(200);

$result['child_color']["value"] = $childs_color[0]["id"];
$result['child_standart_color']["value"] = $childs_standart_color[0]["id"];
$result['child_spec_color']["value"] = $childs_spec_color[0]["id"];

foreach($childs_color as $key => $value){
	$txtTV = $modx->getTemplateVars(Array("laminat_name"), '*', $value["id"]);
	if($txtTV[0]["value"]!=""){
		$result['child_color_l']["value"] = $value["id"];
		break;
	}
}

$result["total_width"]["value"] = $total_width_tv[0]["value"];
$result["total_height"]["value"] = $total_height_tv[0]["value"];
$result["bars_type"]["value"] = $bars_type_tv[0]["value"];
$result["main_color"]["value"] = $okrashivanie_tv[0]["value"];
$result["main_color_value"]["value"] = $main_color_value[0]["value"];
$result["main_color_type"]["value"] = $main_color_type_tv[0]["value"];
$result["main_lock"]["value"] = $main_lock_tv[0]["value"];

$result["total_width"]["changable"] = true;
$result["total_height"]["changable"] = true;
$result["bars_type"]["changable"] = true;
$result["main_color"]["changable"] = true;
$result["main_color_type"]["changable"] = true;
$result["main_lock"]["changable"] = true;

print json_encode($result);

?>