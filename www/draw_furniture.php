<?php
require_once('manager/includes/config.inc.php');
require_once('manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$page = isset($_POST["pageid"]) ? $_POST["pageid"] : null; //id страницы с замками
$filter_type = isset($_POST["zamok_type"]) ? $_POST["zamok_type"] : null; //фильтр по типу
$filter_color = isset($_POST["zamok_color"]) ? $_POST["zamok_color"] : null; //фильтр по цвету
$metalkonstr = isset($_POST["metallokonstr"]) ? $_POST["metallokonstr"] : null; // металлоконструкция
$outside_view = isset($_POST["outside_view"]) ? $_POST["outside_view"] : null; // внешняя отделка
$inside_view = isset($_POST["inside_view"]) ? $_POST["inside_view"] : null; // внутренняя отделка
$type_zamok = isset($_POST["type"]) ? $_POST["type"] : null; //основной или дополнительный замок
$sort_price = isset($_POST["sort_price"]) ? $_POST["sort_price"] : null; //сортировка по цене
$tpl = 'zamok';

// $result["metalkonstr"] = $metalkonstr;
// $result["outside_view"] = $outside_view;
// $result["inside_view"] = $inside_view;
// $result["page"] = $page;
// $result["type"] = $type_zamok;

function getHtml($page, $tpl, $modx, $filter){
	$txt = $modx->runSnippet('Ditto',   array( 'startID' => $page, 
                'depth' => 1,
                'tpl' => $tpl,
                'orderBy' => 'id ASC',
                'filter' => $filter
                ));
	return $txt;
}

if($filter_type=="cilindr"){
	$type = "цилиндр";
} else if($filter_type=="suvald"){
	$type = "сувальд.";
} else if($filter_type=="syst"){
	$type = "2-сист";
}

if($filter_color=="gold"){
	$color = "Золото";
} else if($filter_color=="chrom"){
	$color = "Хром";
} else if($filter_color=="other"){
	$color = "Другое";
}

$txt = "";

//функция для сортировки многомерного массива array_orderby($result, 'TIMESTAMP', SORT_DESC);
function array_orderby()
{
  $args = func_get_args();
  $data = array_shift($args);
  foreach ($args as $n => $field) {
      if (is_string($field)) {
          $tmp = array();
          foreach ($data as $key => $row)
              $tmp[$key] = $row[$field];
          $args[$n] = $tmp;
          }
  }
  $args[] = &$data;
  call_user_func_array('array_multisort', $args);
  return array_pop($args);
}

//получаем список всех замков
$childs = $modx->getActiveChildren($page);

//сортируем по цене
foreach ($childs as $key_sort => $value_sort) {
	$child_info_sort = $modx->getTemplateVars(Array("cena_konstr"), '*', $value_sort["id"]);
	$result_sort["id"] = $value_sort["id"];
	$result_sort["price"] = $child_info_sort[0]["value"];
	$result_for_sort[] = $result_sort;
}

if($sort_price=="up"){
	$childs_sorted = array_orderby($result_for_sort, 'price', SORT_ASC);
} else if($sort_price=="down"){
	$childs_sorted = array_orderby($result_for_sort, 'price', SORT_DESC);
} else {
	$childs_sorted = $childs;
}

foreach ($childs_sorted as $key => $value) {
	//получаем информацию о замке
	$child_info = $modx->getTemplateVars(Array("cena_konstr","zamok_type","ruchka","cilindr","zamok_color"), '*', $value["id"]);
	//если тип add_lock - не выводим замки с ручкой
	if($type_zamok=="add_lock"){
		if($child_info[2]["value"]=="Без ручки"){
			//отбираем замки по фильтру цвет+тип
			if($child_info[1]["value"]==$type && $child_info[4]["value"]==$color){
				//если металлоконструкция = №4 и внешняя отделка != покраска, не выводим цилиндр = Дорма
				if($metalkonstr==209 && $outside_view!=190){
					if($child_info[3]["value"]!="DORMA"){
						$filter = "id,".$value["id"].",1";
						$txt .= getHtml($page, $tpl, $modx, $filter);
					}
				} else {
					$filter = "id,".$value["id"].",1";
					$txt .= getHtml($page, $tpl, $modx, $filter);
				}
			}
		}
	} else {
		//отбираем замки по фильтру цвет+тип
		if($child_info[1]["value"]==$type && $child_info[4]["value"]==$color){
			//если металлоконструкция = №4 и внешняя отделка != покраска, не выводим цилиндр = Дорма
			if($metalkonstr==209 && $outside_view!=190){
				if($child_info[3]["value"]!="DORMA"){
					$filter = "id,".$value["id"].",1";
					$txt .= getHtml($page, $tpl, $modx, $filter);
				}
			} else {
				$filter = "id,".$value["id"].",1";
				$txt .= getHtml($page, $tpl, $modx, $filter);
			}
		}
	}
	
}

echo $txt;
//print json_encode($res);
// $filter = implode("|", $zamki);

//$txt = getHtml($page, $tpl, $modx, $filter);
// echo "<pre>";
// print_r($txt);
// echo "</pre>";

	// $pageInfo = $modx->getPageInfo($page);

	// if($page==187){ //металлоконструкции
	// 	$tpl = 'metalkonstr';
	// 	$txt = getHtml($page, $tpl, $modx);
	// } else if($page==189){ //наружная отделка
	// 	$tpl = 'otdelka';
	// 	$txt = getHtml($page, $tpl, $modx);
	// } else if($page==200){ //внутренняя отделка
	// 	$page=189;
	// 	$tpl = 'otdelka';
	// 	$txt = getHtml($page, $tpl, $modx);
	// } else if($page==201){ //наличники
	// 	$tpl = 'nalichnik';
	// 	$txt = getHtml($page, $tpl, $modx);
	// } else if($page==203){ //замок
	// 	$childs = $modx->getActiveChildren($page);
	// 	$txt = '';
	// 	$tpl = 'zamok';
	// 	foreach($childs as $key => $value){
	// 		$txt .= "<h3>".$value["pagetitle"]."</h3>";
	// 		$txt .= "<div class = 'locks-list'>";
	// 		$txt .= getHtml($value['id'], $tpl, $modx);
	// 		$txt .= "</div>";
	// 	}
	// }  else if($page==205){ //фурнитура
	// 	$tpl = 'furniture';
	// 	$txt = getHtml($page, $tpl, $modx);
	// } else if($page==190){
	// 	$childs = $modx->getActiveChildren($page);
	// 	$txt = '';
	// 	foreach($childs as $key => $value){
	// 		if($value['id']==193){
	// 			$tpl = 'color_ral';
	// 			$txt .= "<h3>".$value["pagetitle"]."</h3>";
	// 			$txt .= "<div class='colors'>";
	// 			$txt .= getHtml($value['id'], $tpl, $modx);
	// 			$txt .= "</div>";
	// 		} else{
	// 			$tpl = 'antic_color';
	// 			$txt .= "<h3>".$value["pagetitle"]."</h3>";
	// 			$txt .= "<div class='colors'>";
	// 			$txt .= getHtml($value['id'], $tpl, $modx);
	// 			$txt .= "</div>";
	// 		}
	// 	}
	// } else if($page==191){
	// 	$tpl = 'otdelka';
	// 	$txt = getHtml($page, $tpl, $modx);
	// } else if($page==194){
	// 	$childs = $modx->getActiveChildren($page);
	// 	$txt = '';
	// 	foreach($childs as $key => $value){
	// 			$tpl = 'frezerovka_menu';
	// 			$txt .= "<h3>".$value["pagetitle"]."</h3>";
	// 			$txt .= "<div class='frezerovka_images'>";
	// 			$txt .= getHtml($value['id'], $tpl, $modx);
	// 			$txt .= "</div>";
	// 	}
	// } else if($page==195){
	// 	$tpl = 'mdf_color';
	// 	$txt = getHtml($page, $tpl, $modx);
	// }





//print json_encode($result); 

?>