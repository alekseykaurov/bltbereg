<?php
require_once("../manager/includes/config.inc.php");
require_once("../manager/includes/protect.inc.php");
define("MODX_API_MODE", true);
require_once("../manager/includes/document.parser.class.inc.php");
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$change_id = $_POST["change_id"];
$count = $_POST["count"];

//получаем Cookie
if(isset($_COOKIE['products'])){
	$cookie = explode("|", $_COOKIE['products']);
} else {
	$cookie = false;
}

if($cookie!=false){
	$item = explode("-", $cookie[$change_id]);
	$item[1] = $count;
	$cookie[$change_id] = implode("-", $item);
}

//удаляем Cookie
setcookie("products","");
// Устанавливаем Cookie до конца сессии:
setcookie("products",implode("|", $cookie));

print json_encode($cookie);

?>