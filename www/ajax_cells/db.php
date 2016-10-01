<?php
//соединение с базой данных при помощи функции mysql_connect()
$db = mysql_connect("localhost","bltberegru_new","4FMJ512y");
//функция mysql_select_db() выбирает текущую 
//базу данных с именем "ce77747_bereg"
mysql_select_db("bltberegru_new" ,$db);

?>