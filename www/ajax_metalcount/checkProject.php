<?php
require_once("../manager/includes/config.inc.php");
require_once("../manager/includes/protect.inc.php");
define("MODX_API_MODE", true);
require_once("../manager/includes/document.parser.class.inc.php");
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

include('db.php');

$projectId = isset($_POST["project_id"]) ? $_POST["project_id"] : null;

if($projectId==null){
	$result["status"]="error";
	$result["text"]="Такого заказа не существует";
} else {
	$res = mysql_query("SELECT * FROM `orders` WHERE `order_id`='".$projectId."'", $db);

	if ($row = mysql_fetch_assoc($res)) {
		$result["status"]="ok";
		// if($row["door_type"]=="protivopojar"){
		// 	$result["link"]="http://ce77747.tmweb.ru/konstruktor-protivopozharnyix-dverej/?project=".$projectId;
		// 	$result["type"]="pp";
		// }else if($row["door_type"]=="stvorki"){
		// 	$result["link"]="http://ce77747.tmweb.ru/slozhnyie-dveri-(testyi).html?project=".$projectId;
		// 	$result["type"]="st";
		// }else{
		// 	$result["link"]="http://ce77747.tmweb.ru/konstruktor-dverej/?project=".$projectId;
		// 	$result["type"]="mk";
		// }
		if($row["door_type"]== 1 || $row["door_type"] == 2 || $row["door_type"] == 3 || $row["door_type"] == 4 || $row["door_type"] == 5 || $row["door_type"] == 6 || $row["door_type"]=="protivopojar"){
			$result["link"]="http://blt-bereg.ru/konstruktor-protivopozharnyix-dverej/?project=".$projectId;
			$result["type"]="st";
		}else if($row["door_type"]== "cells"){
			$result["link"]="http://blt-bereg.ru/razdvizhnyie-reshetki1/?project=".$projectId;
			$result["type"]="cells";
		}else{
			$result["link"]="http://blt-bereg.ru/konstruktor-dverej/?project=".$projectId;
			$result["type"]="mk";
		}


	} else {
		$result["status"]="error";
		$result["text"]="Такого заказа не существует";
	}

}

print json_encode($result);

?>