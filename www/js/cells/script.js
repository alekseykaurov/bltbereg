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

  var rects = new Array();
  var hinges = new Array();
  var lines_1 = new Array();
  var lines_2 = new Array();
  var lugs = new Array();
  var handles = new Array();
  var price = {};
  if(product==undefined && project==undefined){
    // window.location.pathname = "/";
    product = 1005;
    isProduct = true;
  } else {
    if(product!=undefined){
      isProduct = true;
    }
  }
  var width_total = 2000;
  var height_total = 1800;
  var visible_width = 150;
  var order = {};
  var isChange = {};
  var canChange = true;
  var canvas = new fabric.Canvas('canvas_1',{
    renderOnAddRemove: false,
    selection: false
  });
  var type;
  function defaultLoad(prod){
    $.ajax({
      url: '/ajax_cells/default_data.php',
      type: 'POST',
      dataType: 'json',
      async: false,
      data: {'product': prod},
      success: function(data){
        order = {
          width_total: data['total_width']['value'],
          height_total: data['total_height']['value'],
          bars_type: data['bars_type']['value'],
          main_color_type: data['main_color_type']['value'],
          main_color: data['main_color']['value'],
          main_color_value: data['main_color_value']['value']
        }

        isChange = {
          width_total: data['total_width']['changable'],
          height_total: data['total_height']['changable'],
          bars_type: data['bars_type']['changable'],
          main_color_type: data['main_color_type']['changable'],
          main_color: data['main_color']['changable']
        }
      }
    });
    order.proushina = true;
    order.rolik = true;
    $(".cell_type").removeClass("active");
    $(".cell_type[data-celltype='"+order.bars_type+"']").addClass("active");

    $(".height-value").html(order.height_total);
    $(".width-value").html(order.width_total);
    $("#input-height").val(order.height_total);
    $("#input-width").val(order.width_total);

    fillPole();

    countPossibleWidths();
    var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
    var num = Number($("input[name='height_cell']:checked").prev().data("number"));
    var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
    order.quantity_cells = quantity_cells;
    order.quantity_row = quantity_row;
    canvas.clear();
    countProportion(quantity_row, quantity_cells, num);
    $('.cell_image').show();
    getPrice();
  }

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
			$(".possible_visible_size input").prop('disabled', true);
		}else{
			$('select, input').prop('disabled', false);
			$('.setting_value, .side').css({
				'color': 'blue',
				'font-weight': 'normal',
				'text-decoration': 'underline',
				'cursor' : 'pointer'
			});
		}
		// $("#check_ruchka").prop('disabled', true);
	}
	isDisabled(canChange);

	if(project==undefined ){ 
		defaultLoad(product); 
	} else { 
		//defaultLoad(special, product);
		getOrder(project); 
	}

  function fillPole(){
    $.ajax({
      url: '/ajax_cells/get_names.php',
      type: 'POST',
      dataType: 'json',
      async: false,
      data: {'main_color': order.main_color, 'main_color_type': order.main_color_type},
      success: function(data){

        $(".setting_value.main_color_type").html(data["main_color_type"]["pagetitle"]);
        $(".setting_value.main_color").html(data["main_color"]["pagetitle"]);

      }
    });
  }

  function getPrice(){

  	$.ajax({
      url: '/ajax_cells/getPrice.php',
      type: 'POST',
      dataType: 'json',
      async: false,
      data: {'order': order},
      success: function(data){
        
        var str = String(data["total"]);
        order.total_price = data["total"];
        price = data;
		    str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        $(".price").html(str + '=');
        console.log("get price");
        console.log(data);

      }
    });
  	
  }

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

  $('.order-button').click(function(){
		// $(".order_wrap").show(200);
		console.log(order);
		$.ajax({
			url: '/ajax_cells/add_order.php',
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

  	function getOrder(num_of_order){
		if($.isNumeric(num_of_order)){
			$.ajax({
				url: '/ajax_cells/get_order.php',
				type: 'POST',
				dataType: 'json',
				async: false,
				data: {'order_id':num_of_order },
				success: function(data){
					console.log("Get Order");
					console.log(data);
					if (data['status'] == 'error'){
						$(".warning_text").html('Заказа с таким номером не существует! <br> Вы будете перенаправлены на главную страницу.');
						$(".agree_button").hide();
						$(".wrapper_4").show();
						setTimeout('window.location.href = "http://ce77747.tmweb.ru/"', 2000);

					}else if(data['status'] == 'ok'){
						$(".warning_text").html('<b>Внимание!</b> <br> Внесение изменений в проект №'+data['order']['order_id']+' невозможно.');
						$(".wrapper_4").show();
						// $(".project_preloader").hide();
						console.log("get order");
						console.log(data);
						order = {
				          width_total: data['order']['width_total'],
				          height_total: data['order']['height_total'],
				          bars_type: data['order']['bars_type'],
				          main_color_type: data['order']['main_color_type'],
				          main_color: data['order']['main_color'],
				          main_color_value: data['order']['main_color_value'],
                  cell_width: data['order']['cell_width'],
                  cell_height: data['order']['cell_height'],
                  rolik: data['order']['rolik'],
                  proushina: data['order']['proushina']
				        }

				        isChange = {
				          width_total: false,
				          height_total: false,
				          bars_type: false,
				          main_color_type: false,
				          main_color: false,
                  cell_width: false,
                  cell_height: false,
                  rolik: false,
                  proushina: false
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
						$(".B_crumbBox").append('<span class="my_breadcrumb">Проект № '+data['order']['order_id']+' от '+ddmmyy+'г.</span>');

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

						order.proushina = true;
				    order.rolik = true;
				    $(".cell_type").removeClass("active");
				    $(".cell_type[data-celltype='"+order.bars_type+"']").addClass("active");
            if (order.width_total <= 1000){
              $('.cell_type[data-celltype = 2]').hide();
              $('.cell_type[data-celltype = 4]').hide();
            }else if (order.width_total >= 2500){
              $('.cell_type[data-celltype = 1]').hide();
              $('.cell_type[data-celltype = 3]').hide();
            }

				    $(".height-value").html(order.height_total);
				    $(".width-value").html(order.width_total);
				    $("#input-height").val(order.height_total);
				    $("#input-width").val(order.width_total);

				    fillPole();
				    countPossibleWidths();
				    var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
				    var num = Number($("input[name='height_cell']:checked").prev().data("number"));
            var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
				    order.quantity_cells = quantity_cells;
				    order.quantity_row = quantity_row;
				    canvas.clear();
				    countProportion(quantity_row, quantity_cells, num);
				    $('.cell_image').show();
				    getPrice();

					}
				}
			});
		} else {
			$(".warning_text").html('Неправильно введен номер заказа! <br> Вы будете перенаправлены на главную страницу.');
			$(".agree_button").hide();
			$(".wrapper_4").show();
			setTimeout('window.location.href = "http://ce77747.tmweb.ru/"', 2000);
		}
	}

	$(".agree_button").click(function(){
		$(".wrapper_4").hide();
		$(".project_preloader").hide();
		console.log("project_preloader hide2");
	});

  // var width_cells_all = width_total - 90;
  // var quantity_cells = width_cells_all/(visible_width + 15);
  // var cells_1 = Math.floor(quantity_cells);
  // var cells_2 = Math.ceil(quantity_cells);
  // console.log('width_cells_all = '+width_cells_all+' quantity_cells = '+quantity_cells+' cells_1 = '+ cells_1 + ' cells_2 = '+cells_2);
  // var possible_width_1 = Math.ceil(width_cells_all/cells_1) - 15;
  // var possible_width_2 = Math.ceil(width_cells_all/cells_2) - 15;
  // console.log(' possible_width_1 = '+ possible_width_1 + ' possible_width_2 = '+possible_width_2);
  // $('.possible_width_1').html(possible_width_1);
  // $('.possible_width_2').html(possible_width_2);
  // var possible_step_1 = (possible_width_2 + 15)*2.8;
  // var possible_step_2 = (possible_width_2 + 15)*3.8;
  // var points_1 = Math.floor(height_total/possible_step_1);
  // var points_2 = Math.ceil(height_total/possible_step_2);

  // console.log(' points_1 = '+ points_1 + ' points_2 = '+points_2);
  // var quantity_row;
  // if ((height_total - 20) < possible_step_1*1.5){
  //   quantity_row = 3;
  // }else if ((height_total - 20) < possible_step_1 * 2){
  //   quantity_row = 4;
  // }else{
  //   quantity_row = points_1 * 2 + 1;
  // }
  
  function drawVertical(rect_width, rect_height, rect_left, count){
    var rect = new fabric.Rect({
      width: rect_width,
      height: rect_height + 12,
      left: rect_left,
      fill: order.main_color_value, 
      selectable: false
    });
    canvas.add(rect);
    rects[count] = rect;
    if (count == 1){
      if (order.bars_type == 1){
        drawLug(rect_height, rect_width, rect_left + 2, 0);
        drawHandle(rect_height, rect_left - 4, rect_width, 0);
      }else if (order.bars_type == 2){
        drawLug(rect_height, rect_width, rect_left + 2, 0);
        drawHandle(rect_height, rect_left - 4, rect_width, 0);
      }
    }else if (count == 2){
      if (order.bars_type == 1){
        drawLug(rect_height, rect_width, rect_left, 1);
      }else if (order.bars_type == 2){
        drawLug(rect_height, rect_width, rect_left, 1);
        drawHandle(rect_height, rect_left, rect_width, 1);
      }else if (order.bars_type == 3){
        drawLug(rect_height, rect_width, rect_left + 2, 0);
        drawHandle(rect_height, rect_left - 4, rect_width, 0);
      }else if (order.bars_type == 4){
        drawLug(rect_height, rect_width, rect_left + 2, 0);
        drawHandle(rect_height, rect_left - 4, rect_width, 0);
      }
    }else if (count == 3){
      if (order.bars_type == 3){
         drawLug(rect_height, rect_width, rect_left, 1);
       }else if (order.bars_type == 4){
         drawLug(rect_height, rect_width, rect_left, 1);
         drawHandle(rect_height, rect_left, rect_width, 1);
       }
    // }
    // if (order.bars_type == 1 || order.bars_type == 2){
    //   if (count == 1){
    //     drawLug(rect_height, rect_width, rect_left + 2, 0);
    //   }else if (count == 2){
    //     drawLug(rect_height, rect_width, rect_left, 1);
    //   }
    // }else if (order.bars_type == 4 || order.bars_type == 3){
    //   if (count == 2){
    //     drawLug(rect_height, rect_width, rect_left + 2, 0);
    //   }else if(count == 3){
    //     drawLug(rect_height, rect_width, rect_left, 1);
    //   }
    }else{
      canvas.renderAll();
    }
  }
  function drawHandle(rect_height, rect_left, radius, count){
    if (order.rolik){
      var handle = new fabric.Circle({
        top: rect_height + 11,
        left: rect_left,
        radius: radius,
        fill: '#fff',
        stroke: order.main_color_value,
        strokeWidth: 1,
        selectable: false
      });
      canvas.add(handle);
      handles[count] = handle;
      canvas.renderAll();
    }
  }
  function drawLug(rect_height, rect_width, rect_left, count){
    if (order.proushina){
      var lug = new fabric.Rect({
        width: rect_width - 2,
        height: 20,
        left: rect_left,
        top: rect_height/2 - 10,
        fill: '#8f8f8f',
        selectable: false
      });
      canvas.add(lug);
      lugs[count] = lug;
      canvas.renderAll();
    }
  }
  function drawHinge(hinge_width, hinge_height, hinge_left, hinge_top, count){
    var hinge = new fabric.Rect();
    console.log (hinge_width+', '+hinge_height+', '+hinge_left+', '+hinge_top+', '+count);
    canvas.add(hinge);
    var pattern_image =  new fabric.Image.fromURL('/images/metalcount/petlya.png', function(pattern_image){
      pattern_image.set({width: hinge_width, height: hinge_height});

      hinge.set({width: hinge_width, height: hinge_height, left: hinge_left, top: hinge_top});
      if (count == 3 || count == 2){
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
      hinge.set({fill: pattern});
      hinges[count] = hinge;
      canvas.renderAll();
    });
  }
  function drawCells_2_2(cells_width, cells_height, x0, lines_array, quantity_row, quantity_cells){
    var x0_0 = x0;
    var x1 = (cells_width/quantity_cells)/2 + x0;
    var y1 = cells_height/2;
    var y0 = 6;
    var x2 = cells_width/quantity_cells + x0;
    var y2 = y0;
    console.log('x0 = ' +x0+ ' x1 = ' +x1+ ' x2 = '+x2+ ' y0 = ' +y0+ ' y1 = '+y1+ ' y2 = '+y2);
    var k = 0;
    for (j = 1; j <= quantity_cells; j++){
      var path = new fabric.Path('M '+x0+' '+y0+' L '+x1+' '+y1+' L '+x2+' '+y2);
      path.set({ fill: 'white', stroke: order.main_color_value, strokeWidth: 2, selectable: false});
      canvas.add(path);
      lines_array[j] = path;
      x0 = x2 + 1;
      x1 = x1 + cells_width/quantity_cells;
      x2 = x2 + cells_width/quantity_cells;
    }
    x0 = x0_0;
    x1 = (cells_width/quantity_cells)/2 + x0;
    y1 = cells_height/2;
    y0 = cells_height;
    x2 = cells_width/quantity_cells + x0;
    y2 = y0;
    for (j = 1; j <= quantity_cells; j++){
      var path = new fabric.Path('M '+x0+' '+y0+' L '+x1+' '+y1+' L '+x2+' '+y2);
      path.set({ fill: 'white', stroke: order.main_color_value, strokeWidth: 2, selectable: false});
      canvas.add(path);
      lines_array[j + quantity_cells] = path;
      x0 = x2 + 1;
      x1 = x1 + cells_width/quantity_cells;
      x2 = x2 + cells_width/quantity_cells;
    }
    canvas.renderAll();
  }
  function drawCells_2_3(cells_width, cells_height, x0, lines_array, quantity_row, quantity_cells){
    var x0_0 = x0;
    var x1 = (cells_width/quantity_cells)/2 + x0;
    var y1 = cells_height/3;
    var y0 = 6;
    var x2 = cells_width/quantity_cells + x0;
    var y2 = y0;
    console.log('x0 = ' +x0+ ' x1 = ' +x1+ ' x2 = '+x2+ ' y0 = ' +y0+ ' y1 = '+y1+ ' y2 = '+y2);
    var k = 0;
    for (j = 1; j <= quantity_cells; j++){
      var path = new fabric.Path('M '+x0+' '+y0+' L '+x1+' '+y1+' L '+x2+' '+y2);
      path.set({ fill: 'white', stroke: order.main_color_value, strokeWidth: 2, selectable: false});
      canvas.add(path);
      lines_array[j] = path;
      x0 = x2 + 1;
      x1 = x1 + cells_width/quantity_cells;
      x2 = x2 + cells_width/quantity_cells;
    }
    x0 = x0_0;
    x1 = (cells_width/quantity_cells)/2 + x0;
    y1 = cells_height/3;
    y0 = cells_height/1.5;
    x2 = cells_width/quantity_cells + x0;
    y2 = y0;
    var x3 = (cells_width/quantity_cells)/2 + x0;
    var y3 = y1 + (cells_height/1.5);
    console.log('x0 = ' +x0+ ' x1 = ' +x1+ ' x2 = '+x2+' x3 = '+x3+ ' y0 = ' +y0+ ' y1 = '+y1+ ' y2 = '+y2+ ' y3 = ' +y3);
    var k = 0;
    for (j = 1; j <= quantity_cells; j++){
      var path = new fabric.Path('M '+x0+' '+y0+' L '+x1+' '+y1+' L '+x2+' '+y2+' L '+x3+' '+y3+' z');
      path.set({ fill: 'white', stroke: order.main_color_value, strokeWidth: 2, selectable: false});
      canvas.add(path);
      lines_array[quantity_cells + j] = path;
      x0 = x2 + 1;
      x1 = x1 + cells_width/quantity_cells;
      x2 = x2 + cells_width/quantity_cells;
      x3 = x3 + cells_width/quantity_cells;
    }
    canvas.renderAll();
  }
  function drawCells(cells_width, cells_height, x0, lines_array, quantity_row, quantity_cells){
    var x0_0 = x0;
    var x1 = (cells_width/quantity_cells)/2 + x0;
    var y1 = 6;
    var y0 = (cells_height/quantity_row)/2 + 6;
    var x2 = cells_width/quantity_cells + x0;
    var y2 = y0;
    var x3 = (cells_width/quantity_cells)/2 + x0;
    var y3 = y1 + (cells_height/quantity_row);
    console.log('x0 = ' +x0+ ' x1 = ' +x1+ ' x2 = '+x2+' x3 = '+x3+ ' y0 = ' +y0+ ' y1 = '+y1+ ' y2 = '+y2+ ' y3 = ' +y3);
    var k = 0;
    for (j = 1; j <= quantity_row; j++){
      x0 = x0_0;
      x1 = (cells_width/quantity_cells)/2 + x0_0;
      x2 = cells_width/quantity_cells + x0_0;
      x3 = (cells_width/quantity_cells)/2 + x0_0;
      for (i = 1; i <= quantity_cells; i++){
        var path = new fabric.Path('M '+x0+' '+y0+' L '+x1+' '+y1+' L '+x2+' '+y2+' L '+x3+' '+y3+' z');
        path.set({ fill: 'white', stroke: order.main_color_value, strokeWidth: 2, selectable: false});
        canvas.add(path);
        lines_array[k] = path;
        x0 = x2 + 1;
        x1 = x1 + cells_width/quantity_cells;
        x2 = x2 + cells_width/quantity_cells;
        x3 = x3 + cells_width/quantity_cells;
        k = k + 1;
      }
      y0 = y0 + (cells_height/quantity_row);
      y1 = y1 + (cells_height/quantity_row);
      y2 = y2 + (cells_height/quantity_row);
      y3 = y3 + (cells_height/quantity_row);
    }
    canvas.renderAll();
  }

  function countPossibleWidths(){
    var widths = [];
    var k = 1;
    var i = 1;
    var whoIsChecked = 0;
    if (order.bars_type == 1){
      cells_width = order.width_total - 90;
    }else if(order.bars_type == 2){
      cells_width = order.width_total/2 - 60;
    }else if (order.bars_type == 3){
      cells_width = order.width_total - 120;
    }else{
      cells_width = order.width_total/2 - 90;
    }

    $(".width-visible-possible").html("");
    var min_width = 150;
    var max_width = 225;
    if (order.height_total < 1000){
      min_width = 135;
    }
    console.log("cells_width = "+cells_width);
    while (cells_width/k >= min_width){
      console.log("k = "+k+", cells_width/k = "+cells_width/k+", min_width = "+min_width+", max_width = "+max_width);
      if (cells_width/k <= max_width){
        console.log("success");
        widths.push(Math.floor(cells_width/k));
        $(".width-visible-possible").prepend('<label for="width_cell_'+i+'"> <span class="possible_width_'+i+'" data-quantitycells = "'+k+'">'+(widths[i-1] - 15)+'</span><input type="radio" name="width_cell" id="width_cell_'+i+'"></label>');
        if(project!=undefined){
          if(order.cell_width==widths[i-1]){
            whoIsChecked = i;
          }
        } else {
          if(cells_width/k >= 160 && cells_width/k <= 180 && whoIsChecked==0){
            whoIsChecked = i;
          }
        }
        i++;
      }
      k++;
    }
    if(whoIsChecked==0){
      whoIsChecked = i-1;
    }
    $("#width_cell_"+whoIsChecked).prop("checked",true);
    order.cell_width = widths[whoIsChecked-1];
    countPossibleHeights(widths[whoIsChecked-1] - 15);

    isDisabled(canChange);

    return widths;
  }
  function countPossibleHeights(current_width){
    // alert(current_width);
      current_width = Number(current_width) + 15;
      var possible_step_1 = current_width*2.8;
    var possible_step_2 = current_width*3.8;
    var points_1 = Math.floor(order.height_total/possible_step_1);
    var points_2 = Math.ceil(order.height_total/possible_step_2);
    var flag = false;

    var quantity_row_1, quantity_row_2;
    console.log(' points_1 = '+ points_1 + ' points_2 = '+points_2);
    $(".height-visible-possible").html("");
    quantity_row_1 = points_1;
    var q_r_1 = quantity_row_1;
    var coef = 2.8;
    if (order.width_total < 1000){
      coef = 2.5;
    }
    if (order.height_total - 20 < order.cell_width*coef*1.5){
      points_1 = 2;
      q_r_1 = 1;
    }else if (order.height_total - 20 < order.cell_width*coef*2){
      points_1 = 2;
      q_r_1 = 1.5;
    }
      var height_1 = Math.floor((order.height_total-20)/q_r_1);
      var a = height_1/2;
      height_1 = Math.floor(Math.sqrt(Math.abs(4*a*a - current_width*current_width)));
      // alert(height_1);
      if (height_1 >= 400 && height_1 < order.height_total){
        $(".height-visible-possible").append('<label for="height_cell_1"> <span class="possible_height_1" data-quantityrow = "'+quantity_row_1+'" data-number = "'+20+'">'+(height_1 - 15)+'</span><input type="radio" name="height_cell" id="height_cell_1"></label>');
        if(project==undefined){
          order.cell_height = height_1;
          $("#height_cell_1").prop("checked",true);
          flag = true;
        } else {
          if(order.cell_height==height_1){
            $("#height_cell_1").prop("checked",true);
            flag = true;
          }
        }
      }
    quantity_row_2 = points_2;
      var q_r_2 = quantity_row_2;
    if (order.height_total - 10 < order.cell_width*coef*1.5){
      points_2 = 2;
      q_r_2 = 1;
    }else if (order.height_total - 10 < order.cell_width*coef*2){
      points_2 = 2;
      q_r_2 = 1.5;
    }
    if (q_r_1 != q_r_2){
      var height_2 = Math.floor((order.height_total-20)/q_r_2);
      a = height_2/2;
      height_2 = Math.floor(Math.sqrt(4*a*a - current_width*current_width));
      if (height_2 >= 400 && height_2 < order.height_total){
      	$(".height-visible-possible").append('<label for="height_cell_2"> <span class="possible_height_2" data-quantityrow = "'+quantity_row_2+'" data-number = "'+10+'">'+(height_2 - 15)+'</span><input type="radio" name="height_cell" id="height_cell_2"></label>');           
		    if(!flag){
    			order.cell_height = height_2;
    			$("#height_cell_2").prop("checked",true);
    		}
      }
    }

    isDisabled(canChange);

  }
  function countProportion(quantity_row, quantity_cells, num){
    var height_total = order.height_total;
    var width_total = order.width_total;
    var pp = width_total/250;
    var rect_width, rect_height, rect_left, count, cells_width;
    while (height_total/pp > 300){
      pp = pp + 0.5;
    }
    var cells_height = height_total/pp;
    var hinge_width = 5;
    var hinge_height = 20;
    rect_height = cells_height;
    var coef = 2.8;
    if (order.width_total < 1000){
      coef = 2.5;
    }
    if (order.bars_type == 1){
      cells_width = (width_total - 90)/pp;
      drawVertical((90/3)/pp, rect_height, 0, 0);
      drawVertical((90/3)/pp, rect_height, (90/3)/pp + cells_width, 1);
      drawVertical((90/3)/pp, rect_height, ((90/3)*2)/pp + cells_width + 1, 2);
      if (order.height_total - num < order.cell_width*coef*1.5){
        order.prolety = 3;
        drawCells_2_2(cells_width, cells_height, (90/3)/pp, lines_1, quantity_row, quantity_cells);
      }else if (order.height_total - num < order.cell_width*coef*2){
        order.prolety = 4;
        drawCells_2_3(cells_width, cells_height, (90/3)/pp, lines_1, quantity_row, quantity_cells);
      }else{
        order.prolety = quantity_row*2 + 1;
        drawCells(cells_width, cells_height, (90/3)/pp, lines_1, quantity_row, quantity_cells);
      }
    }else if (order.bars_type == 2){
      cells_width = ((width_total - 60)/2)/pp;
      drawVertical(((60/3)*2)/pp, rect_height, 0, 0);
      drawVertical((60/3)/pp, rect_height, ((60/3)*2)/pp + cells_width, 1);
      drawVertical((60/3)/pp, rect_height, 60/pp + cells_width + 1, 2);
      drawVertical(((60/3)*2)/pp, rect_height, (60/3)/pp + 2*cells_width + 60/pp + 1, 3);
      if (order.height_total - num < order.cell_width*coef*1.5){
        order.prolety = 3;
        drawCells_2_2(cells_width, cells_height, ((60/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells_2_2(cells_width, cells_height, (60/3)/pp + cells_width + 1 + 60/pp, lines_2, quantity_row, quantity_cells);
      }else if (order.height_total - num < order.cell_width*coef*2){
        order.prolety = 4;
        drawCells_2_3(cells_width, cells_height, ((60/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells_2_3(cells_width, cells_height, (60/3)/pp + cells_width + 1 + 60/pp, lines_2, quantity_row, quantity_cells);
      }else{
        order.prolety = quantity_row*2 + 1;
        drawCells(cells_width, cells_height, ((60/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells(cells_width, cells_height, (60/3)/pp + cells_width + 1 + 60/pp, lines_2, quantity_row, quantity_cells);
      }
    }else if (order.bars_type == 3){
      cells_width = (width_total - 120)/pp;
     drawVertical((90/3)/pp, rect_height, 0, 0);
     drawVertical((90/3)/pp, rect_height, (90/3)/pp + 1, 1);
     drawVertical((90/3)/pp, rect_height, (90/3)*2/pp + cells_width + 1, 2);
     drawVertical((90/3)/pp, rect_height, 90/pp + cells_width + 2, 3);
     if (order.height_total - num < order.cell_width*coef*1.5){
        order.prolety = 3;
        drawCells_2_2(cells_width, cells_height, ((90/3)*2)/pp + 1, lines_1, quantity_row, quantity_cells);
      }else if (order.height_total - num < order.cell_width*coef*2){
        order.prolety = 4;
        drawCells_2_3(cells_width, cells_height, ((90/3)*2)/pp + 1, lines_1, quantity_row, quantity_cells);
      }else{
        order.prolety = quantity_row*2 + 1;
        drawCells(cells_width, cells_height, ((90/3)*2)/pp + 1, lines_1, quantity_row, quantity_cells);
      }
     drawHinge(hinge_width, hinge_height, (90/3)/pp - 1, cells_height/7, 0);
     drawHinge(hinge_width, hinge_height, (90/3)/pp - 1, (cells_height/7)*5, 1);
    }else if (order.bars_type == 4){
      cells_width = ((width_total - 90)/2)/pp;
      drawVertical((90/3)/pp, rect_height, 0, 0);
      drawVertical((90/3)/pp, rect_height, (90/3)/pp + 1, 1);
      drawVertical((90/3)/pp, rect_height, ((90/3)*2)/pp + cells_width + 1, 2);
      drawVertical((90/3)/pp, rect_height, 90/pp + cells_width + 2, 3);
      drawVertical((90/3)/pp, rect_height, (90/3)/pp + 2*cells_width + 90/pp + 2, 4);
      drawVertical((90/3)/pp, rect_height, ((90/3)*2)/pp + 2*cells_width + 90/pp + 3, 5);
      if (order.height_total - num < order.cell_width*coef*1.5){
        order.prolety = 3;
        drawCells_2_2(cells_width, cells_height, ((90/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells_2_2(cells_width, cells_height, (90/3)/pp + cells_width + 1 + 90/pp, lines_2, quantity_row, quantity_cells);
      }else if (order.height_total - num < order.cell_width*coef*2){
        order.prolety = 4;
        drawCells_2_3(cells_width, cells_height, ((90/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells_2_3(cells_width, cells_height, (90/3)/pp + cells_width + 1 + 90/pp, lines_2, quantity_row, quantity_cells);
      }else{
        order.prolety = quantity_row*2 + 1;
        drawCells(cells_width, cells_height, ((90/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells(cells_width, cells_height, (90/3)/pp + cells_width + 1 + 90/pp, lines_2, quantity_row, quantity_cells);
      }
      drawHinge(hinge_width, hinge_height, (90/3)/pp - 1, cells_height/7, 0);
      drawHinge(hinge_width, hinge_height, (90/3)/pp - 1, (cells_height/7)*5, 1);
      drawHinge(hinge_width, hinge_height, (((90/3)*2)/pp)/2 - hinge_width/2 + 90/pp + 2*cells_width + 1 + (90/3)/pp, cells_height/7, 2);
      drawHinge(hinge_width, hinge_height, (((90/3)*2)/pp)/2 - hinge_width/2 + 90/pp + 2*cells_width + 1 + (90/3)/pp, (cells_height/7)*5, 3);
    }
    // drawVertical(rect_width, rect_height, rect_left, count);
    // drawCells(cells_width, cells_height, x0, lines_array);
  }
  // var x0 = 5;
  // var y0 = (200/quantity_row)/2;
  // var x1 = (200/cells_2)/2 + x0;
  // var y1 = 0;
  // var x2 = 200/cells_2 + x0;
  // var y2 = (200/quantity_row)/2;
  // var x3 = (200/cells_2)/2 + x0;
  // var y3 = 200/quantity_row;
  // var k = 0;
  // for (j = 1; j <= quantity_row; j++){
  //   x0 = 5;
  //   x1 = (200/cells_2)/2 + x0;
  //   x2 = 200/cells_2 + x0;
  //   x3 = (200/cells_2)/2 + x0;
  //   for (i = 1; i <= cells_2; i++){
  //     var path = new fabric.Path('M '+x0+' '+y0+' L '+x1+' '+y1+' L '+x2+' '+y2+' L '+x3+' '+y3+' z');
  //     path.set({ fill: 'white', stroke: '#ccc', strokeWidth: 2, selectable: false});
  //     canvas.add(path);
  //     lines_1[k] = path;
  //     x0 = x2 + 1;
  //     x1 = x1 + 200/cells_1;
  //     x2 = x2 + 200/cells_1;
  //     x3 = x3 + 200/cells_1;
  //     k = k + 1;
  //   }
  //   y0 = y0 + 200/quantity_row;
  //   y1 = y1 + 200/quantity_row;
  //   y2 = y2 + 200/quantity_row;
  //   y3 = y3 + 200/quantity_row;
  // }
  // canvas.add(rect_1);

  //нажатие на "Габариты рамы"
  $(".check_sizes").click(function(){
    $(".wrapper").show();
  });

  //нажатие на крестик
  $("#close_image").click(function(){
    $(".wrapper").hide();
  });

  //сохранение ширины и высоты рамы
  $(".wrapper .button_check input").click(function(){
      
      var tot_height = Number($("#input-height").val());
      var tot_width = Number($("#input-width").val());
      var error = false;
      $(".sizes_inputs input").removeClass("input_error");

      if(tot_height<500 || tot_height>3000){
        error = true;
        $("#input-height").addClass("input_error");
      }

      if(tot_width<500 || tot_width>3000){
        error = true;
        $("#input-width").addClass("input_error");
      }

      if(!error){
    		order.height_total = tot_height;
    		order.width_total = tot_width;
        $('.cell_type').show();
        if (tot_width <= 1000){
          if (order.bars_type == 2){
            order.bars_type = 1;
          }else if (order.bars_type == 4){
            order.bars_type = 3;
          }
          $('.cell_type[data-celltype = 2]').hide();
          $('.cell_type[data-celltype = 4]').hide();
        }else if (tot_width >= 2500){
          if (order.bars_type == 1){
            order.bars_type = 2;
          }else if (order.bars_type == 3){
            order.bars_type = 4;
          }
          $('.cell_type[data-celltype = 1]').hide();
          $('.cell_type[data-celltype = 3]').hide();
        }
        $(".cell_type").removeClass("active");
        $(".cell_type[data-celltype='"+order.bars_type+"']").addClass("active");
    		countPossibleWidths();
    		var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
        var num = Number($("input[name='height_cell']:checked").prev().data("number"));
    		var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
    		canvas.clear();
    		order.quantity_cells = quantity_cells;
        order.quantity_row = quantity_row;
    		countProportion(quantity_row, quantity_cells,num);

    		$(".height-value").html(order.height_total);
    		$(".width-value").html(order.width_total);

    		$(".wrapper").hide();

    		getPrice();

      }

  });

  //нажатие на тип решетки
  $(".cell_type").click(function(){
      
      if(isChange.bars_type){
	      order.bars_type = $(this).data("celltype");
	      $(".cell_type").removeClass("active");
	      $(this).addClass("active");
	      countPossibleWidths();
	      var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
        var num = Number($("input[name='height_cell']:checked").prev().data("number"));
	      var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
	      canvas.clear();
	      order.quantity_cells = quantity_cells;
	      order.quantity_row = quantity_row;
	      countProportion(quantity_row, quantity_cells, num);

	      getPrice();
      }

  });

  //нажатие на выбор ширины
  $("body").on("change", "input[name='width_cell']", function(){
    order.cell_width = Number($(this).prev().html()) + 15;
    countPossibleHeights($(this).prev().html());
    var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
    var num = Number($("input[name='height_cell']:checked").prev().data("number"));
    var quantity_cells = Number($(this).prev().data("quantitycells"));
    canvas.clear();
    order.quantity_cells = quantity_cells;
    order.quantity_row = quantity_row;
    countProportion(quantity_row, quantity_cells, num);

    getPrice();
  });

  //нажатие на выбор высоты
  $("body").on("change", "input[name='height_cell']", function(){
    order.cell_height = Number($(this).prev().html()) + 15;
    var quantity_row = Number($(this).prev().data("quantityrow"));
    var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
    var num = Number($("input[name='height_cell']:checked").prev().data("number"));
    order.quantity_cells = quantity_cells;
    order.quantity_row = quantity_row;
    canvas.clear();
    countProportion(quantity_row, quantity_cells, num);

    getPrice();
  });
  $('.checkbox_proushina').on('change', '#check_proushina', function(){
    var prop_check = $(this).prop('checked');
    var quantity_lug = lugs.length;
    order.proushina = prop_check;
    canvas.clear();
    var num = Number($("input[name='height_cell']:checked").prev().data("number"));
    countProportion(order.quantity_row, order.quantity_cells, num);
    getPrice();
  });
  $('.checkbox_rolik').on('change', '#check_rolik', function(){
    var prop_check = $(this).prop('checked');
    var quantity_handles = handles.length;
    var num = Number($("input[name='height_cell']:checked").prev().data("number"));
    order.rolik = prop_check;
    canvas.clear();
    countProportion(order.quantity_row, order.quantity_cells, num);
    getPrice();
  });
  //нажатие на меню

  $(".setting_value").click(function(){
	var type_id = $(this).data('pageid');
	var classList = $(this).attr('class').split(/\s+/);
	$.each(classList, function(index, item){
		for (var i = 0; i < classList.length; i++){
		  if (classList[i] != 'setting_value' && classList[i] != 'active'){
		    type = classList[i];
		  }
		}
  	});

  	if(canChange!=false && isChange[type] != false){

	    $('.setting_value').removeClass('active');
	    $(this).addClass('active');

	    $('.option_name').removeClass('active');
	    $('.option_name'+'.'+type).addClass('active');
	    $('.option_settings').removeClass('active');
	    $('.option_settings'+'.'+type).addClass('active');
	    $('.current_menu').remove();
	    $(this).parent().append('<div class = "current_menu"></div>');
	    $('.close_div').remove();
	    $('.current_menu').before('<div class = "close_div"><img class = "close" src = "/images/metalcount/close.gif" /></div>');
	    // $('.current_menu').append('<div class = "zamok_sort_title">Сортировка по цене:</div><form class = "zamok_sort"><select name="sort"><option value="up">По возр.</option><option value="down">По убыв.</option></select></form>');

	    $.ajax({
	      url: '/ajax_cells/get_menu.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {
	        'page': type_id,
	        'type': type
	      },
	      success: function(data){
	        // $('.current_menu').html('');
	        // alert(type);
	        console.log("get_menu");
	        console.log(data);
	        $('.current_menu h2').append(data['page']['pagetitle']);
	        $('.current_menu').append(data['txt']);
	        $(".current_menu div[data-pageid="+order[type]+"]").addClass("active-child");
	      }
	    });

  	}

  });

  //клик на крестик в меню
  $('body').on('click', '.close', function(){
    $('.current_menu').remove();
    $('.close_div').remove();
    $('.option_name').removeClass('active');
    $('.option_settings').removeClass('active');
    $('.setting_value').removeClass('active');
    $('.checkbox_main_lock, .checkbox_add_lock, .checkbox_glazok, .checkbox_dovodchik, .checkbox_zadvijka, .checkbox_steklopak').removeClass('active');
  });

  //клик на цвет
  $('body').on('click', '.current_menu .color_ral, .current_menu .antic_color, .current_menu #standart, .current_menu #specz-effekt', function(){
    if ($(this).hasClass('active-child')){
      return false;
    }else{

  		var type_id = $(this).data('pageid');
  		var color;
  		order[type] = type_id;

  		$(".current_menu div").removeClass("active-child");
  		$(".current_menu div[data-pageid="+order[type]+"]").addClass("active-child");

  		if(type=="main_color_type"){
  			if($(this).attr('id')=="standart"){
  				order["main_color"] = 197;
  				$(".setting_value.main_color").data("pageid","196");
  				order["main_color_value"] = "#3d2219";
  			} else {
  				order["main_color"] = 201;
  				$(".setting_value.main_color").data("pageid","200");
  				order["main_color_value"] = "#C2B078";
  			}
  		} else {
  		// alert($(this).children(".color_color_ral").css("background-color"));
  		  order["main_color_value"] = $(this).children(".color_color_ral").css("background-color");

  		}

  		var quantity_rects = rects.length;
  		for (i = 0; i < quantity_rects; i++){
  			rects[i].set({fill: order["main_color_value"]});
  		}
  		var quantity_lines_1 = lines_1.length;
  		var quantity_lines_2 = lines_2.length;
  		for (i = 0; i<quantity_lines_1; i++){
  			lines_1[i].set({stroke: order["main_color_value"]});
  		}
  		for (i = 0; i<quantity_lines_2; i++){
  			lines_2[i].set({stroke: order["main_color_value"]});
  		}
  		var quantity_lug = handles.length;
  		for (i = 0; i<quantity_lug; i++){
  	    	handles[i].set({stroke: order["main_color_value"]});
  	    }
  		canvas.renderAll();
  		  
  		fillPole();
      getPrice();
    }
  });

  $('body').on('click', '.new_project', function(){
		// check_color(order);
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

  //для теста
  $(".load_order_title").click(function(){
  	console.log("order");
  	console.log(order);
  	// getPrice();
    console.log(price);
  });


})