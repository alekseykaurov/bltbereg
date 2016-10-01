$(document).ready(function(){

	$(".cart_order_form").css("height", "auto");
	var order_form_height = $(".cart_order_form").height();
	$(".cart_order_form").css("height", "0px");

	$(".quantity input, .quantity_item input").keydown(function(event) {
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
    $(".quantity input").focusout(function(event) {
        if ($(this).val() == 0){
        	$(this).val(1);
        }
    });

    //изменение количества в корзине
    var current_count = 0;
    $('body').on('focusin', '.quantity_item input', function(event) {
    	current_count = $(this).val();
    });

    $('body').on('focusout', '.quantity_item input', function(event) {
        if ($(this).val() == 0){
        	$(this).val(1);
        }

        if($(this).val!=current_count){
        	var change_id = $(this).data("id");

	        $.ajax({
				url: '/ajax_cart/changeQuantity.php',
				type: 'POST',
				dataType: 'json',
				data: {"change_id": change_id,
					   "count": $(this).val()},
				success: function(data){
					console.log('change quantity');
					console.log(data);
					getCart();
					checkCart();
				}
			});
        }
    });

    $('body').on('click', '.delete_item img', function(event) {
    	var delete_id = $(this).parent().data('id');
    	$.ajax({
			url: '/ajax_cart/deleteFromCart.php',
			type: 'POST',
			dataType: 'json',
			data: {"delete_id": delete_id},
			success: function(data){
				console.log('delete item');
				console.log(data);
				getCart();
				checkCart();
			}
		});
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

    checkCart();
    function change_phrase(phrase, product_id){
    	// alert(product_id);
    	$('.add_cart[data-id = '+product_id+']').html(phrase);
    }
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
	$(".keep_shopping").click(function() {
		var loc = window.location.pathname;
		window.location.href = "http://blt-bereg.ru"+loc;
	});
	$(".open_cart").click(function() {
		window.location.href = "http://blt-bereg.ru/cart/";
	});

	function getCart(){
		$.ajax({
			url: '/ajax_cart/getCart.php',
			type: 'POST',
			dataType: 'json',
			data: {},
			success: function(data){
				console.log('Get Cart');
				console.log(data);
				$(".cart_items").html(data["txt"]);
				$(".cart_total_price span").html(data["total_price"]);
				if(data["demontag"]==false){
					$(".block_3 .demontaj").hide();
				}
			},
			error: function(data){
				console.log('error');
				console.log(data);
			}
		});	
	}

	var url = location.href;
	//получаем корзину, если открыли страницу с корзиной
	if(url.indexOf("cart.html") + 1){
		getCart();
		var order_form_check = 0;
	}
	function validateEmail(t) {
    	var e = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([а-яА-ЯёЁa-zA-Z\-0-9]+\.)+[а-яА-ЯёЁa-zA-Z]{2,}))$/,
        i = t;
    	return e.test(i) ? !0 : !1 
    }
    function validatePhone(t){
    	var e = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        i = t;
    	return e.test(i) ? !0 : !1
    }
	$(".inside_add_cart").click(function(){
		if(order_form_check==0){
			order_form_check=1;
			$(".cart_order_form").animate({height: order_form_height}, 1000);
			$(this).html("Заказать");
		} else {
			var error = false;
			var client_data = {};
			$('.cart_order_form input').each(function(){
				var input_value = $(this).val();
				var input_name = $(this).attr("name");
				$(this).css("border", '1px solid rgb(169, 169, 169)');
				if ($(this).hasClass('hasReqiured')){
					if (input_value == ''){
						$(this).css("border-color", "red");
						error = true;
					}else{
						if (input_name == 'fio'){
							client_data[input_name] = input_value;
						}else if(input_name == 'phone'){
							if (validatePhone(input_value)){
								client_data[input_name] = input_value;
							}else{
								$(this).css("border-color", "red");
								error = true;
							}
						}
					}
				}else{
					if (input_name == 'email'){
						if (validateEmail(input_value) || input_value == ''){
							client_data[input_name] = input_value;	
						}else{
							$(this).css("border-color", "red");
							error = true;
						}
					}else if (input_name == 'etaj'){
						if (input_value != ''){
							if(parseInt(input_value)>0 && parseInt(input_value)<199){ //проверка количества этажей на корректность
								client_data[input_name] = input_value;
							} else {
								$(this).css("border", "1px solid red");
								error = true;
							}
						}else{
							client_data[input_name] = input_value;
						}
					}else if(input_name == 'lift'){
						if($(this).prop("checked")){
							client_data[input_name] = 'да';
						} else {
							client_data[input_name] = 'нет';
						}
					}else if (input_name == 'delivery'){
						if($(this).prop("checked")){
							client_data[input_name] = 'да';
						} else {
							client_data[input_name] = 'нет';
						}
					}else if (input_name == 'montaj'){
						if($(this).prop("checked")){
							client_data[input_name] = 'да';
						} else {
							client_data[input_name] = 'нет';
						}
					}else if (input_name == 'demontaj'){
						if($(this).prop("checked")){
							client_data[input_name] = 'да';
						} else {
							client_data[input_name] = 'нет';
						}
					}
				}
			});
			client_data['address'] = $('.cart_order_form textarea[name = adress]').val();
			client_data['comment'] = $('.cart_order_form textarea[name = comment]').val();
			if (error == false){
				console.log(client_data);
				$.ajax({
					url: '/ajax_cart/sendOrder.php',
					type: 'POST',
					dataType: 'json',
					data: {	'name': client_data['fio'],
						   	'email': client_data['email'],
							'phone': client_data['phone'],
							'address': client_data['address'],
							'comment': client_data['comment'],
							'etaj': client_data['etaj'],
							'lift': client_data['lift'],
							'delivery': client_data['delivery'],
							'montaj': client_data['montaj'],
							'demontaj': client_data['demontaj']},
					success: function(data){
						console.log('send Order');
						getCart();
						checkCart();
						alert('Ваш Заказ отправлен!');
						console.log(data);
					},
					error: function(data){
						console.log('error send Order');
						console.log(data);
					}
				});
			}	
		}
	});

	$(".load_order_form").submit(function(){
		var projectId = $("#ajaxSearch_input_new").val();

		$.ajax({
			url: '/ajax_metalcount/checkProject.php',
			type: 'POST',
			dataType: 'json',
			data: {	'project_id': projectId},
			success: function(data){
				console.log('check project');
				console.log(data);
				if(data["status"]=="error"){
					alert("Такого заказа не существует");
				} else {
					window.location.href = data["link"];
				}
			},
			error: function(data){
				console.log('error check project');
				console.log(data);
				alert("Произошла ошибка")
			}
		});
	});

});