<?php
include('db.php');

$orderId = isset($_POST["order_id"]) ? $_POST["order_id"] : null;

if($orderId==null){
	$result["status"]="error";
} else {
	$res = mysql_query("SELECT * FROM `orders` WHERE `order_id`='".$orderId."'", $db);

	if ($row = mysql_fetch_assoc($res)) {
		$result["status"] = "ok";
	    $result["order"] = $row;
	} else {
		$result["status"] = "error";
	}
}

print json_encode($result);
//закрытие соединение (рекомендуется)
mysql_close($db);

?>