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
  var handle = new fabric.Circle();

  if(product==undefined && project==undefined){
    // window.location.pathname = "/";
    product = 1005;
    isProduct = true;
  } else {
    if(product!=undefined){
      isProduct = true;
    }
  }
  var total_width = 2000;
  var total_height = 1800;
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
          total_width: data['total_width']['value'],
          total_height: data['total_height']['value'],
          bars_type: data['bars_type']['value'],
          main_color_type: data['main_color_type']['value'],
          main_color: data['main_color']['value']
        }

        isChange = {
          total_width: data['total_width']['changable'],
          total_height: data['total_height']['changable'],
          bars_type: data['bars_type']['changable'],
          main_color_type: data['main_color_type']['changable'],
          main_color: data['main_color']['changable']
        }
      }
    });

    $(".cell_type").removeClass("active");
    $(".cell_type[data-celltype='"+order.bars_type+"']").addClass("active");

    $(".height-value").html(order.total_height);
    $(".width-value").html(order.total_width);
    $("#input-height").val(order.total_height);
    $("#input-width").val(order.total_width);

    fillPole();

    countPossibleWidths();
    var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
    var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
    order.quantity_cells = quantity_cells;
    canvas.clear();
    countProportion(quantity_row, quantity_cells);
<<<<<<< HEAD
    $('.cell_image').show();
=======

>>>>>>> 8f2541c1986d22e81683ee7087e1b85f0866fe44
    getPrice();
  }

  defaultLoad(product);

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
		str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        $(".price").html(str + '=');
        console.log("get price");
        console.log(data);

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
		str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        $(".price").html(str + '=');
        console.log("get price");
        console.log(data);

      }
    });
  	
  }

  // var width_cells_all = total_width - 90;
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
  // var points_1 = Math.floor(total_height/possible_step_1);
  // var points_2 = Math.ceil(total_height/possible_step_2);

  // console.log(' points_1 = '+ points_1 + ' points_2 = '+points_2);
  // var quantity_row;
  // if ((total_height - 20) < possible_step_1*1.5){
  //   quantity_row = 3;
  // }else if ((total_height - 20) < possible_step_1 * 2){
  //   quantity_row = 4;
  // }else{
  //   quantity_row = points_1 * 2 + 1;
  // }
  
  function drawVertical(rect_width, rect_height, rect_left, count){
    var rect = new fabric.Rect({
      width: rect_width,
      height: rect_height + 12,
      left: rect_left,
      fill: '#ccc', 
      selectable: false
    });
    canvas.add(rect);
    rects[count] = rect;
    if (order.bars_type == 1 || order.bars_type == 2){
      if (count == 1){
        drawLug(rect_height, rect_width, rect_left + 2, 0);
        drawHandle(rect_height, rect_left);
      }else if (count == 2){
        drawLug(rect_height, rect_width, rect_left, 1);
      }
    }else if (order.bars_type == 4 || order.bars_type == 3){
      if (count == 2){
        drawLug(rect_height, rect_width, rect_left + 2, 0);
      }else if(count == 3){
        drawLug(rect_height, rect_width, rect_left, 1);
      }
    }else{
      canvas.renderAll();
    }
  }
  function drawHandle(rect_height, rect_left){
    handle.set({
      top: rect_height + 11,
      left: rect_left - 3,
      radius: 4,
      fill: '#fff',
      stroke: '#ccc',
      strokeWidth: 5,
      selectable: false
    });
    canvas.add(handle);
    canvas.renderAll();
  }
  function drawLug(rect_height, rect_width, rect_left, count){
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
      path.set({ fill: 'white', stroke: '#ccc', strokeWidth: 2, selectable: false});
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
      path.set({ fill: 'white', stroke: '#ccc', strokeWidth: 2, selectable: false});
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
      path.set({ fill: 'white', stroke: '#ccc', strokeWidth: 2, selectable: false});
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
      path.set({ fill: 'white', stroke: '#ccc', strokeWidth: 2, selectable: false});
      canvas.add(path);
      lines_array[quantity_row + j] = path;
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
        path.set({ fill: 'white', stroke: '#ccc', strokeWidth: 2, selectable: false});
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
      cells_width = order.total_width - 90;
    }else if(order.bars_type == 2){
      cells_width = order.total_width/2 - 60;
    }else if (order.bars_type == 3){
      cells_width = order.total_width - 120;
    }else{
      cells_width = order.total_width/2 - 90;
    }

    $(".width-visible-possible").html("");

    while (cells_width/k  >= 155){
      if (cells_width/k <= 225){
        widths.push(Math.floor(cells_width/k));
        $(".width-visible-possible").prepend('<label for="width_cell_'+i+'"> <span class="possible_width_'+i+'" data-quantitycells = "'+k+'">'+(widths[i-1] - 15)+'</span><input type="radio" name="width_cell" id="width_cell_'+i+'"></label>');
        if(cells_width/k >= 160 && cells_width/k <= 180 && whoIsChecked==0){
          whoIsChecked = i;
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

    return widths;
  }
  function countPossibleHeights(current_width){
    // alert(current_width);
      current_width = Number(current_width) + 15;
      var possible_step_1 = current_width*2.8;
    var possible_step_2 = current_width*3.8;
    var points_1 = Math.floor(order.total_height/possible_step_1);
    var points_2 = Math.ceil(order.total_height/possible_step_2);
    var flag = false;

    var quantity_row_1, quantity_row_2;
    console.log(' points_1 = '+ points_1 + ' points_2 = '+points_2);
    $(".height-visible-possible").html("");
    quantity_row_1 = points_1;
        var height_1 = Math.floor(order.total_height/quantity_row_1);
      var a = height_1/2;
      height_1 = Math.floor(Math.sqrt(Math.abs(4*a*a - current_width*current_width)));
      if (height_1 >= 400 && height_1 < order.total_height){
        $(".height-visible-possible").append('<label for="height_cell_1"> <span class="possible_height_1" data-quantityrow = "'+quantity_row_1+'">'+(height_1 - 15)+'</span><input type="radio" name="height_cell" id="height_cell_1" checked></label>');
        order.cell_height = height_1;
        flag = true;
      }
    quantity_row_2 = points_2;
    if (quantity_row_1 != quantity_row_2){
      var height_2 = Math.floor(order.total_height/quantity_row_2);
      a = height_2/2;
      height_2 = Math.floor(Math.sqrt(4*a*a - current_width*current_width));
      if (height_2 >= 400 && height_2 < order.total_height){
      	$(".height-visible-possible").append('<label for="height_cell_2"> <span class="possible_height_2" data-quantityrow = "'+quantity_row_2+'">'+(height_2 - 15)+'</span><input type="radio" name="height_cell" id="height_cell_2"></label>');           
		if(!flag){
			order.cell_height = height_2;
			$("#height_cell_2").prop("checked",true);
		}
      }
    }
  }
  function countProportion(quantity_row, quantity_cells){
    var total_height = order.total_height;
    var total_width = order.total_width;
    var pp = total_width/250;
    var rect_width, rect_height, rect_left, count, cells_width;
    while (total_height/pp > 300){
      pp = pp + 0.5;
    }
    var cells_height = total_height/pp;
    var hinge_width = 5;
    var hinge_height = 20;
    rect_height = cells_height;
    if (order.bars_type == 1){
      cells_width = (total_width - 90)/pp;
      drawVertical((90/3)/pp, rect_height, 0, 0);
      drawVertical((90/3)/pp, rect_height, (90/3)/pp + cells_width, 1);
      drawVertical((90/3)/pp, rect_height, ((90/3)*2)/pp + cells_width + 1, 2);
      if (order.total_height - 20 < order.cell_width*2.8*1.5){
        order.prolety = 3;
        drawCells_2_2(cells_width, cells_height, (90/3)/pp, lines_1, quantity_row, quantity_cells);
      }else if (order.total_height - 20 < order.cell_width*2.8*2){
        order.prolety = 4;
        drawCells_2_3(cells_width, cells_height, (90/3)/pp, lines_1, quantity_row, quantity_cells);
      }else{
        order.prolety = quantity_row*2 + 1;
        drawCells(cells_width, cells_height, (90/3)/pp, lines_1, quantity_row, quantity_cells);
      }
    }else if (order.bars_type == 2){
      cells_width = ((total_width - 60)/2)/pp;
      drawVertical(((60/3)*2)/pp, rect_height, 0, 0);
      drawVertical((60/3)/pp, rect_height, ((60/3)*2)/pp + cells_width, 1);
      drawVertical((60/3)/pp, rect_height, 60/pp + cells_width + 1, 2);
      drawVertical(((60/3)*2)/pp, rect_height, (60/3)/pp + 2*cells_width + 60/pp + 1, 3);
      if (order.total_height - 20 < order.cell_width*2.8*1.5){
        order.prolety = 3;
        drawCells_2_2(cells_width, cells_height, ((60/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells_2_2(cells_width, cells_height, (60/3)/pp + cells_width + 1 + 60/pp, lines_2, quantity_row, quantity_cells);
      }else if (order.total_height - 20 < order.cell_width*2.8*2){
        order.prolety = 4;
        drawCells_2_3(cells_width, cells_height, ((60/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells_2_3(cells_width, cells_height, (60/3)/pp + cells_width + 1 + 60/pp, lines_2, quantity_row, quantity_cells);
      }else{
        order.prolety = quantity_row*2 + 1;
        drawCells(cells_width, cells_height, ((60/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells(cells_width, cells_height, (60/3)/pp + cells_width + 1 + 60/pp, lines_2, quantity_row, quantity_cells);
      }
    }else if (order.bars_type == 3){
      cells_width = (total_width - 120)/pp;
     drawVertical((90/3)/pp, rect_height, 0, 0);
     drawVertical((90/3)/pp, rect_height, (90/3)/pp + 1, 1);
     drawVertical((90/3)/pp, rect_height, (90/3)*2/pp + cells_width + 1, 2);
     drawVertical((90/3)/pp, rect_height, 90/pp + cells_width + 2, 3);
     if (order.total_height - 20 < order.cell_width*2.8*1.5){
        order.prolety = 3;
        drawCells_2_2(cells_width, cells_height, ((90/3)*2)/pp + 1, lines_1, quantity_row, quantity_cells);
      }else if (order.total_height - 20 < order.cell_width*2.8*2){
        order.prolety = 4;
        drawCells_2_3(cells_width, cells_height, ((90/3)*2)/pp + 1, lines_1, quantity_row, quantity_cells);
      }else{
        order.prolety = quantity_row*2 + 1;
        drawCells(cells_width, cells_height, ((90/3)*2)/pp + 1, lines_1, quantity_row, quantity_cells);
      }
     drawHinge(hinge_width, hinge_height, (90/3)/pp - 1, cells_height/7, 0);
     drawHinge(hinge_width, hinge_height, (90/3)/pp - 1, (cells_height/7)*5, 1);
    }else if (order.bars_type == 4){
      cells_width = ((total_width - 90)/2)/pp;
      drawVertical((90/3)/pp, rect_height, 0, 0);
      drawVertical((90/3)/pp, rect_height, (90/3)/pp + 1, 1);
      drawVertical((90/3)/pp, rect_height, ((90/3)*2)/pp + cells_width + 1, 2);
      drawVertical((90/3)/pp, rect_height, 90/pp + cells_width + 2, 3);
      drawVertical((90/3)/pp, rect_height, (90/3)/pp + 2*cells_width + 90/pp + 2, 4);
      drawVertical((90/3)/pp, rect_height, ((90/3)*2)/pp + 2*cells_width + 90/pp + 3, 5);
      if (order.total_height - 20 < order.cell_width*2.8*1.5){
        order.prolety = 3;
        drawCells_2_2(cells_width, cells_height, ((90/3)*2)/pp, lines_1, quantity_row, quantity_cells);
        drawCells_2_2(cells_width, cells_height, (90/3)/pp + cells_width + 1 + 90/pp, lines_2, quantity_row, quantity_cells);
      }else if (order.total_height - 20 < order.cell_width*2.8*2){
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
		order.total_height = tot_height;
		order.total_width = tot_width;
		countPossibleWidths();
		var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
		var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
		canvas.clear();
		order.quantity_cells = quantity_cells;
		countProportion(quantity_row, quantity_cells);

		$(".height-value").html(order.total_height);
		$(".width-value").html(order.total_width);

		$(".wrapper").hide();
<<<<<<< HEAD

		getPrice();

=======

		getPrice();

>>>>>>> 8f2541c1986d22e81683ee7087e1b85f0866fe44
      }

  });

  //нажатие на тип решетки
  $(".cell_type").click(function(){
      
      order.bars_type = $(this).data("celltype");
      $(".cell_type").removeClass("active");
      $(this).addClass("active");
      countPossibleWidths();
      var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
      var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
      canvas.clear();
      order.quantity_cells = quantity_cells;
      countProportion(quantity_row, quantity_cells);

      getPrice();

  });

  //нажатие на выбор ширины
  $("body").on("change", "input[name='width_cell']", function(){
    order.cell_width = Number($(this).prev().html()) + 15;
    countPossibleHeights($(this).prev().html());
    var quantity_row = Number($("input[name='height_cell']:checked").prev().data("quantityrow"));
    var quantity_cells = Number($(this).prev().data("quantitycells"));
    canvas.clear();
    order.quantity_cells = quantity_cells;
    countProportion(quantity_row, quantity_cells);

    getPrice();
  });

  //нажатие на выбор высоты
  $("body").on("change", "input[name='height_cell']", function(){
    order.cell_height = Number($(this).prev().html()) + 15;
    var quantity_row = Number($(this).prev().data("quantityrow"));
    var quantity_cells = Number($("input[name='width_cell']:checked").prev().data("quantitycells"));
    order.quantity_cells = quantity_cells;
    canvas.clear();
    countProportion(quantity_row, quantity_cells);

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
				color = "#3d2219";
			} else {
				order["main_color"] = 201;
				$(".setting_value.main_color").data("pageid","200");
				color = "#C2B078";
			}
		} else {
		// alert($(this).children(".color_color_ral").css("background-color"));
		color = $(this).children(".color_color_ral").css("background-color");

		}

		var quantity_rects = rects.length;
		for (i = 0; i < quantity_rects; i++){
			rects[i].set({fill: color});
		}
		var quantity_lines_1 = lines_1.length;
		var quantity_lines_2 = lines_2.length;
		for (i = 0; i<quantity_lines_1; i++){
			lines_1[i].set({stroke: color});
		}
		for (i = 0; i<quantity_lines_2; i++){
			lines_2[i].set({stroke: color});
		}
    handle.set({stroke: color});
		canvas.renderAll();
		  
		fillPole();
    }
  });

  //для теста
  $(".load_order_title").click(function(){
  	console.log("order");
  	console.log(order);
  	getPrice();
  });


})