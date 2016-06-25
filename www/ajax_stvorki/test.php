<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

include('db.php');

// mysql_query('INSERT INTO `orders` (`order_id`,`width_door`,`height_door`) VALUES (\'111111\',\'2000\',\'1000\')', $db);

//заправшиваем последний вставленный заказ
$result = mysql_query("SELECT * FROM orders ORDER BY id DESC LIMIT 1", $db);

if ($row = mysql_fetch_assoc($result)) {
	//возвращаем заказ
    $order = $row;
}
echo "<pre>";
print_r ($order);
echo "</pre>";

?>