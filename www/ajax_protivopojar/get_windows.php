<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$page = isset($_POST["page"]) ? $_POST["page"] : null;
$rama_width = isset($_POST["rama_width"]) ? $_POST["rama_width"] : null;
$rama_height = isset($_POST["rama_height"]) ? $_POST["rama_height"] : null;

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

	//25% от площади
	$rama_S = ($rama_width*$rama_height)/4;

	//информация о странице
	$pageInfo = $modx->getPageInfo($page);

	//получаем список всех размеров
	$childs = $modx->getActiveChildren($page);

	$tpl = 'steklopaket';


	$txt = '<div class="windows_left">
				<p>Расположение</p>
				<span class = "window_align">
					<span class="align_row">
						<span class="top_left">↖</span>
						<span class="top_center">↑</span>
						<span class="top_right">↗</span>
					</span>
					<span class="align_row">
						<span class="middle_left">←</span>
						<span class="middle_center">☐</span>
						<span class="middle_right">→</span>
					</span>
					<span class="align_row">
						<span class="bottom_left">↙</span>
						<span class="bottom_center">↓</span>
						<span class="bottom_right">↘</span>
					</span>
				</span>
			</div>
			<div class="windows_right">
				<p>Стандартные размеры</p>';
	// $txt .= '<div class = "horizont_align">
	// 			<form>
	// 				<input type="radio" name = "hor_position" id = "left_hor">
	// 				<label for="left_hor">Слева</label>
	// 				<input type="radio" name = "hor_position" id = "middle_hor">
	// 				<label for="middle_hor">Центр</label>
	// 				<input type="radio" name = "hor_position" id = "right_hor">
	// 				<label for="right_hor">Справа</label>
	// 			</form>
	// 		</div>';
	$select = Array();
	foreach ($childs as $key => $value) {
		//получаем информацию о замке
		$child_info_width = $modx->getTemplateVars(Array("glass_width"), '*', $value["id"]);
		$child_info_height = $modx->getTemplateVars(Array("glass_height"), '*', $value["id"]);

		$child_S = $child_info_width[0]["value"]*$child_info_height[0]["value"];

		if($child_S <= $rama_S){
			$filter = "id,".$value["id"].",1";
			$txt .= getHtml($page, $tpl, $modx, $filter);
			if(count($select)==0){
				$select["id"] = $value['id'];
				$select["width"] = $child_info_width[0]["value"];
				$select["height"] = $child_info_height[0]["value"];
			}
		}
	}

	$txt .= "</div>";

	$result["txt"] = $txt;
	$result["page"] = $pageInfo;
	$result["select"] = $select["id"];
	$result["select_width"] = $select["width"];
	$result["select_height"] = $select["height"];
	$result["status"] = "ok";
}

print json_encode($result); 

?>