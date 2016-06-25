<?php
require_once("../manager/includes/config.inc.php");
require_once("../manager/includes/protect.inc.php");
define("MODX_API_MODE", true);
require_once("../manager/includes/document.parser.class.inc.php");
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$delete_id = $_POST["delete_id"];

//получаем Cookie
if(isset($_COOKIE['products'])){
	$cookie = explode("|", $_COOKIE['products']);
} else {
	$cookie = false;
}

//считаем количество товаров и общую стоимость

if($cookie!=false){
	unset($cookie[$delete_id]);
}

//удаляем Cookie
setcookie("products","");
// Устанавливаем Cookie до конца сессии:
setcookie("products",implode("|", $cookie));

print json_encode($cookie);

?>