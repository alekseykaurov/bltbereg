<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$page = isset($_GET["page"]) ? $_GET["page"] : null;
$outside_view = isset($_GET["outside_view"]) ? $_GET["outside_view"] : null;
$inside_view = isset($_GET["inside_view"]) ? $_GET["inside_view"] : null;
$metallokonstr = isset($_GET["metallokonstr"]) ? $_GET["metallokonstr"] : null;
$sort_price = isset($_GET["sort_price"]) ? $_GET["sort_price"] : null;
$main_lock = isset($_GET["main_lock"]) ? $_GET["main_lock"] : null;

function getHtml($page, $tpl, $modx, $filter=null){

	$arSettings = Array('startID' => $page, 
                		'depth' => 1,
                		'tpl' => $tpl,
                		'orderBy' => 'menuindex ASC');

	if($filter!=null){
		$arSettings['filter'] = $filter;
	}

	$txt = $modx->runSnippet('Ditto', $arSettings);
	return $txt;
}

// функция для сортировки многомерного массива array_orderby($result, 'TIMESTAMP', SORT_DESC);
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

if($page==null){
	$result["status"]="error";
}else {

	$pageInfo = $modx->getPageInfo($page);

	if($page==219){ //наличники
		//не выводить мдф
		$tpl = 'nalichnik';
		$filter = "id,221,2";
		$txt = getHtml($page, $tpl, $modx, $filter);
	} else if($page==190){ //металоконструкция
		//не выводить мдф
		$tpl = 'metalkonstr';
		$filter = "id,191,1";
		$txt = getHtml($page, $tpl, $modx, $filter);
	} else if($page==217){ //замок
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

		$tpl = 'zamok';
		$txt = "";
		foreach ($childs_sorted as $key => $value) {
			$child_info_ispp = $modx->getTemplateVars(Array("is_pp"), '*', $value["id"]);

			if($child_info_ispp[0]["value"]=="true"){
				$filter = "id,".$value["id"].",1";
				$txt .= getHtml($page, $tpl, $modx, $filter);
			}
		}

		// if($txt!=""){
		// 	$txt = '<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>'.$txt;
		// }

	}  else if($page==223){ //фурнитура
		$tpl = 'furniture';
		$txt = getHtml($page, $tpl, $modx);
	} else if($page==195){
		$tpl = 'otdelka';
		$txt = getHtml($page, $tpl, $modx);
	} else if($page==196 || $page==198 || $page==200){
		if($page==200){
			$tpl = 'color_ral';
		}else if($page==196){
			$tpl="standart_color";
		} else {
			$tpl = 'antic_color';
		}
		$txt = '';
		$txt .= "<div class='colors' style = 'display: table !important'>";
		$txt .= getHtml($page, $tpl, $modx);
		$txt .= "</div>";
	} else if($page==202){
		$tpl = 'otdelka';
		$txt = getHtml($page, $tpl, $modx);
	}else if($page == 226){
		$tpl = 'dovodchik';
		$txt = getHtml($page, $tpl, $modx);
	}else if($page == 228){
		$tpl = 'zadvijka';
		$txt = getHtml($page, $tpl, $modx);
	}else if($page == 994){
		$tpl = 'otdelka';
		$txt = getHtml($page, $tpl, $modx);
	}else if($page==983){

		// //получаем список всех замков
		$childs = $modx->getActiveChildren($page);

		$tpl = "ruchka";
		$txt = "";

		if($main_lock==""){
			foreach($childs as $key => $value){
				$child_info_ap = $modx->getTemplateVars(Array("antipanika"), '*', $value["id"]);

				if($child_info_ap[0]["value"]!="true"){
					$filter = "id,".$value["id"].",1";
					$txt .= getHtml($page, $tpl, $modx, $filter);
				}
			}
		} else {
			$main_lock_najim = $modx->getTemplateVars(Array("najim"), '*', $main_lock);
			$main_lock_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $main_lock);

			if($main_lock_ruchka[0]["value"]=="Без ручки"){

				foreach($childs as $key => $value){
					$child_info_ap = $modx->getTemplateVars(Array("antipanika"), '*', $value["id"]);

					if($child_info_ap[0]["value"]!="true"){
						$filter = "id,".$value["id"].",1";
						$txt .= getHtml($page, $tpl, $modx, $filter);
					}
				}
				
			} else {
				if($main_lock_najim[0]["value"]=="true"){
					foreach($childs as $key => $value){
						$child_info_ap = $modx->getTemplateVars(Array("antipanika"), '*', $value["id"]);

						if($child_info_ap[0]["value"]=="true"){
							$filter = "id,".$value["id"].",1";
							$txt .= getHtml($page, $tpl, $modx, $filter);
						}
					}
				} else {
					foreach($childs as $key => $value){
						$child_info_ap = $modx->getTemplateVars(Array("antipanika"), '*', $value["id"]);

						if($child_info_ap[0]["value"]!="true"){
							$filter = "id,".$value["id"].",1";
							$txt .= getHtml($page, $tpl, $modx, $filter);
						}
					}
				}
			}
		}

	}

	$result["txt"] = $txt;
	$result["page"] = $pageInfo;
	$result["status"] = "ok";
}

print json_encode($result); 

?>