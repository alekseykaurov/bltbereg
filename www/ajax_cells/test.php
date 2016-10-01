<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

include('db.php');

$result = mysql_query("SELECT * FROM orders ORDER BY id DESC LIMIT 50", $db);

while ($row = mysql_fetch_assoc($result)) {

    $order[] = $row;
}

echo "<pre>";
print_r($order);
echo "</pre>";

?>