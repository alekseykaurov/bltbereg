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
$result["demontag"] = false;
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
	$pp_type_name = '';
	foreach($items as $key => $value){
		$result["txt"] .= "<tr>";

		if($value[2]=="yes"){ //если это мангал
			$mangal_info = $modx->getDocument($value[0]);
			$result["txt"] .= "<td class = 'name_item'><a href='/".$mangal_info["alias"]."'>Мангал \"".$mangal_info["pagetitle"]."\"</a></td>"; //имя
		} else { //если это дверь
			$res = mysql_query("SELECT * FROM orders WHERE `order_id`='".$value[0]."' LIMIT 1", $db);

			if ($row = mysql_fetch_assoc($res)) {
				if ($row["pp_type"] == 995){
					$pp_type_name = 'Техническая';
				}else if ($row["pp_type"] == 996){
					$pp_type_name = 'EI 60';
				}else if ($row["pp_type"] == 997){
					$pp_type_name = 'EIS 60';
				}
				if($row["door_type"]== 1 || $row["door_type"]=="protivopojar"){
			    	$door_name = "<a href='/konstruktor-protivopozharnyix-dverej/?project=".$value[0]."'>Дверь п/п 1-створ. ".$pp_type_name.". Пр.№".$value[0]."</a>";
			    	$result["demontag"] = true;
				} else if ($row["door_type"] == 2 || $row["door_type"] == 3) {
					$door_name = "<a href='/konstruktor-protivopozharnyix-dverej/?project=".$value[0]."'>Дверь п/п 1-створ. с глух. частью. ".$pp_type_name.". Пр.№".$value[0]."</a>";
					$result["demontag"] = true;
				} else if($row["door_type"] == 4){
					$door_name = "<a href='/konstruktor-protivopozharnyix-dverej/?project=".$value[0]."'>Дверь п/п 2-створ. ".$pp_type_name.". Пр.№".$value[0]."</a>";
					$result["demontag"] = true;
				} else if($row["door_type"] == 5){
					$door_name = "<a href='/konstruktor-protivopozharnyix-dverej/?project=".$value[0]."'>Дверь п/п 1-створ. с 2-мя глух. частями. ".$pp_type_name.". Пр.№".$value[0]."</a>";
					$result["demontag"] = true;
				} else if($row["door_type"] == 6){
					$door_name = "<a href='/konstruktor-protivopozharnyix-dverej/?project=".$value[0]."'>Дверь п/п 2-створ. с глух. частью. ".$pp_type_name.". Пр.№".$value[0]."</a>";
					$result["demontag"] = true;
				} else if($row["door_type"] == "cells"){
					$door_name = "<a href='/razdvizhnyie-reshetki1/?project=".$value[0]."'>Решетка раздв. (тип.".$row["bars_type"].") В".$row["height_total"]."хШ".$row["width_total"]." пр.№".$value[0]."</a>";
				}else {
					$door_name = "<a href='/konstruktor-dverej/?project=".$value[0]."'>Мет.дверь, 1-ств, квартирная пр.№".$value[0]."</a>";
					$result["demontag"] = true;
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