<?php
require_once("../manager/includes/config.inc.php");
require_once("../manager/includes/protect.inc.php");
define("MODX_API_MODE", true);
require_once("../manager/includes/document.parser.class.inc.php");
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

include('db.php');

//получаем Cookie
if(isset($_COOKIE['products'])){
	$cookie = explode("|", $_COOKIE['products']);
} else {
	$cookie = false;
}

//считаем количество товаров и общую стоимость
$result["products"] = 0;
$result["total_price"] = 0;
$result["txt"] = "";
if($cookie!=false){
	foreach($cookie as $key => $value){
		$item = explode("-", $value);
		$items[] = $item;
		//$items[0] - id, $items[1] - count, $items[2] - isPay
	}
	$result['txt'] .= "<tr>
<th class = 'name_item'>Наименование товара</th>
<th class = 'quantity_item'>Количество</th>
<th class = 'price_item'>Цена за шт.</th>
<th class = 'sum_price_item'>Стоимость</th>
<th class = 'delete_item'>Удалить</th>
</tr>";
	foreach($items as $key => $value){
		$result["txt"] .= "<tr>";

		if($value[2]=="yes"){ //если это мангал
			$mangal_info = $modx->getDocument($value[0]);
			$result["txt"] .= "<td class = 'name_item'><a href='/".$mangal_info["alias"]."'>Мангал \"".$mangal_info["pagetitle"]."\"</a></td>"; //имя
		} else { //если это дверь
			$res = mysql_query("SELECT * FROM orders WHERE `order_id`='".$value[0]."' LIMIT 1", $db);

			if ($row = mysql_fetch_assoc($res)) {
				if($row["door_type"]=="protivopojar"){
			    	$door_name = "<a href='/konstruktor-protivopozharnyix-dverej/?project=".$value[0]."'>Мет.дверь, 1-ств, противопожарная пр.№".$value[0]."</a>";
				} else if($row["door_type"]=="stvorki") {
					$door_name = "<a href='/slozhnyie-dveri-(testyi).html?project=".$value[0]."'>Мет.дверь, 2-ств, противопожарная пр.№".$value[0]."</a>";
				} else {
					$door_name = "<a href='/konstruktor-dverej/?project=".$value[0]."'>Мет.дверь, 1-ств, квартирная пр.№".$value[0]."</a>";
				}
			} else {
				$door_name = "Дверь №".$value[0];
			}

			$result["row"][] = $row;

			// $door_name = "<a href='/konstruktor-dverej/?project=".$value[0]."'>Мет.дверь, 1-ств, квартирная пр.№".$value[0]."</a>";

			$result["txt"] .= "<td class = 'name_item'>".$door_name."</td>"; //имя
		}
		if($value[2]=="yes"){ //если это мангал
			$result["txt"] .= "<td class = 'quantity_item'><input name='quantity' type='text' value='".$value[1]."' data-id='".$key."'> шт.</td>"; //количество
		} else {
			$result["txt"] .= "<td class = 'quantity_item'>".$value[1]." шт.</td>"; //количество
		}
		$result["txt"] .= "<td class = 'price_item'>".number_format($value[3], 0, '.', ' ')."=</td>"; //цена за штуку
		$result["txt"] .= "<td class = 'sum_price_item'>".number_format(($value[1]*$value[3]), 0, '.', ' ')."=</td>"; //цена за количество
		$result["txt"] .= "<td class = 'delete_item' data-id='".$key."'><img src='/images/delete.png' alt=''></td>"; //крестик

		$result["txt"] .= "</tr>";

		$result["products"] = $result["products"]+$value[1];
		$result["total_price"] = $result["total_price"]+($value[1]*$value[3]);
	}
	$result["total_price"] = number_format($result["total_price"], 0, '.', ' ');
} else {
	$result["txt"] .= "	<tr>
					   		<td>
					   			Корзина пустая
					   		</td>
					   	</tr>";
}




print json_encode($result);

?>