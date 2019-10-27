function serviceLoaded(){
    //页面打字机效果
    var $printH2 = $("section .servicebanner h2");
    var str = "我们的服务 / Our Services";
    var arr = [];
    for(var i=0;i<str.length;i++){
        arr.push(str[i])
    }
    var text1 = '';
    var num = 0;
    var timer = setInterval(function (){
        if(num < arr.length){
            text1 += arr[num];
            $printH2.text(text1);
            num++;
        } else {
            clearInterval(timer);
        }
    },100)
    //[part1]部分
    var $scrollTop = $(window).scrollTop();//滚动距离
    var $windowHight = $(window).height();
    //console.log("屏幕高度--->"+$windowHight);

    var $part1Img = $("section .part1 .imgbox");
    //$part1Img.find("img").css("opacity",0);


    //[part2]部分
    var $part2Img = $("section .part2 .imgbox");
    var $part3Img = $("section .part3 .imgbox");
    var $part4Img = $("section .part4 .imgbox");
    var $part5Img = $("section .part5 .imgbox");
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
            //$part2Img.find(".img01").addClass('animated fadeInLeft');
        }
        if( ($part3Img.offset().top-$windowHight) < $scrollTop ){
            $part3Img.css({"opacity":1});
            $part3Img.find(".img02").addClass('animated swing');
            $part3Img.find(".img01").addClass('animated zoomInRight');
        }
        if( ($part4Img.offset().top-$windowHight) < $scrollTop ){
            $part4Img.css({"opacity":1});
            $part4Img.addClass('animated fadeInLeft');
        }
        if( ($part5Img.offset().top-$windowHight) < $scrollTop ){
            $part5Img.css({"opacity":1});
            $part5Img.addClass('animated fadeInRight');
        }

        if( ($(".part1 .textbox").offset().top - $windowHight) < $scrollTop){
            $(".part1 .textbox h2").addClass('animated fadeInLeft');
            $(".part1 .textbox p").addClass('animated fadeInLeft');
        }
        if( ($(".part2 .textbox").offset().top - $windowHight) < $scrollTop){
            $(".part2 .textbox h2").addClass('animated fadeInRight');
            $(".part2 .textbox p").addClass('animated fadeInRight');
        }
        if( ($(".part3 .textbox").offset().top - $windowHight) < $scrollTop){
            $(".part3 .textbox h2").addClass('animated fadeInLeft');
            $(".part3 .textbox p").addClass('animated fadeInLeft');
        }
        if( ($(".part4 .textbox").offset().top - $windowHight) < $scrollTop){
            $(".part4 .textbox h2").addClass('animated fadeInRight');
            $(".part4 .textbox p").addClass('animated fadeInRight');
        }
        if( ($(".part5 .textbox").offset().top - $windowHight) < $scrollTop){
            $(".part5 .textbox h2").addClass('animated fadeInLeft');
            $(".part5 .textbox p").addClass('animated fadeInLeft');
        }
    });
}
//打开页面监听资源加载
var imgUrl = [
    "./img/service/servicebg01-f9789810651a.jpg",
    "./img/service/servicebg02-6b61abeb6f9d.png",
    "./img/service/service02-1bb120de8729.png",
    "./img/service/sevimg03-62d0bcb08301.png",
    "./img/service/sevimg04-5b181509fffd.png",
    "./img/service/sevimg05-c6f4970c5e8b.png",
    "./img/service/sevimg06-66352ff7e661.png",
    "./img/service/sevimg07-5314ac7b8545.png"
];
loadWatcher(imgUrl);







