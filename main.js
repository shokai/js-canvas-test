
var ctx;
var p_pos = { x : null, y : null};

$(function(){
    draw_img('./shokai-big.jpg');
    $('input#btn_draw').click(function(){
        draw_img($('input#img_url').val());
    });
    $('body').click(function(){
        console.log('click');
    });
    $('body').mouseup(function(){
        console.log('mouseup');
    });
    $('canvas#img').mousemove(function(e){
        console.log(e.offsetX + ', ' + e.offsetY);
        if(p_pos.x != null && p_pos.y != null){
            ctx.beginPath();
            ctx.moveTo(p_pos.x, p_pos.y);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.closePath();
            ctx.stroke();
        }
        p_pos.x = e.offsetX;
        p_pos.y = e.offsetY;
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
