<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

$page = isset($_POST["page"]) ? $_POST["page"] : null;
$type = isset($_POST["type"]) ? $_POST["type"] : null;

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

	if($page==195){
		$tpl = 'otdelka';
		$filter = "id,198,2";
		$txt = getHtml($page, $tpl, $modx, $filter);
	} else if($page==196 || $page==198 || $page==200){
		if($page==200){
			$tpl = 'color_ral';

			//получаем список всех цветов ral
			$childs = $modx->getActiveChildren($page);

			$txt = '';
			$txt .= "<div class='colors' style = 'display: table !important'>";
			foreach ($childs as $key => $value) {
				$child_info_ispp = $modx->getTemplateVars(Array("cvet_RAL"), '*', $value["id"]);

				if($child_info_ispp[0]["value"]!=""){
					$filter = "id,".$value["id"].",1";
					$txt .= getHtml($page, $tpl, $modx, $filter);
				}
			}
			$txt .= "</div>";

		} else if($page==196) {
			$tpl = 'standart_color';

			$txt = '';
			$txt .= "<div class='colors' style = 'display: table !important'>";
			$txt .= getHtml($page, $tpl, $modx);
			$txt .= "</div>";
		}
	}

	$result["txt"] = $txt;
	$result["page"] = $pageInfo;
	$result["status"] = "ok";
}

print json_encode($result); 

?>