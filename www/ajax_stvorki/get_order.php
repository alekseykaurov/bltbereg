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
print json_encode($result);
//закрытие соединение (рекомендуется)
mysql_close($db);

?>