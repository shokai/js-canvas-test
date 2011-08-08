
var canvas = null;
var ctx = null;

var make_btn = function(label){
    return $('<input>').addClass('btn').attr('type','button').attr('id', 'btn_'+label).attr('value', label);
};

$(function(){
    canvas_init();
    make_btn('reset').appendTo('#ctrls');
    $('#btn_reset').click(canvas_init);
    make_btn('grayscale').appendTo('#ctrls');
    $('#btn_grayscale').click(grayscale);
    make_btn('binarize').appendTo('#ctrls');
    $('#btn_binarize').click(binarize);
    make_btn('quantize').appendTo('#ctrls');
    $('#btn_quantize').click(quantize);
    make_btn('detect_edge').appendTo('#ctrls');
    $('#btn_detect_edge').click(detect_edge);
});

var canvas_init = function(){
    canvas = $('canvas#img');
    ctx = canvas[0].getContext('2d');
    var img = new Image();
    img.onload = function(){
        canvas.attr('width', img.width).attr('height', img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = '../shokai-big.jpg';
};

var grayscale = function(){
    var img = ctx.getImageData(0, 0, canvas[0].width, canvas[0].height);
    for(var i = 0; i < img.data.length; i+=4){
        var r = img.data[i]&0xFF;
        var g = img.data[i+1]&0xFF;
        var b = img.data[i+2]&0xFF;
        var gray = (r+g+b)/3;
        img.data[i] = gray;
        img.data[i+1] = gray;
        img.data[i+2] = gray;
    }
    ctx.putImageData(img, 0, 0);
};

var binarize = function(){
    var img = ctx.getImageData(0, 0, canvas[0].width, canvas[0].height);
    for(var i = 0; i < img.data.length; i+=4){
        var r = img.data[i]&0xFF;
        var g = img.data[i+1]&0xFF;
        var b = img.data[i+2]&0xFF;
        var bin = 0;
        if((r+g+b)/3 > 128) bin = 255;
        img.data[i] = bin;
        img.data[i+1] = bin;
        img.data[i+2] = bin;
    }
    ctx.putImageData(img, 0, 0);
}

var quantize = function(){
    var img = ctx.getImageData(0, 0, canvas[0].width, canvas[0].height);
    for(var i = 0; i < img.data.length; i+=4){
        var r = img.data[i]&0xFF;
        var g = img.data[i+1]&0xFF;
        var b = img.data[i+2]&0xFF;
        var gray = (r+g+b)/3;
        var quant = gray & 0xC0;
        img.data[i] = quant;
        img.data[i+1] = quant;
        img.data[i+2] = quant;
    }
    ctx.putImageData(img, 0, 0);
};

var detect_edge = function(){
    var width = canvas[0].width;
    var height = canvas[0].height;
    var img = ctx.getImageData(0, 0, width, height);
    var data_quant = new Array();
    for(var i = 0; i < img.data.length; i+=4){
        var r = img.data[i]&0xFF;
        var g = img.data[i+1]&0xFF;
        var b = img.data[i+2]&0xFF;
        var gray = (r+g+b)/3;
        data_quant.push(gray & 0xC0);
    }

    var img_edge = ctx.createImageData(width, height);
    for(var y = 1; y < height-1; y++){
        for(var x = 1; x < width-1; x++){
            var i = y*width + x;
            var around = (data_quant[i-width]+data_quant[i-1]+data_quant[i+1]+data_quant[i+width])/4;
            var c = 255;
            if(around < data_quant[i]) c = 0;
            img_edge.data[i*4] = c;
            img_edge.data[i*4+1] = c;
            img_edge.data[i*4+2] = c;
            img_edge.data[i*4+3] = 255;
        }
    }
    ctx.putImageData(img_edge, 0, 0);
};