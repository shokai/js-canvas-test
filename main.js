
$(function(){
    draw_img('./shokai-big.jpg');
    $('input#btn_draw').click(function(){
        draw_img($('input#img_url').val());
    });
});

var draw_img = function(img_url){
    var img_tag = $('canvas#img');
    var ctx = img_tag[0].getContext('2d');
    var img = new Image();
    img.onload = function(){
        img_tag.attr('width', img.width).attr('height', img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = img_url;
};
