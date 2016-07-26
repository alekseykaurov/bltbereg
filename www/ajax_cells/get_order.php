<?php
require_once("../manager/includes/config.inc.php");
require_once("../manager/includes/protect.inc.php");
define("MODX_API_MODE", true);
require_once("../manager/includes/document.parser.class.inc.php");
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

include('db.php');

$orderId = isset($_POST["order_id"]) ? $_POST["order_id"] : null;

if($orderId==null){
	$result["status"]="error";
} else {
	$res = mysql_query("SELECT * FROM `orders` WHERE `order_id`='".$orderId."'", $db);

	if ($row = mysql_fetch_assoc($res)) {
		$result["status"] = "ok";
		foreach($row as $key => $value){
			if($value=="0"){
				$row[$key] = null;
			}
			if($row[$key]==null){
				$row[$key]="";
			}
		}
		// if($row["main_lock"]==0){
		// 	$row["main_lock"]==null;
		// }
		// if($row["add_lock"]==0){
		// 	$row["add_lock"]==null;
		// }
	    $result["order"] = $row;
	} else {
		$result["status"] = "error";
	}
}
$main_color_info = $modx->getDocument($result["order"]["main_color"]);
$result["order"]["main_color_type"] = $main_color_info["parent"];

$childs_color = $modx->getActiveChildren(208);

$childs_frezer_6 = $modx->getActiveChildren(204);
$childs_frezer_10 = $modx->getActiveChildren(212);
$childs_frezer_10z = $modx->getActiveChildren(407);

$childs_standart_color = $modx->getActiveChildren(196);
$childs_antik_color = $modx->getActiveChildren(198);
$childs_spec_color = $modx->getActiveChildren(200);

$result["order"]['child_color'] = $childs_color[0]["id"];
$result["order"]['child_frezer_6'] = $childs_frezer_6[0]["id"];
$result["order"]['child_frezer_10'] = $childs_frezer_10[0]["id"];
$result["order"]['child_frezer_10z'] = $childs_frezer_10z[0]["id"];
$result["order"]['child_standart_color'] = $childs_standart_color[0]["id"];
$result["order"]['child_antik_color'] = $childs_antik_color[0]["id"];
$result["order"]['child_spec_color'] = $childs_spec_color[0]["id"];


print json_encode($result);
//закрытие соединение (рекомендуется)
mysql_close($db);

?>