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

if($page==null){
	$result["status"]="error";
}else {

	$pageInfo = $modx->getPageInfo($page);

	if($page==190){ //металлоконструкции
		$tpl = 'metalkonstr';
		$txt = getHtml($page, $tpl, $modx);
	} else if($page==194){ //наружная отделка
		//не выводим ламинат
		$tpl = 'otdelka';
		$filter = "id,231,2|id,215,2";
		$txt = getHtml($page, $tpl, $modx, $filter);
	} else if($page==216){ //внутренняя отделка
		$page=194;
		$tpl = 'otdelka';
		if ($metallokonstr != 191){ // если металлоконструкция не основа, то ламинат не выводим
			$filter = "id,231,2";
			$txt = getHtml($page, $tpl, $modx, $filter);
		}else{
			$txt = getHtml($page, $tpl, $modx);
		}
	} else if($page==219){ //наличники
		//если внешняя отделка - покраска, то наличник не выводить мдф
		if($outside_view==195){
			//все кроме 240
			$tpl = 'nalichnik';
			$filter = "id,221,2";
			$txt = getHtml($page, $tpl, $modx, $filter);
		} else {
			$tpl = 'nalichnik';
			$txt = getHtml($page, $tpl, $modx);
		}
	} else if($page==217){ //замок
		$tpl = 'zamok';
		$txt = getHtml($page, $tpl, $modx);
	}  else if($page==223){ //фурнитура
		$tpl = 'furniture';
		$txt = getHtml($page, $tpl, $modx);
	} else if($page==195){
		$tpl = 'otdelka';
		
		$txt = getHtml($page, $tpl, $modx);
		// $childs = $modx->getActiveChildren($page);
		// $txt = '';
		// foreach($childs as $key => $value){
		// 	if($value['id']==200){
		// 		$tpl = 'color_ral';
		// 		$txt .= "<h3>".$value["pagetitle"]."</h3>";
		// 		$txt .= "<div class='colors' style = 'display: table !important'>";
		// 		$txt .= getHtml($value['id'], $tpl, $modx);
		// 		$txt .= "</div>";
		// 	} else{
		// 		$tpl = 'antic_color';
		// 		$txt .= "<h3>".$value["pagetitle"]."</h3>";
		// 		$txt .= "<div class='colors' style = 'display: table !important'>";
		// 		$txt .= getHtml($value['id'], $tpl, $modx);
		// 		$txt .= "</div>";
		// 	}
		// }
	} else if($page==196 || $page==198 || $page==200){
		if($page==200){
			$tpl = 'color_ral';
		} else if($page==196){
			$tpl = 'standart_color';
		} else{
			$tpl = 'antic_color';
		}
		$txt = '';
		$txt .= "<div class='colors' style = 'display: table !important'>";
		$txt .= getHtml($page, $tpl, $modx);
		$txt .= "</div>";
	} else if($page==202){
		$tpl = 'otdelka';
		$txt = getHtml($page, $tpl, $modx);
	} else if($page==203){  //фрезеровочка
		if ($outside_view == 210){
			$childs = $modx->getActiveChildren(211); //получаем фрезеровки из мдф-10
			$txt = '';
			foreach($childs as $key => $value){
					$tpl = 'frezerovka_menu';
					$txt .= "<h3>".$value["pagetitle"]."</h3>";
					$txt .= "<div class='frezerovka_images'>";
					$txt .= getHtml($value['id'], $tpl, $modx);
					$txt .= "</div>";
			}	
		}else if($outside_view == 215){ //мдф с зеркалом
			$childs = $modx->getActiveChildren(406);
			$txt = "";
			foreach($childs as $key => $value){
					$tpl = 'frezerovka_menu';
					$txt .= "<h3>".$value["pagetitle"]."</h3>";
					$txt .= "<div class='frezerovka_images'>";
					$txt .= getHtml($value['id'], $tpl, $modx);
					$txt .= "</div>";
			}
			// foreach($childs as $key => $value){
			// 	$childs2 = $modx->getActiveChildren($value['id']);
			// 	$txt_temp = "";
			// 	foreach($childs2 as $key2 => $value2){
			// 		$TVs = $modx->getTemplateVars(Array("isMirror"), '*', $value2['id']);
			// 		if($TVs[0]["value"]=="true"){
			// 			$filter = "id,".$value2['id'].",1";
			// 			$tpl = 'frezerovka_menu';
			// 			$txt_temp .=  getHtml($value['id'], $tpl, $modx, $filter);
			// 		}
			// 	}
			// 	if($txt_temp!=""){
			// 		$txt .= "<h3>".$value["pagetitle"]."</h3>";
			// 		$txt .= "<div class='frezerovka_images'>";
			// 		$txt .= $txt_temp;
			// 		$txt .= "</div>";
			// 	}
			// }
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
	} else if($page==208){
		if($inside_view==231){

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
	} else if($page == 224){
		$tpl = 'glazki';
		$txt = getHtml($page, $tpl, $modx);
	}else if($page == 226){
		$tpl = 'dovodchik';
		$txt = getHtml($page, $tpl, $modx);
	}else if($page == 228){
		$tpl = 'zadvijka';
		$txt = getHtml($page, $tpl, $modx);
	}

	$result["txt"] = $txt;
	$result["page"] = $pageInfo;
	$result["status"] = "ok";
}

print json_encode($result); 

?>