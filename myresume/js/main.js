function indexLoaded(){
/*==================================================================
    获取一元素和声明变量
  ==================================================================*/
var $toInfo = $("#nav .toInfo"),
    $infoQr = $("#nav .infoQr"),
    $photo = $(".photo"),
    $prompt = $("#section-1 .prompt"),
    $project = $("#section-4 .projectBox dl"),
    $pdt = $project.find("dt"),
    $pdd = $project.find("dd"),
    $em = $("#section-4 .projectBox dt em"),
    $conns = $("#section-5 .connBox li"),
    promptY,promptX;
/*==================================================================
    基本操作
  ==================================================================*/
    $toInfo.mouseenter(function(e){
        $infoQr.stop(true,true).fadeIn();
        $(this).on("mouseleave",function(){
            $infoQr.stop(true,true).fadeOut()
        });
    }).click(function(){
        $infoQr.stop(true,true).fadeOut();
        $(this).off("mouseleave",function(){
            $infoQr.stop(true,true).fadeOut()
        });
    });
/*==================================================================
    init or invoke plugins
  ==================================================================*/
    $('#nav').onePageNav();
    //使用jquery.scrollTo.js
    $(".logo").click(function(){
        $.scrollTo('#section-1',1000);
    });
    $(".btn-con:even").click(function(){
        $.scrollTo('#section-5',1000);
    });
    $(".btn-con:odd").click(function(){
        $.scrollTo('#section-1',1000);});
    //初始化wow.js
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        new WOW().init();
    }
/*==================================================================
    prompt的鼠标跟踪
  ==================================================================*/
    $photo.hover(function(){
        $prompt.stop(true,true).fadeIn();
    },function(){
        $prompt.stop(true,true).fadeOut();
    }).mousemove(function(e){
        promptY = e.pageY;
        promptX = e.pageX;
        promptSY= $(document).scrollTop();
        promptSX= $(document).scrollLeft();
        $prompt.css({
            top:promptY-promptSY+30,
            left:promptX-promptSX-25
        })
    });
/*==================================================================
    项目经验的抽屉效果
  ==================================================================*/
    $pdt.each(function(i){
        $(this).click(function(){
            $em.css({transform:"rotate(0deg)"})
                .eq(i).css({transform:"rotate(-90deg)"});
            $pdd.stop().animate({width:"0"})
                .eq(i).stop().animate({width:"386px"})
        })
    });
}