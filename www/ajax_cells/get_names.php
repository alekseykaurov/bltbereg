<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

// $page = isset($_GET["page"]) ? $_GET["page"] : null;
// $key = isset($_GET["key"]) ? $_GET["key"] : null;
// $inside_view = isset($_GET["inside_view"]) ? $_GET["inside_view"] : null;

// if($key=="inside_color"){
// 	if($inside_view==231){
// 		$txtTV = $modx->getTemplateVars(Array("laminat_name"), '*', $page);
// 		$txt["pagetitle"] = $txtTV[0]["value"];
// 	} else {
// 		$txt = $modx->getDocument($page);
// 	}
// } else {
// 	$txt = $modx->getDocument($page);
// }

// $order = isset($_GET["order"]) ? $_GET["order"] : null;

// $neSmotri = array();
// foreach($order as $key => $value){
// 	if($value!="" && !(in_array($key, $neSmotri))){
// 		if($key=="inside_color"){
// 			if($order['inside_view']==231){
// 				$txtTV = $modx->getTemplateVars(Array("laminat_name"), '*', $value);
// 				$txt[$key]["pagetitle"] = $txtTV[0]["value"];
// 			} else {
// 				$txt[$key] = $modx->getDocument($value);
// 			}
// 		} else {
// 			$txt[$key] = $modx->getDocument($value);
// 		}
// 	} else {
// 		$txt[$key] = "";
// 	}

// }

$main_color = isset($_POST["main_color"]) ? $_POST["main_color"] : null;
$main_color_type = isset($_POST["main_color_type"]) ? $_POST["main_color_type"] : null;

$result["main_color"] = $modx->getDocument($main_color);
$result["main_color_type"] = $modx->getDocument($main_color_type);


print json_encode($result);
?>