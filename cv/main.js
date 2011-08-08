
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