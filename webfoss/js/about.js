function aboutLoaded(){
    var text = document.getElementById('text');
    var str = '关于维弗 / About Webfoss';
    var arr = [];
    for(var i=0;i<str.length;i++){
        arr.push(str[i])
    }
    var text1 = '';
    var num = 0;
    var timer = setInterval(function (){
        if(num < arr.length){
            text1 += arr[num];
            text.innerHTML = text1;
            num++;
        } else {
            clearInterval(timer)
        }
    },88);

    winResize();
    var $nmbs = $(".numberbox .num");
//console.log($nmbs);
    nmbChange($nmbs.eq(0),6,6,1000);
    nmbChange($nmbs.eq(1),6,6,1000);
    nmbChange($nmbs.eq(2),300,22,1500);
    nmbChange($nmbs.eq(3),1000,42,2200);


    //[part1]部分
    var $scrollTop = $(window).scrollTop();//滚动距离
    var $windowHight = $(window).height();
    //console.log("屏幕高度--->"+$windowHight);

    var $part1Img = $("section .part1 .aboutimg");
    //$part1Img.find("img").css("opacity",0);


    //[part2]部分
    var $part2Img = $("section .part2 .aboutimg");
    var $part3Img = $("section .part3 .aboutimg");
    var $part4Img = $("section .part4 .aboutimg");
    var $part5Img = $("section .part5 .aboutimg");
    //console.log($(".part1 .textbox").offset().top);

    $(window).scroll(function () {
        $scrollTop = $(window).scrollTop();
        //console.log("滚轮滚动距离--->"+$scrollTop);
        if( ($part1Img.offset().top-$windowHight) < $scrollTop ){
            $part1Img.css({"opacity":1});
            $part1Img.addClass('animated fadeInRight');
        }
        if( ($part2Img.offset().top-$windowHight) < $scrollTop ){
            $part2Img.css({"opacity":1});
            $part2Img.addClass('animated fadeInLeft');
        }
        if( ($part3Img.offset().top-$windowHight) < $scrollTop ){
            $part3Img.css({"opacity":1});
            $part3Img.addClass('animated fadeInRight');
        }
        if( ($(".part1 .textbox").offset().top - $windowHight) < $scrollTop){
            $(".part1 .textbox").addClass('animated fadeInLeft');
        }
        if( ($(".part2 .textbox").offset().top - $windowHight) < $scrollTop){
            $(".part2 .textbox").addClass('animated fadeInRight');
        }
        if( ($(".part3 .textbox").offset().top - $windowHight) < $scrollTop){
            $(".part3 .textbox").addClass('animated fadeInLeft');
        }
    });
}
//打开页面监听资源加载
var imgUrl = [
    "./img/about/aboutbg01.jpg",
    "./img/about/servicebg02.png",
    "./img/about/aboutimg01.png",
    "./img/about/aboutimg02.png",
    "./img/about/aboutimg03.png"
];
loadWatcher(imgUrl);

