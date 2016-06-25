<?php
require_once('manager/includes/config.inc.php');
require_once('manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$page = isset($_GET["page"]) ? $_GET["page"] : null;
$outside_view = isset($_GET["outside_view"]) ? $_GET["outside_view"] : null;
$inside_view = isset($_GET["inside_view"]) ? $_GET["inside_view"] : null;
$metallokonstr = isset($_GET["metallokonstr"]) ? $_GET["metallokonstr"] : null;

function getHtml($page, $tpl, $modx, $filter=null){

	$arSettings = Array('startID' => $page, 
                		'depth' => 1,
                		'tpl' => $tpl,
                		'orderBy' => 'id ASC');

	if($filter!=null){
		$arSettings['filter'] = $filter;
	}

	$txt = $modx->runSnippet('Ditto', $arSettings);
	return $txt;
}

if($page==null){
	$result["status"]="error";
}else {

	$pageInfo = $modx->getPageInfo($page);

	if($page==187){ //металлоконструкции
		$tpl = 'metalkonstr';
		$txt = getHtml($page, $tpl, $modx);
	} else if($page==189){ //наружная отделка
		//не выводим ламинат
		$tpl = 'otdelka';
		$filter = "id,254,2|id,295,2";
		$txt = getHtml($page, $tpl, $modx, $filter);
	} else if($page==200){ //внутренняя отделка
		$page=189;
		$tpl = 'otdelka';
		if ($metallokonstr != 207){ // если металлоконструкция не основа, то ламинат не выводим
			$filter = "id,254,2";
			$txt = getHtml($page, $tpl, $modx, $filter);
		}else{
			$txt = getHtml($page, $tpl, $modx);
		}
	} else if($page==201){ //наличники
		//если внешняя отделка - покраска, то наличник не выводить мдф
		if($outside_view==190){
			//все кроме 240
			$tpl = 'nalichnik';
			$filter = "id,240,2";
			$txt = getHtml($page, $tpl, $modx, $filter);
		} else {
			$tpl = 'nalichnik';
			$txt = getHtml($page, $tpl, $modx);
		}
	} else if($page==203){ //замок
		// $childs = $modx->getActiveChildren($page);
		// $txt = '';
		$tpl = 'zamok';
		$txt = getHtml($page, $tpl, $modx);
		// foreach($childs as $key => $value){
		// 	$txt .= "<h3>".$value["pagetitle"]."</h3>";
		// 	$txt .= "<div class = 'locks-list'>";
		// 	$txt .= getHtml($value['id'], $tpl, $modx);
		// 	$txt .= "</div>";
		// }
	}  else if($page==205){ //фурнитура
		$tpl = 'furniture';
		$txt = getHtml($page, $tpl, $modx);
	} else if($page==190){
		$childs = $modx->getActiveChildren($page);
		$txt = '';
		foreach($childs as $key => $value){
			if($value['id']==193){
				$tpl = 'color_ral';
				$txt .= "<h3>".$value["pagetitle"]."</h3>";
				$txt .= "<div class='colors'>";
				$txt .= getHtml($value['id'], $tpl, $modx);
				$txt .= "</div>";
			} else{
				$tpl = 'antic_color';
				$txt .= "<h3>".$value["pagetitle"]."</h3>";
				$txt .= "<div class='colors'>";
				$txt .= getHtml($value['id'], $tpl, $modx);
				$txt .= "</div>";
			}
		}
	} else if($page==191){
		$tpl = 'otdelka';
		$txt = getHtml($page, $tpl, $modx);
	} else if($page==194){  //фрезеровочка
		if ($outside_view == 252){
			$childs = $modx->getActiveChildren(253); //получаем фрезеровки из мдф-10
			$txt = '';
			foreach($childs as $key => $value){
					$tpl = 'frezerovka_menu';
					$txt .= "<h3>".$value["pagetitle"]."</h3>";
					$txt .= "<div class='frezerovka_images'>";
					$txt .= getHtml($value['id'], $tpl, $modx);
					$txt .= "</div>";
			}	
		}else if($outside_view == 295){ //мдф с зеркалом
			$childs = $modx->getActiveChildren(253);
			$txt = "";
			foreach($childs as $key => $value){
				$childs2 = $modx->getActiveChildren($value['id']);
				$txt_temp = "";
				foreach($childs2 as $key2 => $value2){
					$TVs = $modx->getTemplateVars(Array("isMirror"), '*', $value2['id']);
					if($TVs[0]["value"]=="true"){
						$filter = "id,".$value2['id'].",1";
						$tpl = 'frezerovka_menu';
						$txt_temp .=  getHtml($value['id'], $tpl, $modx, $filter);
					}
				}
				if($txt_temp!=""){
					$txt .= "<h3>".$value["pagetitle"]."</h3>";
					$txt .= "<div class='frezerovka_images'>";
					$txt .= $txt_temp;
					$txt .= "</div>";
				}
				//$TVs = $modx->getTemplateVars(Array("isMirror"), '*', $value['id']);
				
				// if($TVs[0]["value"]=="true"){
				// 	$tpl = 'frezerovka_menu';
				// 	$txt .= "<h3>".$value["pagetitle"]."</h3>";
				// 	$txt .= "<div class='frezerovka_images'>";
				// 	$txt .= getHtml($value['id'], $tpl, $modx);
				// 	$txt .= "</div>";
				// }
			}
		}else{
			$childs = $modx->getActiveChildren($page);
			$txt = '';
			foreach($childs as $key => $value){
					$tpl = 'frezerovka_menu';
					$txt .= "<h3>".$value["pagetitle"]."</h3>";
					$txt .= "<div class='frezerovka_images'>";
					$txt .= getHtml($value['id'], $tpl, $modx);
					$txt .= "</div>";
			}
		}
	} else if($page==195){
		if($inside_view==254){

			$tpl = 'laminat_color';
			$txt = "";

			//получаем список всех цветов
			$childs = $modx->getActiveChildren($page);

			foreach ($childs as $key => $value) {
				//получаем информацию о цвете
				$child_info = $modx->getTemplateVars(Array("laminat_name"), '*', $value["id"]);
				if($child_info[0]["value"]!=""){
					$filter = "id,".$value["id"].",1";
					$txt .= getHtml($page, $tpl, $modx, $filter);
				}
			}

		} else {
			$tpl = 'mdf_color';
			$txt = getHtml($page, $tpl, $modx);
		}
	} else if($page == 206){
		$tpl = 'glazki';
		$txt = getHtml($page, $tpl, $modx);
	}else if($page == 223){
		$tpl = 'dovodchik';
		$txt = getHtml($page, $tpl, $modx);
	}else if($page == 224){
		$tpl = 'zadvijka';
		$txt = getHtml($page, $tpl, $modx);
	}


	$result["txt"] = $txt;
	$result["page"] = $pageInfo;
	$result["status"] = "ok";
}

// echo "<pre>";
// print_r($result);
// echo "</pre>";

print json_encode($result); 

?>