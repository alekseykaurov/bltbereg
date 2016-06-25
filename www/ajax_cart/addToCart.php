<?php
require_once("../manager/includes/config.inc.php");
require_once("../manager/includes/protect.inc.php");
define("MODX_API_MODE", true);
require_once("../manager/includes/document.parser.class.inc.php");
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

//получаем POST параметры
$product_id = $_POST["product_id"];
$count = $_POST["count"];
$isPay = $_POST["isPay"];
if(isset($_POST["price"])){
	$price = $_POST["price"];
} else {
	$price = false;
}

if(!$price){
	$price_tv = $modx->getTemplateVars(Array("mangal_price"), "*", $product_id);
	$price = IntVal($price_tv[0]["value"]);
}

//получаем Cookie
if(isset($_COOKIE['products'])){
	$cookie = explode("|", $_COOKIE['products']);
} else {
	$cookie = false;
}


if($cookie!=false){ //если Cookie не пустые, обрабатываем данные в массив
	foreach($cookie as $key => $value){
		$item = explode("-", $value);
		$items[] = $item;
		//$items[0] - id, $items[1] - count, $items[2] - isPay
	}
} else { //если Cookie пустые, создаем пустой массив
	$items = Array();
}


if(count($items)!=0){ //если массив с данными не пустой
	$check = 0; //заводим переменную для проверки
	foreach ($items as $key => $value){ //проверяем наличие товара в Cookie с таким же id
		if(IntVal($value[0])==$product_id){ //если такой есть, увеличиваем его количество и переменную для проверки
			$items[$key][1] = IntVal($value[1])+$count;
			$check++;
		}
	}

	if($check==0){ //если переменная для проверки == 0, то создаем новый элемент в массиве
		$product[0] = $product_id;
		$product[1] = $count;
		$product[2] = $isPay;
		$product[3] = $price;
		$items[] = $product;
	}

} else { //если массив с данными пустой, то создаем новый элемент в массиве
	$product[0] = $product_id;
	$product[1] = $count;
	$product[2] = $isPay;
	$product[3] = $price;
	$items[] = $product;
}



//преобразуем массив в строку для хранения в Cookie
foreach ($items as $key => $value){
	$products[] = implode("-", $value);
}

//удаляем Cookie
setcookie("products","");
// Устанавливаем Cookie до конца сессии:
setcookie("products",implode("|", $products));

$product_info = $modx->getDocument($product_id);
$result["product_title"] = $product_info["pagetitle"];

print json_encode($result);

?>