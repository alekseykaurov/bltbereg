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
unset($insert2['fio']);
unset($insert2['email']);
unset($insert2['phone']);
unset($insert2['adress']);
unset($insert2['floors']);
unset($insert2['lift']);
unset($insert2['dostavka']);
unset($insert2['montaj']);
unset($insert2['demontaj']);
unset($insert2['personal_price']);
unset($insert2['comment']);
if(!isset($insert2["steklopak"]) || $insert2["steklopak"]==""){
	unset($insert2['window_align']);
}
$insert2["door_type"] = "protivopojar";

//выполняем функцию для вставки
$res = mysql_insert('orders', $insert2, $db);

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
$date = date("d.m.Y H:m:i");

// Информация о заказчике
// $name = $insert["fio"];
// $email = $insert["email"];
// $phone = $insert["phone"];
// $adress = $insert["adress"];
// $floors = $insert["floors"];
// $personal_price = $insert["personal_price"];
// $comment = $insert["comment"];

// Опции
// $lift = $insert["lift"];
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
$main_color_price = $price['main_color_price'];

$outside_view = $modx->getDocument($insert["outside_view"]);
$outside_view_name = $outside_view["pagetitle"]; // Название типа внешней отделки
if ($insert['outside_view'] != 195){
	$outside_color = $modx->getDocument($insert["outside_color"]);
	$outside_color_name = $outside_color["pagetitle"]; // Название цвета внешней отделки
	$outside_color_price = $price["outside_color_price"]; // Стоимость цыета внешней отделки	
}else{
	$outside_color_name = ''; // Название цвета внешней отделки
	$outside_color_price = ''; // Стоимость цыета внешней отделки
	$main_color_price = $main_color_price + $price["outside_color_price"];
}

if($insert["outside_frezer"]!=null && $insert["outside_frezer"]!=""){
	$outside_frezer = $modx->getDocument($insert["outside_frezer"]);
	$outside_frezer_name = $outside_frezer["pagetitle"];// Название внешней фрезеровки
} else {
	$outside_frezer_name = "";
}

$outside_nalichnik = $modx->getDocument($insert["outside_nalichnik"]);
$outside_nalichnik_name = $outside_nalichnik["pagetitle"]; // Название наличника
$outside_nalichnik_price = $price["nalichnik_price"]; // Стоимость наличника

$inside_view = $modx->getDocument($insert["inside_view"]);
$inside_view_name = $inside_view["pagetitle"]; // Название типа внтренней отделки
if($insert["inside_view"]==215){ // Вычисляем доп. зеркало
	$dop_zerkalo = 1;
} else {
	$dop_zerkalo = 0;
}
if ($insert['inside_view'] != 195){
	$inside_color = $modx->getDocument($insert["inside_color"]);
	$inside_color_name = $inside_color["pagetitle"]; // Название цвета внутренней отделки
	$inside_color_price = $price["inside_color_price"]; // Стоимость цвета внутренней отделки
}else{
	$inside_color_name = ''; // Название цвета внутренней отделки
	$inside_color_price = ''; // Стоимость цвета внутренней отделки
	$main_color_price = $main_color_price + $price["inside_color_price"];
}

if($insert["inside_frezer"]!=null && $insert["inside_frezer"]!=""){
	$inside_frezer = $modx->getDocument($insert["inside_frezer"]);
	$inside_frezer_name = $inside_frezer["pagetitle"]; // Название фрезеровки внутренней отделки
} else {
	$inside_frezer_name = ""; // Название фрезеровки внутренней отделки
}

if($insert["main_lock"]!=null && $insert["main_lock"]!="" && $insert["main_lock"]!=0){
	$main_lock = $modx->getDocument($insert["main_lock"]);
	$main_lock_name = $main_lock["pagetitle"]; // Название основного замка
	$main_lock_price = $price["main_lock_price"]; // Стоимость основного замка
	$ruchka_tv = $modx->getTemplateVars(Array("ruchka"), '*', $insert["main_lock"]); // Узнаем тип ручки
	if($ruchka_tv[0]["value"]=="Без ручки"){
		$ruchka_type = "Кнопка";
	} else {
		$ruchka_type = "";
	}
	$main_lock_color_tv = $modx->getTemplateVars(Array("zamok_color"), '*', $insert["main_lock"]); // Узнаем цвет основного замка
	$main_lock_color = $main_lock_color_tv[0]["value"];
	
} else {
	$main_lock_name = "";
	$main_lock_price = 0;
	$ruchka_type = "Кнопка";
	$main_lock_color = "";
}

$ruchka_price = $price['ruchka_price'];

if($insert["add_lock"]!=null && $insert["add_lock"]!="" && $insert["add_lock"]!=0){
	$add_lock = $modx->getDocument($insert["add_lock"]);
	$add_lock_name = $add_lock["pagetitle"]; // Название дополнительного замка
	$add_lock_price = $price["add_lock_price"]; // Стоимость дополнительного замка
	$add_lock_color_tv = $modx->getTemplateVars(Array("zamok_color"), '*', $insert["add_lock"]); // Узнаем цвет дополнительного замка
	$add_lock_color = $add_lock_color_tv[0]["value"];
	
} else {
	$add_lock_name = ""; // Название дополнительного замка
	$add_lock_price = 0; // Стоимость дополнительного замка
	$add_lock_color = "";
}

if($insert["glazok"]!=null && $insert["glazok"]!="" && $insert["glazok"]!=0){
	$glazok = $modx->getDocument($insert["glazok"]);
	$glazok_name = $glazok["pagetitle"]; // Название глазка
	$glazok_price = $price["glazok_price"]; // Стоимость глазка
} else {
	$glazok_name = "";
	$glazok_price = 0;
}

if($insert["dovodchik"]!=null && $insert["dovodchik"]!="" && $insert["dovodchik"]!=0){
	$dovodchik = $modx->getDocument($insert["dovodchik"]);
	$dovodchik_name = $dovodchik["pagetitle"]; // Название доводчика
	$dovodchik_price = $price["dovodchik_price"]; // Стоимость доводчика
} else {
	$dovodchik_name = "";
	$dovodchik_price = 0;
}

if($insert["zadvijka"]!=null && $insert["zadvijka"]!="" && $insert["zadvijka"]!=0){
	$zadvijka = $modx->getDocument($insert["zadvijka"]);
	$zadvijka_name = $zadvijka["pagetitle"]; // Название задвижки
	$zadvijka_price = $price["zadvijka_price"]; // Стоимость задвижки
} else {
	$zadvijka_name = "";
	$zadvijka_price = 0;
}

// Тип открывания
if($insert["door_side"]=="left"){
	$door_side_name = 'Налево';
} else if($insert["door_side"]=="right"){
	$door_side_name = 'Направо';
}

// Створка
$stvorka_name = $insert["stvorka"];

// Петли - количество
// if($order["metallokonstr"]==191){
// 	//если Основа
// 	$petli_count = 2;
// 	$uplotnitel_count = 1;
// } else {
// 	//если не Основа
// 	$petli_count = 3;
// 	$uplotnitel_count = 2;
// }
// Петли - цена
$uplotnitel_count = 1;
$petli_count = 3;
$petli_price = $price["petli_price"];
$uplotnitel_price = $price["uplotnitel_price"];

//Стеклопакет
if ($insert['steklopak'] != 'other'){
	$steklopak_name_tv = $modx->getDocument($insert["steklopak"]);
	$steklopak_name = $steklopak_name_tv['pagetitle'];
}else{
	$steklopak_name = $insert['steklopak_height'].'*'.$insert['steklopak_width'];
}
$steklopak_price = $price['steklopak_price'];

if ($insert['window_align'] == 'top_left'){
	$steklopak_position = 'Слева сверху';
}else if($insert['window_align'] == 'top_center'){
	$steklopak_position = 'Сверху центр';
}else if($insert['window_align'] == 'top_right'){
	$steklopak_position = 'Сверху справа';
}else if($insert['window_align'] == 'middle_left'){
	$steklopak_position = 'Посередине слева';
}else if($insert['window_align'] == 'middle_center'){
	$steklopak_position = 'Посередине центр';
}else if($insert['window_align'] == 'middle_right'){
	$steklopak_position = 'Посередине справа';
}else if($insert['window_align'] == 'bottom_left'){
	$steklopak_position = 'Снизу слева';
}else if($insert['window_align'] == 'bottom_center'){
	$steklopak_position = 'Снизу центр';
}else if($insert['window_align'] == 'bottom_right'){
	$steklopak_position = 'Снизу справа';
}

//антипаника
if($insert['ruchka']=='true'){
	$ruchka_type = "Антипаника";
}
// Противосъемы - количество
// if($insert["metallokonstr"]==191){
// 	//если Основа
// 	$protivosem_count = 2;
// } else if($insert["metallokonstr"]==192){
// 	//если Элит
// 	$protivosem_count = 3;
// } else if($insert["metallokonstr"]==193){
// 	//если Профи
// 	$protivosem_count = 4;
// }
$protivosem_count = 0;
// Противосъемы - цена
$protivosem_price = $price["protivosem_price"];

// Общая стоимость
if($personal_price!=null && $personal_price!=""){
	$total_price = $insert["total_price"]-$personal_price;
} else {
	$total_price = $insert["total_price"];
}

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
// $comment = iconv("utf-8", "windows-1251", $comment);
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
// $ruchka_type = iconv("utf-8", "windows-1251", $ruchka_type);
$main_lock_color = iconv("utf-8", "windows-1251", $main_lock_color);
$add_lock_name = iconv("utf-8", "windows-1251", $add_lock_name);
$add_lock_color = iconv("utf-8", "windows-1251", $add_lock_color);
$glazok_name = iconv("utf-8", "windows-1251", $glazok_name);
$dovodchik_name = iconv("utf-8", "windows-1251", $dovodchik_name);
$zadvijka_name = iconv("utf-8", "windows-1251", $zadvijka_name);
$stvorka_name = iconv("utf-8", "windows-1251", $stvorka_name);
// $steklopak_position = iconv("utf-8", "windows-1251", $steklopak_position);

if ($main_lock_color == 'Золото'){
	$main_lock_color = 1;
}else if($main_lock_color == 'Хром'){
	$main_lock_color = 2;
}else if($main_lock_color == 'Другое'){
	$main_lock_color = 0;
}

if ($add_lock_color == 'Золото'){
	$add_lock_color = 1;
}else if($add_lock_color == 'Хром'){
	$add_lock_color = 2;
}else if($add_lock_color == 'Другое'){
	$add_lock_color = 0;
}

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

$text .= xlsWriteLabel(5,0,"Тип двери");
$text .= xlsWriteLabel(6,0,"Левая/правая");
$text .= xlsWriteLabel(7,0,"Модель (Основа, Элит, Профи)");
$text .= xlsWriteLabel(8,0,"Высота");
$text .= xlsWriteLabel(9,0,"Ширина");
$text .= xlsWriteLabel(10,0,"Задвижка (тип)");
$text .= xlsWriteLabel(11,0,"Замок 1 (тип)");
$text .= xlsWriteLabel(12,0,"Замок 2 (тип)");
$text .= xlsWriteLabel(13,0,"Доводчик (тип)");
$text .= xlsWriteLabel(14,0,"Окраска (тип: Серия, Антик, Спец.эф.)");
$text .= xlsWriteLabel(15,0,"Окраска (цвет, название)");
$text .= xlsWriteLabel(16,0,"Наруж отделка (МДФ  6мм, МДФ 10мм, окраска)");
$text .= xlsWriteLabel(17,0,"Цвет наруж МДФ (если есть)");
$text .= xlsWriteLabel(18,0,"Тип наруж. фрезеровки");
$text .= xlsWriteLabel(19,0,"Внутр. Отделка (МДФ 6мм, МДФ 10мм, окраска)");
$text .= xlsWriteLabel(20,0,"Цвет внутр МДФ (если есть)");
$text .= xlsWriteLabel(21,0,"Тип внутр. Фрезер.");
$text .= xlsWriteLabel(22,0,"Наличники (без налич., металл, МДФ 10мм, МДФ 16мм)");
$text .= xlsWriteLabel(23,0,"Глазок");
// $text .= xlsWriteLabel(24,0,"Кол-во этажей");
// $text .= xlsWriteLabel(25,0,"Грузовой лифт (1-да/0-нет)");
// $text .= xlsWriteLabel(26,0,"Монтаж (1-да/0-нет)");
// $text .= xlsWriteLabel(27,0,"Демонтаж (1-да/0-нет)");
// $text .= xlsWriteLabel(28,0,"Доставка (1-да/0-нет)");
$text .= xlsWriteLabel(29,0,"Скидка (%)");
$text .= xlsWriteLabel(30,0,"Скидка, сумма");
$text .= xlsWriteLabel(31,0,"Стоимость изделия");
$text .= xlsWriteLabel(32,0,"Итого к оплате");
$text .= xlsWriteLabel(33,0,"Цена торга");
$text .= xlsWriteLabel(34,0,"Тип ручки");
$text .= xlsWriteLabel(35,0,"Доп. зеркало (1-да/0-нет)");
$text .= xlsWriteLabel(36,0,"Цвет фурнитуры замка 1 (1-золото/2-хром,никель/0 - другое)");
$text .= xlsWriteLabel(37,0,"Цвет фурнитуры замка 2 (1-золото/2-хром,никель/0 - другое)");
$text .= xlsWriteLabel(38,0,"Противопожарность (0-стандартная/1-противопожарная)");
$text .= xlsWriteLabel(39,0,"Напр.входа (для типов 2-5)");
$text .= xlsWriteLabel(40,0,"Высота фриза");
$text .= xlsWriteLabel(41,0,"Ширина бок. части");

// $text .= xlsWriteLabel(42,0,"Адрес установки (доставки)");
// $text .= xlsWriteLabel(43,0,"Заказчик (Ф.И.О.)");
// $text .= xlsWriteLabel(44,0,"Телефон заказчика");
// $text .= xlsWriteLabel(45,0,"E-mail");
// $text .= xlsWriteLabel(46,0,"Пожелания");
$text .= xlsWriteLabel(47,0,"Противосъемы");
$text .= xlsWriteLabel(48,0,"Петли");
$text .= xlsWriteLabel(49,0,"Уплотнитель");
$text .= xlsWriteLabel(50,0,"Стеклопакет");
$text .= xlsWriteLabel(51,0,"Положение стеклопакета");
// $text .= xlsWriteLabel(52,0,"Антипаника (1-да/0-нет)");



// Значения строк
$text .= xlsWriteLabel(1,1,$order_num);
$text .= xlsWriteLabel(2,1,$date);

$text .= xlsWriteLabel(5,1,'1');
$text .= xlsWriteLabel(5,2,'0');
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
$text .= xlsWriteLabel(14,1,$main_color_type_name);
$text .= xlsWriteLabel(15,1,$main_color_name);
$text .= xlsWriteLabel(15,2,$main_color_price);
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
// $text .= xlsWriteLabel(25,1,$lift);
// $text .= xlsWriteLabel(26,1,$montaj);
// $text .= xlsWriteLabel(27,1,$demontaj);
// $text .= xlsWriteLabel(28,1,$dostavka);
$text .= xlsWriteLabel(29,1,$skidka_percent); //скидка %
$text .= xlsWriteLabel(30,2,$skidka_ruble); //скидка, сумма
$text .= xlsWriteLabel(31,2,$clear_price);
$text .= xlsWriteLabel(32,2,$clear_price);
$text .= xlsWriteLabel(33,2,$total_price);
$text .= xlsWriteLabel(34,1,$ruchka_type); //тип ручки
$text .= xlsWriteLabel(34,2,$ruchka_price); //Стоимость ручки
$text .= xlsWriteLabel(35,1,$dop_zerkalo); //доп. зеркало
$text .= xlsWriteLabel(36,1,$main_lock_color); //цвет фурнитуры замка 1
$text .= xlsWriteLabel(37,1,$add_lock_color); //цвер фурнитуры замка 2
$text .= xlsWriteLabel(38,1,"1"); //противопожарность
$text .= xlsWriteLabel(39,1,"0"); //противопожарность
$text .= xlsWriteLabel(40,1,"0"); //противопожарность
$text .= xlsWriteLabel(41,1,"0"); //противопожарность

// $text .= xlsWriteLabel(42,1,$adress);
// $text .= xlsWriteLabel(43,1,$name);
// $text .= xlsWriteLabel(44,1,$phone);
// $text .= xlsWriteLabel(45,1,$email);
// $text .= xlsWriteLabel(46,1,$comment);

$text .= xlsWriteLabel(47,1,$protivosem_count); //Количество противосъемов
$text .= xlsWriteLabel(47,2,$protivosem_price); //Цена противосъемов
$text .= xlsWriteLabel(48,1,$petli_count); //Количество петель
$text .= xlsWriteLabel(48,2,$petli_price); //Цена петель
$text .= xlsWriteLabel(49,1,$uplotnitel_count); //Количество уплотнителя
$text .= xlsWriteLabel(49,2,$uplotnitel_price); //Цена уплотнителя
$text .= xlsWriteLabel(50,1,$steklopak_name);
$text .= xlsWriteLabel(50,2,$steklopak_price);
$text .= xlsWriteLabel(51,1,$steklopak_position);
// $text .= xlsWriteLabel(52,1,$antipanika); //антипаника
// $text .= xlsWriteLabel(52,2,$antipanika_price); //цена антипаники

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
	  <p style="">Ссылка на проект: <a href="http://blt-bereg.ru/konstruktor-protivopozharnyix-dverej/?project='.$order["order_id"].'">http://blt-bereg.ru/konstruktor-protivopozharnyix-dverej/?project='.$order["order_id"].'</a></p>
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