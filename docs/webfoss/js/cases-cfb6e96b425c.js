function casesLoaded(){
    //tabs选项卡
    var $tabs_ico=$(".tabs .tabs-ico p");
    var $img=$(".tabs .tabs-ico p img");
    $tabs_ico.hover(function(){
        var i=$(this).index();
        //console.log(i);
        $img.eq(i).attr("src","img/cases/ico"+(i+1)+".png");
    },function(){
        var i=$(this).index();
        $img.eq(i).attr("src","img/cases/icos"+(i+1)+".png");
    });

    //图标点击事件
    var nav=$(".tabs .tabs-ico .nav");
    var computer=$(".tabs .tabs-ico .computer");
    var phone=$(".tabs .tabs-ico .phone");
    var $lie=$(".logos .logos_one li:even");
    var $lio=$(".logos .logos_one li:odd");
     nav.click(function(){
         $lio.fadeIn();
         $lie.fadeIn();
         $li.css({"opacity":"1"});
     });
    computer.click(function(){
        $li.css({"opacity":"1"});
        $lie.fadeOut();
        $lio.fadeIn();
    });

    phone.click(function(){
        $li.css({"opacity":"1"});
        var $lio=$(".logos .logos_one li:odd");
        $lio.fadeOut();
        var $lie=$(".logos .logos_one li:even");
        $lie.fadeIn();
    });
    //滚轮监听
    var $li=$(".logos .logos_one li");
    var offsetTop1 = $(".Customer").offset().top;
    var $cs2=$(".logos .logos_one .c2");
    var $cs3=$(".logos .logos_one .c3");
    var $cs4=$(".logos .logos_one .c4");
    var $cs5=$(".logos .logos_one .c5");
    var $cs6=$(".logos .logos_one .c6");
    var $cs7=$(".logos .logos_one .c7");
    var $cs8=$(".logos .logos_one .c8");
    $cs2.css({"opacity":"0"});
    $cs3.css({"opacity":"0"});
    $cs4.css({"opacity":"0"});
    $cs5.css({"opacity":"0"});
    $cs6.css({"opacity":"0"});
    $cs7.css({"opacity":"0"});
    $cs8.css({"opacity":"0"});
    var top = $(this).scrollTop(); // 当前窗口的滚动距离
    var scroll1=$(document).scrollTop();//获取滚轮的高度
    var Customer=$(".Customer");
    var document1=$(window).height();//获取窗口的高度
    var window2=$li.eq(4).offset().top;
    var window3=$li.eq(8).offset().top;
    var window4=$li.eq(12).offset().top;
    var window5=$li.eq(16).offset().top;
    var window6=$li.eq(20).offset().top;
    var window7=$li.eq(24).offset().top;
    var window8=$li.eq(28).offset().top;
    var imgHeight=$(".logos .logos_one .rotate1 img").height();
    var $c1=$(".logos .logos_one .c1:even");
    $c1.addClass("animated bounceInRight");
    var $c1s=$(".logos .logos_one .c1:odd");
    $c1s.addClass("animated bounceInLeft");
    $(window).bind("scroll", function(){
        top = $(this).scrollTop(); // 当前窗口的滚动距离
        console.log(top);
        Customer=$(".Customer");
        scroll1=$(document).scrollTop();//获取滚轮的高度
        document1=$(window).height();//获取窗口的高度
        console.log(document1*2);
        if(offsetTop1+scroll1>=(document1)*2){
            Customer.css({"right":"0"})
        }
        if(scroll1 + document1 >= (window2+imgHeight-300) ){
            $cs2.css({"opacity":"1"});
            var $c2=$(".logos .logos_one .c2:even");
            $c2.addClass("animated bounceInRight");
            var $c2s=$(".logos .logos_one .c2:odd");
            $c2s.addClass("animated bounceInLeft");
        }
        if(scroll1 + document1 >= (window3+imgHeight-300) ){
            $cs3.css({"opacity":"1"});
            var $c3=$(".logos .logos_one .c3:even");
            $c3.addClass("animated bounceInRight")
            var $c3s=$(".logos .logos_one .c3:odd");
            $c3s.addClass("animated bounceInLeft");
        }
        if(scroll1 + document1 >= (window4+imgHeight-300) ){
            $cs4.css({"opacity":"1"});
            var $c4=$(".logos .logos_one .c4:even");
            $c4.addClass("animated bounceInRight")
            var $c4s=$(".logos .logos_one .c4:odd");
            $c4s.addClass("animated bounceInLeft");
        }
        if(scroll1 + document1 >= (window5+imgHeight-300) ){
            $cs5.css({"opacity":"1"});
            var $c5=$(".logos .logos_one .c5:even");
            $c5.addClass("animated bounceInRight")
            var $c5s=$(".logos .logos_one .c5:odd");
            $c5s.addClass("animated bounceInLeft");
        }
        if(scroll1 + document1 >= (window6+imgHeight-300) ){
            $cs6.css({"opacity":"1"});
            var $c6=$(".logos .logos_one .c6:even");
            $c6.addClass("animated bounceInRight");
            var $c6s=$(".logos .logos_one .c6:odd");
            $c6s.addClass("animated bounceInLeft");
        }
        if(scroll1 + document1 >= (window7+imgHeight-300) ){
            $cs7.css({"opacity":"1"});
            var $c7=$(".logos .logos_one .c7:even");
            $c7.addClass("animated bounceInRight");
            var $c7s=$(".logos .logos_one .c7:odd");
            $c7s.addClass("animated bounceInLeft");
        }
        if(scroll1 + document1 >= (window8+imgHeight-300) ){
            $cs8.css({"opacity":"1"});
            var $c8=$(".logos .logos_one .c8:even");
            $c8.addClass("animated bounceInRight");
            var $c8s=$(".logos .logos_one .c8:odd");
            $c8s.addClass("animated bounceInLeft");
        }
    })
}
//打开页面监听资源加载
var imgUrl = [
    "./img/customer/casebanner-09c7b6684fd5.jpg",
    "./img/cases/uploads/bg0-189e682c953d.jpg",
    "./img/cases/uploads/bg1-3b16da435451.jpg",
    "./img/cases/uploads/bg2-56c444dcd94e.jpg",
    "./img/cases/uploads/bg3-b38a8b809c4f.jpg",
    "./img/cases/uploads/bg4-b4b8bd7e9d81.jpg",
    "./img/cases/uploads/bg5-c4aefb23cab5.jpg",
    "./img/cases/uploads/bg6-37b23c3d8808.jpg",
    "./img/cases/uploads/bg7-3c589e2fe048.jpg",
    "./img/cases/uploads/bgs0-071f4cdda256.png",
    "./img/cases/uploads/bgs1-1ad1a1b8ed5f.png",
    "./img/cases/uploads/bgs2-7f9ebf0a5486.png",
    "./img/cases/uploads/bgs3-436bdec47074.png",
    "./img/cases/uploads/bgs4-caf6a12678fa.png",
    "./img/cases/uploads/bgs5-ebc1266f9c57.png",
    "./img/cases/uploads/bgs6-708a07b85f4f.png",
    "./img/cases/uploads/bgs7-bc2855f41ab5.png"
];
loadWatcher(imgUrl);