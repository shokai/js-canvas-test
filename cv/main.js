
var make_btn = function(label){
    return $('<input>').addClass('btn').attr('type','button').attr('id', 'btn_'+label).attr('value', label);
};

$(function(){
    canvas_init();


    make_btn('reset').appendTo('#ctrls');
    $('#btn_reset').click(canvas_init);
    make_btn('grayscale').appendTo('#ctrls');
    $('#btn_grayscale').click(grayscale);
});

var canvas_init = function(){
    var canvas = $('canvas#img');
    var ctx = canvas[0].getContext('2d');
    var img = new Image();
    img.onload = function(){
        canvas.attr('width', img.width).attr('height', img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = '../shokai.png';
};

var grayscale = function(){
    var canvas = $('canvas#img');
    var ctx = canvas[0].getContext('2d');
    var img = ctx.getImageData(0, 0, canvas[0].width, canvas[0].height);
    var data = img.data;
    for(var i = 0; i < data.length; i+=4){
        var r = data[i]&0xFF;
        var g = data[i+1]&0xFF;
        var b = data[i+2]&0xFF;
        var gray = (r+g+b)/3;
        data[i] = gray;
        data[i+1] = gray;
        data[i+2] = gray;
    }
    img.data = data;
    ctx.putImageData(img, 0, 0);
};

