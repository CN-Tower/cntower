/**
 * Created by Administrator on 2016/11/5.
 */

/*调用wow动画框架*/
new WOW().init();



//返回顶部
$(document).ready(function(){
    $('.toTop').click(function(){
        $('html,body').animate({scrollTop: '0px'});

    });
});

//$(function(){
//    $('.toTop').mouseover(function(){
//        $(this).removeClass('fa-chevron-up').html('<span>返回顶部</span>').css('font-size','14px');
//    })
//})


