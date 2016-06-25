$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

$(document).ready(function() {
	var order = {};
	var default_order = {};
	var color = {};
	var price = {};
	var horizont = 12;
	var vertical = 12;
	var width_1 = 157; 
	var height_1 = 349;
	var width_back_1 = 147;
	var height_back_1 = 343;
	var horizont_back = 8;
	var vertical_back = 5;
	var width_2 = 133;
	var height_2 = 334;
	var petlya_width = 5;
	var petlya_height = 20;
	var petlya_1_vertical = 40;
	var petlya_2_vertical = 85;
	var petlya_3_vertical = 290;
	var petlya_horizont = 10;
	var type = '';
	var nalichnik = '/images/metalcount/nalichnik-front.png';
	var shadow = '/images/metalcount/shadow.png';
	var canChange = true;
	function isDisabled(canChange){
		if (canChange === false){
			$('select, input').prop('disabled', true);
			$('.load_order_number input').prop('disabled', false);
			$('.setting_value, .side').css({
				'color': 'blue',
				'font-weight': 'bold',
				'text-decoration': 'none',
				'cursor' : 'default'
			});
			$(".load_order_form input").prop('disabled', false);
		}else{
			$('select, input').prop('disabled', false);
			$('.setting_value, .side').css({
				'color': 'blue',
				'font-weight': 'normal',
				'text-decoration': 'underline',
				'cursor' : 'pointer'
			});
			if (order.outside_view == 195){
				$('.setting_value.outside_color').css({
					'color': 'blue',
					'font-weight': 'bold',
					'text-decoration': 'none',
					'cursor' : 'default'
				});
			}
			if (order.inside_view == 195){
				$('.setting_value.inside_color').css({
					'color': 'blue',
					'font-weight': 'bold',
					'text-decoration': 'none',
					'cursor' : 'default'
				});
			}
		}
	}
	isDisabled(canChange);
	function fillPole(key){
		
		$.ajax({
			url: '/ajax_metalcount/get_names.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {'page': order[key], 'inside_view': order.inside_view, 'key': key},
			success: function(data){
				if (data['pagetitle'] !== undefined){
					$('.setting_value.'+key).html(data['pagetitle']);
					$('#check_'+key).prop('checked', true);
					
						var current_height = $('.setting_value.'+key).height();
						// $('.option_settings').css('height', 'auto');
						$('.option_settings.active').height(current_height);
						// $('.option_name').css('height', 'auto');
						$('.option_name.active').height(current_height);
					
					

					if(key=="metallokonstr"){
						if(order[key]=="191"){
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
						} else if(order[key]=="192"){
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
						} else if(order[key]=="193"){
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
							$('.setting_value.'+key).append('<img class="star" src="/images/metalcount/star.png">');
						}
					}
				}else{
					$('.setting_value.'+key).html('');
					$('#check_'+key).prop('checked', false);	
				}
			}
		});
		if (isChange[key] == false){
			$('.setting_value.'+key).css('font-weight', 'bold');
			$('.setting_value.'+key).css('cursor', 'default');
			$('.setting_value.'+key).css('text-decoration', 'none');
			$('#check_'+key).prop('disabled', true);
		} else {
			$('.setting_value.'+key).css('font-weight', 'normal');
			$('.setting_value.'+key).css('cursor', 'pointer');
			$('.setting_value.'+key).css('text-decoration', 'underline');
			$('#check_'+key).prop('disabled', false);
		}
		if (order.inside_view == 195){
			$('.setting_value.inside_color').css('font-weight', 'bold');
			$('.setting_value.inside_color').css('cursor', 'default');
			$('.setting_value.inside_color').css('text-decoration', 'none');
		}else{
			if (isChange.inside_color){
				$('.setting_value.inside_color').css('color', 'blue');
				$('.setting_value.inside_color').css('font-weight', 'normal');
				$('.setting_value.inside_color').css('cursor', 'pointer');
				$('.setting_value.inside_color').css('text-decoration', 'underline');
			}
		}
		if (order.outside_view == 195){
			$('.setting_value.outside_color').css('font-weight', 'bold');
			$('.setting_value.outside_color').css('cursor', 'default');
			$('.setting_value.outside_color').css('text-decoration', 'none');
		}else{
			if (isChange.outside_color){
				$('.setting_value.outside_color').css('color', 'blue');
				$('.setting_value.outside_color').css('font-weight', 'normal');
				$('.setting_value.outside_color').css('cursor', 'pointer');
				$('.setting_value.outside_color').css('text-decoration', 'underline');
			}
		}
		if (order.main_lock == '' || order.main_lock == null){
			$('.main_lock_title').css('display', 'none');
		}else{
			$('.main_lock_title').css('display', 'block');
		}
		if (order.add_lock == '' || order.add_lock == null){
			$('.add_lock_title').css('display', 'none');
		}else{
			$('.add_lock_title').css('display', 'block');	
		}
	}

	// Получит параметр URL по его имени
	var isProduct = false;
	var special = $.getUrlVar('special');
	if(special==undefined){
		special = null;
		isProduct = false;
	} else {
		$(".load_order_button").after('<span class="new_project">Новый проект</span>');
	}

	var product = $.getUrlVar('product');
	if(product==undefined){
		product = null;
		isProduct = false;
	} else {
		$(".load_order_button").after('<span class="new_project">Новый проект</span>');
		special = product;
		isProduct = true;

		if(product==141){
			// alert("f");
			$(".option_name.outside_view").hide();
			$(".option_order.outside-color").hide();
			$(".option_name.inside_view").hide();
			$(".option_order.inside-color").hide();
			$(".glazok.options").hide();
			$(".option_name.add_lock").parent().hide();
		}
	}

	$(".B_crumbBox").append(' » <span class="my_breadcrumb">Новый проект</span>');

	var project = $.getUrlVar('project');
	if(project==undefined ){
		defaultLoad(special, product);
	} else {
		defaultLoad(special, product);
		getOrder(project);
	}

	var child_color;
	var child_color_l;

	var child_frezer_6;
	var child_frezer_10;
	var child_frezer_10z;

	var child_standart_color;
	var child_antik_color;
	var child_spec_color;
	function defaultLoad(spec, prod){
		$.ajax({
			url: '/ajax_metalcount/default_data.php',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: {'special': spec, 'product': prod},
			success: function(data){
				console.log("default");
				console.log(data);
				order = {
					metallokonstr: data['metallokonstrikcii_id']['value'],
					width_door: data['width']['value'],
					height_door: data['height']['value'],
					door_side: data['door_side']['value'],
					main_color_type: data['main_color_type_id']['value'],
					main_color: data['okrashivanie_id']['value'],
					outside_view: data['outside-view_id']['value'],
					outside_color: data['outside-color_id']['value'],
					outside_frezer: data['outside-frezer_id']['value'],
					outside_nalichnik: data['nalichniki_id']['value'],
					inside_view: data['inside-view_id']['value'],
					inside_color: data['inside-color_id']['value'],
					inside_frezer: data['inside-frezer_id']['value'],
					main_lock: data['main-lock_id']['value'],
					add_lock: data['add-lock_id']['value'],
					glazok: data['glazok-konstr_id']['value'],
					dovodchik: data['dovodchik_id']['value'],
					zadvijka: data['zadvijka_id']['value']
				};
				default_order ={
					metallokonstr: data['metallokonstrikcii_id']['value'],
					width_door: data['width']['value'],
					height_door: data['height']['value'],
					door_side: data['door_side']['value'],
					main_color_type: data['main_color_type_id']['value'],
					main_color: data['okrashivanie_id']['value'],
					outside_view: data['outside-view_id']['value'],
					outside_color: data['outside-color_id']['value'],
					outside_frezer: data['outside-frezer_id']['value'],
					outside_nalichnik: data['nalichniki_id']['value'],
					inside_view: data['inside-view_id']['value'],
					inside_color: data['inside-color_id']['value'],
					inside_frezer: data['inside-frezer_id']['value'],
					main_lock: data['main-lock_id']['value'],
					add_lock: data['add-lock_id']['value'],
					glazok: data['glazok-konstr_id']['value'],
					dovodchik: data['dovodchik_id']['value'],
					zadvijka: data['zadvijka_id']['value']
				};
				isChange = {
					metallokonstr: data['metallokonstrikcii_id']['changable'],
					width_door: data['width']['changable'],
					height_door: data['height']['changable'],
					door_side: data['door_side']['changable'],
					main_color: data['okrashivanie_id']['changable'],
					main_color_type: data['main_color_type_id']['changable'],
					outside_view: data['outside-view_id']['changable'],
					outside_color: data['outside-color_id']['changable'],
					outside_frezer: data['outside-frezer_id']['changable'],
					outside_nalichnik: data['nalichniki_id']['changable'],
					inside_view: data['inside-view_id']['changable'],
					inside_color: data['inside-color_id']['changable'],
					inside_frezer: data['inside-frezer_id']['changable'],
					main_lock: data['main-lock_id']['changable'],
					add_lock: data['add-lock_id']['changable'],
					glazok: data['glazok-konstr_id']['changable'],
					dovodchik: data['dovodchik_id']['changable'],
					zadvijka: data['zadvijka_id']['changable']
				};
				if (project != undefined){
					for (var key in isChange){
						isChange[key] = false;
					}
				}
				child_color = data['child_color']['value'];
				child_color_l = data['child_color_l']['value'];
				child_frezer_6 = data['child_frezer_6']['value'];
				child_frezer_10 = data['child_frezer_10']['value'];
				child_frezer_10z = data['child_frezer_10z']['value'];
				child_standart_color = data['child_standart_color']['value'];
				child_antik_color = data['child_antik_color']['value'];
				child_spec_color = data['child_spec_color']['value'];
				if(data["special_name"]!=undefined){
					if (isProduct){
						$(".content h1").html("Модель \""+data["special_name"]+"\"");
					}else{
						$(".content h1").html("Акция \""+data["special_name"]+"\"");
					}
				}
				$(".setting_value.main_color").data("pageid",order.main_color_type);
				$(".content h1").show();
				getPrice();
			}
		});
	}
	for( var key in order){
		if (order[key] !== null || order[key] !== undefined || key != 'width_door' || key != 'height_door'){
			fillPole(key);
		}else{
		}
	}
	$('#input-height').val(order.height_door);
	$('#input-width').val(order.width_door);
	$('.width-value').html(order.width_door);
	$('.height-value').html(order.height_door);
	function check_color(order){
		$.ajax({
			url: '/ajax_metalcount/drawing.php',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: {
				'main_color': order.main_color, 
				'outside_view': order.outside_view,
				'outside_color': order.outside_color,
				'outside_frezer': order.outside_frezer,
				'inside_view': order.inside_view,
				'inside_color': order.inside_color,
				'inside_frezer': order.inside_frezer,
				'main_lock': order.main_lock,
				'add_lock': order.add_lock,
				'glazok': order.glazok,
				'zadvijka': order.zadvijka
			},
			success: function(data){
				color['main_color_color'] = data['main_color_color'];
				color['main_color_type'] = data['main_color_type'];
				color['main_color_shade'] = data['main_color_shade'];
				color['outside_color_color'] = data['outside_color_color'];
				color['outside_color_type'] = data['outside_color_type'];
				color['outside_color_frezer'] = data['outside_frezer'];
				color['outside_shade'] = data['outside_shade']
				color['inside_color_color'] = data['inside_color_color'];
				color['inside_color_type'] = data['inside_color_type'];
				color['inside_color_frezer'] = data['inside_frezer'];
				color['inside_color_frezer_mirror'] = data['inside_mirror'];
				color['inside_shade'] = data['inside_shade'];
				color['main_lock'] = data['main_lock'];
				color['main_lock_outside_picture'] = data['main_lock_outside_picture'];
				color['main_lock_type'] = data['main_lock_type'];
				color['main_lock_ruchka'] = data['main_lock_ruchka'];
				color['main_lock_ruchka_image'] = data['main_lock_ruchka_image'];
				color['main_lock_inside_bottom'] = data['main_lock_inside_bottom'];
				color['main_lock_inside_top'] = data['main_lock_inside_top'];
				color['main_lock_isCloser'] = data['main_lock_isCloser'];
				color['is_main_lock_syst'] = data['is_main_lock_syst'];
				color['add_lock'] = data['add_lock'];
				color['add_lock_color'] = data['add_lock_color'];
				color['add_lock_type'] = data['add_lock_type'];
				color['add_lock_image'] = data['add_lock_image'];
				color['add_image_zamok_syst_inside'] = data['add_image_zamok_syst_inside'];
				color['add_image_zamok_inside'] = data['add_image_zamok_inside'];
				color['glazok'] = data['glazok'];
				color['furniture_color'] = data['furniture_color'];
				color['zadvijka_image'] = data['zadvijka'];
				color['is_main_lock_barier'] = data['is_main_lock_barier'];
				color['is_add_lock_barier'] = data['is_add_lock_barier'];
			}
		});
		console.log(color);
		if (color.outside_color_type == 'czvet' && order.outside_view != 231){
			$('.outside_frezerovka').css('display', 'block');
		}else{
			$('.outside_frezerovka').css('display', 'none');
		}
		if (color.inside_color_type == 'czvet' && order.inside_view != 231){
			$('.inside-frezerovka').css('display', 'block');
		}else{
			$('.inside-frezerovka').css('display', 'none');
		}
	}
	check_color(order);
	function draw_bottom(canvas, this_nalichnik, this_shadow, no_nalichnik, bottom_line){
		canvas.clearRect(horizont, height_2 + vertical, width_1 - 2*horizont, height_1 - height_2 - vertical);
		if (color.main_color_type == 'tablicza-czvetov-ral1'){
			//			canvas, col,                    w,                    h,                              pad_top,             pad_left, this_nalichnik, this_shadow, no_nalichnik, isOutdoor, bottom_line
			color_color(canvas, color.main_color_color, width_1 - 2*horizont, height_1 - height_2 - vertical, height_2 + vertical, horizont, this_nalichnik, this_shadow, no_nalichnik, false, bottom_line);
		}else{
			var current_image = new Image();
			current_image.src = color.main_color_color;
			current_image.onload = function(){
				canvas.drawImage(current_image, horizont, height_2 + vertical, width_1 - 2*horizont, height_1 - height_2 - vertical);
			}
		}
	}
	function image_color(canvas, col, w, h, pad_top, pad_left, this_nalichnik, this_shadow, no_nalichnik, isOutdoor, bottom_line){
		canvas.clearRect(pad_left, pad_top, w, h);
		canvas.fillStyle = '#ccc';
		canvas.fillRect(pad_left, pad_top, w, h);
		var current_image = new Image();
		current_image.src = col;
		current_image.onload = function(){
			if (no_nalichnik == false){
				var tmp_w = w/150;
				var tmp_h = h/207;
			}else{
				var tmp_w = w/139;
				var tmp_h = h/195;
			}
			for (var i = pad_left; i < w + 6; i +=tmp_w){
				for (var j = pad_top; j < h+5; j+=tmp_h){
					canvas.drawImage(current_image, i, j, tmp_w, tmp_h);
				}
			}
			
			if (no_nalichnik == false){
				draw_shadow(canvas, this_nalichnik, 0, 0, width_1, height_1, isOutdoor, true);
			}
			if (bottom_line==false){
				draw_shadow(canvas, this_shadow, horizont, vertical, width_2, height_1 - vertical, isOutdoor, false);
			}
		}

	}
	function color_color(canvas, col, w, h, pad_top, pad_left, this_nalichnik, this_shadow, no_nalichnik, isOutdoor, bottom_line){
		canvas.clearRect(pad_left, pad_top, w, h);
		canvas.fillStyle = col;
		canvas.fillRect(pad_left, pad_top, w, h);
		
		if (no_nalichnik == false){
			//alert(isOutdoor);
			
			draw_shadow(canvas, this_nalichnik, 0, 0, width_1, height_1, isOutdoor, true);
		}
		if (bottom_line == false){
			//alert(isOutdoor);
			// if(isOutdoor==false){
			// 	alert("check2");
			// }
			draw_shadow(canvas, this_shadow, horizont, vertical, width_2, height_1 - vertical, isOutdoor, false);
		}
	}
	function draw_mdf(canvas, current_image, pad_left, pad_top, w, h){
		canvas.drawImage(current_image, pad_left, pad_top, w, h)
	}
	function mdf_color(canvas, col, w, h, pad_top, pad_left, nalich, this_nalichnik, this_shadow, isOutdoor, bottom_line){
		canvas.clearRect(pad_left, pad_top, w, h);
		var current_image = new Image();
		current_image.src = col;
		current_image.onload = function (){
			setTimeout(draw_mdf, 1000, canvas, current_image, pad_left, pad_top, w, h);
			if (nalich == true){
				draw_bottom(canvas, this_nalichnik, this_shadow);
				setTimeout(draw_shadow, 1000, canvas, this_nalichnik, 0, 0, width_1, height_1, isOutdoor, true);
			}
			setTimeout(draw_shadow, 1000, canvas, this_shadow, horizont, vertical, width_2, height_2, isOutdoor, false);
		}
	}
	function draw_shadow(canvas, this_shadow, pad_left, pad_top, w, h, isOutdoor, nalichnik){

		var shadow_image = new Image();
		shadow_image.src = this_shadow;
		shadow_image.onload = function(){
			canvas.drawImage(shadow_image, pad_left, pad_top, w, h);
			
			if(nalichnik==false){
				if (isOutdoor){
					draw_petly(canvas);
				}
				draw_furniture(canvas, isOutdoor);
			}
		}
	}
	var isGlazok = true;
	function draw_furniture(canvas, isOutdoor){
		if (isOutdoor == false){
			if (color.inside_color_frezer_mirror == 'true'){
				draw_mirror(canvas, isOutdoor);
				isGlazok = false;
			}else{
				draw_main_lock(canvas, isOutdoor);
				isGlazok = true;
			}
		}else{
			if (color.inside_color_frezer_mirror == 'true'){
				isGlazok = false;
			}
			draw_main_lock(canvas, isOutdoor);
		}
	}
	function draw_double_system(canvas, isOutdoor){
		var lock = new Image();
		if (isOutdoor){
			lock.src = color.main_lock_outside_picture;
		}else{
			lock.src = color.main_lock_inside_top;
		}
		lock.onload = function(){
			var proportion = lock.width/13;
			var h = lock.height/proportion;
			canvas.drawImage(lock, 134 - 13/2, 160 - h/2, 13, h);
			draw_ruchka(canvas, isOutdoor);
		}
	}
	function draw_main_lock(canvas, isOutdoor){
		var main_lock = new Image();
		main_lock.src = color.main_lock;
		var flag = false;
		if (isOutdoor == false){
			if (color.main_lock_ruchka != "Ручка на планке" && color.main_lock_inside_bottom != ''){
				main_lock.src = color.main_lock_inside_bottom;
			}else if (color.main_lock_inside_bottom == '' && color.main_lock_ruchka != "Ручка на планке"){
				main_lock.src = color.main_lock;
			}
			if (color.is_main_lock_syst){
				draw_double_system(canvas, isOutdoor);
			}
		}
		if (color.main_lock == ''){
			draw_ruchka(canvas, isOutdoor);
		}else{
			main_lock.onload = function(){
				if (color.main_lock_ruchka != "Ручка на планке"){
					var proportion = main_lock.width/13;
					var h = main_lock.height/proportion;
					if(color.is_main_lock_barier){
						if (isOutdoor){
							canvas.drawImage(main_lock, 128, 191, 13, 13);	
						}else{
							canvas.drawImage(main_lock, 134-22/2, 195-h/2, 22, 13);
						}
					} else{
						canvas.drawImage(main_lock, 134 - 13/2, 200 - h/2, 13, h);
					}
				}else{
					canvas.drawImage(main_lock, 106, 160, 45, 45);
				}
				if (color.is_main_lock_syst){
					if (isOutdoor){
						draw_double_system(canvas, isOutdoor);
					}
				}else{
					if (color.main_lock_ruchka != "Ручка на планке"){
						draw_ruchka(canvas, isOutdoor);
					}else{
						draw_add_lock(canvas, isOutdoor);
					}
				}
			}
		}
	}
	function draw_add_lock(canvas, isOutdoor){
		var add_lock = new Image();
		add_lock.src = color.add_lock;
		if (isOutdoor == false){
			if (color.add_lock_type == "цилиндр" && (color.main_lock_type == "сувальд." || (color.main_lock == "" && order.zadvijka == ""))){
				add_lock.src = color.add_image_zamok_inside;
			}else{
				if (color.add_lock_type == 'сувальд.'){
					add_lock.src = color.add_image_zamok_inside;
				}else{
					add_lock.src = color.add_image_zamok_syst_inside;
				}
			}
		}
		if (color.add_lock == ''){
			draw_glazok(canvas, isOutdoor);
		}else{
			add_lock.onload = function(){
				var proportion = add_lock.width/13;
				var h = add_lock.height/proportion;
				if(color.is_add_lock_barier){
					if (isOutdoor){
						canvas.drawImage(add_lock, 129, 103 - h/2, 13, 13);
					}else{
						canvas.drawImage(add_lock, 134 - 22/2, 100 - h/2, 22, 13);
					}
				} else {
					canvas.drawImage(add_lock, 134 - 13/2, 105 - h/2, 13, h);
				}
				draw_glazok(canvas, isOutdoor);
			}
		}
	}
	function draw_ruchka(canvas, isOutdoor){
		var ruchka = new Image();
		ruchka.src = color.main_lock_ruchka_image;
		if (color.main_lock_ruchka == "Без ручки" || color.main_lock == '' || color.main_lock_ruchka_image == ''){
			ruchka.src = '/images/metalcount/ruchka_round.png';
		}
		ruchka.onload = function(){
			var proportion = ruchka.width/36;
			var h = ruchka.height/proportion;
			if (color.main_lock_ruchka == 'Без ручки' || color.main_lock == ''|| color.main_lock_ruchka_image == ''){
				proportion = ruchka.width/25;
				h = ruchka.height/proportion;
				canvas.drawImage(ruchka,134 - 25/2, 165, 25, h);	
			}else if(color.main_lock_ruchka == 'С ручкой'){
				canvas.drawImage(ruchka, 105,173, 36, h);
			}
			draw_add_lock(canvas, isOutdoor);
		}
	}
	function draw_zadvijka(canvas, isOutdoor){
		if (isOutdoor == false){
			var zadvijka = new Image();
			zadvijka.src = color.zadvijka_image;
			if (color.zadvijka_image != ''){
				zadvijka.onload = function(){
					var proportion = zadvijka.width/13;
					var h = zadvijka.height/proportion;
					canvas.drawImage(zadvijka, 134 - 13/2, 130, 13, h);
					if (order.door_side == 'left'){
						reverse();
					}else if(order.door_side == 'right'){
						reverse2();
					}					
				}
			}else{
				if (order.door_side == 'left'){
					reverse();
				}else if(order.door_side == 'right'){
					reverse2();
				}
			}
		} else {
			draw_back_door(color);
		}
	}
	function draw_mirror(canvas, isOutdoor){
		var mirror = new Image();
		var way;
		if (isOutdoor){
			way = $(".setting_value.outside_frezer").html();
		}else{
			way = $(".setting_value.inside_frezer").html();
		}
		mirror.src = '/images/metalcount/mirrors/'+way+'/01.png';
		mirror.onload = function(){
			canvas.drawImage(mirror, horizont, vertical, width_2, height_1 - vertical);
			draw_main_lock(canvas, isOutdoor);
		}
	}
	function draw_glazok(canvas, isOutdoor){
		if (isGlazok == true){
			var glazok = new Image();
			glazok.src = color.glazok;
			if (color.glazok == ''){
				draw_zadvijka(canvas, isOutdoor);
			}else{
				glazok.onload = function(){
					canvas.drawImage(glazok, 74, 83, 12, 12);
					draw_zadvijka(canvas, isOutdoor);
				}			
			}
		}else{
			draw_zadvijka(canvas, isOutdoor);
		}
	}
	function reverse(){
		$('.preloader').show();
		var canvas_2 = document.getElementById('door-back');
		var razmer = parseInt(canvas_2.width/2);
		var ctx_2 = canvas_2.getContext("2d");
		for(var i = 0; i <= razmer; i++){
			imgd = ctx_2.getImageData(i,0, 1, canvas_2.height);
			imgd1 = ctx_2.getImageData((canvas_2.width-i),0, 1, canvas_2.height);
			ctx_2.putImageData(imgd, (canvas_2.width-i), 0);
			ctx_2.putImageData(imgd1, i, 0);
		}
		$('.preloader').hide();
		//$('select, input').prop('disabled', false);
		$('.hider').hide();

		return false;
	}
	function reverse2(){
		$('.preloader').show();
		var canvas_1 = document.getElementById('door-front');
		var razmer = parseInt(canvas_1.width/2);
		var ctx_1 = canvas_1.getContext("2d");
		for(var i = 0; i <= razmer; i++){
			imgd = ctx_1.getImageData(i,0, 1, canvas_1.height);
			imgd1 = ctx_1.getImageData((canvas_1.width-i),0, 1, canvas_1.height);
			ctx_1.putImageData(imgd, (canvas_1.width-i), 0);
			ctx_1.putImageData(imgd1, i, 0);
		}
		$('.preloader').hide();
		//$('select, input').prop('disabled', false);
		$('.hider').hide();
		return false;
	}
	function draw_petly(canvas){
		var petlya = new Image();
		petlya.src = '/images/metalcount/petlya.png';
		petlya.onload = function(){
			canvas.clearRect(petlya_horizont, petlya_1_vertical, petlya_width, petlya_height);
			if(order.metallokonstr != 191){//если металлоконструкция основа, то рисуем 2 петли
				canvas.clearRect(petlya_horizont, petlya_2_vertical, petlya_width, petlya_height);
			}
			canvas.clearRect(petlya_horizont, petlya_3_vertical, petlya_width, petlya_height);
			if (color.main_color_type == 'tablicza-czvetov-ral1'){
				canvas.fillStyle = color.main_color_color;
				canvas.fillRect(petlya_horizont, petlya_1_vertical, petlya_width, petlya_height);
				if (order.metallokonstr != 191){
					canvas.fillRect(petlya_horizont, petlya_2_vertical, petlya_width, petlya_height);
				}
				canvas.fillRect(petlya_horizont, petlya_3_vertical, petlya_width, petlya_height);
				canvas.fillStyle = '#999';
				canvas.fillRect(petlya_horizont, petlya_1_vertical + petlya_height/2, petlya_width, 1);
				if (order.metallokonstr != 191){
					canvas.fillRect(petlya_horizont, petlya_2_vertical + petlya_height/2, petlya_width, 1);
				}
				canvas.fillRect(petlya_horizont, petlya_3_vertical + petlya_height/2, petlya_width, 1);
				draw_draw_petly(canvas, petlya);
			}else{
				var petlya_background = new Image();
				petlya_background.src = color.main_color_color;
				petlya_background.onload = function(){
					canvas.drawImage(petlya_background, petlya_horizont, petlya_1_vertical, petlya_width, petlya_height);
					if (order.metallokonstr != 191){
						canvas.drawImage(petlya_background, petlya_horizont, petlya_2_vertical, petlya_width, petlya_height);
					}
					canvas.drawImage(petlya_background, petlya_horizont, petlya_3_vertical, petlya_width, petlya_height);
					canvas.fillStyle = '#999';
					canvas.fillRect(petlya_horizont, petlya_1_vertical + petlya_height/2, petlya_width, 1);
					if (order.metallokonstr != 191){
						canvas.fillRect(petlya_horizont, petlya_2_vertical + petlya_height/2, petlya_width, 1);
					}
					canvas.fillRect(petlya_horizont, petlya_3_vertical + petlya_height/2, petlya_width, 1);
					draw_draw_petly(canvas, petlya);
				}
			}
		}
	}
	function draw_draw_petly(canvas, petlya){
		canvas.drawImage(petlya, petlya_horizont, petlya_1_vertical, petlya_width, petlya_height);
		if (order.metallokonstr != 191){
			canvas.drawImage(petlya, petlya_horizont, petlya_2_vertical, petlya_width, petlya_height);
		}
		canvas.drawImage(petlya, petlya_horizont, petlya_3_vertical, petlya_width, petlya_height);
	}
	function check_furniture(filter_1, filter_2, type, id_zamok, sort_value){
		$.ajax({
			url: '/ajax_metalcount/draw_furniture.php',
			type: 'POST',
			async: false,
			dataType: 'html',
			data: {
				'pageid': id_zamok,
				'zamok_type': filter_1,
				'zamok_color': filter_2,
				'metallokonstr': order.metallokonstr,
				'outside_view': order.outside_view,
				'inside_view': order.inside_view,
				'type': type,
				'sort_price': sort_value
			},
			success: function(data){
				$('.zamok_list').html(data);

				$(".zamok_list div[data-pageid="+order[type]+"]").addClass("active-child");
				$('.zamok-price').each(function(){
					var str = $(this).html();
					str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
					$(this).html(str);
				});

			}
		})
	}
	function draw(color){
		//$('select, input').prop('disabled', true);
		$(".hider").show();
		$(".preloader").show();
		var canvas_1 = document.getElementById('door-front');
		if (canvas_1.getContext){
			var ctx_1 = canvas_1.getContext('2d');
			ctx_1.setTransform(2, 0, 0, 2, 0, 0);
			if (order.outside_nalichnik == 220){
				ctx_1.fillStyle = "#fff";
				ctx_1.fillRect(0, 0, width_1, height_1);
				nalichnik = '/images/metalcount/nalichnik-front-dark.png';
				if (color.outside_color_type == 'czvet'){
					shadow = '';
				}else{
					if (color.outside_shade == "Dark"){
						shadow = "/images/metalcount/shadow.png";
						nalichnik = '/images/metalcount/nalichnik-front-color-dark.png';
					}else if (color.outside_shade == "Light"){
						shadow = "/images/metalcount/shadow-light.png";
						nalichnik = '/images/metalcount/nalichnik-front-color-light.png';
					}
				}
				if (color.main_color_type == 'tablicza-czvetov-ral1'){
					color_color(ctx_1, color.main_color_color, width_2 + 10, height_1 - 5, vertical - 5, horizont - 5, nalichnik, shadow, true, true, false);
				}else{
					image_color(ctx_1, color.main_color_color, width_2 + 10, height_1 - 5, vertical - 5, horizont - 5, nalichnik, shadow, true, true, false);
				}
			}else if (order.outside_nalichnik == 221){
				if (color.outside_shade == "Dark"){
					nalichnik = '/images/metalcount/nalichnik-front-dark.png';
				}else if(color.outside_shade == "Light"){
					nalichnik = '/images/metalcount/nalichnik-front-light.png';
				}
				shadow = color.outside_color_frezer;
				mdf_color(ctx_1, color.outside_color_color, width_1, height_1, 0, 0, true, nalichnik, shadow, true, true);
			}else if (order.outside_nalichnik == 222){
				if (color.outside_color_type == 'czvet'){
					shadow = '';
					if (color.main_color_shade == "Dark"){
						nalichnik = '/images/metalcount/nalichnik-front-color-dark.png';
					}else if(color.main_color_shade == "Light"){
						nalichnik = '/images/metalcount/nalichnik-front-color-light.png';
					}
				}else{
					if (color.main_color_shade == "Dark"){
						shadow = "/images/metalcount/shadow.png";
						nalichnik = '/images/metalcount/nalichnik-front-color-dark.png';
					}else if (color.main_color_shade == "Light"){
						shadow = "/images/metalcount/shadow-light.png";
						nalichnik = '/images/metalcount/nalichnik-front-color-light.png';
					}
				}
				if (color.main_color_type == 'tablicza-czvetov-ral1'){
					color_color(ctx_1, color.main_color_color, width_1, height_1, 0, 0, nalichnik, shadow, false, true, false);
				}else{
					image_color(ctx_1, color.main_color_color, width_1, height_1, 0, 0, nalichnik, shadow, false, true, false);
				}
			}
			if (color.outside_color_type == 'czvet' && order.outside_nalichnik != 221){
				shadow = color.outside_color_frezer;
				if (color.outside_shade == "Dark"){
					nalichnik = '/images/metalcount/nalichnik-front-color-dark.png';
				}else if(color.outside_shade == "Light"){
					nalichnik = '/images/metalcount/nalichnik-front-color-light.png';
				}
				mdf_color(ctx_1, color.outside_color_color, width_2, height_2, vertical, horizont, false, nalichnik, shadow, true);
			}
		}
	}
	function draw_back_door(color){
		var canvas_2 = document.getElementById('door-back');
		if (canvas_2.getContext){
			var ctx_2 = canvas_2.getContext('2d');
			ctx_2.setTransform(2, 0, 0, 2, 0, 0);
			ctx_2.clearRect(0, 0, width_1, height_1);
			ctx_2.fillStyle = "#fff";
			ctx_2.fillRect(0, 0, width_1, height_1);
			if (order.inside_view != 195){
				shadow = '';
			}else{
				if (color.inside_shade == "Dark"){
					shadow = "/images/metalcount/shadow.png";
				}else if (color.inside_shade == "Light"){
					shadow = "/images/metalcount/shadow-light.png";
				}
			}
			nalichnik = '';
			if (color.main_color_type == 'tablicza-czvetov-ral1'){
				color_color(ctx_2, color.main_color_color, width_2 + 10, height_1 - 5, vertical - 5, horizont-5, nalichnik, shadow, true, false, false);
			} else{
				image_color(ctx_2, color.main_color_color, width_2 + 10, height_1 - 5, vertical - 5, horizont - 5, nalichnik, shadow, true, false, false);
			}
			if (color.inside_color_type == 'czvet'){
				if (order.inside_view != 231){
					shadow = color.inside_color_frezer;
				}else{
					if (color.inside_shade == "Dark"){
						shadow = "/images/metalcount/shadow.png";
					}else if (color.inside_shade == "Light"){
						shadow = "/images/metalcount/shadow-light.png";
					}
				}
				nalichnik = '';
				mdf_color(ctx_2, color.inside_color_color, width_2, height_2, vertical, horizont, false, nalichnik, shadow, false, true);
			}
		}
	}
	draw(color);
	draw_under_doors();
	$('.options_box').on('change', '#check_main_lock, #check_add_lock, #check_glazok, #check_dovodchik, #check_zadvijka', function(){
		var classList = $(this).parent().next().attr('class').split(/\s+/);
		$('.setting_value').removeClass('active');
		$(this).parent().next().addClass('active');
		$.each(classList, function(index, item){
			for (var i = 0; i < classList.length; i++){
				if (classList[i] != 'setting_value' && classList[i] != 'active'){
					type = classList[i];
				}
			}
		});
		if(canChange==false || isChange[type] == false){
		}else{
			if ($(this).is(':checked')==false){
				$('.current_menu').remove();
				$('.close_div').remove();
				$(this).removeClass('active');
				$('.setting_value').removeClass('active');
				$('.option_name').removeClass('active');
				$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka').removeClass('active');
				order[type] = '';

				fillPole(type);
				if(type == 'main_lock' || type == 'add_lock' || type == 'glazok' || type == 'zadvijka'){
					check_color(order);
					draw(color);
				}
			}else{
				$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka').removeClass('active');
				$(this).addClass('active');
				$(this).parent().addClass('active');
				var type_id = $(this).parent().next().data('pageid');
				var classList = $(this).parent().next().attr('class').split(/\s+/);
				$('.setting_value').removeClass('active');
				$(this).parent().next().addClass('active');
				$('.option_name').removeClass('active');
				$('.option_name'+'.'+type).addClass('active');
				$('.option_settings').removeClass('active');
				$('.option_settings'+'.'+type).addClass('active');
				$('.current_menu').remove();
				$(this).parent().parent().append('<div class = "current_menu"></div>');
				$('.close_div').remove();
				$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
				if (type == 'add_lock'){
					if(product!=141){
						$('.current_menu').append('<div class = "zamok_type_title">Тип:</div><form class = "zamok_types"><input type="radio" value = "cilindr" name = "zamok_type" id = "cilindr""><label for="cilindr">Цилиндр</label><input type="radio" value="suvald" name = "zamok_type" id = "suvald"><label for="suvald">Сувальд</label></form>');
						$('.current_menu').append('<div class = "zamok_color_title">Цвет:</div><form class = "zamok_colors"><input type="radio" value = "gold" name = "zamok_color" id = "gold"><label for="gold">Золото</label><input type="radio" value="chrom" name = "zamok_color" id = "chrom"><label for="chrom">Хром</label><input type="radio" value="other" name = "zamok_color" id = "other"><label for="other">Другое</label></form>');
						$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
						$('.current_menu').append('<div class = "zamok_list"></div>');
					} else {
						$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
					}
					order[type] = default_order.add_lock;
					// alert(order.add_lock);
					//if(order.metallokonstr==193 && order.outside_view != 195){
						checkLock(order.metallokonstr, order.outside_view, "checkbox_add");
					//}
					fillPole(type);
					var sort_value = $("select[name=sort]").val();
					check_color(order);
					if (color.add_lock_type == "2-сист"){
						filter_1 = 'syst';
					}else if(color.add_lock_type == 'сувальд.'){
						filter_1 = 'suvald'; 
					}else{
						filter_1 = 'cilindr';
					}
					if (color.add_lock_color == 'Другое'){
						filter_2 = 'other';
					}else if (color.add_lock_color == 'Хром'){
						filter_2 = 'chrom';
					}else{
						filter_2 = 'gold';
					}
					if(product==141){
						get_data(type_id, '');
					} else {
						$('input[name = zamok-type]').prop('checked', false).removeClass('current_choice');
						$('input[value = '+filter_1+']').prop('checked', true).addClass('current_choice');
						$('input[name = zamok-color]').prop('checked', false).removeClass('current_choice');
						$('input[value = '+filter_2+']').prop('checked', true).addClass('current_choice');
						check_furniture(filter_1, filter_2, type, type_id, sort_value);
					}
					draw(color);
				}else if (type == 'main_lock'){
					if(product!=141){
						$('.current_menu').append('<div class = "zamok_type_title">Тип:</div><form class = "zamok_types"><input type="radio" value = "cilindr" name = "zamok_type" id = "cilindr"><label for="cilindr">Цилиндр</label><input type="radio" value="suvald" name = "zamok_type" id = "suvald"><label for="suvald">Сувальд</label><input type="radio" value="syst" name = "zamok_type" id = "syst"><label for="syst">2-х системный</label></form>');
						$('.current_menu').append('<div class = "zamok_color_title">Цвет:</div><form class = "zamok_colors"><input type="radio" value = "gold" name = "zamok_color" id = "gold"><label for="gold">Золото</label><input type="radio" value="chrom" name = "zamok_color" id = "chrom"><label for="chrom">Хром</label><input type="radio" value="other" name = "zamok_color" id = "other"><label for="other">Другое</label></form>');
						$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
						$('.current_menu').append('<div class = "zamok_list"></div>');
					} else {
						$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
					}
					order[type] = default_order.main_lock;
					//if(order.metallokonstr==193 && order.outside_view != 195){
						checkLock(order.metallokonstr, order.outside_view, "checkbox_main");
						
					//}
					fillPole(type);
					var sort_value = $("select[name = sort]").val();
					check_color(order);
					if (color.main_lock_type == "2-сист"){
						filter_1 = 'syst';
					}else if(color.main_lock_type == 'сувальд.'){
						filter_1 = 'suvald'; 
					}else{
						filter_1 = 'cilindr';
					}
					if (color.furniture_color == 'Другое'){
						filter_2 = 'other';
					}else if (color.furniture_color == 'Хром'){
						filter_2 = 'chrom';
					}else{
						filter_2 = 'gold';
					}

					if(product==141){
						get_data(type_id, '');
					} else {
						$('input[name = zamok-type]').prop('checked', false).removeClass('current_choice');
						$('input[value = '+filter_1+']').prop('checked', true).addClass('current_choice');
						$('input[name = zamok-color]').prop('checked', false).removeClass('current_choice');
						$('input[value = '+filter_2+']').prop('checked', true).addClass('current_choice');
						check_furniture(filter_1, filter_2, type, type_id, sort_value);
					}
					draw(color);
				}else{
					if (type == 'glazok'){
						order[type] = "225";
						check_color(order);
						draw(color);
					}else if (type == 'dovodchik'){
						order[type] = "227";
					}else if (type == 'zadvijka'){
						order[type] == "230";
					}
					fillPole(type);
					get_data(type_id, '');
				}
			}
		}
			draw_under_doors();
			getPrice();
	});
	$("body").on("change","select[name = sort]", function(){
		var type_id = $(this).parent().parent().prev().prev().data("pageid");
		var sort_value = $(this).val();
		if(product!=141){
			var classList = $(this).parent().parent().prev().prev().attr('class').split(/\s+/);
			var zamok_type = $(".zamok_types .current_choice").val();
			var zamok_color = $(".zamok_colors .current_choice").val();
			$.each(classList, function(index, item){
				for (var i = 0; i < classList.length; i++){
					if (classList[i] != 'setting_value' && classList[i] != 'active'){
						type = classList[i];
					}
				}
			});
			check_furniture(zamok_type, zamok_color, type, type_id, sort_value);
		} else 	{
			$(".current_menu").children('.zamok').remove();
			get_data(type_id, '', sort_value);
		}

	});
	var prev_type_id = '';
	var prev_type = '';
	$('.setting_value').click(function(){
		var type_id = $(this).data('pageid');
		var classList = $(this).attr('class').split(/\s+/);
		$.each(classList, function(index, item){
			for (var i = 0; i < classList.length; i++){
				if (classList[i] != 'setting_value' && classList[i] != 'active'){
					type = classList[i];
				}
			}
		});
		if(canChange==false || isChange[type] == false){
		}else{
			if (type_id == 208 && order.outside_view == 195 && type == 'outside_color'){
				type_id = prev_type_id;
				type = prev_type;
			}else if(type_id == 208 && order.inside_view == 195 && type == 'inside_color'){
				type_id = prev_type_id;
				type = prev_type;
			}else if(type_id == 217 && type == 'main_lock'){
				prev_type_id = type_id;
				prev_type = type;
				$('.setting_value').removeClass('active');
				$(this).addClass('active');
				$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka').removeClass('active');
				$('.checkbox_'+type).addClass('active');
				$('.option_name').removeClass('active');
				$('.option_name'+'.'+type).addClass('active');
				$('.option_settings').removeClass('active');
				$('.option_settings'+'.'+type).addClass('active');
				$('.current_menu').remove();
				$(this).parent().append('<div class = "current_menu"></div>');
				$('.close_div').remove();
				if(product!=141){
					$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
					$('.current_menu').append('<div class = "zamok_type_title">Тип:</div><form class = "zamok_types"><input type="radio" value = "cilindr" name = "zamok_type" id = "cilindr"><label for="cilindr">Цилиндр</label><input type="radio" value="suvald" name = "zamok_type" id = "suvald"><label for="suvald">Сувальд</label><input type="radio" value="syst" name = "zamok_type" id = "syst"><label for="syst">2-х системный</label></form>');
					$('.current_menu').append('<div class = "zamok_color_title">Цвет:</div><form class = "zamok_colors"><input type="radio" value = "gold" name = "zamok_color" id = "gold"><label for="gold">Золото</label><input type="radio" value="chrom" name = "zamok_color" id = "chrom"><label for="chrom">Хром</label><input type="radio" value="other" name = "zamok_color" id = "other"><label for="other">Другое</label></form>');
					$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
					$('.current_menu').append('<div class = "zamok_list"></div>');
				} else {
					$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
					$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
				}
				// var current_height = $(this).height();
				// $('.option_settings').css('height', 'auto');
				// $('.option_settings.active').height(current_height);
				// $('.option_name').css('height', 'auto');
				// $('.option_name.active').height(current_height);
				var sort_value = $("select[name = sort]").val();
				if (color.main_lock_type == "2-сист"){
					filter_1 = 'syst';
				}else if(color.main_lock_type == 'сувальд.'){
					filter_1 = 'suvald'; 
				}else{
					filter_1 = 'cilindr';
				}
				if (color.furniture_color == 'Другое'){
					filter_2 = 'other';
				}else if (color.furniture_color == 'Хром'){
					filter_2 = 'chrom';
				}else{
					filter_2 = 'gold';
				}
				
				if(product==141){
					get_data(type_id, '');
				} else {
					$('input[name = zamok-type]').prop('checked', false).removeClass('current_choice');
					$('input[value = '+filter_1+']').prop('checked', true).addClass('current_choice');
					$('input[name = zamok-color]').prop('checked', false).removeClass('current_choice');
					$('input[value = '+filter_2+']').prop('checked', true).addClass('current_choice');
					check_furniture(filter_1, filter_2, type, type_id, sort_value);
				}
				
			}else if(type_id == 217 && type == 'add_lock'){
				prev_type_id = type_id;
				prev_type = type;
				$('.setting_value').removeClass('active');
				$(this).addClass('active');
				$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka').removeClass('active');
				$('.checkbox_'+type).addClass('active');
				$('.option_name').removeClass('active');
				$('.option_name'+'.'+type).addClass('active');
				$('.option_settings').removeClass('active');
				$('.option_settings'+'.'+type).addClass('active');
				$('.current_menu').remove();
				$(this).parent().append('<div class = "current_menu"></div>');
				$('.close_div').remove();
				if(product!=141){
					$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
					$('.current_menu').append('<div class = "zamok_type_title">Тип:</div><form class = "zamok_types"><input type="radio" value = "cilindr" name = "zamok_type" id = "cilindr"><label for="cilindr">Цилиндр</label><input type="radio" value="suvald" name = "zamok_type" id = "suvald"><label for="suvald">Сувальд</label></form>');
					$('.current_menu').append('<div class = "zamok_color_title">Цвет:</div><form class = "zamok_colors"><input type="radio" value = "gold" name = "zamok_color" id = "gold"><label for="gold">Золото</label><input type="radio" value="chrom" name = "zamok_color" id = "chrom"><label for="chrom">Хром</label><input type="radio" value="other" name = "zamok_color" id = "other"><label for="other">Другое</label></form>');
					$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
					$('.current_menu').append('<div class = "zamok_list"></div>');
				} else {
					$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
					$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
				}
				var sort_value = $("select[name = sort]").val();
				if(color.add_lock_type == 'сувальд.'){
					filter_1 = 'suvald'; 
				}else{
					filter_1 = 'cilindr';
				}
				if (color.add_lock_color == 'Другое'){
					filter_2 = 'other';
				}else if (color.add_lock_color == 'Хром'){
					filter_2 = 'chrom';
				}else{
					filter_2 = 'gold';
				}
				
				if(product==141){
					get_data(type_id, '');
				} else {
					$('input[name = zamok-type]').prop('checked', false).removeClass('current_choice');
					$('input[value = '+filter_1+']').prop('checked', true).addClass('current_choice');
					$('input[name = zamok-color]').prop('checked', false).removeClass('current_choice');
					$('input[value = '+filter_2+']').prop('checked', true).addClass('current_choice');
					check_furniture(filter_1, filter_2, type, type_id, sort_value);
				}
				
			}else{
				prev_type_id = type_id;
				prev_type = type;
				$('.setting_value').removeClass('active');
				$(this).addClass('active');
				$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka').removeClass('active');
				$('.checkbox_'+type).addClass('active');
				$('.option_name').removeClass('active');
				$('.option_name'+'.'+type).addClass('active');
				$('.option_settings').removeClass('active');
				$('.option_settings'+'.'+type).addClass('active');
				$('.current_menu').remove();
				if ($(this).parent().hasClass('row1') || $(this).parent().hasClass('row2')){
					$(this).parent().append('<div class = "current_menu"></div>');
					$('.close_div').remove();
					$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');;
				}else{
					$(this).parent().append('<div class = "current_menu"></div>');
					$('.close_div').remove();
					$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
				}
				var tmp = '';
				if (type == 'outside_frezer' || type == 'outside_nalichnik'){
					tmp = order.outside_view;
				}else if (type == 'inside_frezer'){
					tmp = order.inside_view;
				}
				get_data(type_id, tmp);
			}
		}
	});
	function get_data(type_id, tmp, sort_value){
		if(sort_value==undefined){
			sort_value = "up";
		}
		if(product==141){
			var tmp_url = '/ajax_protivopojar/get_menu.php';
		} else {
			var tmp_url = '/ajax_metalcount/get_menu.php';
		}
		$.ajax({
			url: tmp_url,
			type: 'GET',
			dataType: 'json',
			data: {
				'page': type_id,
				'outside_view': tmp,
				'metallokonstr': order.metallokonstr,
				'inside_view': order.inside_view,
				'sort_price': sort_value
			},
			success: function(data){
				if(product!=141){
					$('.current_menu').html('');
				}
				$('.current_menu h2').append(data['page']['pagetitle']);
				$('.current_menu').append(data['txt']);
				$(".current_menu div[data-pageid="+order[type]+"]").addClass("active-child");
			}
		});
	}
	$('body').on('change', 'input[name = zamok_type], input[name = zamok_color]', function(){
		var current_name  = $(this).attr('name');
		$('input[name = '+current_name+']').removeClass('current_choice');
		$(this).addClass('current_choice');
		if (current_name == 'zamok_type'){
			$('.zamok_types label').css('color', 'black');
		}else if(current_name == 'zamok_color'){
			$('.zamok_colors label').css('color', 'black');
		}
		$('label[for = '+$(this).attr('id')+']').css('color', 'blue');
		var filter_1 = $('input[name = zamok_type].current_choice').attr('id');
		var filter_2 = $('input[name = zamok_color].current_choice').attr('id');
		var sort_value = $("select").val();
		check_furniture(filter_1, filter_2, type, $('.setting_value'+'.'+type).data('pageid'), sort_value);
	});
	function draw_under_doors(){

		$.ajax({
			url: '/ajax_metalcount/drawUnderDoors.php',
			type: 'POST',
			async: false,
			dataType: 'json',
			data: {
				'main_lock': order.main_lock,
				'add_lock': order.add_lock
			},
			success: function(data){
				if (order.main_lock != '' && order.main_lock != null){
					$('.main_lock_image').html(data["main_lock_html"]);
				}
				if (order.add_lock != '' && order.add_lock != null){
					$('.add_lock_image').html(data["add_lock_html"]);
				}
				$('.zamok-price').each(function(){
					var str = $(this).html();
					str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1'");
					$(this).html(str);
				});
			}
		});
		console.log('meow');
		console.log(order);
		if (order.main_lock != '' && order.main_lock != null){
			$('.main_lock_title').css('display', 'block');
		}else{
			$('.main_lock_title').css('display', 'none');
			$('.main_lock_image').html('');	
		}
		if (order.add_lock != '' && order.add_lock != null){
			$('.add_lock_title').css('display', 'block');
		}else{
			$('.add_lock_title').css('display', 'none');
			$('.add_lock_image').html('');	
		}
	}
	$('body').on('click', '.zamok_list .zamok', function(){
		if ($(this).hasClass('active-child')){
			return false
		}else{
			var type_id = $(this).data('pageid');
			order[type] = type_id;
			fillPole(type);
			check_color(order);
			draw(color);
			draw_under_doors();
			getPrice();
			$(".zamok_list div").removeClass("active-child");
			$(".zamok_list div[data-pageid="+order[type]+"]").addClass("active-child");
			return false;
		}
	});
	$('body').on('click', '.current_menu .metalconstr, .current_menu .color_ral, .current_menu .antic_color, .current_menu #pokraska1, .current_menu #mdf-6, .current_menu #mdf-10, .current_menu #laminat, .current_menu #mdf-10-s-zerkalom, .current_menu .mdf_color, .current_menu .nalichnik, .current_menu .frezerovka_image, .current_menu .glazki, .current_menu .dovodchik_list, .current_menu .zadvijka_list, .current_menu #standart, .current_menu #antik, .current_menu #specz-effekt', function(){
		if ($(this).hasClass('active-child')){
			return false
		}else{
			var type_id = $(this).data('pageid');
			order[type] = type_id;

			if (type_id == 202){
				if (type == 'inside_view'){
					if (color.inside_color_type != 'czvet'){
						order.inside_color = child_color;
					}
					fillPole('inside_color');
					order.inside_frezer = child_frezer_6;
					fillPole('inside_frezer');
				}else if (type == 'outside_view'){
					if (color.outside_color_type != 'czvet'){
						order.outside_color = child_color;
					}
					fillPole('outside_color');
					order.outside_frezer = child_frezer_6;
					fillPole('outside_frezer');
				}
			}else if(type_id == 210){
				if (type == 'inside_view'){
					if (color.inside_color_type != 'czvet'){
						order.inside_color = child_color;
					}
					fillPole('inside_color');
					order.inside_frezer = child_frezer_10;
					fillPole('inside_frezer');
				}else if (type == 'outside_view'){
					if (color.outside_color_type != 'czvet'){
						order.outside_color = child_color;
					};
					fillPole('outside_color');
					order.outside_frezer = child_frezer_10;
					fillPole('outside_frezer');
				}
			}else if(type_id == 215){
				if (type == 'inside_view'){
					if (color.inside_color_type != 'czvet'){
						order.inside_color = child_color;
					}
					fillPole('inside_color');
					order.inside_frezer = child_frezer_10z;
					fillPole('inside_frezer');
					order.glazok = '';
				}
			}else if(type_id == 231){
				if (type == 'inside_view'){
					order.inside_color = child_color_l;
					fillPole('inside_color');
				}
			}else{
				if (type == 'inside_view'){
					order.inside_color = order.main_color;
					fillPole('inside_color');
				}else if(type == 'outside_view'){
					if (order.outside_nalichnik == 221){
						order.outside_nalichnik = "222";
						fillPole('outside_nalichnik');
					}
					order.outside_color = order.main_color;
					fillPole('outside_color');
				}
				
			}

			if (type == 'metallokonstr'){
				//если меняется металлоконструкция с основы и при этом раньше был выбран ламинат, то перерисовываем и меняем ордер
				if (type_id != 191 && order.inside_view == 231){
					order.inside_view = "195";
					fillPole('inside_view');
					order.inside_color = order.main_color;
					fillPole('inside_color');
				}

				// если меняется металлоконструкция на Профи и внешняя покраска не покраска, то проверяем замки на Дорма
				if(type_id==193 && order.outside_view != 195){

					checkLock(type_id, order.outside_view, "not_checkbox");
					draw_under_doors();

				}
			}

			if(type == 'main_color_type'){
				$(".setting_value.main_color").data("pageid",type_id);
				if(type_id==196){
					order.main_color = child_standart_color;
				} else if(type_id==198){
					order.main_color = child_antik_color;
				} else if(type_id==200){
					order.main_color = child_spec_color;
				}
				fillPole("main_color");
				if(order.outside_view==195){
					order.outside_color = order.main_color;
					fillPole("outside_color");
				}
				if(order.inside_view==195){
					order.inside_color = order.main_color;
					fillPole("inside_color");
				}

				check_color(order);
				draw(color);

			}
			//если меняют внешний тип на мдф и текущая металлоконструкция Профи, проверяем замки на Дорма
			if(type=="outside_view" && order.metallokonstr == 193 && type_id != 195){
				// console.log("mdf");
				// console.log(order);
				checkLock(order.metallokonstr, type_id, "not_checkbox");
				draw_under_doors();
			}
			if (type == 'main_color' && order.outside_view == 195){
				order.outside_color = order.main_color;
				fillPole('outside_color');
			}
			if (type == 'main_color' && order.inside_view == 195){
				order.inside_color = order.main_color;
				fillPole('inside_color');
			}
			if (type == 'outside_view' || type == 'outside_color' || type == 'outside_frezer' || type == 'inside_view' || type == 'inside_color' || type == 'inside_frezer' || type == 'main_color' || type == 'outside_nalichnik' || type == 'glazok'|| type == 'zadvijka' || type == 'metallokonstr'){
				check_color(order);
				draw(color);
			}
			fillPole(type);
			getPrice();
			if(order.inside_view==215){
				isChange.glazok = false;
				fillPole('glazok');
			} else {
				isChange.glazok = true;
				fillPole('glazok');
			}
			$(".current_menu div").removeClass("active-child");
			$(".current_menu div[data-pageid="+order[type]+"]").addClass("active-child");
		}
	});
	function checkLock(metall, outside_view, type){
		// console.log("CHECKLOCK");
		// console.log(type);
		// console.log(order);
		// alert(order.add_lock);
		// alert(order.main_lock);
		if(product==141){
			var tmp_url = '/ajax_protivopojar/checkLock.php';
		} else {
			var tmp_url = '/ajax_metalcount/checkLock.php';
		}
		$.ajax({
			url: tmp_url,
			type: 'POST',
			async: false,
			dataType: 'json',
			data: {
				'metalokonstr': metall,
				'outside_view': outside_view,
				'main_lock': order.main_lock,
				'add_lock': order.add_lock,
				'type': type,
				'product': product
			},
			success: function(data){
				console.log("checkLock");
				console.log(data);
				order.main_lock = data["main_lock"];
				order.add_lock = data["add_lock"];
				fillPole('main_lock');
				fillPole('add_lock');
			},
			error: function(data){
				console.log("checklock error");
				console.log(data);
			}
		});
	}
	$('body').on('click', '.close', function(){
		$('.current_menu').remove();
		$('.close_div').remove();
		$('.option_name').removeClass('active');
		$('.option_settings').removeClass('active');
		$('.setting_value').removeClass('active');
		$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka').removeClass('active');
	});

	//запрет ввода символов, кроме чисел
	$("#input-height, #input-width, #personal_price, input[name=floors], input[name=phone2], input[name=phone3]").keydown(function(event) {
        // Разрешаем: backspace, delete, tab и escape
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
             // Разрешаем: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Разрешаем: home, end, влево, вправо
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // Ничего не делаем
                 return;
        }
        else {
            // Убеждаемся, что это цифра, и останавливаем событие keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });

	//обработка скидки в форме заказа
    $("#personal_price").keyup(function(event) {
        var skidka = $("#personal_price").val();
        if(skidka>(order["total_price"]/2)){
        	$("#personal_price").val("");
        }

        var skidka = $("#personal_price").val();
        new_price = order["total_price"]-skidka;
        var str = String(new_price);
		str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		$(".form_total_price").html(str + '=');

		if(new_price!=order["total_price"]){
			$(".form_old_price").html(order["total_price"]);
			$(".form_total hr").show();
			$("#make_order").val("Заказать со скидкой");
		} else {
			$(".form_old_price").html("");
			$(".form_total hr").hide();
			$("#make_order").val("Заказать");
		}
    });
	function check_sizes(){
		var height_door = $('#input-height').val();
		var width_door = $('#input-width').val();
		if (height_door < 1900 || height_door > 2200 || width_door < 800 || width_door > 1100){
			$('.warning_message').css('display', 'block');
		}
		else{
			order.height_door = height_door;
			order.width_door = width_door;
			getPrice();
			$('.height-value').html(order.height_door);
			$('.width-value').html(order.width_door);
			$('.wrapper').css('display', 'none');
		}
	}
	//отслеживание ввода высоты
	// $('#input-height').keyup(function() {
	// 	$('.order-button').css('display', 'none');
	// 	$('.price').html('');
	// });
	//отслеживание ввода ширины
	// $('#input-width').keyup(function() {
	// 	$('.order-button').css('display', 'none');
	// 	$('.price').html('');
	// });
	$('.check_sizes input').click(function(){
		$('.wrapper').css('display', 'block');
	});
	$('.button_check input').click(function(){
		check_sizes();
	});
	function getPrice(){
		$.ajax({
			url: '/ajax_metalcount/getPrice.php',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: { 'order':order, 'special':special },
			success: function(data){
				console.log("price");
				console.log(data);
				$(".prices").remove();
				// console.log(data);
				// $('.add_images').prepend('<div class = "prices">Промежуточные значения</div>')
				// for (var key in data){
				// 	$('.prices').append('<div>'+key+':'+data[key]+'</div>');
				// }

				//цена total
				var str = String(data["total"]);
				str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

				//цена clear
				var str2 = String(data["clear"]);
				str2 = str2.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

				price = data;
				if (data['skidka_percent'] != '' || data['skidka_ruble'] != ''){
					$(".price-title span").html(str2 + '=');
					$(".price-title hr").show();
					$(".price").html(str + '=');
					$(".form_total_price").html(str + '=');
					order["total_price"] = data["total"];
				}else{
					$(".price-title span").html('');
					$(".price-title hr").hide();
					$(".price").html(str2 + '=');
					$(".form_total_price").html(str2 + '=');
					order["total_price"] = data["clear"];
				}
			},
			error: function(data){
				console.log('error');
				console.log(data);
			}
		});
	}
	if (order.door_side == 'right'){
		$('#door-front').css('margin-left', '-1px');
		$('#right').css('display', 'block');
		$('#left').css('display', 'none');
	}
	$('.door_side').click(function(){
		if (canChange && isChange['door_side']){
			var tmp = $(this).attr('id');
			$('.door_side').css('display', 'block');
			$(this).css('display', 'none');
			if (tmp == 'right'){
				order.door_side = 'left';
				$('#door-front').css('margin-left', '0px');
			}else if(tmp == 'left'){
				order.door_side = 'right';
				$('#door-front').css('margin-left', '-1px');
			}
			reverse();
			reverse2();
		}
	});
	function checkCart(){
    	$.ajax({
			url: '/ajax_cart/checkCart.php',
			type: 'POST',
			dataType: 'json',
			data: {},
			success: function(data){
				console.log('CheckCart');
				console.log(data);
				$('.q_items').html(data['products']);
				$('.p_items').html(data['price']);
				if (data['products'] == 0){
					$('.inside_add_cart').hide();
					$('.cart_total_price').hide();
					$('.cart_order_form').hide();
				}else{
					$('.inside_add_cart').show();
					$('.cart_total_price').show();
					$('.cart_order_form').show();	
				}
			}
		});
    }
    function change_phrase(phrase){
    	// alert(product_id);
    	$('.order-button').html(phrase);
    }
	function add_cart(order_id){
		$.ajax({
			url: '/ajax_cart/addToCart.php',
			type: 'POST',
			dataType: 'json',
			data: {'product_id': order_id,
					'price': order['total_price'],
				   'isPay': 'no',
				   'count': 1},
			success: function(data){
				console.log('Cart Updated');
				console.log(data);
				change_phrase('Добавлено');
				checkCart();
				setTimeout(change_phrase, 2000, 'Добавить в корзину');
				// window.location.href = "http://ce77747.tmweb.ru/konstruktor-dverej/";
				$(".wrapper_3 .added_text").html("Проект №"+order_id+" сохранен на сайте и добавлен в корзину");
				$(".wrapper_3").show();
			},
			error: function(data){
				console.log('error');
				console.log(data);
			}
		});		
	}
	order.stvorka = 'Одностворчатая';
	// getPrice();
	$('.order-button').click(function(){
		// $(".order_wrap").show(200);
		$.ajax({
			url: '/ajax_metalcount/add_order.php',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: { 'order':order, 'price':price },
			success: function(data){
				console.log('success');
				add_cart(data['order_id']);
				// alert("Спасибо, ваш заказ принят в обработку. В ближайшее время с вами свяжутся.");
				// $(".order_info form").trigger("reset");
				// $('.order_wrap').hide();
			},
			error: function(data){
				console.log('error');
				console.log(data);
			}
		});
	});

	function validateEmail(t) {
    var e = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([а-яА-ЯёЁa-zA-Z\-0-9]+\.)+[а-яА-ЯёЁa-zA-Z]{2,}))$/,
        i = t;
    return e.test(i) ? !0 : !1 }

	$("#make_order").click(function(){
		var error = 0;
		var order_fio;
		var order_email;
		var phone1;
		var phone2;
		var phone3;
		var order_phone;
		var order_adress;
		var order_floors;
		var order_dostavka;
		var order_montaj;
		var order_demontaj;
		var order_personal_price;
		var order_lift;
		var comment;

		$(".order_info input").each(function(){
			var input_value = $(this).val();
			var input_name = $(this).attr("name");
			$(this).css("border", "1px solid darkgrey");

			//проверка обязательных полей на заполненность
			if($(this).hasClass("input_required")){
				if(input_value==""){
					$(this).css("border", "1px solid red");
					error++;
				} else {
					if(input_name=="fio"){
						order_fio = input_value;
					} else if(input_name=="phone1"){
						if($.isNumeric(input_value)){
							phone1 = input_value;
						} else {
							$(this).css("border", "1px solid red");
							error++;
						}
					} else if(input_name=="phone2"){
						if($.isNumeric(input_value)){
							phone2 = input_value;
						} else {
							$(this).css("border", "1px solid red");
							error++;
						}
					} else if(input_name=="phone3"){
						if($.isNumeric(input_value)){
							phone3 = input_value;
						} else {
							$(this).css("border", "1px solid red");
							error++;
						}
					}
				}
			}

			if(input_name=="email"){
				if(input_value!=""){
					if(validateEmail(input_value)){ //проверка email на корректность
						order_email = input_value;
					} else {
						$(this).css("border", "1px solid red");
						error++;
					}
				} else {
					order_email = input_value;
				}
			} 

			if(input_name=="floors"){
				if(input_value!=""){
					if(parseInt(input_value)>0 && parseInt(input_value)<199){ //проверка количества этажей на корректность
						order_floors = input_value;
					} else {
						$(this).css("border", "1px solid red");
						error++;
					}
				} else {
					order_floors = input_value;
				}
			}
			if(input_name=="lift"){
				if($(this).prop("checked")){
					order_lift = 1;
				} else {
					order_lift = 0;
				}
			}
			if(input_name=="dostavka"){
				if($(this).prop("checked")){
					order_dostavka = 1;
				} else {
					order_dostavka = 0;
				}
			}
			if(input_name=="montaj"){
				if($(this).prop("checked")){
					order_montaj = 1;
				} else {
					order_montaj = 0;
				}
			}
			if(input_name=="demontaj"){
				if($(this).prop("checked")){
					order_demontaj = 1;
				} else {
					order_demontaj = 0;
				}
			}
			if(input_name=="personal_price"){
				if(input_value==""){
					order_personal_price = "";
				} else {
					order_personal_price = input_value;
				}
			}
		});
		order_adress = $(".order_info .input_adress").val();
		$(".order_info .input_adress").css("border", "1px solid darkgrey");

		comment = $(".right_comment textarea").val();

		order_phone = phone1+phone2+phone3;

		if(error==0){
			order["fio"] = order_fio;
			order["email"] = order_email;
			order["phone"] = order_phone;
			order["adress"] = order_adress;
			order["floors"] = order_floors;
			order["lift"] = order_lift;
			order["dostavka"] = order_dostavka;
			order["montaj"] = order_montaj;
			order["demontaj"] = order_demontaj;
			order["personal_price"] = order_personal_price;
			order["comment"] = comment;

			console.log("order_add");
			console.log(order);
			$.ajax({
				url: '/ajax_metalcount/add_order.php',
				type: 'POST',
				dataType: 'json',
				async: false,
				data: { 'order':order, 'price':price },
				success: function(data){
					console.log("add_order");
					console.log(data);
					alert("Спасибо за заказ! Ваш проект принят в обработку. В ближайшее время с Вами свяжется ответственный сотрудник!");
					$(".order_info form").trigger("reset");
					$('.order_wrap').hide();
				},
				error: function(data){
					console.log("error");
					console.log(data);
				}
			});
		}
	});
	function getOrder(num_of_order){
		if($.isNumeric(num_of_order)){
			$.ajax({
				url: '/ajax_metalcount/get_order.php',
				type: 'POST',
				dataType: 'json',
				async: false,
				data: {'order_id':num_of_order },
				success: function(data){
					if (data['status'] == 'error'){
						alert('Заказа с таким номером не существует!');
					}else if(data['status'] == 'ok'){
						alert('Внимание! Внесение изменений в проект №'+data['order']['order_id']+' невозможно.');
						order = {
							metallokonstr: data['order']['metallokonstr'],
							main_color: data['order']['main_color'],
							main_color_type: data['order']['main_color_type'],
							outside_view: data['order']['outside_view'],
							outside_color: data['order']['outside_color'],
							outside_frezer: data['order']['outside_frezer'],
							outside_nalichnik: data['order']['outside_nalichnik'],
							inside_view: data['order']['inside_view'],
							inside_color: data['order']['inside_color'],
							inside_frezer: data['order']['inside_frezer'],
							main_lock: data['order']['main_lock'],
							add_lock: data['order']['add_lock'],
							glazok: data['order']['glazok'],
							dovodchik: data['order']['dovodchik'],
							zadvijka: data['order']['zadvijka'],
							door_side: data['order']['door_side'],
							height_door: data['order']['height_door'],
							width_door: data['order']['width_door']
						}
						//форматирование даты
						var date = new Date(data['order']['date']);

						var dd = date.getDate();
						if (dd < 10) dd = '0' + dd;

						var mm = date.getMonth() + 1;
						if (mm < 10) mm = '0' + mm;

						var yy = date.getFullYear() % 100;
						if (yy < 10) yy = '0' + yy;

						var ddmmyy = dd + '.' + mm + '.' + yy;

	      				$(".my_breadcrumb").detach();
						$(".B_crumbBox").append('<span class="my_breadcrumb">Проект № '+data['order']['order_id']+' от '+ddmmyy+'г. <span class="new_project">Новый проект</span></span>');
						for( var key in order){
							if (order[key] != null || order[key] != undefined || order[key] != "0"){
								fillPole(key);
							}else{
							}
						}
						// check_color(order);
						// draw(color);
						getPrice();
						var str = String(data["order"]["total_price"]);
						str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
						$(".price").html(str+"=");

						canChange = false;
						isDisabled(canChange);
						// $('.order-button').hide();
						$('h1').before('<div class = "new_project">Новый проект</div>')

					}
				}
			});
		} else {
			alert('Неправильно введен номер заказа!');
		}
		
	}
	$('body').on('click', '.add_images img', function(){
		$('body').prepend('<div class = "wrapper_lock"></div>');
		var imgSrc = $(this).attr('src');
		$('.wrapper_lock').append('<img id = "close_image" src = "/images/metalcount/close.gif" />');
		$('.wrapper_lock').append('<img src = "'+imgSrc+'"/>');
	});
	$('body').on('click', '.new_project', function(){
		check_color(order);
		draw(color);
		product = null;
		special = null;
		getPrice();

		$(".content h1").html("Конструктор \"Двери для квартир\"");

		$(".load_order_number input").val('');
		$(".my_breadcrumb").detach();
		$(this).detach();
		$(".B_crumbBox").append('<span class="my_breadcrumb">Новый проект</span>');

		canChange = true;
		for( var key in isChange){
			// if (key == 'outside_view' && order[key] == 195){
			// 	isChange[key] = true;
			// 	isChange['outside_color'] = false;
			// }else if(key == 'inside_view' && order[key] == 195){
			// 	isChange[key] = true;
			// 	isChange['inside_color'] = false;
			// }else{
				isChange[key]=true;
			// }
		}
		isDisabled(canChange);
		$('.order-button').show();
	});
	$('body').on('click', '#close_image', function(){
		$('.wrapper_lock').remove();
		$('.door_wrapper').remove();
		$('.wrapper').hide();
		$('.order_wrap').hide();
	});
	$('.open_big').click(function(){
		var canvas_1 = document.getElementById('door-front');
		var canvas_2 = document.getElementById('door-back');
		var front_url = canvas_1.toDataURL();
		var back_url = canvas_2.toDataURL();

		$('body').prepend('<div class = "door_wrapper"></div>');
		$('.door_wrapper').append('<img id = "close_image" src = "/images/metalcount/close.gif" />');
		$('.door_wrapper').append('<div class = "doors"></div>');
		$('.doors').append('<div class = "front_big"><img src = "'+front_url+'" /></div>');
		if (order.door_side == 'right'){
			$('.front_big img').css('margin-left', '-3px');
		}else{
			$('.front_big img').css('margin-left', '0px');
		}
		$('.doors').append('<div class = "back_big"><img src = "'+back_url+'" /></div>');
	});

});