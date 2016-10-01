<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

include('db.php');

//������� ��� ������� ������ � �������
function mysql_insert($table, $inserts, $db) {
	//�������� �������� �������
    $values = array_map('mysql_real_escape_string', array_values($inserts));
    //�������� ����� �������
    $keys = array_keys($inserts);

    //���������
    return mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')', $db) or die('������ ����������: ' . mysql_error());

    //return $values;
}

//�������� ������ ��� �������
$insert = $_POST['order'];
//���������� id ������
$insert["order_id"] = rand(100000, 999999);


//�������� �� ������������
$result = mysql_query("SELECT * FROM orders WHERE `order_id`='".$insert["order_id"]."' LIMIT 1", $db);
//����������� ������ ���� ���, ����� ����� ����� �������� ����� ����������� ���� ����� �� ����� ����������
if ($row = mysql_fetch_assoc($result)) {
    $insert["order_id"] = rand(100000, 999999);
}

//������� �������������� ���� ��� ������� � ���� (��� ����� ����� �������� ������)
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

//��������� ������� ��� �������
$res = mysql_insert('orders', $insert2, $db);

//������������ ��������� ����������� �����
$result = mysql_query("SELECT * FROM orders ORDER BY id DESC LIMIT 1", $db);

if ($row = mysql_fetch_assoc($result)) {
	//���������� �����
    $order = $row;
}

//������� �����
print json_encode($order);

/*���������� � excel*/

// �������� ����������

// ��������� �������
$price = $_POST["price"];

// ����� ������
$order_num = $insert["order_id"];

// ����
$date = date("d.m.Y H:m:i");

// ���������� � ���������
// $name = $insert["fio"];
// $email = $insert["email"];
// $phone = $insert["phone"];
// $adress = $insert["adress"];
// $floors = $insert["floors"];
// $personal_price = $insert["personal_price"];
// $comment = $insert["comment"];

// �����
// $lift = $insert["lift"];
// $dostavka = $insert["dostavka"];
// $montaj = $insert["montaj"];
// $demontaj = $insert["demontaj"];

$width = $insert["width_door"];
$height = $insert["height_door"];

$metallokonstr = $modx->getDocument($insert["metallokonstr"]); 
$metallokonstr_name = $metallokonstr["pagetitle"]; // �������� ������������������
$metallokonstr_price = $price["metallkonstr_price"]; // ��������� ������������������

$main_color = $modx->getDocument($insert["main_color"]);
$main_color_name = $main_color["pagetitle"]; // �������� ��������� �����
$main_color_type = $modx->getDocument($main_color["parent"]);
$main_color_type_name = $main_color_type["pagetitle"]; // �������� ���� ��������� �����
$main_color_price = $price['main_color_price'];

$outside_view = $modx->getDocument($insert["outside_view"]);
$outside_view_name = $outside_view["pagetitle"]; // �������� ���� ������� �������
if ($insert['outside_view'] != 195){
	$outside_color = $modx->getDocument($insert["outside_color"]);
	$outside_color_name = $outside_color["pagetitle"]; // �������� ����� ������� �������
	$outside_color_price = $price["outside_color_price"]; // ��������� ����� ������� �������	
}else{
	$outside_color_name = ''; // �������� ����� ������� �������
	$outside_color_price = ''; // ��������� ����� ������� �������
	$main_color_price = $main_color_price + $price["outside_color_price"];
}

if($insert["outside_frezer"]!=null && $insert["outside_frezer"]!=""){
	$outside_frezer = $modx->getDocument($insert["outside_frezer"]);
	$outside_frezer_name = $outside_frezer["pagetitle"];// �������� ������� ����������
} else {
	$outside_frezer_name = "";
}

$outside_nalichnik = $modx->getDocument($insert["outside_nalichnik"]);
$outside_nalichnik_name = $outside_nalichnik["pagetitle"]; // �������� ���������
$outside_nalichnik_price = $price["nalichnik_price"]; // ��������� ���������

$inside_view = $modx->getDocument($insert["inside_view"]);
$inside_view_name = $inside_view["pagetitle"]; // �������� ���� ��������� �������
if($insert["inside_view"]==215){ // ��������� ���. �������
	$dop_zerkalo = 1;
} else {
	$dop_zerkalo = 0;
}
if ($insert['inside_view'] != 195){
	$inside_color = $modx->getDocument($insert["inside_color"]);
	$inside_color_name = $inside_color["pagetitle"]; // �������� ����� ���������� �������
	$inside_color_price = $price["inside_color_price"]; // ��������� ����� ���������� �������
}else{
	$inside_color_name = ''; // �������� ����� ���������� �������
	$inside_color_price = ''; // ��������� ����� ���������� �������
	$main_color_price = $main_color_price + $price["inside_color_price"];
}

if($insert["inside_frezer"]!=null && $insert["inside_frezer"]!=""){
	$inside_frezer = $modx->getDocument($insert["inside_frezer"]);
	$inside_frezer_name = $inside_frezer["pagetitle"]; // �������� ���������� ���������� �������
} else {
	$inside_frezer_name = ""; // �������� ���������� ���������� �������
}

if($insert["main_lock"]!=null && $insert["main_lock"]!="" && $insert["main_lock"]!=0){
	$main_lock = $modx->getDocument($insert["main_lock"]);
	$main_lock_name = $main_lock["pagetitle"]; // �������� ��������� �����
	$main_lock_price = $price["main_lock_price"]; // ��������� ��������� �����
	$ruchka_tv = $modx->getTemplateVars(Array("ruchka"), '*', $insert["main_lock"]); // ������ ��� �����
	if($ruchka_tv[0]["value"]=="��� �����"){
		$ruchka_type = "������";
	} else {
		$ruchka_type = "";
	}
	$main_lock_color_tv = $modx->getTemplateVars(Array("zamok_color"), '*', $insert["main_lock"]); // ������ ���� ��������� �����
	$main_lock_color = $main_lock_color_tv[0]["value"];
	
} else {
	$main_lock_name = "";
	$main_lock_price = 0;
	$ruchka_type = "������";
	$main_lock_color = "";
}

$ruchka_price = $price['ruchka_price'];

if($insert["add_lock"]!=null && $insert["add_lock"]!="" && $insert["add_lock"]!=0){
	$add_lock = $modx->getDocument($insert["add_lock"]);
	$add_lock_name = $add_lock["pagetitle"]; // �������� ��������������� �����
	$add_lock_price = $price["add_lock_price"]; // ��������� ��������������� �����
	$add_lock_color_tv = $modx->getTemplateVars(Array("zamok_color"), '*', $insert["add_lock"]); // ������ ���� ��������������� �����
	$add_lock_color = $add_lock_color_tv[0]["value"];
	
} else {
	$add_lock_name = ""; // �������� ��������������� �����
	$add_lock_price = 0; // ��������� ��������������� �����
	$add_lock_color = "";
}

if($insert["glazok"]!=null && $insert["glazok"]!="" && $insert["glazok"]!=0){
	$glazok = $modx->getDocument($insert["glazok"]);
	$glazok_name = $glazok["pagetitle"]; // �������� ������
	$glazok_price = $price["glazok_price"]; // ��������� ������
} else {
	$glazok_name = "";
	$glazok_price = 0;
}

if($insert["dovodchik"]!=null && $insert["dovodchik"]!="" && $insert["dovodchik"]!=0){
	$dovodchik = $modx->getDocument($insert["dovodchik"]);
	$dovodchik_name = $dovodchik["pagetitle"]; // �������� ���������
	$dovodchik_price = $price["dovodchik_price"]; // ��������� ���������
} else {
	$dovodchik_name = "";
	$dovodchik_price = 0;
}

if($insert["zadvijka"]!=null && $insert["zadvijka"]!="" && $insert["zadvijka"]!=0){
	$zadvijka = $modx->getDocument($insert["zadvijka"]);
	$zadvijka_name = $zadvijka["pagetitle"]; // �������� ��������
	$zadvijka_price = $price["zadvijka_price"]; // ��������� ��������
} else {
	$zadvijka_name = "";
	$zadvijka_price = 0;
}

// ��� ����������
if($insert["door_side"]=="left"){
	$door_side_name = '������';
} else if($insert["door_side"]=="right"){
	$door_side_name = '�������';
}

// �������
$stvorka_name = $insert["stvorka"];

// ����� - ����������
// if($order["metallokonstr"]==191){
// 	//���� ������
// 	$petli_count = 2;
// 	$uplotnitel_count = 1;
// } else {
// 	//���� �� ������
// 	$petli_count = 3;
// 	$uplotnitel_count = 2;
// }
// ����� - ����
$uplotnitel_count = 1;
$petli_count = 3;
$petli_price = $price["petli_price"];
$uplotnitel_price = $price["uplotnitel_price"];

//�����������
if ($insert['steklopak'] != 'other'){
	$steklopak_name_tv = $modx->getDocument($insert["steklopak"]);
	$steklopak_name = $steklopak_name_tv['pagetitle'];
}else{
	$steklopak_name = $insert['steklopak_height'].'*'.$insert['steklopak_width'];
}
$steklopak_price = $price['steklopak_price'];

if ($insert['window_align'] == 'top_left'){
	$steklopak_position = '����� ������';
}else if($insert['window_align'] == 'top_center'){
	$steklopak_position = '������ �����';
}else if($insert['window_align'] == 'top_right'){
	$steklopak_position = '������ ������';
}else if($insert['window_align'] == 'middle_left'){
	$steklopak_position = '���������� �����';
}else if($insert['window_align'] == 'middle_center'){
	$steklopak_position = '���������� �����';
}else if($insert['window_align'] == 'middle_right'){
	$steklopak_position = '���������� ������';
}else if($insert['window_align'] == 'bottom_left'){
	$steklopak_position = '����� �����';
}else if($insert['window_align'] == 'bottom_center'){
	$steklopak_position = '����� �����';
}else if($insert['window_align'] == 'bottom_right'){
	$steklopak_position = '����� ������';
}

//����������
if($insert['ruchka']=='true'){
	$ruchka_type = "����������";
}
// ������������ - ����������
// if($insert["metallokonstr"]==191){
// 	//���� ������
// 	$protivosem_count = 2;
// } else if($insert["metallokonstr"]==192){
// 	//���� ����
// 	$protivosem_count = 3;
// } else if($insert["metallokonstr"]==193){
// 	//���� �����
// 	$protivosem_count = 4;
// }
$protivosem_count = 0;
// ������������ - ����
$protivosem_price = $price["protivosem_price"];

// ����� ���������
if($personal_price!=null && $personal_price!=""){
	$total_price = $insert["total_price"]-$personal_price;
} else {
	$total_price = $insert["total_price"];
}

//��������� ��� ������
$clear_price = $price["clear"];

//������
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

//��������� ��������� ������ ���������
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

if ($main_lock_color == '������'){
	$main_lock_color = 1;
}else if($main_lock_color == '����'){
	$main_lock_color = 2;
}else if($main_lock_color == '������'){
	$main_lock_color = 0;
}

if ($add_lock_color == '������'){
	$add_lock_color = 1;
}else if($add_lock_color == '����'){
	$add_lock_color = 2;
}else if($add_lock_color == '������'){
	$add_lock_color = 0;
}

// ������� ��� ���������� � excel

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
$text .= xlsBOF(); //�������� �������� ����
// �������� �����

$text .= xlsWriteLabel(1,0,"����� �������");
$text .= xlsWriteLabel(2,0,"����");

$text .= xlsWriteLabel(4,1,"��������");
$text .= xlsWriteLabel(4,2,"���������");

$text .= xlsWriteLabel(5,0,"��� �����");
$text .= xlsWriteLabel(6,0,"�����/������");
$text .= xlsWriteLabel(7,0,"������ (������, ����, �����)");
$text .= xlsWriteLabel(8,0,"������");
$text .= xlsWriteLabel(9,0,"������");
$text .= xlsWriteLabel(10,0,"�������� (���)");
$text .= xlsWriteLabel(11,0,"����� 1 (���)");
$text .= xlsWriteLabel(12,0,"����� 2 (���)");
$text .= xlsWriteLabel(13,0,"�������� (���)");
$text .= xlsWriteLabel(14,0,"������� (���: �����, �����, ����.��.)");
$text .= xlsWriteLabel(15,0,"������� (����, ��������)");
$text .= xlsWriteLabel(16,0,"����� ������� (���  6��, ��� 10��, �������)");
$text .= xlsWriteLabel(17,0,"���� ����� ��� (���� ����)");
$text .= xlsWriteLabel(18,0,"��� �����. ����������");
$text .= xlsWriteLabel(19,0,"�����. ������� (��� 6��, ��� 10��, �������)");
$text .= xlsWriteLabel(20,0,"���� ����� ��� (���� ����)");
$text .= xlsWriteLabel(21,0,"��� �����. ������.");
$text .= xlsWriteLabel(22,0,"��������� (��� �����., ������, ��� 10��, ��� 16��)");
$text .= xlsWriteLabel(23,0,"������");
// $text .= xlsWriteLabel(24,0,"���-�� ������");
// $text .= xlsWriteLabel(25,0,"�������� ���� (1-��/0-���)");
// $text .= xlsWriteLabel(26,0,"������ (1-��/0-���)");
// $text .= xlsWriteLabel(27,0,"�������� (1-��/0-���)");
// $text .= xlsWriteLabel(28,0,"�������� (1-��/0-���)");
$text .= xlsWriteLabel(29,0,"������ (%)");
$text .= xlsWriteLabel(30,0,"������, �����");
$text .= xlsWriteLabel(31,0,"��������� �������");
$text .= xlsWriteLabel(32,0,"����� � ������");
$text .= xlsWriteLabel(33,0,"���� �����");
$text .= xlsWriteLabel(34,0,"��� �����");
$text .= xlsWriteLabel(35,0,"���. ������� (1-��/0-���)");
$text .= xlsWriteLabel(36,0,"���� ��������� ����� 1 (1-������/2-����,������/0 - ������)");
$text .= xlsWriteLabel(37,0,"���� ��������� ����� 2 (1-������/2-����,������/0 - ������)");
$text .= xlsWriteLabel(38,0,"����������������� (0-�����������/1-���������������)");
$text .= xlsWriteLabel(39,0,"����.����� (��� ����� 2-5)");
$text .= xlsWriteLabel(40,0,"������ �����");
$text .= xlsWriteLabel(41,0,"������ ���. �����");

// $text .= xlsWriteLabel(42,0,"����� ��������� (��������)");
// $text .= xlsWriteLabel(43,0,"�������� (�.�.�.)");
// $text .= xlsWriteLabel(44,0,"������� ���������");
// $text .= xlsWriteLabel(45,0,"E-mail");
// $text .= xlsWriteLabel(46,0,"���������");
$text .= xlsWriteLabel(47,0,"������������");
$text .= xlsWriteLabel(48,0,"�����");
$text .= xlsWriteLabel(49,0,"�����������");
$text .= xlsWriteLabel(50,0,"�����������");
$text .= xlsWriteLabel(51,0,"��������� ������������");
// $text .= xlsWriteLabel(52,0,"���������� (1-��/0-���)");



// �������� �����
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
$text .= xlsWriteLabel(29,1,$skidka_percent); //������ %
$text .= xlsWriteLabel(30,2,$skidka_ruble); //������, �����
$text .= xlsWriteLabel(31,2,$clear_price);
$text .= xlsWriteLabel(32,2,$clear_price);
$text .= xlsWriteLabel(33,2,$total_price);
$text .= xlsWriteLabel(34,1,$ruchka_type); //��� �����
$text .= xlsWriteLabel(34,2,$ruchka_price); //��������� �����
$text .= xlsWriteLabel(35,1,$dop_zerkalo); //���. �������
$text .= xlsWriteLabel(36,1,$main_lock_color); //���� ��������� ����� 1
$text .= xlsWriteLabel(37,1,$add_lock_color); //���� ��������� ����� 2
$text .= xlsWriteLabel(38,1,"1"); //�����������������
$text .= xlsWriteLabel(39,1,"0"); //�����������������
$text .= xlsWriteLabel(40,1,"0"); //�����������������
$text .= xlsWriteLabel(41,1,"0"); //�����������������

// $text .= xlsWriteLabel(42,1,$adress);
// $text .= xlsWriteLabel(43,1,$name);
// $text .= xlsWriteLabel(44,1,$phone);
// $text .= xlsWriteLabel(45,1,$email);
// $text .= xlsWriteLabel(46,1,$comment);

$text .= xlsWriteLabel(47,1,$protivosem_count); //���������� �������������
$text .= xlsWriteLabel(47,2,$protivosem_price); //���� �������������
$text .= xlsWriteLabel(48,1,$petli_count); //���������� ������
$text .= xlsWriteLabel(48,2,$petli_price); //���� ������
$text .= xlsWriteLabel(49,1,$uplotnitel_count); //���������� �����������
$text .= xlsWriteLabel(49,2,$uplotnitel_price); //���� �����������
$text .= xlsWriteLabel(50,1,$steklopak_name);
$text .= xlsWriteLabel(50,2,$steklopak_price);
$text .= xlsWriteLabel(51,1,$steklopak_position);
// $text .= xlsWriteLabel(52,1,$antipanika); //����������
// $text .= xlsWriteLabel(52,2,$antipanika_price); //���� ����������

$text .= xlsEOF(); //����������� ��������

file_put_contents('../files/orders/'.$order["id"].'_order_'.$order_num.'.xls', $text); // ��������� ����

//�������� ���������� (�������������)
mysql_close($db);

/*�������� �� �����*/

// $to = "ekaterina.bidyanova@yandex.ru";
// $to = "bmihh@yandex.ru";
// $from = "admin@blt-bereg.ru";
// $boundary = md5(date('r', time()));
// $headers .= "From: " . $from . "\r\n";
// $headers .= "Reply-To: " . $from . "\r\n";
// $headers = "MIME-Version: 1.0\r\n";
// $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// $subject = '����� ������ �'.$order["id"].' ������ �'.$order_num.' �� ����� "���������� �����"';


// $message = '�� ����� "���������� �����" ���� ��������� ����� ������ �'.$order["id"].' ������ �'.$order_num."\n";

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

	// ���� ������
	$subject = '����� ����� ���� ��������� � ������� �� ����� "���������� �����"';

	// ����� ������
	$message = '
	<html>
	<head>
	  <title>����� ����� ���� ��������� � ������� �� ����� "���������� �����"</title>
	</head>
	<body>
	  <p style="text-align: center; font-size: 22px; font-weight: bold; padding: 5px 0px">����� ����� ���� ��������� � ������� �� ����� "���������� �����"</p>
	  <p style="">����� �������: '.$order["order_id"].'</p>
	  <p style="">������ �� ������: <a href="http://blt-bereg.ru/konstruktor-protivopozharnyix-dverej/?project='.$order["order_id"].'">http://blt-bereg.ru/konstruktor-protivopozharnyix-dverej/?project='.$order["order_id"].'</a></p>
	</body>
	</html>
	';

	// ��� �������� HTML-������ ������ ���� ���������� ��������� Content-type
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=windows-1251' . "\r\n";

	// �������������� ���������
	$headers .= 'From: Blt-Bereg.ru <'.$from.'>' . "\r\n";
	$headers .= 'Cc: '. $from . "\r\n";
	$headers .= 'Bcc: '. $from . "\r\n";

	// ����������

	mail($to, $subject, $message, $headers);

?>