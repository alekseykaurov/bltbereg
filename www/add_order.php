<?php
require_once('manager/includes/config.inc.php');
require_once('manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('manager/includes/document.parser.class.inc.php');
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
    return mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')', $db);

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

//выполняем функцию для вставки
$res = mysql_insert('orders', $insert, $db);

//заправшиваем последний вставленный заказ
$result = mysql_query("SELECT * FROM orders ORDER BY id DESC LIMIT 1", $db);

if ($row = mysql_fetch_assoc($result)) {
	//возвращаем заказ
    $order = $row;
}

//выводим заказ
print json_encode($order);

/*Сохранение в excel*/

// Получаем информацию

// Стоимость товаров
$price = $_POST["price"];

// Номер заказа
$order_num = $insert["order_id"];

// Дата
$date = $order["date"];

// Информация о заказчике
// $name = $insert["fio"];
// $email = $insert["email"];
// $phone = $insert["phone"];
// $adress = $insert["adress"];
// $floors = $insert["floors"];
// $personal_price = $insert["personal_price"];

// Опции
// $dostavka = $insert["dostavka"];
// $montaj = $insert["montaj"];
// $demontaj = $insert["demontaj"];

$width = $insert["width_door"];
$height = $insert["height_door"];

$metallokonstr = $modx->getDocument($insert["metallokonstr"]); 
$metallokonstr_name = $metallokonstr["pagetitle"]; // Название металлоконструкции
$metallokonstr_price = $price["metallkonstr_price"]; // Стоимость металлоконструкции

$main_color = $modx->getDocument($insert["main_color"]);
$main_color_name = $main_color["pagetitle"]; // Название основного цвета
$main_color_type = $modx->getDocument($main_color["parent"]);
$main_color_type_name = $main_color_type["pagetitle"]; // Название типа основного цвета

$outside_view = $modx->getDocument($insert["outside_view"]);
$outside_view_name = $outside_view["pagetitle"]; // Название типа внешней отделки

$outside_color = $modx->getDocument($insert["outside_color"]);
$outside_color_name = $outside_color["pagetitle"]; // Название цвета внешней отделки
$outside_color_price = $price["outside_color_price"]; // Стоимость цыета внешней отделки

$outside_frezer = $modx->getDocument($insert["outside_frezer"]);
$outside_frezer_name = $outside_frezer["pagetitle"];// Название внешней фрезеровки

$outside_nalichnik = $modx->getDocument($insert["outside_nalichnik"]);
$outside_nalichnik_name = $outside_nalichnik["pagetitle"]; // Название наличника
$outside_nalichnik_price = $price["nalichnik_price"]; // Стоимость наличника

$inside_view = $modx->getDocument($insert["inside_view"]);
$inside_view_name = $inside_view["pagetitle"]; // Название типа внтренней отделки

$inside_color = $modx->getDocument($insert["inside_color"]);
$inside_color_name = $inside_color["pagetitle"]; // Название цвета внутренней отделки
$inside_color_price = $price["inside_color_price"]; // Стоимость цвета внутренней отделки

$inside_frezer = $modx->getDocument($insert["inside_frezer"]);
$inside_frezer_name = $inside_frezer["pagetitle"]; // Название фрезеровки внутренней отделки

$main_lock = $modx->getDocument($insert["main_lock"]);
$main_lock_name = $main_lock["pagetitle"]; // Название основного замка
$main_lock_price = $price["main_lock_price"]; // Стоимость основного замка

$add_lock = $modx->getDocument($insert["add_lock"]);
$add_lock_name = $add_lock["pagetitle"]; // Название дополнительного замка
$add_lock_price = $price["add_lock_price"]; // Стоимость дополнительного замка

$glazok = $modx->getDocument($insert["glazok"]);
$glazok_name = $glazok["pagetitle"]; // Название глазка
$glazok_price = $price["glazok_price"]; // Стоимость глазка

$dovodchik = $modx->getDocument($insert["dovodchik"]);
$dovodchik_name = $dovodchik["pagetitle"]; // Название доводчика
$dovodchik_price = $price["dovodchik_price"]; // Стоимость доводчика

$zadvijka = $modx->getDocument($insert["zadvijka"]);
$zadvijka_name = $zadvijka["pagetitle"]; // Название задвижки
$zadvijka_price = $price["zadvijka_price"]; // Стоимость задвижки

// Тип открывания
if($insert["door_side"]=="left"){
	$door_side_name = 'Налево';
} else if($insert["door_side"]=="right"){
	$door_side_name = 'Направо';
}

// Створка
$stvorka_name = $insert["stvorka"];

// Петли - количество
if($order["metallokonstr"]==207){
	//если Основа
	$petli_count = 2;
} else {
	//если не Основа
	$petli_count = 3;
}
// Петли - цена
$petli_price = $price["petli_price"];

// Противосъемы - количество
if($insert["metallokonstr"]==207){
	//если Основа
	$protivosem_count = 2;
} else if($insert["metallokonstr"]==208){
	//если Элит
	$protivosem_count = 3;
} else if($insert["metallokonstr"]==209){
	//если Профи
	$protivosem_count = 4;
}
// Противосъемы - цена
$protivosem_price = $price["protivosem_price"];

// Общая стоимость
$total_price = $insert["total_price"];

//Стоимость без скидки
$clear_price = $price["clear"];

//Скидка
if($price["skidka_percent"]!=""){
	$skidka_percent = $price["skidka_percent"];
	$skidka_ruble = ($clear_price/100)*$skidka_percent;
}  else if($price["skidka_ruble"]!="") {
	$skidka_ruble = $price["skidka_ruble"];
	$skidka_percent = ($skidka_ruble*100)/$clear_price;
} else {
	$skidka_percent = 0;
	$skidka_ruble = 0;
}

//изменение кодировки против кракозябр
// $name = iconv("utf-8", "windows-1251", $name);
// $email = iconv("utf-8", "windows-1251", $email);
// $phone = iconv("utf-8", "windows-1251", $phone);
// $adress = iconv("utf-8", "windows-1251", $adress);
$metallokonstr_name = iconv("utf-8", "windows-1251", $metallokonstr_name);
$main_color_name = iconv("utf-8", "windows-1251", $main_color_name);
$main_color_type_name = iconv("utf-8", "windows-1251", $main_color_type_name);
$outside_view_name = iconv("utf-8", "windows-1251", $outside_view_name);
$outside_color_name = iconv("utf-8", "windows-1251", $outside_color_name);
$outside_frezer_name = iconv("utf-8", "windows-1251", $outside_frezer_name);
$outside_nalichnik_name = iconv("utf-8", "windows-1251", $outside_nalichnik_name);
$inside_view_name = iconv("utf-8", "windows-1251", $inside_view_name);
$inside_color_name = iconv("utf-8", "windows-1251", $inside_color_name);
$inside_frezer_name = iconv("utf-8", "windows-1251", $inside_frezer_name);
$main_lock_name = iconv("utf-8", "windows-1251", $main_lock_name);
$add_lock_name = iconv("utf-8", "windows-1251", $add_lock_name);
$glazok_name = iconv("utf-8", "windows-1251", $glazok_name);
$dovodchik_name = iconv("utf-8", "windows-1251", $dovodchik_name);
$zadvijka_name = iconv("utf-8", "windows-1251", $zadvijka_name);
$stvorka_name = iconv("utf-8", "windows-1251", $stvorka_name);

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

$text .= xlsWriteLabel(5,0,"1. Тип двери");
$text .= xlsWriteLabel(6,0,"2. Левая/правая");
$text .= xlsWriteLabel(7,0,"3. Модель (Основа, Элит, Профи)");
$text .= xlsWriteLabel(8,0,"4. Высота");
$text .= xlsWriteLabel(9,0,"5. Ширина");
$text .= xlsWriteLabel(10,0,"6. Задвижка (тип)");
$text .= xlsWriteLabel(11,0,"7. Замок 1 (тип)");
$text .= xlsWriteLabel(12,0,"8. Замок 2 (тип)");
$text .= xlsWriteLabel(13,0,"9. Доводчик (тип)");
$text .= xlsWriteLabel(14,0,"10. Окраска (тип: Серия, Антик, Спец.эф.)");
$text .= xlsWriteLabel(15,0,"11. Окраска (цвет, название)");
$text .= xlsWriteLabel(16,0,"12. Наруж отделка (МДФ  6мм, МДФ 10мм, окраска)");
$text .= xlsWriteLabel(17,0,"13. Цвет наруж МДФ (если есть)");
$text .= xlsWriteLabel(18,0,"14. Тип наруж. фрезеровки");
$text .= xlsWriteLabel(19,0,"15. Внутр. Отделка (МДФ 6мм, МДФ 10мм, окраска)");
$text .= xlsWriteLabel(20,0,"16. Цвет внутр МДФ (если есть)");
$text .= xlsWriteLabel(21,0,"17. Тип внутр. Фрезер.");
$text .= xlsWriteLabel(22,0,"18. Наличники (без налич., металл, МДФ 10мм, МДФ 16мм)");
$text .= xlsWriteLabel(23,0,"19. Глазок");
// $text .= xlsWriteLabel(24,0,"20. Кол-во этажей");
// $text .= xlsWriteLabel(25,0,"21. Монтаж (1-да/0-нет)");
// $text .= xlsWriteLabel(26,0,"22. Демонтаж (1-да/0-нет)");
// $text .= xlsWriteLabel(27,0,"23. Доставка (1-да/0-нет)");
$text .= xlsWriteLabel(24,0,"20. Скидка (%)");
$text .= xlsWriteLabel(25,0,"21. Скидка, сумма");
$text .= xlsWriteLabel(26,0,"22. Стоимость изделия");
$text .= xlsWriteLabel(27,0,"23. Итого к оплате");
$text .= xlsWriteLabel(28,0,"24. Цена торга");
$text .= xlsWriteLabel(29,0,"25. Тип ручки");
$text .= xlsWriteLabel(30,0,"26. Доп. зеркало (1-да/0-нет)");
$text .= xlsWriteLabel(31,0,"27. Цвет фурнитуры замка 1 (1-золото/2-хром,никель/0 - другое)");
$text .= xlsWriteLabel(32,0,"28. Цвет фурнитуры замка 2 (1-золото/2-хром,никель/0 - другое)");
$text .= xlsWriteLabel(33,0,"29. Противопожарность (0-стандартная/1-противопожарная)");

// $text .= xlsWriteLabel(38,0,"Адрес установки (доставки)");
// $text .= xlsWriteLabel(39,0,"Заказчик (Ф.И.О.)");
// $text .= xlsWriteLabel(40,0,"Телефон заказчика");
// $text .= xlsWriteLabel(41,0,"E-mail:");

// Значения строк
$text .= xlsWriteLabel(1,1,$order_num);
$text .= xlsWriteLabel(2,1,$date);

$text .= xlsWriteLabel(5,1,$stvorka_name);
$text .= xlsWriteLabel(6,1,$door_side_name);
$text .= xlsWriteLabel(7,1,$metallokonstr_name);
$text .= xlsWriteLabel(7,2,$metallokonstr_price);
$text .= xlsWriteLabel(8,1,$height);
$text .= xlsWriteLabel(9,1,$width);
$text .= xlsWriteLabel(10,1,$zadvijka_name);
$text .= xlsWriteLabel(10,2,$zadvijka_price);
$text .= xlsWriteLabel(11,1,$main_lock_name);
$text .= xlsWriteLabel(11,2,$main_lock_price);
$text .= xlsWriteLabel(12,1,$add_lock_name);
$text .= xlsWriteLabel(12,2,$add_lock_price);
$text .= xlsWriteLabel(13,1,$dovodchik_name);
$text .= xlsWriteLabel(13,2,$dovodchik_price);
$text .= xlsWriteLabel(14,0,$main_color_type_name);
$text .= xlsWriteLabel(15,1,$main_color_name);
$text .= xlsWriteLabel(16,1,$outside_view_name);
$text .= xlsWriteLabel(17,1,$outside_color_name);
$text .= xlsWriteLabel(17,2,$outside_color_price);
$text .= xlsWriteLabel(18,1,$outside_frezer_name);
$text .= xlsWriteLabel(19,1,$inside_view_name);
$text .= xlsWriteLabel(20,1,$inside_color_name);
$text .= xlsWriteLabel(20,2,$inside_color_price);
$text .= xlsWriteLabel(21,1,$inside_frezer_name);
$text .= xlsWriteLabel(22,1,$outside_nalichnik_name);
$text .= xlsWriteLabel(22,2,$outside_nalichnik_price);
$text .= xlsWriteLabel(23,1,$glazok_name);
$text .= xlsWriteLabel(23,2,$glazok_price);
// $text .= xlsWriteLabel(24,1,$floors);
// $text .= xlsWriteLabel(25,1,$montaj);
// $text .= xlsWriteLabel(26,1,$demontaj);
// $text .= xlsWriteLabel(27,1,$dostavka);
$text .= xlsWriteLabel(24,1,$skidka_percent); //скидка %
$text .= xlsWriteLabel(25,1,$skidka_ruble); //скидка, сумма
$text .= xlsWriteLabel(26,1,$clear_price);
$text .= xlsWriteLabel(27,1,$total_price);
$text .= xlsWriteLabel(28,1,$personal_price);
$text .= xlsWriteLabel(29,1,"0"); //тип ручки
$text .= xlsWriteLabel(30,1,"0"); //доп. зеркало
$text .= xlsWriteLabel(31,1,"0"); //цвет фурнитуры замка 1
$text .= xlsWriteLabel(32,1,"0"); //цвер фурнитуры замка 2
$text .= xlsWriteLabel(33,1,"0"); //противопожарность

// $text .= xlsWriteLabel(38,1,$adress);
// $text .= xlsWriteLabel(39,1,$name);
// $text .= xlsWriteLabel(40,1,$phone);
// $text .= xlsWriteLabel(41,1,$email);

$text .= xlsEOF(); //заканчиваем собирать

file_put_contents('files/orders/order_'.$order_num.'.xls', $text); // Сохраняем файл

//закрытие соединение (рекомендуется)
mysql_close($db);

//Отправка на почту
/*
$to = "ekaterina.bidyanova@yandex.ru";
$from = "admin@blt-bereg.ru";
$boundary = md5(date('r', time()));
$headers .= "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$subject = 'Новый заказ №'.$order_num.' на сайте "Балтийский берег"';


$message = 'На сайте "Балтийский берег" был оставлен новый заказ №'.$order_num."\n";

$filetype="xls";
$filename='order_'.$order_num.'.xls';
$attachment = chunk_split(base64_encode($text));
$message .= "\r\n--$boundary\r\n"; 
$message .= "Content-Type: \"$filetype\"; name=\"$filename\"\r\n";  
$message .= "Content-Transfer-Encoding: base64\r\n"; 
$message .= "Content-Disposition: attachment; filename=\"$filename\"\r\n"; 
$message .= "\r\n";
$message .= $attachment;
$message.="
	--$boundary--";

 $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"

--$boundary
Content-Type: text/plain; charset=\"windows-1251\"
Content-Transfer-Encoding: 7bit

$message";

mail($to, $subject, $message, $headers);

*/

/*Отправка на почту*/

	//$to = "ekaterina.bidyanova@yandex.ru";
	$to = "bmihh@yandex.ru";
	$from = "admin@blt-bereg.ru";

	// тема письма
	$subject = 'Новая дверь была добавлена в корзину на сайте "Балтийский берег"';

	// текст письма
	$message = '
	<html>
	<head>
	  <title>Новая дверь была добавлена в корзину на сайте "Балтийский берег"</title>
	</head>
	<body>
	  <p style="text-align: center; font-size: 22px; font-weight: bold; padding: 5px 0px">Новая дверь была добавлена в корзину на сайте "Балтийский берег"</p>
	  <p style="">Номер проекта: '.$order["order_id"].'</p>
	  <p style="">Ссылка на проект: <a href="http://ce77747.tmweb.ru/dveri-na-zakaz/?project='.$order["order_id"].'">http://ce77747.tmweb.ru/dveri-na-zakaz/?project='.$order["order_id"].'</a></p>
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