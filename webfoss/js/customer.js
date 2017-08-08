function customerLoaded(){
    var $lis=$(".logos .logos_one li");
    //logos li动画：
    $lis.hover(function(){
        var i=$(this).index();
        //console.log(i);
        $(this).stop().animate({"top":"-10px"})
            .css({"box-shadow":"0 10px 10px gray","z-index":"1"}).siblings().css({"z-index":"0"})
    },function(){
        $(this).stop().animate({"top":"0","left":"0"})
            .css({"box-shadow":"0px 0px 0px #000","z-index":"12"})
    });
//
//滚动条监听悬浮框
    var suspend=$(".suspend");
    var topL=suspend.offset().top;//获取div的到top的高度
    var scrollTop=$(document).scrollTop();//获取滚轮的滚动的高度
    //console.log(scrollTop);
    var wTop=$(window).height();//获取当前窗口的高度

    $(window).bind("scroll",function(){
        scrollTop=$(document).scrollTop();
        //console.log(scrollTop);
        if(topL+scrollTop>=(wTop*1.2)){
            suspend.css({"right":"0","z-index":"999"});
        }
    });

    document.body.onwheel = function (event) {
        var step=$(window).height()/2;//l
        var cur_top=$(document).scrollTop();
        var direction = event.deltaY< 0 ? -1 : 1;
        var height = direction * step + cur_top;
        //var x_height = Math.round(height/step)*step;
        $("html, body").stop().animate({ scrollTop: height },400);
        //alert("djds")m
    }
}

//打开页面监听资源加载
var imgUrl = [
    "./img/customer/casebanner.jpg",
    "./img/customer/logos/bofeng01-2.jpg",
    "./img/customer/logos/client01.png",
    "./img/customer/logos/client02.png",
    "./img/customer/logos/client03.png",
    "./img/customer/logos/client04.png",
    "./img/customer/logos/client05.png",
    "./img/customer/logos/client06.png",
    "./img/customer/logos/client07.png",
    "./img/customer/logos/client08.png",
    "./img/customer/logos/client09.png",
    "./img/customer/logos/client10.png",
    "./img/customer/logos/client13.png",
    "./img/customer/logos/client14.png",
    "./img/customer/logos/client15.png",
    "./img/customer/logos/client16.png",
    "./img/customer/logos/client18.png",
    "./img/customer/logos/client20.png"
];
loadWatcher(imgUrl);