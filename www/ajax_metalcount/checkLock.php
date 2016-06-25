<?php
require_once('../manager/includes/config.inc.php');
require_once('../manager/includes/protect.inc.php');
define('MODX_API_MODE', true);
require_once('../manager/includes/document.parser.class.inc.php');
$modx = new DocumentParser;
$modx->db->connect();
$modx->getSettings();

//получаем информацию
$main_lock = isset($_POST['main_lock']) ? $_POST['main_lock'] : "";
$add_lock = isset($_POST['add_lock']) ? $_POST['add_lock'] : "";
$metalokonstr = isset($_POST['metalokonstr']) ? IntVal($_POST['metalokonstr']) : "";
$outside_view = isset($_POST['outside_view']) ? IntVal($_POST['outside_view']) : "";
$type = isset($_POST['type']) ? $_POST['type'] : "";

if($main_lock!=null){
	$main_lock_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $main_lock);
	$main_lock_type = $modx->getTemplateVars(Array("zamok_type"), '*', $main_lock);
	$main_lock_color = $modx->getTemplateVars(Array("zamok_color"), '*', $main_lock);
}

if($add_lock!=null){
	$add_lock_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $add_lock);
	$add_lock_type = $modx->getTemplateVars(Array("zamok_type"), '*', $add_lock);
	$add_lock_color = $modx->getTemplateVars(Array("zamok_color"), '*', $add_lock);
}

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
$childs = $modx->getActiveChildren(217);

//сортируем по цене
foreach ($childs as $key_sort => $value_sort) {
	$child_info_sort = $modx->getTemplateVars(Array("cena_konstr"), '*', $value_sort["id"]);
	$result_sort["id"] = $value_sort["id"];
	$result_sort["price"] = $child_info_sort[0]["value"];
	$result_for_sort[] = $result_sort;
}

//сортируем по цене
$childs_sorted = array_orderby($result_for_sort, 'price', SORT_ASC);
$new_main_lock = "";
$new_add_lock = "";
$result["ml"] = $main_lock;
$result["al"] = $add_lock;
$result["post"] = $_POST;
if($type=="checkbox_add"){
	$result["main_lock"] = $main_lock;
	//если нажали на чекбокс Основного замка
	if($add_lock!=null && $add_lock!=""){

		if($main_lock!=null && $main_lock!=""){

			//если металлоконструкция Профи и внешняя фурнитура мдф
			if($metalokonstr==193 && $outside_view!=195){
				//если текущий замок DORMA
				if($add_lock_cilindr[0]["value"]=="DORMA" || $add_lock_color[0]["value"]!=$main_lock_color[0]["value"]){
					$first_child_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $childs[1]["id"]);
					$first_child_color = $modx->getTemplateVars(Array("zamok_color"), '*', $childs[1]["id"]);
					$first_child_type = $modx->getTemplateVars(Array("zamok_type"), '*', $childs[1]["id"]);
					$first_child_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $childs[1]["id"]);
					if($first_child_cilindr[0]["value"]=="DORMA" || $first_child_color[0]["value"]!=$main_lock_color[0]["value"] || $first_child_type[0]["value"]=="2-сист" || $first_child_ruchka[0]["value"]!="Без ручки"){
						//прогоняем все замки и ищем по такому же фильтру, как у текущего замка
						foreach($childs_sorted as $key => $value){
							if($new_add_lock == ""){
								$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
								$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
								$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
								$current_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $value["id"]);


								if($current_ruchka[0]["value"]=="Без ручки" && $current_type[0]["value"]==$add_lock_type[0]["value"] && $current_color[0]["value"]==$add_lock_color[0]["value"] && $current_cilindr[0]["value"]!="DORMA"){
									$new_add_lock = $value["id"];
									break;
								}
							}
						}
						//если подходящего не нашлось, то прогоняем опять все замки, но уже без фильтра
						if($new_add_lock == ""){
							foreach($childs_sorted as $key => $value){
								$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
								$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
								$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
								$current_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $value["id"]);

								if($current_type[0]["value"]!="2-сист" && $current_ruchka[0]["value"]=="Без ручки" && $current_cilindr[0]["value"]!="DORMA"){
									$new_add_lock = $value["id"];
									break;
								}
							}
						}

						$result["add_lock"] = $new_add_lock;
					} else {
						$result["add_lock"] = $childs[1]["id"];
					}

				} else {

					$result["add_lock"] = $add_lock;

				}
			} else {

				$result["add_lock"] = $add_lock;

			}

		} else {

			//если металлоконструкция Профи и внешняя фурнитура мдф
			if($metalokonstr==193 && $outside_view!=195){
				//если текущий замок DORMA
				if($add_lock_cilindr[0]["value"]=="DORMA"){
					$first_child_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $childs[1]["id"]);
					$first_child_color = $modx->getTemplateVars(Array("zamok_color"), '*', $childs[1]["id"]);
					$first_child_type = $modx->getTemplateVars(Array("zamok_type"), '*', $childs[1]["id"]);
					$first_child_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $childs[1]["id"]);
					if($first_child_cilindr[0]["value"]=="DORMA" || $first_child_type[0]["value"]=="2-сист" || $first_child_ruchka[0]["value"]!="Без ручки"){
						//прогоняем все замки и ищем по такому же фильтру, как у текущего замка
						foreach($childs_sorted as $key => $value){
							if($new_add_lock == ""){
								$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
								$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
								$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
								$current_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $value["id"]);

								if($current_type[0]["value"]!="2-сист" && $current_ruchka[0]["value"]=="Без ручки" && $current_type[0]["value"]==$add_lock_type[0]["value"] && $current_color[0]["value"]==$add_lock_color[0]["value"] && $current_cilindr[0]["value"]!="DORMA"){
									$new_add_lock = $value["id"];
									break;
								}
							}
						}
						//если подходящего не нашлось, то прогоняем опять все замки, но уже без фильтра
						if($new_add_lock == ""){
							foreach($childs_sorted as $key => $value){
								$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
								$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
								$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
								$current_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $value["id"]);

								if($current_type[0]["value"]!="2-сист" && $current_ruchka[0]["value"]=="Без ручки" && $current_cilindr[0]["value"]!="DORMA"){
									$new_add_lock = $value["id"];
									break;
								}
							}
						}

						$result["add_lock"] = $new_add_lock;
					} else {
						$result["add_lock"] = $childs[1]["id"];
					}

				} else {

					$result["add_lock"] = $add_lock;

				}
			} else {

				$result["add_lock"] = $add_lock;

			}

		}
	} else {
		if($main_lock!=null && $main_lock!=""){

			$first_child_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $childs[1]["id"]);
			$first_child_color = $modx->getTemplateVars(Array("zamok_color"), '*', $childs[1]["id"]);
			$first_child_type = $modx->getTemplateVars(Array("zamok_type"), '*', $childs[1]["id"]);
			$first_child_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $childs[1]["id"]);
			//если металлоконструкция Профи и внешняя фурнитура мдф
			if($metalokonstr==193 && $outside_view!=195){

				if($first_child_cilindr[0]["value"]=="DORMA" || $first_child_color[0]["value"]!=$main_lock_color[0]["value"] || $first_child_type[0]["value"]=="2-сист" || $first_child_ruchka[0]["value"]!="Без ручки"){
					foreach($childs_sorted as $key => $value){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
						$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
						$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
						$current_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $value["id"]);
						if($current_type[0]["value"]!="2-сист" && $current_ruchka[0]["value"]=="Без ручки" && $current_color[0]["value"]==$main_lock_color[0]["value"] && $current_cilindr[0]["value"]!="DORMA"){
							$result["add_lock"] = $value["id"];
							break;
						}
					}
				} else {
					$result["add_lock"] = $childs[1]["id"];
				}

			} else {

				if($first_child_color[0]["value"]!=$main_lock_color[0]["value"] || $first_child_type[0]["value"]=="2-сист" || $first_child_ruchka[0]["value"]!="Без ручки"){
					foreach($childs_sorted as $key => $value){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
						$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
						$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
						$current_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $value["id"]);

						if($current_type[0]["value"]!="2-сист" && $current_ruchka[0]["value"]=="Без ручки" && $current_color[0]["value"]==$main_lock_color[0]["value"]){
							$result["add_lock"] = $value["id"];
							break;
						}
					}
				} else {
					$result["add_lock"] = $childs[1]["id"];
				}

			}
			
		} else {
			$first_child_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $childs[1]["id"]);
			$first_child_color = $modx->getTemplateVars(Array("zamok_color"), '*', $childs[1]["id"]);
			$first_child_type = $modx->getTemplateVars(Array("zamok_type"), '*', $childs[1]["id"]);
			$first_child_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $childs[1]["id"]);
			//если металлоконструкция Профи и внешняя фурнитура мдф
			if($metalokonstr==193 && $outside_view!=195){

				if($first_child_cilindr[0]["value"]=="DORMA" || $first_child_type[0]["value"]=="2-сист" || $first_child_ruchka[0]["value"]!="Без ручки"){
					foreach($childs_sorted as $key => $value){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
						$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
						$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
						$current_ruchka = $modx->getTemplateVars(Array("ruchka"), '*', $value["id"]);
						if($current_type[0]["value"]!="2-сист" && $current_ruchka[0]["value"]=="Без ручки" && $current_cilindr[0]["value"]!="DORMA"){
							$result["add_lock"] = $value["id"];
							break;
						}
					}
				} else {
					$result["add_lock"] = $childs[1]["id"];
				}

			} else {

				$result["add_lock"] = $childs[1]["id"];

			}
		}
	}
} else if($type=="checkbox_main"){
	$result["add_lock"] = $add_lock;
	//если нажали на чекбокс Основного замка
	if($main_lock!=null && $main_lock!=""){

		if($add_lock!=null && $add_lock!=""){

			//если металлоконструкция Профи и внешняя фурнитура мдф
			if($metalokonstr==193 && $outside_view!=195){
				//если текущий замок DORMA
				if($main_lock_cilindr[0]["value"]=="DORMA" || $main_lock_color[0]["value"]!=$add_lock_color[0]["value"]){
					$first_child_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $childs[0]["id"]);
					$first_child_color = $modx->getTemplateVars(Array("zamok_color"), '*', $childs[0]["id"]);
					if($first_child_cilindr[0]["value"]=="DORMA" || $first_child_color[0]["value"]!=$add_lock_color[0]["value"]){
						//прогоняем все замки и ищем по такому же фильтру, как у текущего замка
						foreach($childs_sorted as $key => $value){
							if($new_main_lock == ""){
								$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
								$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
								$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);

								if($current_type[0]["value"]==$main_lock_type[0]["value"] && $current_color[0]["value"]==$main_lock_color[0]["value"] && $current_cilindr[0]["value"]!="DORMA"){
									$new_main_lock = $value["id"];
									break;
								}
							}
						}
						//если подходящего не нашлось, то прогоняем опять все замки, но уже без фильтра
						if($new_main_lock == ""){
							foreach($childs_sorted as $key => $value){
								$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);

								if($current_cilindr[0]["value"]!="DORMA"){
									$new_main_lock = $value["id"];
									break;
								}
							}
						}

						$result["main_lock"] = $new_main_lock;
					} else {
						$result["main_lock"] = $childs[0]["id"];
					}

				} else {

					$result["main_lock"] = $main_lock;

				}
			} else {

				$result["main_lock"] = $main_lock;

			}

		} else {

			//если металлоконструкция Профи и внешняя фурнитура мдф
			if($metalokonstr==193 && $outside_view!=195){
				//если текущий замок DORMA
				if($main_lock_cilindr[0]["value"]=="DORMA"){
					$first_child_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $childs[0]["id"]);
					$first_child_color = $modx->getTemplateVars(Array("zamok_color"), '*', $childs[0]["id"]);
					if($first_child_cilindr[0]["value"]=="DORMA"){
						//прогоняем все замки и ищем по такому же фильтру, как у текущего замка
						foreach($childs_sorted as $key => $value){
							if($new_main_lock == ""){
								$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
								$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
								$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);

								if($current_type[0]["value"]==$main_lock_type[0]["value"] && $current_color[0]["value"]==$main_lock_color[0]["value"] && $current_cilindr[0]["value"]!="DORMA"){
									$new_main_lock = $value["id"];
									break;
								}
							}
						}
						//если подходящего не нашлось, то прогоняем опять все замки, но уже без фильтра
						if($new_main_lock == ""){
							foreach($childs_sorted as $key => $value){
								$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);

								if($current_cilindr[0]["value"]!="DORMA"){
									$new_main_lock = $value["id"];
									break;
								}
							}
						}

						$result["main_lock"] = $new_main_lock;
					} else {
						$result["main_lock"] = $childs[0]["id"];
					}

				} else {

					$result["main_lock"] = $main_lock;

				}
			} else {

				$result["main_lock"] = $main_lock;

			}

		}
	} else {
		if($add_lock!=null && $add_lock!=""){

			$first_child_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $childs[0]["id"]);
			$first_child_color = $modx->getTemplateVars(Array("zamok_color"), '*', $childs[0]["id"]);
			//если металлоконструкция Профи и внешняя фурнитура мдф
			if($metalokonstr==193 && $outside_view!=195){

				if($first_child_cilindr[0]["value"]=="DORMA" || $first_child_color[0]["value"]!=$add_lock_color[0]["value"]){
					foreach($childs_sorted as $key => $value){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
						$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
						$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
						if($current_color[0]["value"]==$add_lock_color[0]["value"] && $current_cilindr[0]["value"]!="DORMA"){
							$result["main_lock"] = $value["id"];
							break;
						}
					}
				} else {
					$result["main_lock"] = $childs[0]["id"];
				}

			} else {

				if($first_child_color[0]["value"]!=$add_lock_color[0]["value"]){
					foreach($childs_sorted as $key => $value){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
						$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
						$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);

						if($current_color[0]["value"]==$add_lock_color[0]["value"]){
							$result["main_lock"] = $value["id"];
							break;
						}
					}
				} else {
					$result["main_lock"] = $childs[0]["id"];
				}

			}
			
		} else {
			$first_child_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $childs[0]["id"]);
			$first_child_color = $modx->getTemplateVars(Array("zamok_color"), '*', $childs[0]["id"]);
			//если металлоконструкция Профи и внешняя фурнитура мдф
			if($metalokonstr==193 && $outside_view!=195){

				if($first_child_cilindr[0]["value"]=="DORMA"){
					foreach($childs_sorted as $key => $value){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
						$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
						$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);
						if($current_cilindr[0]["value"]!="DORMA"){
							$result["main_lock"] = $value["id"];
							break;
						}
					}
				} else {
					$result["main_lock"] = $childs[0]["id"];
				}

			} else {

				$result["main_lock"] = $childs[0]["id"];

			}
		}
	}
} else {

	if($main_lock!=null && $main_lock!=""){
		if($metalokonstr==193 && $outside_view!=195){
			if($main_lock_cilindr[0]["value"]=="DORMA"){

				foreach($childs_sorted as $key => $value){
					if($new_main_lock == ""){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
						$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
						$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);

						if($current_type[0]["value"]==$main_lock_type[0]["value"] && $current_color[0]["value"]==$main_lock_color[0]["value"] && $current_cilindr[0]["value"]!="DORMA"){
							$new_main_lock = $value["id"];
							break;
						}
					}
				}

				if($new_main_lock == ""){
					foreach($childs_sorted as $key => $value){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);

						if($current_cilindr[0]["value"]!="DORMA"){
							$new_main_lock = $value["id"];
							break;
						}
					}
				}

				$result["main_lock"] = $new_main_lock;

			} else {
				$result["main_lock"] = $main_lock;
			}
		} else {
			$result["main_lock"] = $main_lock;
		}
	} else {
		
		$result["main_lock"] = $main_lock;

	}

	//проверяем дополнительный замок
	if($add_lock!=null && $add_lock!=""){
		if($metalokonstr==193 && $outside_view!=195){
			if($add_lock_cilindr[0]["value"]=="DORMA"){

				foreach($childs_sorted as $key => $value){
					if($new_add_lock == ""){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);
						$current_type = $modx->getTemplateVars(Array("zamok_type"), '*', $value["id"]);
						$current_color = $modx->getTemplateVars(Array("zamok_color"), '*', $value["id"]);

						if($current_type[0]["value"]==$add_lock_type[0]["value"] && $current_color[0]["value"]==$add_lock_color[0]["value"] && $current_cilindr[0]["value"]!="DORMA"){
							$new_add_lock = $value["id"];
							break;
						}
					}
				}

				if($new_add_lock == ""){
					foreach($childs_sorted as $key => $value){
						$current_cilindr = $modx->getTemplateVars(Array("cilindr"), '*', $value["id"]);

						if($current_cilindr[0]["value"]!="DORMA"){
							$new_add_lock = $value["id"];
							break;
						}
					}
				}

				$result["add_lock"] = $new_add_lock;

			} else {
				$result["add_lock"] = $add_lock;
			}
		} else {
			$result["add_lock"] = $add_lock;
		}
	} else {
		
		$result["add_lock"] = $add_lock;

	}

}



print json_encode($result);


?>