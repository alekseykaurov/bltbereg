<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$page = isset($_GET["page"]) ? $_GET["page"] : null;
$key = isset($_GET["key"]) ? $_GET["key"] : null;
$inside_view = isset($_GET["inside_view"]) ? $_GET["inside_view"] : null;

$order = isset($_GET["order"]) ? $_GET["order"] : null;

$neSmotri = array("door_side",
				  "friz",
				  "height_door",
				  "height_total",
				  "width_door",
				  "width_total",
				  "ruchka",
				  "steklopak",
				  "steklopak_height",
				  "steklopak_width",
				  "stvorka_position",
				  "stvorka_width",
				  "total_price",
				  "window_align");
foreach($order as $key => $value){
	if($value!="" && !(in_array($key, $neSmotri))){
		if($key=="inside_color"){
			if($order['inside_view']==231){
				$txtTV = $modx->getTemplateVars(Array("laminat_name"), '*', $value);
				$txt[$key]["pagetitle"] = $txtTV[0]["value"];
			} else {
				$txt[$key] = $modx->getDocument($value);
			}
		} else {
			$txt[$key] = $modx->getDocument($value);
		}
	}

}

print json_encode($txt);
?>