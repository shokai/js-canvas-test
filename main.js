
var ctx;
var sketch = {
    p_pos : {
        x : null,
        y : null,
        clear : function(){
            this.x = null; 
            this.y = null;
        }
    },
    drawing : false
}

$(function(){
    draw_img('./shokai-big.jpg');
    $('input#btn_draw').click(function(){
        draw_img($('input#img_url').val());
    });
    $('body').mousedown(function(){
        sketch.drawing = true;
    });
    $('body').mouseup(function(){
        sketch.drawing = false;
        sketch.p_pos.clear();
    });
    $('canvas#img').mousemove(function(e){
        if(!sketch.drawing) return;
        var x = e.offsetX;
        var y = e.offsetY;
        console.log(x + ', ' + y);
        if(sketch.p_pos.x && sketch.p_pos.y){
            ctx.beginPath();
            ctx.moveTo(sketch.p_pos.x, sketch.p_pos.y);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        sketch.p_pos.x = x;
        sketch.p_pos.y = y;
    });
});

var draw_img = function(img_url){
    var img_tag = $('canvas#img');
    ctx = img_tag[0].getContext('2d');
    var img = new Image();
    img.onload = function(){
        img_tag.attr('width', img.width).attr('height', img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = img_url;
};
