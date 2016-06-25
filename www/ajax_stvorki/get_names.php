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

if($key=="inside_color"){
	if($inside_view==231){
		$txtTV = $modx->getTemplateVars(Array("laminat_name"), '*', $page);
		$txt["pagetitle"] = $txtTV[0]["value"];
	} else {
		$txt = $modx->getDocument($page);
	}
} else {
	$txt = $modx->getDocument($page);
}
print json_encode($txt);
?>