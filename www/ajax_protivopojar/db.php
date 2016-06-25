<?php
//соединение с базой данных при помощи функции mysql_connect()
$db = mysql_connect("localhost","ce77747_bereg","katya123");
//функция mysql_select_db() выбирает текущую 
//базу данных с именем "ce77747_bereg"
mysql_select_db("ce77747_bereg", $db);

?>