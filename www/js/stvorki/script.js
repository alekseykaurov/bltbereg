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

	var product = $.getUrlVar('product');
	var project = $.getUrlVar('project');
	var isProduct = false;
	if(product==undefined && project==undefined){
		// window.location.pathname = "/";
	} else {
		if(product!=undefined){
			isProduct = true;
		}
	}

	var order = {};
	var default_order = {};
	var color = {};
	var price = {};

	var child_color;
	var child_standart_color;
	var child_antik_color;
	var child_spec_color;

	var canChange = true;
	//Порисуем

	var w_d = 157;
	var h_d = 349;
	var rama_side = 10;
	var rama_top = 10;
	var rama_bottom = 3;

	//Пока нарисуем фронт

	var canvas = new fabric.Canvas('canvas_1',{
		imageSmoothingEnabled: false
	});
	var canvas_inside = new fabric.Canvas('canvas_2', {
		imageSmoothingEnabled: false
	});
	canvas.selection = false;
	canvas_inside.selection = false;
	var background = new fabric.Rect({
		strokeWidth: 1,
		stroke: 'rgb(0, 0, 0)',
		evented: false
	});
	var b_w = w_d + 2*rama_side;
	var b_h = h_d + rama_top + rama_bottom;
	var b_top = 0;
	var b_side = 0;
	background.set({width: b_w, height: b_h, fill: '#ccc'});
	var friz = new fabric.Rect({
		left: rama_side,
		top: rama_top,
		strokeWidth: 1,
		stroke: 'rgb(0, 0, 0)',
		evented: false
	});
	var f_h = 0;
	var door = new fabric.Rect({
		width: w_d,
		height: h_d,
		top: rama_top,
		strokeWidth: 1,
		stroke: 'rgb(0, 0, 0)',
		evented: false
	});
	var stvorka = new fabric.Rect({
		height: h_d,
		strokeWidth: 1,
		top: rama_top,
		stroke: 'rgb(0, 0, 0)',
		evented: false
	});
	var s_w;
	var ruchka = new fabric.Rect({
		evented: false
	});
	var main_lock = new fabric.Rect({
		evented: false
	});
	var main_lock_back = new fabric.Rect({
		evented: false
	});
	// var add_lock = new fabric.Rect();
	// var add_lock_back = new fabric.Rect();
	var zadvijka = new fabric.Rect({
		evented: false
	});

	var shadow = new fabric.Rect({
		width: b_w,
		height: b_h,
		evented: false
	});
	var antipanika = new fabric.Rect({
		width: w_d - 10,
		evented: false
	});
	var steklopak_vertical_left = new fabric.Rect({
		evented: false
	});
	var steklopak_vertical_right = new fabric.Rect({
		evented: false
	});
	var steklopak_horizont_top = new fabric.Rect({
		evented: false
	});
	var steklopak_horizont_bottom = new fabric.Rect({
		evented: false
	});
	var steklopak_corner_top_left = new fabric.Rect({
		evented: false
	});
	var steklopak_corner_top_right = new fabric.Rect({
		evented: false
	});
	var steklopak_corner_bottom_right = new fabric.Rect({
		evented: false
	});
	var steklopak_corner_bottom_left = new fabric.Rect({
		evented: false
	});
	var steklopak_glass = new fabric.Rect({
		evented: false
	});

	var petlya_width = 5;
	var petlya_height = 20;

	var petlya_top_1 = 45;
	var petlya_top_2 = 85;
	var petlya_top_3 = 290;

	var petlya_left_1 = new fabric.Rect({
		left: rama_side,
		top: petlya_top_1,
		evented: false
	});
	var petlya_left_2 = new fabric.Rect({
		left: rama_side,
		top: petlya_top_2,
		evented: false
	});
	var petlya_left_3 = new fabric.Rect({
		left: rama_side,
		top: petlya_top_3,
		evented: false
	});
	var petlya_right_1 = new fabric.Rect({
		left: w_d - petlya_width,
		top: petlya_top_1,
		evented: false
	});
	var petlya_right_2 = new fabric.Rect({
		left: w_d - petlya_width,
		top: petlya_top_2,
		evented: false
	});
	var petlya_right_3 = new fabric.Rect({
		left: w_d - petlya_width,
		top: petlya_top_3,
		evented: false
	});

	// var line_left_1 = new fabric.Line({
	// 	fill: '#ccc',
	// 	left: rama_side,
	// 	top: petlya_top_1 + petlya_height/2
	// });
	// var line_left_2 = new fabric.Line({
	// 	fill: '#ccc',
	// 	left: rama_side,
	// 	top: petlya_top_2 + petlya_height/2
	// });
	// var line_left_3 = new fabric.Line({
	// 	fill: '#ccc',
	// 	left: rama_side,
	// 	top: petlya_top_3 + petlya_height/2
	// });
	// var line_right_1 = new fabric.Line({
	// 	fill: '#ccc',
	// 	top: petlya_top_1 + petlya_height/2
	// });
	// var line_right_2 = new fabric.Line({
	// 	fill: '#ccc',
	// 	top: petlya_top_2 + petlya_height/2
	// });
	// var line_right_3 = new fabric.Line({
	// 	fill: '#ccc',
	// 	top: petlya_top_3 + petlya_height/2
	// });

	var back_door = new fabric.Rect({
		evented: false
	});

	canvas.add(background, friz, door, stvorka, petlya_left_1, petlya_left_2, petlya_left_3, petlya_right_1, petlya_right_2, petlya_right_3, steklopak_vertical_left, steklopak_vertical_right, steklopak_horizont_top, steklopak_horizont_bottom, steklopak_corner_top_left, steklopak_corner_top_right, steklopak_corner_bottom_right, steklopak_corner_bottom_left, steklopak_glass, shadow, ruchka, main_lock);
	canvas_inside.add(background, friz, door, stvorka, petlya_left_1, petlya_left_2, petlya_left_3, petlya_right_1, petlya_right_2, petlya_right_3, steklopak_vertical_left, steklopak_vertical_right, steklopak_horizont_top, steklopak_horizont_bottom, steklopak_corner_top_left, steklopak_corner_top_right, steklopak_corner_bottom_right, steklopak_corner_bottom_left, steklopak_glass, shadow, ruchka, main_lock_back, zadvijka, antipanika, back_door);

	var renderCount = 0;
	//функции для изменений всего вот этого
	// $('.inside').click(function(){
	// 	canvas_inside.deactivateAll();
	// 	window.open(canvas_inside.toDataURL('png'));
	// })
	var reverseFlag = false;

	var pp = 1;

	function reverse(){
		// canvas_inside.deactivateAll();
		// var img = new fabric.Image.fromURL(canvas_inside.toDataURL(), function(img){
		// 	img.set({flipX: true, left: 0, top: 0});
		// 	// renderCount = renderCount -1;
		// 	reverseFlag = true;
		// 	canvas_inside.add(img);
		// });
		back_door.set({width: 0});
		var pattern_image =  new fabric.Image.fromURL(canvas_inside.toDataURL({width: b_w + 1}), function(pattern_image){
			// pattern_image.scaleToWidth(b_h);
			canvas_inside.imageSmoothingEnabled = false;
			pattern_image.set({flipX: true});
			var back_door_left;
			if (order.outside_nalichnik == 220){
				back_door_left = rama_side - rama_bottom;
			}else{
				back_door_left = 0;
			}
			back_door.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: back_door_left,
				top: 0
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.imageSmoothingEnabled = false;
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					patternSourceCanvas.imageSmoothingEnabled = false;			
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			back_door.set({fill: pattern});
			canvas_inside.renderAll();
		});
		// $('.canvas_types_2').append('<img src = "'+img+'" />');
		// $('.canvas_types_2 .canvas-container').hide();
	}
	function check_canvas_sizes(need_start){
		$('.preloader').show();
		if (order.friz != 'false'){
			var p_h = order.height_door/order.friz_height;
			f_h = h_d/p_h;
			tmp_h = h_d + f_h;
			while (tmp_h + rama_bottom + rama_top > 380){
				pp = pp + 0.05;
				tmp_h = tmp_h/pp;
				console.log('tmp_h ' + tmp_h);
			}
			s_w = s_w/pp;
			w_d = w_d/pp;
			f_h = f_h/pp;
			b_w = b_w/pp;
			h_d = h_d/pp;
			b_h = h_d + f_h + rama_top + rama_bottom;
			console.log('height');
			console.log(h_d + f_h + rama_bottom + rama_top);
			console.log('pp ' + pp);
			petlya_top_1 = petlya_top_1/pp;
			petlya_top_2 = petlya_top_2/pp;
			petlya_top_3 = petlya_top_3/pp;
			friz.set({height: f_h});
			b_top = 0;
			b_side = 0;
			if (order.outside_nalichnik == 220){
				b_h = b_h - (rama_top - rama_bottom);
				b_w = w_d + 2*rama_bottom;
				b_top = rama_top - rama_bottom;
				b_side = b_top;
			}
			background.set({height: b_h, top: b_top, width: b_w, left: b_side});
			door.set({top: f_h + rama_top});
			stvorka.set({top: f_h + rama_top});
			shadow.set({width: b_w, height: b_h, left: b_side, top: b_top});
			petlya_left_1.set({top: petlya_top_1 + f_h});
			petlya_left_2.set({top: petlya_top_2 + f_h});
			petlya_left_3.set({top: petlya_top_3 + f_h});
			petlya_right_1.set({top: petlya_top_1 + f_h});
			petlya_right_2.set({top: petlya_top_2 + f_h});
			petlya_right_3.set({top: petlya_top_3 + f_h});
			// line_left_1.set({top: petlya_top_1 + f_h});
			// line_left_2.set({top: petlya_top_2 + f_h});
			// line_left_3.set({top: petlya_top_3 + f_h});
			// line_right_1.set({top: petlya_top_1 + f_h});
			// line_right_2.set({top: petlya_top_2 + f_h});
			// line_right_3.set({top: petlya_top_3 + f_h});
		}
		if (order.stvorka_position != 'none'){
			var p_w = order.width_door/order.stvorka_width;
			s_w = w_d/p_w;
			var tmp_w = s_w + w_d + 2*rama_side;
			var makeSmaller = false;
			while (tmp_w > 325){
				// console.log('width');
				// console.log(s_w + w_d + 2*rama_side);
				pp = pp + 0.05;
				tmp_w = tmp_w/pp;
				makeSmaller = true;
			}
			if (makeSmaller){
				s_w = s_w/pp;
				w_d = w_d/pp;
				f_h = f_h/pp;
				b_h = b_h/pp;
				h_d = b_h - rama_top - rama_bottom;
				petlya_top_1 = petlya_top_1/pp;
				petlya_top_2 = petlya_top_2/pp;
				petlya_top_3 = petlya_top_3/pp;
			}
			door.set({width: w_d, height: h_d});
			stvorka.set({width: s_w, height: h_d});
			b_w = s_w + w_d + 2*rama_side;
			b_side = 0;
			b_top = 0;
			var petlya_left = b_w - rama_side - petlya_width;
			var canvas_inside_w = b_w + 2;
			if (order.outside_nalichnik == 220){
				b_w = s_w + w_d + 2*rama_bottom;
				b_h = h_d + 2*rama_bottom;
				b_side = rama_side - rama_bottom;
				b_top = b_side;
				petlya_left = b_w;
				canvas_inside_w = s_w + w_d + 5*rama_bottom;
			}
			console.log('b_w = '+ b_w + ' s_w = ' + s_w + ' w_d = ' + w_d + ' rama_side = ' + rama_side + ' canvas_inside_w' + canvas_inside_w);
			background.set({width: b_w, left: b_side, height: b_h, top: b_top});
			shadow.set({width: b_w, height: b_h, left: b_side, top: b_top});
			// canvas_inside.setWidth(canvas_inside_w);
			friz.set({width: b_w - 2*rama_side, height: f_h});
			petlya_right_1.set({left: petlya_left});
			petlya_right_2.set({left: petlya_left});
			petlya_right_3.set({left: petlya_left});
			petlya_left_1.set({top: petlya_top_1 + f_h});
			petlya_left_2.set({top: petlya_top_2 + f_h});
			petlya_left_3.set({top: petlya_top_3 + f_h});
			petlya_right_1.set({top: petlya_top_1 + f_h});
			petlya_right_2.set({top: petlya_top_2 + f_h});
			petlya_right_3.set({top: petlya_top_3 + f_h});
			// line_right_1.set({left: b_w - rama_side - petlya_width});
			// line_right_2.set({left: b_w - rama_side - petlya_width});
			// line_right_3.set({left: b_w - rama_side - petlya_width});
			switch (order.stvorka_position){
				case 'left':
					stvorka.set({left: rama_side});
					door.set({left: s_w + rama_side});
					// if (order.main_lock == 'Ручка на планке'){
					// 	main_lock.set({left: s_w + rama_side});
					// 	main_lock_back.set({left: s_w + rama_side});
					// }else{
					// 	main_lock.set({left: s_w + rama_side + 5/pp});
					// 	main_lock_back.set({left: s_w + rama_side + 5/pp});
					// }
					break;
				case 'right':
					door.set({left: rama_side});
					stvorka.set({left: w_d + rama_side});
					// if (order.main_lock == 'Ручка на планке'){
					// 	main_lock.set({left: w_d - main_lock.getWidth() + rama_side});
					// 	main_lock_back.set({left: w_d - main_lock.getWidth() + rama_side});
					// }else{
					// 	main_lock.set({left: w_d - main_lock.getWidth() + rama_side - 5/pp});
					// 	main_lock_back.set({left: w_d - main_lock.getWidth() + rama_side - 5/pp});
					// }
					break;
			}
		}
		if (order.stvorka_position == 'none' && order.friz == 'false' && order.outside_nalichnik == 220){
			background.set({width: w_d + 2*rama_bottom, height: h_d + 2*rama_bottom, left: rama_side - rama_bottom, top: rama_top - rama_bottom});
		}
		canvas.renderAll();
		canvas_inside.renderAll();
	}
	function change_main_color(){
		$('.preloader').show();
		if (color.main_color_type == "tablicza-czvetov-ral1"){
			background.set({fill: color.main_color_color});
			door.set({fill: color.main_color_color});
			stvorka.set({fill: color.main_color_color});
			friz.set({fill: color.main_color_color});
			canvas.renderAll();
			canvas_inside.renderAll();
		}else{
			var pattern_image =  new fabric.Image.fromURL(color.main_color_color, function(pattern_image){
				pattern_image.scaleToWidth(320);

				var patternSourceCanvas = new fabric.StaticCanvas();
				patternSourceCanvas.add(pattern_image);
				// alert(pattern_image.getWidth());

				var pattern = new fabric.Pattern({
					source: function(){
						patternSourceCanvas.setDimensions({
							width: pattern_image.getWidth(),
							height: pattern_image.getHeight()
						});
						return patternSourceCanvas.getElement();
					},
					repeat: 'repeat'
				});
				background.set({fill: pattern});
				door.set({fill: pattern});
				stvorka.set({fill: pattern});
				friz.set({fill: pattern});
				canvas.renderAll();
				canvas_inside.renderAll();
			});
		}
	}
	function draw_petlya(petlya, flag){
		$('.preloader').show();
		var pattern_image =  new fabric.Image.fromURL('/images/metalcount/petlya.png', function(pattern_image){
			pattern_image.set({width: petlya_width, height: petlya_height});

			petlya.set({width: petlya_width/pp, height: petlya_height/pp});
			if (flag == 'right'){
				pattern_image.set({flipX: true});
			}
			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			petlya.set({fill: pattern});
			// line.set({width: petlya_width, height: 1});
			canvas.renderAll();
			canvas_inside.renderAll();
		});
	}
	function change_shadow(){
		$('.preloader').show();
		var shadow_src;
		if (color.main_color_shade == 'Dark'){
			// shadow_src = "/images/stvorki/shadow.png";
			shadow_src = "/images/metalcount/shadow-light.png";
			shadow.set({globalCompositeOperation: 'soft-light'});
		}else{
			shadow_src = "/images/metalcount/shadow-light.png";
			shadow.set({globalCompositeOperation: 'none'});
		}
		var pattern_image =  new fabric.Image.fromURL(shadow_src, function(pattern_image){
			pattern_image.set({width: b_w, height: b_h});

			shadow.set({width: b_w, height: b_h, left: b_side, top: b_top});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'repeat'
			});
			shadow.set({fill: pattern});
			canvas.renderAll();
			canvas_inside.renderAll();
			// reverse();
		});
	}

	function change_main_lock(){
		$('.preloader').show();
		var pattern_image =  new fabric.Image.fromURL(color.main_lock, function(pattern_image){
			if (color.main_lock_ruchka != "Ручка на планке"){
				pattern_image.scaleToWidth(13/pp);
			}else{
				pattern_image.scaleToWidth(45/pp);
			}
			var main_lock_left;
			var main_lock_top;
			console.log('stvorka:'+order.stvorka_position);
			switch (order.stvorka_position){
				case 'left':
					main_lock_left = s_w + rama_side;
					if (color.main_lock_ruchka != 'Ручка на планке'){
						main_lock_left = main_lock_left + 5/pp;
					}
					pattern_image.set({flipX: true});
					break;
				case 'right':
					main_lock_left = w_d - pattern_image.getWidth()  + rama_side;
					if (color.main_lock_ruchka != 'Ручка на планке'){
						main_lock_left = main_lock_left - 5/pp;
					}
					break;
			}
			switch (order.friz){
				case 'true':
					main_lock_top = 200/pp - pattern_image.getHeight()/2 + f_h;
					break;
				case 'false':
					main_lock_top = 200/pp - pattern_image.getHeight()/2;
					break;
			}
			main_lock.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: main_lock_left,
				top: main_lock_top
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'repeat'
			});
			main_lock.set({fill: pattern});
			change_handle();
			// canvas.renderAll();
		});
	}
	function change_main_lock_back(){
		$('.preloader').show();
		var main_lock_src;
		if (color.main_lock_ruchka != "Ручка на планке" && color.main_lock_inside_bottom != ''){
			main_lock_src = color.main_lock_inside_bottom;
		}else if (color.main_lock_inside_bottom == '' || color.main_lock_ruchka == "Ручка на планке"){
			main_lock_src = color.main_lock;
		}
		var pattern_image =  new fabric.Image.fromURL(main_lock_src, function(pattern_image){
			if (color.main_lock_ruchka != "Ручка на планке"){
				pattern_image.scaleToWidth(13/pp);
			}else{
				pattern_image.scaleToWidth(45/pp);
			}
			var main_lock_left;
			var main_lock_top;
			switch (order.stvorka_position){
				case 'left':
					main_lock_left = s_w + rama_side;
					if (color.main_lock_ruchka != 'Ручка на планке'){
						main_lock_left = main_lock_left + 5/pp;
					}
					pattern_image.set({flipX: true});
					break;
				case 'right':
					main_lock_left = w_d - pattern_image.getWidth()  + rama_side;
					if (color.main_lock_ruchka != 'Ручка на планке'){
						main_lock_left = main_lock_left - 5/pp;
					}
					break;
			}
			switch (order.friz){
				case 'true':
					main_lock_top = 200/pp - pattern_image.getHeight()/2 + f_h;
					break;
				case 'false':
					main_lock_top = 200/pp - pattern_image.getHeight()/2;
					break;
			}
			main_lock_back.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: main_lock_left,
				top: main_lock_top
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'repeat'
			});
			main_lock_back.set({fill: pattern});
			canvas_inside.renderAll();
			// canvas.renderAll();
		});
	}
	function change_handle(){
		console.log(color);
		if (color.main_lock_ruchka_image == '' && (color.main_lock_ruchka == 'Без ручки' || color.main_lock_ruchka == '')){
			color.main_lock_ruchka = 'Ручка-кнопка';
			color.main_lock_ruchka_image = '/images/metalcount/ruchka_round.png';
		}else if (color.main_lock_ruchka == ''){
			ruchka.set({width: 0});
			canvas.renderAll();
			canvas_inside.renderAll();
			return false;
		}
		var pattern_image =  new fabric.Image.fromURL(color.main_lock_ruchka_image, function(pattern_image){
			var handle_left;
			var handle_top;
			if (color.main_lock_ruchka == 'Без ручки' || color.main_lock_ruchka == '' || color.main_lock_ruchka == 'Ручка-кнопка'){
				pattern_image.scaleToWidth(25/pp);
			}else if(color.main_lock_ruchka == 'С ручкой'){
				pattern_image.scaleToWidth(36/pp);
			}
			switch (order.stvorka_position){
				case 'left':
					handle_left = s_w + rama_side + 5/pp;
					pattern_image.set({flipX: true});
					break;
				case 'right':
					handle_left = w_d - pattern_image.getWidth()  + rama_side - 5/pp;
					break;
			}
			switch (order.friz){
				case 'true':
					handle_top = 175/pp - pattern_image.getHeight()/2 + f_h;
					break;
				case 'false':
					handle_top = 175/pp - pattern_image.getHeight()/2;
					break;
			}
			ruchka.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: handle_left,
				top: handle_top
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'repeat'
			});
			ruchka.set({fill: pattern});
			canvas.renderAll();
			if (order.ruchka != 'true'){
				canvas_inside.renderAll();
			}
		});
	}
	// function change_add_lock(){
	// 	var pattern_image =  new fabric.Image.fromURL(color.add_lock, function(pattern_image){
	// 		pattern_image.scaleToWidth(45);
	// 		var add_lock_left;
	// 		var add_lock_top;
	// 		switch (order.stvorka_position){
	// 			case 'left':
	// 				add_lock_left = s_w + rama_side;
	// 				break;
	// 			case 'right':
	// 				add_lock_left = w_d - pattern_image.getWidth()  + rama_side;
	// 				break;
	// 		}
	// 		switch (order.friz){
	// 			case 'true':
	// 				add_lock_top = 134 - pattern_image.getHeight()/2 + f_h;
	// 				break;
	// 			case 'false':
	// 				add_lock_top = 134 - pattern_image.getHeight()/2;
	// 				break;
	// 		}
	// 		add_lock.set({
	// 			width: pattern_image.getWidth(), 
	// 			height: pattern_image.getHeight(),
	// 			left: add_lock_left,
	// 			top: add_lock_top
	// 		});

	// 		var patternSourceCanvas = new fabric.StaticCanvas();
	// 		patternSourceCanvas.add(pattern_image);

	// 		var pattern = new fabric.Pattern({
	// 			source: function(){
	// 				patternSourceCanvas.setDimensions({
	// 					width: pattern_image.getWidth(),
	// 					height: pattern_image.getHeight()
	// 				});
	// 				return patternSourceCanvas.getElement();
	// 			},
	// 			repeat: 'no-repeat'
	// 		});
	// 		add_lock.set({fill: pattern});
	// 		canvas.renderAll();
	// 	});
	// }
	// function change_add_lock_back(){
	// 	var add_lock_src;
	// 	if (color.add_lock_type == "цилиндр" && (color.main_lock_type == "сувальд." || (color.main_lock == "" && order.zadvijka == ""))){
	// 		add_lock_src = color.add_image_zamok_inside;
	// 	}else{
	// 		if (color.add_lock_type == 'сувальд.'){
	// 			add_lock_src = color.add_image_zamok_inside;
	// 		}else{
	// 			add_lock_src = color.add_image_zamok_syst_inside;
	// 		}
	// 	}
	// 	var pattern_image =  new fabric.Image.fromURL(add_lock_src, function(pattern_image){
	// 		pattern_image.scaleToWidth(45);
	// 		var add_lock_left;
	// 		var add_lock_top;
	// 		switch (order.stvorka_position){
	// 			case 'left':
	// 				add_lock_left = s_w + rama_side;
	// 				break;
	// 			case 'right':
	// 				add_lock_left = w_d - pattern_image.getWidth()  + rama_side;
	// 				break;
	// 		}
	// 		switch (order.friz){
	// 			case 'true':
	// 				add_lock_top = 134 - pattern_image.getHeight()/2 + f_h;
	// 				break;
	// 			case 'false':
	// 				add_lock_top = 134 - pattern_image.getHeight()/2;
	// 				break;
	// 		}
	// 		add_lock_back.set({
	// 			width: pattern_image.getWidth(), 
	// 			height: pattern_image.getHeight(),
	// 			left: add_lock_left,
	// 			top: add_lock_top
	// 		});

	// 		var patternSourceCanvas = new fabric.StaticCanvas();
	// 		patternSourceCanvas.add(pattern_image);

	// 		var pattern = new fabric.Pattern({
	// 			source: function(){
	// 				patternSourceCanvas.setDimensions({
	// 					width: pattern_image.getWidth(),
	// 					height: pattern_image.getHeight()
	// 				});
	// 				return patternSourceCanvas.getElement();
	// 			},
	// 			repeat: 'no-repeat'
	// 		});
	// 		add_lock_back.set({fill: pattern});
	// 		canvas_inside.renderAll();
	// 	});
	// }
	function draw_antipanika(){
		$('.preloader').show();
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/antipanika.png', function(pattern_image){
			var handle_left;
			var handle_top;
			pattern_image.scaleToWidth(w_d - 10/pp);
			switch (order.stvorka_position){
				case 'left':
					handle_left = s_w + rama_side + 5/pp;
					pattern_image.set({flipX: true});
					break;
				case 'right':
					handle_left = rama_side + 5/pp;
					break;
			}
			switch (order.friz){
				case 'true':
					handle_top = 200/pp - pattern_image.getHeight()/2 + f_h;
					break;
				case 'false':
					handle_top = 200/pp - pattern_image.getHeight()/2;
					break;
			}
			antipanika.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: handle_left,
				top: handle_top
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'repeat'
			});
			ruchka.set({width: 0});
			main_lock_back.set({width: 0});
			antipanika.set({fill: pattern});
			canvas_inside.renderAll();
		});
	}
	function change_zadvijka(){
		$('.preloader').show();
		var pattern_image =  new fabric.Image.fromURL(color.zadvijka_image, function(pattern_image){
			var handle_left;
			var handle_top;
			pattern_image.scaleToWidth(13/pp);
			switch (order.stvorka_position){
				case 'left':
					handle_left = s_w + rama_side + 5/pp;
					break;
				case 'right':
					handle_left = w_d - pattern_image.getWidth()  + rama_side -5/pp;
					break;
			}
			switch (order.friz){
				case 'true':
					handle_top = 134/pp - pattern_image.getHeight()/2 + f_h;
					break;
				case 'false':
					handle_top = 134/pp - pattern_image.getHeight()/2;
					break;
			}
			zadvijka.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: handle_left,
				top: handle_top
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'repeat'
			});
			zadvijka.set({fill: pattern});
			canvas_inside.renderAll();
		});
	}
	var corner_height;
	function draw_steklopak(){
		$('.preloader').show();
		var w = order['steklopak_width']/70*rama_side/pp;
		var h = order['steklopak_height']/70*rama_side/pp;
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/steklo.png', function(pattern_image){
			var pad_left;
			var pad_top;
			var min_left = 270/70*rama_side/pp;
			var min_top = 370/70*rama_side/pp;
			var min_bottom = 320/70*rama_side/pp;
			switch(order['window_align']){
				case 'top_left':
					pad_left = min_left;
					pad_top = min_top;
					break;
				case 'top_center':
					pad_left = w_d/2 - w/2;
					pad_top = min_top;
					break;
				case 'top_right':
					pad_left = w_d - min_left - w;
					pad_top = min_top;
					break;
				case 'middle_left':
					pad_left = min_left;
					pad_top = h_d/2 - h/2;
					break;
				case 'middle_center':
					pad_left = w_d/2 - w/2;
					pad_top = h_d/2 - h/2;
					break;
				case 'middle_right':
					pad_left = w_d - min_left - w;
					pad_top = h_d/2 - h/2;
					break;
				case 'bottom_left':
					pad_left = min_left;
					pad_top = h_d - min_bottom - h;
					break;
				case 'bottom_center':
					pad_left = w_d/2 - w/2;
					pad_top = h_d - min_bottom - h;
					break;
				case 'bottom_right':
					pad_left = w_d - min_left - w;
					pad_top = h_d - min_bottom - h;
					break;
				default:
					console.log('все сломалось');
			}
			if (order.friz != 'false'){
				pad_top = pad_top + f_h;
			}
			if (order.stvorka_position == 'left'){
				pad_left = pad_left + stvorka.getWidth();
			}
			pad_left = pad_left + rama_side;
			console.log('pad_left:' + pad_left + ' pad_top: '+pad_top );
			pad_left = Math.round(parseInt(pad_left));
			pad_top = Math.round(parseInt(pad_top));
			pattern_image.width = Math.round(w);
			pattern_image.height = Math.round(h);
			steklopak_glass.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left,
				top: pad_top
			});
			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'repeat'
			});
			w = Math.round(w);
			h = Math.round(h);
			steklopak_glass.set({fill: pattern});
			draw_corner_top_left(pad_left, pad_top, w, h);
		});
	}
	function draw_corner_top_left(pad_left, pad_top, w, h){
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/corner_top_left.png', function(pattern_image){
			pattern_image.width = Math.round(8/pp);
			pattern_image.height = Math.round(8/pp);
			steklopak_corner_top_left.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left - pattern_image.getWidth(),
				top: pad_top - pattern_image.getHeight()
			});
			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			steklopak_corner_top_left.set({fill: pattern});
			// canvas.renderAll();
			// draw_corner_top_right(pad_top, pad_left, w, h);
			draw_horizont_top(pad_top, pad_left, w, h);
		});
	}
	function draw_corner_top_right(pad_top, pad_left, w, h){
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/corner_top_right.png', function(pattern_image){
			pattern_image.width = Math.round(8/pp);
			pattern_image.height = Math.round(8/pp);
			steklopak_corner_top_right.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left + w,
				top: pad_top - pattern_image.getHeight()
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			steklopak_corner_top_right.set({fill: pattern});
			// canvas.renderAll();
			draw_vertical_right(pad_top, pad_left, w, h);
			// draw_corner_bottom_right(pad_top, pad_left, w, h);
		});
	}
	function draw_corner_bottom_right(pad_top, pad_left, w, h){
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/corner_bottom_right.png', function(pattern_image){
			pattern_image.width = Math.round(8/pp);
			pattern_image.height = Math.round(8/pp);
			steklopak_corner_bottom_right.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left + w,
				top: pad_top + h
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			steklopak_corner_bottom_right.set({fill: pattern});
			// canvas.renderAll();
			draw_corner_top_right(pad_top, pad_left, w, h);
			// draw_corner_bottom_left(pad_top, pad_left, w, h);
		});
	}
	function draw_corner_bottom_left(pad_top, pad_left, w, h){
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/corner_bottom_left.png', function(pattern_image){
			pattern_image.width = Math.round(8/pp);
			pattern_image.height = Math.round(8/pp);
			steklopak_corner_bottom_left.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left - pattern_image.getWidth(),
				top: pad_top + h
			});
			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			steklopak_corner_bottom_left.set({fill: pattern});
			// canvas.renderAll();
			draw_horizont_bottom(pad_top, pad_left, w, h);
			// draw_vertical_left(pad_top, pad_left, w, h);
		});
	}
	function draw_vertical_left(pad_top, pad_left, w, h){
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/vertical_element2.png', function(pattern_image){
			pattern_image.width = Math.round(8/pp);
			pattern_image.height = h;
			steklopak_vertical_left.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left - pattern_image.getWidth(),
				top: pad_top
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			steklopak_vertical_left.set({fill: pattern});
			// canvas.renderAll();
			draw_corner_bottom_left(pad_top, pad_left, w, h);
			// draw_vertical_right(pad_top, pad_left, w, h);
		});
	}
	function draw_vertical_right(pad_top, pad_left, w, h){
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/vertical_element.png', function(pattern_image){
			pattern_image.width = Math.round(8/pp);
			pattern_image.height = h;
			steklopak_vertical_right.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left + w,
				top: pad_top
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			steklopak_vertical_right.set({fill: pattern});
			canvas.renderAll();
			canvas_inside.renderAll();
			// draw_horizont_top(pad_top, pad_left, w, h);
		});
	}
	function draw_horizont_top(pad_top, pad_left, w, h){
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/horizont_element.png', function(pattern_image){
			pattern_image.width = w;
			pattern_image.height = Math.round(8/pp);
			steklopak_horizont_top.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left,
				top: pad_top - pattern_image.getHeight()
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			steklopak_horizont_top.set({fill: pattern});
			// draw_horizont_bottom(pad_top, pad_left, w, h);
			draw_vertical_left(pad_top, pad_left, w, h);
		});
	}
	function draw_horizont_bottom(pad_top, pad_left, w, h){
		var pattern_image =  new fabric.Image.fromURL('/images/steklopak/horizont_element2.png', function(pattern_image){
			pattern_image.width = w;
			pattern_image.height = Math.round(8/pp);
			steklopak_horizont_bottom.set({
				width: pattern_image.getWidth(), 
				height: pattern_image.getHeight(),
				left: pad_left,
				top: pad_top + h
			});

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(pattern_image);

			var pattern = new fabric.Pattern({
				source: function(){
					patternSourceCanvas.setDimensions({
						width: pattern_image.getWidth(),
						height: pattern_image.getHeight()
					});
					return patternSourceCanvas.getElement();
				},
				repeat: 'no-repeat'
			});
			steklopak_horizont_bottom.set({fill: pattern});
			draw_corner_bottom_right(pad_top, pad_left, w, h);
			// canvas.renderAll();
			// canvas_inside.renderAll();
		});
	}
	//функция для включения\отключения активности у кнопок меню
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
		// $("#check_ruchka").prop('disabled', true);
	}
	isDisabled(canChange);

	//функция для заполнения меню названиями
	function fillPole(key){
		if (key != 'ruchka'){
			$.ajax({
				url: '/ajax_stvorki/get_names.php',
				type: 'GET',
				dataType: 'json',
				async: false,
				data: {'page': order[key], 'inside_view': order.inside_view, 'key': key},
				success: function(data){
					// console.log("fillpolee");
					// console.log(key);
					// console.log(data);
					if(order[key]=="other"){
						$(".setting_value.steklopak").html(order["steklopak_height"]+"*"+order["steklopak_width"]);
					} else {
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
				},
				error: function(data){
					// console.log("fillpolee error");
					// console.log(key);
					// console.log(data);
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
			if (key == 'inside_view'){
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
			}else if (key == 'outside_view'){
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
			}else if (key == 'main_lock'){
				if (order.main_lock == '' || order.main_lock == null){
					$('.main_lock_title').css('display', 'none');
				}else{
					$('.main_lock_title').css('display', 'block');
				}
			}else if (key == 'add_lock'){
				if (order.add_lock == '' || order.add_lock == null){
					$('.add_lock_title').css('display', 'none');
				}else{
					$('.add_lock_title').css('display', 'block');	
				}
			} else if(key == 'metallokonstr'){
				$('.setting_value.metallokonstr').css({
					'color': 'blue',
					'font-weight': 'bold',
					'text-decoration': 'none',
					'cursor' : 'pointer'
				});
			}
			// $("#check_ruchka").prop('disabled', true);
		}else {
			if(order.main_lock=="" || order.main_lock==null){
				$("#check_ruchka").prop('disabled', false);
				$("#check_ruchka").prop('checked', false);
				
			} else {
				if (key == 'ruchka' && order.ruchka == 'true'){
					$("#check_ruchka").prop('disabled', false);
					$("#check_ruchka").prop('checked', true);

				}else if (key == 'ruchka' && order.ruchka == 'false'){
					$("#check_ruchka").prop('disabled', false);
					$("#check_ruchka").prop('checked', false);
				}
			}
			if(project!=undefined){
				$("#check_ruchka").prop('disabled', true);
			}
		} 
	}

	//функция для загрузки значений в order
	function defaultLoad(prod){
		$.ajax({
			url: '/ajax_stvorki/default_data.php',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: {'product': prod},
			success: function(data){
				console.log("default "+prod);
				console.log(data);
				order = {
					metallokonstr: data['metallokonstrikcii_id']['value'],
					width_total: data['total_width']['value'],
					height_total: data['total_height']['value'],
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
					dovodchik: data['dovodchik_id']['value'],
					zadvijka: data['zadvijka_id']['value'],
					steklopak: data['steklopaket_id']['value'],
					steklopak_width: data['steklopaket_width']['value'],
					steklopak_height: data['steklopaket_height']['value'],
					window_align: data['steklopaket_position']['value'],
					ruchka: data['ruchka']['value'],
					stvorka_position: data['stvorka_position']['value'],
					stvorka_width: data['stvorka_width']['value'],
					friz: data['friz']['value'],
					friz_height: data['friz_height']['value']
				};
				default_order ={
					metallokonstr: data['metallokonstrikcii_id']['value'],
					width_total: data['total_width']['value'],
					height_total: data['total_height']['value'],
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
					dovodchik: data['dovodchik_id']['value'],
					zadvijka: data['zadvijka_id']['value'],
					steklopak: data['steklopaket_id']['value'],
					steklopak_width: data['steklopaket_width']['value'],
					steklopak_height: data['steklopaket_height']['value'],
					window_align: data['steklopaket_position']['value'],
					ruchka: data['ruchka']['value'],
					stvorka_position: data['stvorka_position']['value'],
					stvorka_width: data['stvorka_width']['value'],
					friz: data['friz']['value'],
					friz_height: data['friz_height']['value']
				};
				isChange = {
					metallokonstr: data['metallokonstrikcii_id']['changable'],
					width_total: data['total_width']['changable'],
					height_total: data['total_height']['changable'],
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
					dovodchik: data['dovodchik_id']['changable'],
					zadvijka: data['zadvijka_id']['changable'],
					steklopak: data['steklopaket_id']['changable'],
					ruchka: data['ruchka']['changable'],
					stvorka_position: data['stvorka_position']['changable'],
					stvorka_width: data['stvorka_width']['changable'],
					friz: data['friz']['changable'],
					friz_height: data['friz_height']['changable']
				};
				if (project != undefined){
					for (var key in isChange){
						isChange[key] = false;
					}
				}
				child_color = data['child_color']['value'];
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
				check_canvas_sizes();
			}
		});
	}

	//загружаем значения в order
	if(project==undefined ){ 
		defaultLoad(product); 
	} else { 
		//defaultLoad(special, product);
		getOrder(project); 
	}

	//заполняем меню
	for( var key in order){
		if (order[key] !== null || order[key] !== undefined || key != 'width_door' || key != 'height_door'){
			// console.log(key);
			fillPole(key);
		}
	}
	$('#input-height').val(order.height_total);
	$('#input-width').val(order.width_total);
	$('.width-value').html(order.width_total);
	$('.height-value').html(order.height_total);
	$('#door-height').val(order.height_door);
	$('#door-width').val(order.width_door);

	//функция для получения картинок/цветов для значений в order
	function check_color(order){
		$.ajax({
			url: '/ajax_protivopojar/drawing.php',
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
				'zadvijka': order.zadvijka,
				'ruchka': order.ruchka
			},
			success: function(data){
				color['main_color_color'] = data['main_color_color'];
				color['main_color_type'] = data['main_color_type'];
				color['main_color_shade'] = data['main_color_shade'];
				color['outside_color_color'] = data['outside_color_color'];
				color['outside_color_type'] = data['outside_color_type'];
				// color['outside_color_frezer'] = data['outside_frezer'];
				color['outside_shade'] = data['outside_shade']
				color['inside_color_color'] = data['inside_color_color'];
				color['inside_color_type'] = data['inside_color_type'];
				// color['inside_color_frezer'] = data['inside_frezer'];
				// color['inside_color_frezer_mirror'] = data['inside_mirror'];
				color['inside_shade'] = data['inside_shade'];
				color['main_lock'] = data['main_lock'];
				color['main_lock_outside_picture'] = data['main_lock_outside_picture'];
				color['main_lock_type'] = data['main_lock_type'];
				color['main_lock_ruchka'] = data['main_lock_ruchka'];
				color['main_lock_ruchka_image'] = data['main_lock_ruchka_image'];
				color['main_lock_inside_bottom'] = data['main_lock_inside_bottom'];
				color['main_lock_inside_top'] = data['main_lock_inside_top'];
				color['main_lock_isCloser'] = data['main_lock_isCloser'];
				color['main_lock_najim'] = data['main_lock_najim'];
				color['is_main_lock_syst'] = data['is_main_lock_syst'];
				color['add_lock'] = data['add_lock'];
				color['add_lock_color'] = data['add_lock_color'];
				color['add_lock_type'] = data['add_lock_type'];
				color['add_lock_image'] = data['add_lock_image'];
				color['add_image_zamok_syst_inside'] = data['add_image_zamok_syst_inside'];
				color['add_image_zamok_inside'] = data['add_image_zamok_inside'];
				// color['glazok'] = data['glazok'];
				color['furniture_color'] = data['furniture_color'];
				color['zadvijka_image'] = data['zadvijka'];
				// color['ruchka_antipanika'] = data['antipanika'];
				// color['ruchka'] = data['ruchka'];
				// color['is_main_lock_barier'] = data['is_main_lock_barier'];
				// color['is_add_lock_barier'] = data['is_add_lock_barier'];''
				// width_1 = (order.width_door * height_1)/order.height_door;
				// draw(color);
			}
		});
		console.log(color);
		// if (color.outside_color_type == 'czvet' && order.outside_view != 231){
		// 	$('.outside_frezerovka').css('display', 'block');
		// }else{
		// 	$('.outside_frezerovka').css('display', 'none');
		// }
		// if (color.inside_color_type == 'czvet' && order.inside_view != 231){
		// 	$('.inside-frezerovka').css('display', 'block');
		// }else{
		// 	$('.inside-frezerovka').css('display', 'none');
		// }
	}

	// получаем картинки для order
	check_color(order);
	function start(){
		change_main_color();
		renderCount = renderCount + 1;
		if (order.stvorka_position != 'none'){
			draw_petlya(petlya_left_1, 'left');
			draw_petlya(petlya_left_2, 'left');
			draw_petlya(petlya_left_3, 'left');
			draw_petlya(petlya_right_1, 'right');
			draw_petlya(petlya_right_2, 'right');
			draw_petlya(petlya_right_3, 'right');
			renderCount = renderCount + 6;
		}else{
			switch (order.door_side){
				case 'left':
					draw_petlya(petlya_left_1, 'left');
					draw_petlya(petlya_left_2, 'left');
					draw_petlya(petlya_left_3, 'left');
					renderCount = renderCount + 3;
					break;
				case 'right':
					draw_petlya(petlya_right_1, 'right');
					draw_petlya(petlya_right_2, 'right');
					draw_petlya(petlya_right_3, 'right');
					renderCount = renderCount + 3;
					break;
			}
		}
		if ((order.main_lock != '' && order.main_lock != null) && order.ruchka != 'true'){
			change_main_lock();
			change_main_lock_back();
			renderCount = renderCount + 2;
		}else if ((order.main_lock != '' && order.main_lock != null) && order.ruchka == 'true'){
			change_main_lock();
			draw_antipanika();
			renderCount = renderCount + 1;
		}else{
			change_handle();
			renderCount = renderCount + 1;
		}
		// if (order.add_lock != '' && order.add_lock != null){
		// 	change_add_lock();
		// 	change_add_lock_back();
		// 	renderCount = renderCount + 1;
		// }
		if (order.zadvijka != '' && order.zadvijka != null){
			change_zadvijka();
			renderCount = renderCount + 1;
		}
		if (order.steklopak != '' && order.steklopak != null){
			draw_steklopak();
			renderCount = renderCount + 1;
		}
		change_shadow();
		renderCount = renderCount + 1;
	}
	var kk = 1;
	start();
	canvas_inside.on('after:render', function(e){
		$('.preloader').hide();
		if (reverseFlag == false){
			console.log('renderCount = '+renderCount+'   kk =' +kk + '   reverseFlag = '+reverseFlag);
			if (kk == renderCount){
				reverseFlag = true;
				reverse();
				kk = kk + 1;
			}else if (kk < renderCount){
				kk = kk+1;
			}
		}
	});
	// reverse();
	//клик на чекбоксы
	$('.options_box').on('change', '#check_main_lock, #check_add_lock, #check_glazok, #check_dovodchik, #check_zadvijka, #check_ruchka', function(){
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
				$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka, .checkbox_steklopak').removeClass('active');
				order[type] = '';
				// $("#check_ruchka").prop('checked', false);
				// $("#check_ruchka").prop('disabled', true);
				if (type != 'ruchka'){
					fillPole(type);
				}else{
					order.ruchka = 'false';
					antipanika.set({width: 0});
					reverseFlag = false;
					kk = 1;
					renderCount = 2;
					change_main_lock_back();
					change_handle();
				}
				if(type == 'main_lock'){
					order.ruchka = 'false';
					$("#check_ruchka").prop('disabled', false);
					$("#check_ruchka").prop('checked', false);
				}
				check_color(order);
				// if(type == 'main_lock' || type == 'add_lock' || type == 'glazok' || type == 'zadvijka' || type == 'ruchka'){
				// 	check_color(order);
				// 	// draw(color);
				// }
				switch (type){
					case 'main_lock':
						main_lock.set({width: 0});
						main_lock_back.set({width: 0});
						antipanika.set({width: 0});
						reverseFlag = false;
						kk = 1;
						renderCount = 1;
						change_handle();
						break;
					case 'zadvijka':
						zadvijka.set({width: 0});
						reverse();
						break;
					default:
						break;
				}
			}else{
				if (type != 'ruchka'){
					$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka, .checkbox_steklopak').removeClass('active');
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
				}else{
					// checkLock(order.metallokonstr, order.outside_view, "checkbox_main");
					$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka, .checkbox_steklopak').removeClass('active');
					$('.setting_value').removeClass('active');
					$('.option_name').removeClass('active');
					$('.option_settings').removeClass('active');
					$('.current_menu').remove();
					$('.close_div').remove();
				}
				if (type == 'add_lock'){
					// $('.current_menu').append('<div class = "zamok_type_title">Тип:</div><form class = "zamok_types"><input type="radio" value = "cilindr" name = "zamok_type" id = "cilindr""><label for="cilindr">Цилиндр</label><input type="radio" value="suvald" name = "zamok_type" id = "suvald"><label for="suvald">Сувальд</label></form>');
					// $('.current_menu').append('<div class = "zamok_color_title">Цвет:</div><form class = "zamok_colors"><input type="radio" value = "gold" name = "zamok_color" id = "gold"><label for="gold">Золото</label><input type="radio" value="chrom" name = "zamok_color" id = "chrom"><label for="chrom">Хром</label><input type="radio" value="other" name = "zamok_color" id = "other"><label for="other">Другое</label></form>');
					$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
					// $('.current_menu').append('<div class = "zamok_list"></div>');
					order[type] = default_order.add_lock;
					// alert(order.add_lock);
					//if(order.metallokonstr==193 && order.outside_view != 195){
						checkLock(order.metallokonstr, order.outside_view, "checkbox_add");
						get_data(type_id, '');
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
					// $('input[name = zamok-type]').prop('checked', false).removeClass('current_choice');
					// $('input[value = '+filter_1+']').prop('checked', true).addClass('current_choice');
					// $('input[name = zamok-color]').prop('checked', false).removeClass('current_choice');
					// $('input[value = '+filter_2+']').prop('checked', true).addClass('current_choice');
					check_furniture(filter_1, filter_2, type, type_id, sort_value);
					// draw(color);
				}else if (type == 'main_lock'){
					// $('.current_menu').append('<div class = "zamok_type_title">Тип:</div><form class = "zamok_types"><input type="radio" value = "cilindr" name = "zamok_type" id = "cilindr"><label for="cilindr">Цилиндр</label><input type="radio" value="suvald" name = "zamok_type" id = "suvald"><label for="suvald">Сувальд</label><input type="radio" value="syst" name = "zamok_type" id = "syst"><label for="syst">2-х системный</label></form>');
					// $('.current_menu').append('<div class = "zamok_color_title">Цвет:</div><form class = "zamok_colors"><input type="radio" value = "gold" name = "zamok_color" id = "gold"><label for="gold">Золото</label><input type="radio" value="chrom" name = "zamok_color" id = "chrom"><label for="chrom">Хром</label><input type="radio" value="other" name = "zamok_color" id = "other"><label for="other">Другое</label></form>');
					$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
					// $('.current_menu').append('<div class = "zamok_list"></div>');
					order[type] = default_order.main_lock;
					//if(order.metallokonstr==193 && order.outside_view != 195){
						checkLock(order.metallokonstr, order.outside_view, "checkbox_main");
						get_data(type_id, '');
					//}
					var sort_value = $("select[name = sort]").val();
					check_color(order);
					if (color.main_lock_ruchka == 'Без ручки' || color.main_lock_najim == 'false'){
							order.ruchka == 'false';
							$("#check_ruchka").prop('disabled', false);
							$("#check_ruchka").prop('checked', false);
					}else{
						$("#check_ruchka").prop('disabled', false);
					}
					fillPole(type);
					// check_color(order);
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
					// $('input[name = zamok-type]').prop('checked', false).removeClass('current_choice');
					// $('input[value = '+filter_1+']').prop('checked', true).addClass('current_choice');
					// $('input[name = zamok-color]').prop('checked', false).removeClass('current_choice');
					// $('input[value = '+filter_2+']').prop('checked', true).addClass('current_choice');
					check_furniture(filter_1, filter_2, type, type_id, sort_value);
					reverseFlag = false;
					kk = 1;
					if (order.ruchka == 'false'){
						renderCount = 2;
						change_main_lock();
						change_main_lock_back();
					}else{
						renderCount = 1;
						change_main_lock();
					}
					// draw(color);
				}else{
					if (type == 'glazok'){
						order[type] = "225";
						check_color(order);
						// draw(color);
						fillPole(type);
						get_data(type_id, '');
					}else if (type == 'dovodchik'){
						order[type] = "227";
						fillPole(type);
						get_data(type_id, '');
					}else if (type == 'zadvijka'){
						order[type] == "230";
						fillPole(type);
						get_data(type_id, '');
					}else if (type == 'ruchka'){

						checkLock(order.metallokonstr, order.outside_view, "checkbox_main");
						check_color(order);
						if (color.main_lock_najim == 'true'){
							order.ruchka = 'true';
							$('#check_ruchka').prop('disabled', false);
							$('#check_ruchka').prop('checked', true);
							check_color(order);
							reverseFlag = false;
							kk = 1;
							renderCount = 1;
							change_main_lock();
							draw_antipanika();
							// draw(color);
						}else{
							order.ruchka = 'false';
							$('#check_ruchka').prop('disabled', false);
							$('#check_ruchka').prop('checked', false);
							check_color(order);
							// draw(color);
						}
					}
				}
			}
		}
			// draw_under_doors();
			getPrice();
			console.log("click!");
			console.log(order);
	});
	function check_furniture(filter_1, filter_2, type, id_zamok, sort_value){
		$.ajax({
			url: '/ajax_protivopojar/draw_furniture.php',
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
	//клик на чекбокс стеклопакета
	$('body').on("change", '#check_steklopak', function(){
		type = 'steklopak';
		var type_id = $('.setting_value.'+type).data('pageid');
		if ($(this).is(':checked')==false){
			$('.current_menu').remove();
			$('.close_div').remove();
			$(".other_window_size").hide();
			$(this).removeClass('active');
			$('.setting_value').removeClass('active');
			$('.option_name').removeClass('active');
			$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka, .checkbox_steklopak').removeClass('active');
			order[type] = '';
			getPrice();
			fillPole(type);
			steklopak_glass.set({width: 0});
			steklopak_horizont_bottom.set({width: 0});
			steklopak_horizont_top.set({width: 0});
			steklopak_vertical_left.set({width: 0});
			steklopak_vertical_right.set({width: 0});
			steklopak_corner_top_right.set({width: 0});
			steklopak_corner_top_left.set({width: 0});
			steklopak_corner_bottom_left.set({width: 0});
			steklopak_corner_bottom_right.set({width: 0});
			canvas.renderAll();
			canvas_inside.renderAll();
			reverse();
			// if(type == 'main_lock' || type == 'add_lock' || type == 'glazok' || type == 'zadvijka'){
			// 	check_color(order);
			// 	draw(color);
			// }
		}else{
			$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka').removeClass('active');
			$(this).addClass('active');
			$(this).parent().addClass('active');
			$('.setting_value').removeClass('active');
			$('.setting_value.'+type).addClass('active');
			$('.option_name').removeClass('active');
			$('.option_name'+'.'+type).addClass('active');
			$('.option_settings').removeClass('active');
			$('.option_settings'+'.'+type).addClass('active');
			$('.current_menu').remove();
			$(this).parent().parent().append('<div class = "current_menu"></div>');
			$('.close_div').remove();
			// $(".other_window_size").show();
			$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
			//$("#middle_hor, #middle_ver").prop("checked", true);
			get_windows(type_id, order["width_door"], order["height_door"]);
			// draw_steklopak();
			// console.log(order);

		}
		// draw(color);
	});

	//функция для получения картинки стеклопакета
	function get_windows(type_id, rama_width, rama_height){
		$.ajax({
			url: '/ajax_stvorki/get_windows.php',
			type: 'POST',
			dataType: 'json',
			data: {
				'page': type_id,
				'rama_width': rama_width,
				'rama_height': rama_height
			},
			success: function(data){
				// $('.current_menu').html('');
				// alert(type);
				console.log("get_windows");
				console.log(data);

				if(order[type]=="" || order[type]==undefined){
					order[type] = data['select'];
					order["steklopak_height"] = data['select_height'];
					order["steklopak_width"] = data['select_width'];
					$(".wrapper_2 #input-height").val(data['select_height']);
					$(".wrapper_2 #input-width").val(data['select_width']);
				}


				if(order["window_align"]=="" || order["window_align"]==undefined){
					order["window_align"]="middle_center";
				}

				$('.current_menu h2').append(data['page']['pagetitle']);
				$('.current_menu').append(data['txt']);
				if(order[type]=="other"){
					// $(".current_menu .other_window_size").addClass("active-child");
					$(".setting_value.steklopak").html(order["steklopak_height"]+"*"+order["steklopak_width"]);
				} else {
					$(".steklopaket_item[data-pageid="+order[type]+"]").children('span').addClass("active-child");
				}

				$(".window_align .align_row ."+order["window_align"]).addClass("active-child");

				$('.steklopaket_item').each(function(){
					var wid = $(this).data("width");
					var hei = $(this).data("height");
					$(this).children('.window_wrapper').children().css({"width": wid/40, "height": hei/40});
					
				});
				reverseFlag = false;
				kk = 1;
				renderCount = 1;
				draw_steklopak();
				fillPole(type);
				getPrice();
			}
		});
	}

	//клик по положению стеклопакета
	$("body").on("click",".window_align .align_row span", function(){
		$(".window_align .align_row span").removeClass("active-child");
		order["window_align"] = $(this).attr("class");
		$(this).addClass("active-child");
		reverseFlag = false;
		kk = 1;
		renderCount = 1;
		draw_steklopak();
	});
	//клик по кнопке "Нестандартные размеры" для стеклопакета
	$("body").on("click",".other_window_size", function(){
		$(".wrapper_2").show();
	});
	//клик по кнопке "Применить" в нестандартных размерах стеклопакета
	$("body").on("click",".wrapper_2 input[type=button]", function(){
		var window_height = $(".wrapper_2 #input-height").val();
		var window_width = $(".wrapper_2 #input-width").val();

		var rama_S = (order["width_door"]*order["height_door"])/4;
		var window_S = window_height*window_width;
		var max_height = order.height_door - 370 - 320;
		if(window_S>rama_S){
			alert("Размер окна превышает допустимые значения! Введенные значения будут изменены до максимально допустимых");
			window_width_tmp = order.width_door - 2*270;
			window_height_tmp = Math.floor(rama_S/window_width/10)*10;
			if (window_width > window_width_tmp){
				window_width = window_width_tmp;
				window_height_tmp = Math.floor(rama_S/window_width/10)*10;
				if (window_height > window_height_tmp){
					if (window_height_tmp > max_height){
						window_height = max_height;
					}else{
						window_height = window_height_tmp;
					}
				}
			}else if (window_height > window_height_tmp){
				if (window_height_tmp > max_height){
					window_height = max_height;
				}else{
					window_height = window_height_tmp;
				}
			}

			$(".wrapper_2 #input-height").val(window_height);
			$(".wrapper_2 #input-width").val(window_width);
		}

		order["steklopak"] = "other";
		order["steklopak_width"] = window_width;
		order["steklopak_height"] = window_height;
		$(".wrapper_2 #input-width").val(window_width);
		$(".wrapper_2 #input-height").val(window_height);

		$(".steklopak .current_menu div span").removeClass('active-child');
		// $(".steklopak .other_window_size").addClass('active-child');

		$(".setting_value.steklopak").html(window_height+"*"+window_width);

		$(".wrapper_2").hide();

		getPrice();
		// draw(color);
	});
	//клик по сортировке меню
	$("body").on("change","select[name = sort]", function(){
		var type_id = $(this).parent().parent().prev().prev().data("pageid");
		var sort_value = $(this).val();
		$(".current_menu").children('.zamok').remove();
		// var classList = $(this).parent().parent().prev().prev().attr('class').split(/\s+/);
		// var zamok_type = $(".zamok_types .current_choice").val();
		// var zamok_color = $(".zamok_colors .current_choice").val();
		// $.each(classList, function(index, item){
		// 	for (var i = 0; i < classList.length; i++){
		// 		if (classList[i] != 'setting_value' && classList[i] != 'active'){
		// 			type = classList[i];
		// 		}
		// 	}
		// });
		// check_furniture(zamok_type, zamok_color, type, type_id, sort_value);

		get_data(type_id, '', sort_value);

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
				$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
				// $('.current_menu').append('<div class = "zamok_type_title">Тип:</div><form class = "zamok_types"><input type="radio" value = "cilindr" name = "zamok_type" id = "cilindr"><label for="cilindr">Цилиндр</label><input type="radio" value="suvald" name = "zamok_type" id = "suvald"><label for="suvald">Сувальд</label><input type="radio" value="syst" name = "zamok_type" id = "syst"><label for="syst">2-х системный</label></form>');
				// $('.current_menu').append('<div class = "zamok_color_title">Цвет:</div><form class = "zamok_colors"><input type="radio" value = "gold" name = "zamok_color" id = "gold"><label for="gold">Золото</label><input type="radio" value="chrom" name = "zamok_color" id = "chrom"><label for="chrom">Хром</label><input type="radio" value="other" name = "zamok_color" id = "other"><label for="other">Другое</label></form>');
				$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
				// $('.current_menu').append('<div class = "zamok_list"></div>');
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
				// $('input[name = zamok-type]').prop('checked', false).removeClass('current_choice');
				// $('input[value = '+filter_1+']').prop('checked', true).addClass('current_choice');
				// $('input[name = zamok-color]').prop('checked', false).removeClass('current_choice');
				// $('input[value = '+filter_2+']').prop('checked', true).addClass('current_choice');
				check_furniture(filter_1, filter_2, type, type_id, sort_value);
				get_data(type_id, '');
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
				$('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
				// $('.current_menu').append('<div class = "zamok_type_title">Тип:</div><form class = "zamok_types"><input type="radio" value = "cilindr" name = "zamok_type" id = "cilindr"><label for="cilindr">Цилиндр</label><input type="radio" value="suvald" name = "zamok_type" id = "suvald"><label for="suvald">Сувальд</label></form>');
				// $('.current_menu').append('<div class = "zamok_color_title">Цвет:</div><form class = "zamok_colors"><input type="radio" value = "gold" name = "zamok_color" id = "gold"><label for="gold">Золото</label><input type="radio" value="chrom" name = "zamok_color" id = "chrom"><label for="chrom">Хром</label><input type="radio" value="other" name = "zamok_color" id = "other"><label for="other">Другое</label></form>');
				$('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');
				// $('.current_menu').append('<div class = "zamok_list"></div>');
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
				// $('input[name = zamok-type]').prop('checked', false).removeClass('current_choice');
				// $('input[value = '+filter_1+']').prop('checked', true).addClass('current_choice');
				// $('input[name = zamok-color]').prop('checked', false).removeClass('current_choice');
				// $('input[value = '+filter_2+']').prop('checked', true).addClass('current_choice');
				check_furniture(filter_1, filter_2, type, type_id, sort_value);
				get_data(type_id, '');
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
				if(type=="steklopak"){
					get_windows(type_id, order["width_door"], order["height_door"]);
				} else {
					get_data(type_id, tmp);
				}
				
			}
		}
	});
	
	//получение данных для заполнения выпадающего меню
	function get_data(type_id, tmp, sort_value){
		// alert(sort_value);
		if(sort_value==undefined){
			sort_value = "up";
		}
		$.ajax({
			url: '/ajax_protivopojar/get_menu.php',
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
				// $('.current_menu').html('');
				// alert(type);
				$('.current_menu h2').append(data['page']['pagetitle']);
				$('.current_menu').append(data['txt']);
				$(".current_menu div[data-pageid="+order[type]+"]").addClass("active-child");
			}
		});
	}

	//клик на тип и цвет замка (фильтрация, тут эта функция не нужна)
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

	//рисует под дверьми текущие замки
	function draw_under_doors(){

		$.ajax({
			url: '/ajax_protivopojar/drawUnderDoors.php',
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

	//клик на замок
	$('body').on('click', '.current_menu .zamok', function(){
		if ($(this).hasClass('active-child')){
			return false;
		}else{
			var type_id = $(this).data('pageid');
			order[type] = type_id;
			fillPole(type);
			check_color(order);
			if (color.main_lock_ruchka == 'Без ручки' || color.main_lock_najim == 'false' ){
				order.ruchka = 'false';
				$("#check_ruchka").prop('disabled', false);
				$("#check_ruchka").prop('checked', false);
			}else{
				$("#check_ruchka").prop('disabled', false);
			}
			check_color(order);
			reverseFlag = false;
			kk = 1;
			if (order.ruchka == 'false'){
				renderCount = 2;
				change_main_lock_back();
				change_main_lock();
			}else{
				renderCount = 1;
				change_main_lock();
			}
			// draw(color);
			draw_under_doors();
			getPrice();
			$(".zamok").removeClass("active-child");
			$(".current_menu div[data-pageid="+order[type]+"]").addClass("active-child");
			return false;
		}
	});

	//клик на стеклопакет
	$('body').on('click', '.current_menu .steklopaket_item', function(){
		if ($(this).hasClass('active-child')){
			return false;
		}else{
			// $(".current_menu .steklopaket_item, .other_window_size").removeClass('active-child');
			$(".current_menu .steklopaket_item span").removeClass('active-child');
			$(this).children('.window_wrapper').addClass('active-child');

			var cur_id = $(this).data("pageid");
			var sp_height = $(this).data("height");
			var sp_width = $(this).data("width");

			order["steklopak"] = cur_id;
			order["steklopak_width"] = sp_width;
			order["steklopak_height"] = sp_height;

			getPrice();

			fillPole(type);
			reverseFlag = false;
			kk = 1;
			renderCount = 1;
			draw_steklopak();
			// draw(color);
		}
		console.log(order);
	});

	//клик на все что можно
	$('body').on('click', '.current_menu .metalconstr, .current_menu .color_ral, .current_menu .antic_color, .current_menu #pokraska1, .current_menu #mdf-6, .current_menu #mdf-10, .current_menu #laminat, .current_menu #mdf-10-s-zerkalom, .current_menu .mdf_color, .current_menu .nalichnik, .current_menu .frezerovka_image, .current_menu .glazki, .current_menu .dovodchik_list, .current_menu .zadvijka_list, .current_menu #standart, .current_menu #antik, .current_menu #specz-effekt, .current_menu .ruchka_list', function(){
		if ($(this).hasClass('active-child')){
			return false;
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
				reverseFlag = false;
				kk = 1;
				renderCount = 2;
				change_main_color();
				change_shadow();
				// draw(color);

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
			// if (type == 'outside_view' || type == 'outside_color' || type == 'outside_frezer' || type == 'inside_view' || type == 'inside_color' || type == 'inside_frezer' || type == 'main_color' || type == 'outside_nalichnik' || type == 'glazok'|| type == 'zadvijka' || type == 'metallokonstr'){
			// 	check_color(order);
			// 	// draw(color);
			// }
			switch (type){
				case 'outside_nalichnik':
					check_color(order);
					reverseFlag = false;
					kk = 1;
					renderCount = 2;
					check_canvas_sizes();
					change_shadow();
					break;
				case 'zadvijka':
					check_color(order);
					reverseFlag = false;
					kk = 1;
					renderCount = 1;
					change_zadvijka();
					break;
				case 'main_color':
					check_color(order);
					reverseFlag = false;
					kk = 1;
					renderCount = 2;
					change_main_color();
					change_shadow();
				default:
					break;
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

	//проверка замков на совместимость
	function checkLock(metall, outside_view, type){
		// console.log("CHECKLOCK");
		// console.log(type);
		// console.log(order);
		// alert(order.add_lock);
		// alert(order.main_lock);
		$.ajax({
			url: '/ajax_protivopojar/checkLock.php',
			type: 'POST',
			async: false,
			dataType: 'json',
			data: {
				'metalokonstr': metall,
				'outside_view': outside_view,
				'main_lock': order.main_lock,
				'add_lock': order.add_lock,
				'type': type
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
	//клик на крестик в меню
	$('body').on('click', '.close', function(){
		$('.current_menu').remove();
		$('.close_div').remove();
		$('.option_name').removeClass('active');
		$('.option_settings').removeClass('active');
		$('.setting_value').removeClass('active');
		$('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka, .checkbox_steklopak').removeClass('active');
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

    //функция для проверки введенных размеров
	function check_sizes(){
		var height_door = $('#door-height').val();
		var width_door = $('#door-width').val();
		var total_height = $('#input-height').val();
		var total_width = $('#input-width').val();
		var stvorka_width = total_width - width_door;
		var friz_height = total_height - height_door;
		
		if (height_door < 1800 || height_door > 2200 || width_door < 800 || width_door > 1100 || (order.stvorka_position != 'none' && (stvorka_width < 300 || stvorka_width > 900)) || (order.friz != 'false' && (friz_height < 200 || friz_height > 600))){
			$('.warning_message').css('display', 'block');
		}
		else{
			order.height_door = height_door;
			order.width_door = width_door;
			order.stvorka_width = stvorka_width;
			order.friz_height = friz_height;
			getPrice();
			$('.height-value').html(order.height_total);
			$('.width-value').html(order.width_total);
			$('.wrapper').css('display', 'none');
			reverseFlag = false;
			kk = 1;
			renderCount = 0;
			check_canvas_sizes();
			start();
			
		}
		// width_1 = (order.width * height_1)/order.height_door;
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

	//функция для получения текущей стоимости
	function getPrice(){
		$.ajax({
			url: '/ajax_stvorki/getPrice.php',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: { 'order':order, 'product':product },
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
	//переворот двери
	$('.door_side').click(function(){
		if (canChange && isChange['door_side']){
			var tmp = $(this).attr('id');
			$('.door_side').css('display', 'block');
			$(this).css('display', 'none');
			if (tmp == 'right'){
				// order.door_side = 'left';
				// $('#door-front').css('margin-left', '0px');
				order.stvorka_position = 'left';
				reverseFlag = false;
				kk = 1;
				renderCount = 0;
				check_canvas_sizes();
				start();
			}else if(tmp == 'left'){
				// order.door_side = 'right';
				// $('#door-front').css('margin-left', '-1px');
				order.stvorka_position = 'right';
				reverseFlag = false;
				kk = 1;
				renderCount = 0;
				check_canvas_sizes();
				start();
			}

			// reverse();
			// reverse2();
		}
	});

	$('.outside, .inside').click(function(){
		alert('haha');
		if ($(this).hasClass('active_door') == false){
			$('.outside, .inside').removeClass('active_door');
			$(this).addClass('active_door');
			if ($(this).hasClass('inside')){
				$('.canvas_types').hide();
				$('.canvas_types_2').show();
			}else{
				$('.canvas_types_2').hide();
				$('.canvas_types').show();
			}
		}
	});

	//проверка корзины
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
    //меняет фразу на кнопке "Добавить в корзину"
    function change_phrase(phrase){
    	// alert(product_id);
    	$('.order-button').html(phrase);
    }
    //Добавляет дверь в корзину
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

				$(".wrapper_3 .added_text").html("Проект №"+order_id+" сохранен на сайте и добавлен в корзину");
				$(".wrapper_3").show();
				// window.location.href = "http://ce77747.tmweb.ru/konstruktor-protivopozharnyix-dverej/";
			},
			error: function(data){
				console.log('error');
				console.log(data);
			}
		});		
	}
	//хехе
	order.stvorka = 'Двустворчатая';

	$('.order-button').click(function(){
		// $(".order_wrap").show(200);
		console.log(order);
		$.ajax({
			url: '/ajax_stvorki/add_order.php',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: { 'order':order, 'price':price },
			success: function(data){
				console.log('success add order');
				console.log(data);
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

	$('.add_cart').click(function(){
		var product_id = $(this).data('id');
		var isPay = $(this).data('ispay');
		var quantity = $('.quantity input[data-id = '+product_id+']').val();
		// alert(quantity);
		$.ajax({
			url: '/ajax_cart/addToCart.php',
			type: 'POST',
			dataType: 'json',
			data: {'product_id': product_id,
				   'isPay': isPay,
				   'count': quantity},
			success: function(data){
				console.log('Cart Updated');
				change_phrase('Добавлено', product_id);
				checkCart();
				// $(".wrapper_3 .added_text").html("Товар \""+data["product_title"]+"\" добавлен в корзину");
				$(".wrapper_3").show();
				setTimeout(change_phrase, 2000, 'Добавить в корзину', product_id);
			},
			error: function(data){
				console.log('error');
				console.log(data);
			}
		});		
	});

	function getOrder(num_of_order){
		if($.isNumeric(num_of_order)){
			$.ajax({
				url: '/ajax_stvorki/get_order.php',
				type: 'POST',
				dataType: 'json',
				async: false,
				data: {'order_id':num_of_order },
				success: function(data){
					console.log("Get Order");
					console.log(data);
					if (data['status'] == 'error'){
						alert('Заказа с таким номером не существует!');
					}else if(data['status'] == 'ok'){
						alert('Внимание! Внесение изменений в проект №'+data['order']['order_id']+' невозможно.');
						order = {
							metallokonstr: data['order']['metallokonstr'],
							width_total: data['order']['width_total'],
							height_total: data['order']['height_total'],
							width_door: data['order']['width_door'],
							height_door: data['order']['height_door'],
							door_side: data['order']['door_side'],
							main_color_type: data['order']['main_color_type'],
							main_color: data['order']['main_color'],
							outside_view: data['order']['outside_view'],
							outside_color: data['order']['outside_color'],
							outside_frezer: data['order']['outside_frezer'],
							outside_nalichnik: data['order']['outside_nalichnik'],
							inside_view: data['order']['inside_view'],
							inside_color: data['order']['inside_color'],
							inside_frezer: data['order']['inside_frezer'],
							main_lock: data['order']['main_lock'],
							add_lock: data['order']['add_lock'],
							dovodchik: data['order']['dovodchik'],
							zadvijka: data['order']['zadvijka'],
							steklopak: data['order']['steklopak'],
							steklopak_width: data['order']['steklopak_width'],
							steklopak_height: data['order']['steklopak_height'],
							window_align: data['order']['window_align'],
							ruchka: data['order']['ruchka'],
							stvorka_position: data['order']['stvorka_position'],
							stvorka_width: data['order']['stvorka_width'],
							friz: data['order']['friz'],
							friz_height: data['order']['friz_height']
						};
						default_order ={
							metallokonstr: data['order']['metallokonstr'],
							width_total: data['order']['width_total'],
							height_total: data['order']['height_total'],
							width_door: data['order']['width_door'],
							height_door: data['order']['height_door'],
							door_side: data['order']['door_side'],
							main_color_type: data['order']['main_color_type'],
							main_color: data['order']['main_color'],
							outside_view: data['order']['outside_view'],
							outside_color: data['order']['outside_color'],
							outside_frezer: data['order']['outside_frezer'],
							outside_nalichnik: data['order']['outside_nalichnik'],
							inside_view: data['order']['inside_view'],
							inside_color: data['order']['inside_color'],
							inside_frezer: data['order']['inside_frezer'],
							main_lock: data['order']['main_lock'],
							add_lock: data['order']['add_lock'],
							dovodchik: data['order']['dovodchik'],
							zadvijka: data['order']['zadvijka'],
							steklopak: data['order']['steklopak'],
							steklopak_width: data['order']['steklopak_width'],
							steklopak_height: data['order']['steklopak_height'],
							window_align: data['order']['window_align'],
							ruchka: data['order']['ruchka'],
							stvorka_position: data['order']['stvorka_position'],
							stvorka_width: data['order']['stvorka_width'],
							friz: data['order']['friz'],
							friz_height: data['order']['friz_height']
						};
						isChange = {
							metallokonstr: false,
							width_total: false,
							height_total: false,
							width_door: false,
							height_door: false,
							door_side: false,
							main_color_type: false,
							main_color: false,
							outside_view: false,
							outside_color: false,
							outside_frezer: false,
							outside_nalichnik: false,
							inside_view: false,
							inside_color: false,
							inside_frezer: false,
							main_lock: false,
							add_lock: false,
							dovodchik: false,
							zadvijka: false,
							steklopak: false,
							steklopak_width: false,
							steklopak_height: false,
							window_align: false,
							ruchka: false,
							stvorka_position: false,
							stvorka_width: false,
							friz: false,
							friz_height: false
						};
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
						$('h1').before('<div class = "new_project">Новый проект</div>');

						child_color = data['order']['child_color'];
						child_standart_color = data['order']['child_standart_color'];
						child_antik_color = data['order']['child_antik_color'];
						child_spec_color = data['order']['child_spec_color'];
						$(".setting_value.main_color").data("pageid",order.main_color_type);
						$(".content h1").show();
						check_canvas_sizes();

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
		// draw(color);
		product = null;
		special = null;
		getPrice();

		$(".content h1").html("Конструктор \"Противопожарные двери\"");

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
		$('.wrapper_2').hide();
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