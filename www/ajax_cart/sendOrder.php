<?php
require_once("../manager/includes/config.inc.php");
require_once("../manager/includes/protect.inc.php");
define("MODX_API_MODE", true);
require_once("../manager/includes/document.parser.class.inc.php");
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

include('../ajax_metalcount/db.php');

$name = isset($_POST["name"]) ? $_POST["name"] : "";
$email = isset($_POST["email"]) ? $_POST["email"] : "";
$phone = isset($_POST["phone"]) ? $_POST["phone"] : "";
$address = isset($_POST["address"]) ? $_POST["address"] : "";
$comment = isset($_POST["comment"]) ? $_POST["comment"] : "";
$delivery = isset($_POST["delivery"]) ? $_POST["delivery"] : "нет";
$etaj = isset($_POST["etaj"]) ? $_POST["etaj"] : "нет";
$lift = isset($_POST["lift"]) ? $_POST["lift"] : "нет";
$montag = isset($_POST["montaj"]) ? $_POST["montaj"] : "нет";
$demontag = isset($_POST["demontaj"]) ? $_POST["demontaj"] : "нет";

//получаем Cookie
if(isset($_COOKIE['products'])){
	$cookie = explode("|", $_COOKIE['products']);
} else {
	$cookie = false;
}

//составляем заказ
if($cookie!=false){
	$products = 0;
	$total_price = 0;
	$txt = "";
	$files = "";
	$boundary = md5(date('r', time()));
	foreach($cookie as $key => $value){
		$item = explode("-", $value);
		$items[] = $item;
		//$items[0] - id, $items[1] - count, $items[2] - isPay
	}
	$txt .= '<tr>
			<th style="background: #f4f4f4; width: 345px;">Наименование товара</th>
			<th style="background: #f4f4f4; width: 83px;">Количество</th>
			<th style="background: #f4f4f4; width: 175px;">Цена за шт.</th>
			<th style="background: #f4f4f4; width: 175px;">Стоимость</th>
			</tr>';
	foreach($items as $key => $value){
		$txt .= "<tr>";

		if($value[2]=="yes"){ //если это мангал
			$mangal_info = $modx->getDocument($value[0]);
			$txt .= "<td style='text-align: center; width: 345px;'>Мангал \"".$mangal_info["pagetitle"]."\"</td>"; //имя
		} else { //если это дверь
			$res = mysql_query("SELECT * FROM orders WHERE `order_id`='".$value[0]."' LIMIT 1", $db);

			if ($row = mysql_fetch_assoc($res)) {

				$order_id = $row["id"];
			    if($row["door_type"]=="protivopojar"){
			    	$door_name = "<a href='http://ce77747.tmweb.ru/konstruktor-protivopozharnyix-dverej/?project=".$value[0]."'>Мет.дверь, 1-ств, противопожарная пр.№".$value[0]."</a>";
				} else {
					$door_name = "<a href='http://ce77747.tmweb.ru/konstruktor-dverej/?project=".$value[0]."'>Мет.дверь, 1-ств, квартирная пр.№".$value[0]."</a>";
				}
			} else {
				$door_name = "Дверь №".$value[0];
			}

			$txt .= "<td style='text-align: center; width: 345px;'>".$door_name."</td>"; //имя

			$filetype="xls";
			$filename=$order_id.'_order_'.$value[0].'.xls';
			$text = file_get_contents('../files/orders/'.$order_id.'_order_'.$value[0].'.xls');
			$attachment = chunk_split(base64_encode($text));
			$files .= "\r\n--$boundary\r\n"; 
			$files .= "Content-Type: \"$filetype\"; name=\"$filename\"\r\n";  
			$files .= "Content-Transfer-Encoding: base64\r\n"; 
			$files .= "Content-Disposition: attachment; filename=\"$filename\"\r\n"; 
			$files .= "\r\n";
			$files .= $attachment;			
		}
		
		$txt .= "<td style='text-align: center; width: 83px;'>".$value[1]." шт.</td>"; //количество
		$txt .= "<td style='text-align: center; width: 175px;'>".$value[3]." руб.</td>"; //цена за штуку
		$txt .= "<td style='text-align: center; width: 175px;'>".($value[1]*$value[3])." руб.</td>"; //цена за количество

		$txt .= "</tr>";

		$products = $products+$value[1];
		$total_price = $total_price+($value[1]*$value[3]);

	}

	// /*Отправка на почту*/

	// $to = "ekaterina.bidyanova@yandex.ru";
	// $from = "admin@blt-bereg.ru";

	// // тема письма
	// $subject = 'Новый заказ из корзины на сайте "Балтийский берег"';

	// // текст письма
	// $message = '
	// <html>
	// <head>
	//   <title>Новый заказ из корзины на сайте "Балтийский берег"</title>
	// </head>
	// <body>
	//   <p style="text-align: center; font-size: 22px; font-weight: bold; padding: 5px 0px">Новый заказ из корзины на сайте "Балтийский берег"</p>
	//   <p style="">ФИО: '.$name.'</p>
	//   <p style="">Email: '.$email.'</p>
	//   <p style="">Телефон: '.$phone.'</p>
	//   <p style="">Адрес: '.$address.'</p>
	//   <p style="">Доставка: '.$delivery.', Монтаж: '.$montag.', Демонтаж: '.$demontag.'</p>
	//   <p style="">Этаж: '.$etaj.', Грузовой лифт: '.$lift.'</p>
	//   <p style="">Комментарий: '.$comment.'</p>
	//   <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">';
	    
	// $message .= $txt;

	// $message .= '</table>
	// <p style="font-weight: bold; font-size: 19px; text-align: right; padding-right: 30px;">Итого: '.$total_price.' руб.</p>
	// </body>
	// </html>
	// ';

	// // Для отправки HTML-письма должен быть установлен заголовок Content-type
	// $headers  = 'MIME-Version: 1.0' . "\r\n";
	// $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

	// // Дополнительные заголовки
	// $headers .= 'From: Blt-Bereg.ru <'.$from.'>' . "\r\n";
	// $headers .= 'Cc: '. $from . "\r\n";
	// $headers .= 'Bcc: '. $from . "\r\n";

	// // Отправляем

	// mail($to, $subject, $message, $headers);

$to = "ekaterina.bidyanova@yandex.ru";
// $to = "bmihh@yandex.ru";
$from = "admin@blt-bereg.ru";
$boundary = md5(date('r', time()));
$headers .= "From: Blt-Bereg.ru <" . $from . ">\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$subject = 'Новый заказ №'.$order_num.' на сайте "Балтийский берег"';


$message = '
	<html>
	<head>
	  <title>Новый заказ из корзины на сайте "Балтийский берег"</title>
	</head>
	<body>
	  <p style="text-align: center; font-size: 22px; font-weight: bold; padding: 5px 0px">Новый заказ из корзины на сайте "Балтийский берег"</p>
	  <p style="">ФИО: '.$name.'</p>
	  <p style="">Email: '.$email.'</p>
	  <p style="">Телефон: '.$phone.'</p>
	  <p style="">Адрес: '.$address.'</p>
	  <p style="">Доставка: '.$delivery.', Монтаж: '.$montag.', Демонтаж: '.$demontag.'</p>
	  <p style="">Этаж: '.$etaj.', Грузовой лифт: '.$lift.'</p>
	  <p style="">Комментарий: '.$comment.'</p>
	  <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">';
	    
	$message .= $txt;

	$message .= '</table>
	<p style="font-weight: bold; font-size: 19px; text-align: right; padding-right: 30px;">Итого: '.$total_price.' руб.</p>
	</body>
	</html>
	';

	$message .= $files;
	$message .= "
				--$boundary--";

 $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"

--$boundary
Content-Type: text/html; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit

$message";

mail($to, $subject, $message, $headers);

if($email!=""){

	$to = $email;

	$message = '
	<html>
	<head>
	  <title>Новый заказ из корзины на сайте "Балтийский берег"</title>
	</head>
	<body>
	  <p style="text-align: center; font-size: 22px; font-weight: bold; padding: 5px 0px">Новый заказ из корзины на сайте "Балтийский берег"</p>
	  <p style="">ФИО: '.$name.'</p>
	  <p style="">Email: '.$email.'</p>
	  <p style="">Телефон: '.$phone.'</p>
	  <p style="">Адрес: '.$address.'</p>
	  <p style="">Доставка: '.$delivery.', Монтаж: '.$montag.', Демонтаж: '.$demontag.'</p>
	  <p style="">Этаж: '.$etaj.', Грузовой лифт: '.$lift.'</p>
	  <p style="">Комментарий: '.$comment.'</p>
	  <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">';
	    
	$message .= $txt;

	$message .= '</table>
	<p style="font-weight: bold; font-size: 19px; text-align: right; padding-right: 30px;">Итого: '.$total_price.' руб.</p>
	</body>
	</html>
	';

	$message .= "
				--$boundary--";

	 $message="
	Content-Type: multipart/mixed; boundary=\"$boundary\"

	--$boundary
	Content-Type: text/html; charset=\"utf-8\"
	Content-Transfer-Encoding: 7bit

	$message";

	mail($to, $subject, $message, $headers);
}

	//удаляем Cookie
	setcookie("products","");

	$result["status"] = "ok";
	
} else {
	$result["status"] = "error";
	$result["text"] = "Корзина пустая";
}

print json_encode($result);

?>