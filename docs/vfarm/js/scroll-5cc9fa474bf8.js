/**
 * Created by Administrator on 2016/11/8.
 */

$(document).ready(function(){

//Scroll 滚动监听页面
    $('#menu li a').click(function() {
        var elementClicked = $(this).attr("href");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-0}, 1000 );
        return false;
    });

    var current_nav = 'home';

    scroll_function = function(){

        $(".scrol-page").each(function(index) {
            var h = $(this).offset().top;
            var y = $(window).scrollTop();

            if(y + 360 >= h && y < h + $(this).height() && $(this).attr('id') != current_nav) {

                current_nav = $(this).attr('id');

                $('#menu a').removeClass('active');
                $('.nav_' + current_nav).addClass('active').show();

            }
        });
    }
    $(window).scroll(function(){
        scroll_function();
    });
});

$(function(){
    $(window).scrollTop(0)
});

