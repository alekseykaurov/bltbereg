<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

include('db.php');

//функция для вставки заказа в таблицу
function mysql_insert($table, $inserts, $db) {
	//получаем значения массива
    $values = array_map('mysql_real_escape_string', array_values($inserts));
    //получаем ключи массива
    $keys = array_keys($inserts);

    //вставляем
    return mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')', $db) or die('Ошибка соединения: ' . mysql_error());

    //return $values;
}

//получаем данные для вставки
$insert = $_POST['order'];
//генерируем id заказа
$insert["order_id"] = rand(100000, 999999);


//проверка на уникальность
$result = mysql_query("SELECT * FROM orders WHERE `order_id`='".$insert["order_id"]."' LIMIT 1", $db);
//выполняется только один раз, потом можно будет изменить чтобы выполнялось пока номер не будет уникальным
if ($row = mysql_fetch_assoc($result)) {
    $insert["order_id"] = rand(100000, 999999);
}

//удаляем неиспользуемые поля для вставки в базу (без этого будет ошибочка ошибка)
$insert2 = $insert;
unset($insert2['quantity_row']);
unset($insert2['main_color_value']);

$insert2["door_type"] = "cells";

//выполняем функцию для вставки
$res = mysql_insert('orders', $insert2, $db);

//заправшиваем последний вставленный заказ
$result = mysql_query("SELECT * FROM orders ORDER BY id DESC LIMIT 1", $db);

if ($row = mysql_fetch_assoc($result)) {
	//возвращаем заказ
    $order = $row;
    $resultat["db"] = $row;
}
$resultat["insert"] = $insert;
$resultat["insert2"] = $insert2;
print json_encode($resultat);

//выводим заказ
//print json_encode($insert);

/*Сохранение в excel*/

// Получаем информацию

// Стоимость товаров
$price = $_POST["price"];

// Номер заказа
$order_num = $insert["order_id"];

// Дата
$date = date("d.m.Y H:m:i");

$width = $insert["width_total"];
$height = $insert["height_total"];
$cell_width = $insert["cell_width"];
$cell_height = $insert["cell_height"];

$main_color = $modx->getDocument($insert["main_color"]);
$main_color_name = $main_color["pagetitle"]; // Название основного цвета
$main_color_type = $modx->getDocument($main_color["parent"]);
$main_color_type_name = $main_color_type["pagetitle"]; // Название типа основного цвета
$main_color_price = $price['main_color'];

// Общая стоимость
$total_price = $insert["total_price"];

//профильная часть
if($order["bars_type"]==1 || $order["bars_type"]==3){
	$profile_count = 1;
} else {
	$profile_count = 2;
}
$profile_price = $price["profile"];

//стоимость петель
if($order["bars_type"]==3){
	$petli_count = 2;
} else if($order["bars_type"]==4){
	$petli_count = 4;
} else {
	$petli_count = 0;
}
$petli_price = $price["petli"];

//стоимость планок
if($order["bars_type"]==1 || $order["bars_type"]==2){
	$planki_count = 2;
} else {
	$planki_count = 4;
}
$planki_price = $price["planki"];

//стоимость несущ. профиля
if($order["bars_type"]==1){
	$nes_profile_count = 1;
} else if($order["bars_type"]==3 || $order["bars_type"]==4){
	$nes_profile_count = 2;
} else {
	$nes_profile_count = 0;
}
$nes_profile_price = $price["nes_profile"];

//Проуш. Нав.замок
if($order["proushina"]){
	$proushina_count = 1;
} else {
	$proushina_count = 0;
}
$proushina_price = $price["nav_zamok"];

//стоимость поворотного ролика
if($order["rolik"]){
	$rolik = 1;
} else {
	$rolik = 0;
}
if($order["bars_type"]==1 || $order["bars_type"]==3){
	$rolik_count = 1*$rolik;
} else {
	$rolik_count = 2*$rolik;
}
$rolik_price = $price["rolik"];

//изменение кодировки против кракозябр
$main_color_name = iconv("utf-8", "windows-1251", $main_color_name);
$main_color_type_name = iconv("utf-8", "windows-1251", $main_color_type_name);

// Функции для сохранения в excel

function xlsBOF() {
return pack("ssssss", 0x809, 0x8, 0x0, 0x10, 0x0, 0x0); 
}

function xlsEOF() {
return pack("ss", 0x0A, 0x00);
}

function xlsWriteNumber($Row, $Col, $Value) {
$temp = pack("sssss", 0x203, 14, $Row, $Col, 0x0);
$temp .= pack("d", $Value);
return $temp;
}

function xlsWriteLabel($Row, $Col, $Value ) {
$L = strlen($Value);
$temp = pack("ssssss", 0x204, 8 + $L, $Row, $Col, 0x0, $L);
$temp .= $Value;
return $temp;
}

$text = "";
$text .= xlsBOF(); //начинаем собирать файл
// Названия строк

$text .= xlsWriteLabel(1,0,"Номер проекта");
$text .= xlsWriteLabel(2,0,"Дата");

$text .= xlsWriteLabel(4,1,"Название");
$text .= xlsWriteLabel(4,2,"Стоимость");

$text .= xlsWriteLabel(5,0,"Тип решетки");

$text .= xlsWriteLabel(8,0,"Высота");
$text .= xlsWriteLabel(9,0,"Ширина");
$text .= xlsWriteLabel(10,0,"Высота ячеки");
$text .= xlsWriteLabel(11,0,"Ширина ячейки");

$text .= xlsWriteLabel(14,0,"Окраска (тип: Стандарт, Антик, Спец.эф.)");
$text .= xlsWriteLabel(15,0,"Окраска (цвет, название)");

$text .= xlsWriteLabel(16,0,"Профильная часть");
$text .= xlsWriteLabel(17,0,"Петли (шт.)");
$text .= xlsWriteLabel(18,0,"Планки");
$text .= xlsWriteLabel(19,0,"Несущ. профиль");
$text .= xlsWriteLabel(20,0,"Врезной замок");
$text .= xlsWriteLabel(21,0,"Профиль врез. замка");
$text .= xlsWriteLabel(22,0,"Проуш. Нав.замок");
$text .= xlsWriteLabel(23,0,"Повор.ролик");

$text .= xlsWriteLabel(29,0,"Скидка (%)");
$text .= xlsWriteLabel(30,0,"Скидка, сумма");
$text .= xlsWriteLabel(31,0,"Стоимость изделия");
$text .= xlsWriteLabel(32,0,"Итого к оплате");


// Значения строк
$text .= xlsWriteLabel(1,1,$order_num);
$text .= xlsWriteLabel(2,1,$date);

$text .= xlsWriteLabel(5,1,$order["bars_type"]);

$text .= xlsWriteLabel(8,1,$height);
$text .= xlsWriteLabel(9,1,$width);
$text .= xlsWriteLabel(10,1,$cell_height);
$text .= xlsWriteLabel(11,1,$cell_width);

$text .= xlsWriteLabel(14,1,$main_color_type_name);
$text .= xlsWriteLabel(15,1,$main_color_name);
$text .= xlsWriteLabel(15,2,$main_color_price);

$text .= xlsWriteLabel(16,1,$profile_count);
$text .= xlsWriteLabel(16,2,$profile_price);
$text .= xlsWriteLabel(17,1,$petli_count);
$text .= xlsWriteLabel(17,2,$petli_price);
$text .= xlsWriteLabel(18,1,$planki_count);
$text .= xlsWriteLabel(18,2,$planki_price);
$text .= xlsWriteLabel(19,1,$nes_profile_count);
$text .= xlsWriteLabel(19,2,$nes_profile_price);
$text .= xlsWriteLabel(20,1,"0");
$text .= xlsWriteLabel(20,2,"0");
$text .= xlsWriteLabel(21,1,"0");
$text .= xlsWriteLabel(21,2,"0");
$text .= xlsWriteLabel(22,1,$proushina_count);
$text .= xlsWriteLabel(22,2,$proushina_price);
$text .= xlsWriteLabel(23,1,$rolik_count);
$text .= xlsWriteLabel(23,2,$rolik_price);

$text .= xlsWriteLabel(29,1,"0"); //скидка %
$text .= xlsWriteLabel(30,2,"0"); //скидка, сумма
$text .= xlsWriteLabel(31,2,$total_price);
$text .= xlsWriteLabel(32,2,$total_price);

$text .= xlsEOF(); //заканчиваем собирать

file_put_contents('../files/orders/'.$order["id"].'_order_'.$order_num.'.xls', $text); // Сохраняем файл

//закрытие соединение (рекомендуется)
mysql_close($db);

/*Отправка на почту*/

// $to = "ekaterina.bidyanova@yandex.ru";
// $to = "bmihh@yandex.ru";
// $from = "admin@blt-bereg.ru";
// $boundary = md5(date('r', time()));
// $headers .= "From: " . $from . "\r\n";
// $headers .= "Reply-To: " . $from . "\r\n";
// $headers = "MIME-Version: 1.0\r\n";
// $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// $subject = 'Новая заявка №'.$order["id"].' проект №'.$order_num.' на сайте "Балтийский берег"';


// $message = 'На сайте "Балтийский берег" была оставлена новая заявка №'.$order["id"].' проект №'.$order_num."\n";

// $filetype="xls";
// $filename=$order["id"].'_order_'.$order_num.'.xls';
// $attachment = chunk_split(base64_encode($text));
// $message .= "\r\n--$boundary\r\n"; 
// $message .= "Content-Type: \"$filetype\"; name=\"$filename\"\r\n";  
// $message .= "Content-Transfer-Encoding: base64\r\n"; 
// $message .= "Content-Disposition: attachment; filename=\"$filename\"\r\n"; 
// $message .= "\r\n";
// $message .= $attachment;
// $message.="
// 	--$boundary--";

//  $message="
// Content-Type: multipart/mixed; boundary=\"$boundary\"

// --$boundary
// Content-Type: text/plain; charset=\"windows-1251\"
// Content-Transfer-Encoding: 7bit

// $message";

// mail($to, $subject, $message, $headers);


 // $to = "ekaterina.bidyanova@yandex.ru";

$to = "bmihh@yandex.ru";
	$from = "admin@blt-bereg.ru";

	// тема письма
	$subject = 'Новая решетка была добавлена в корзину на сайте "Балтийский берег"';

	// текст письма
	$message = '
	<html>
	<head>
	  <title>Новая решетка была добавлена в корзину на сайте "Балтийский берег"</title>
	</head>
	<body>
	  <p style="text-align: center; font-size: 22px; font-weight: bold; padding: 5px 0px">Новая решетка была добавлена в корзину на сайте "Балтийский берег"</p>
	  <p style="">Номер проекта: '.$order["order_id"].'</p>
	  <p style="">Ссылка на проект: <a href="http://blt-bereg.ru/razdvizhnyie-reshetki1/?project='.$order["order_id"].'">http://blt-bereg.ru/razdvizhnyie-reshetki1/?project='.$order["order_id"].'</a></p>
	</body>
	</html>
	';

	// Для отправки HTML-письма должен быть установлен заголовок Content-type
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=windows-1251' . "\r\n";

	// Дополнительные заголовки
	$headers .= 'From: Blt-Bereg.ru <'.$from.'>' . "\r\n";
	$headers .= 'Cc: '. $from . "\r\n";
	$headers .= 'Bcc: '. $from . "\r\n";

	// Отправляем

	mail($to, $subject, $message, $headers);

?>