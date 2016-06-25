<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$main_lock = isset($_POST["main_lock"]) ? $_POST["main_lock"] : null;
$add_lock = isset($_POST["add_lock"]) ? $_POST["add_lock"] : null;

function getHtml($page, $tpl, $modx, $filter=null){

	$arSettings = Array('startID' => $page, 
                		'depth' => 1,
                		'tpl' => $tpl,
                		'orderBy' => 'id ASC');

	if($filter!=null){
		$arSettings['filter'] = $filter;
	}

	$txt = $modx->runSnippet('Ditto', $arSettings);
	return $txt;
}

$tpl = "zamok";
if($main_lock!=""){
	$main_lock_filter = "id,".$main_lock.",1";
	$result["main_lock_html"] = getHtml(217, $tpl, $modx, $main_lock_filter);
} else {
	$result["main_lock_html"] = "";
}

if($add_lock!=""){
	$add_lock_filter = "id,".$add_lock.",1";
	$result["add_lock_html"] = getHtml(217, $tpl, $modx, $add_lock_filter);
} else {
	$result["add_lock_html"] = "";
}

print json_encode($result); 

?>