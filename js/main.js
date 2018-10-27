$(function () {
    picsize();
    $(window).resize(function () {
        picsize();
    });
    $(".homepic").click(function () {
        initSiteAnimation();
    });
    setTimeout(initSiteAnimation, 0);
    $(".browser-hover").hover(
        function () {
            $(this).addClass("hover");
            $(".browser-hover").not(this).addClass("hover2");
        },
        function () {
            $(this).removeClass("hover");
            $(".browser-hover").not(this).removeClass("hover2");
        }
    );
    promptActive();
});

function promptActive() {
    var $photo = $(".basic-info .photo");
    var $prompt = $(".basic-info .prompt");
    var promptY,promptX,promptSY,promptSX;

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
}

function openUrl(url) {
	window.open(url);
}

function initSiteAnimation() {
    setTimeout(function () {
        $("#browser-0").addClass("firstAnim");
        setTimeout(function() {
            $('.basic-info').slideDown();
        }, 500);
    }, 0);
    /2nd/ig.test(location.href) ? page2ndAnim() : page1stAnim();
}

function page1stAnim() {
    setTimeout(function () {
        $("#browser-1").addClass("firstAnim");
    }, 100);
    setTimeout(function () {
        $("#browser-2").addClass("firstAnim");
    }, 200);
    setTimeout(function () {
        $("#browser-3").addClass("firstAnim");
    }, 300);
    setTimeout(function () {
        $("#browser-4").addClass("firstAnim");
    }, 400);
    setTimeout(function () {
        $("#browser-5").addClass("firstAnim");
    }, 500);
}

function page2ndAnim() {
    $('body').css('backgroundColor', '#02ae75');
    setTimeout(function () {
        $("#browser-6").addClass("firstAnim");
    }, 100);
    setTimeout(function () {
        $("#browser-7").addClass("firstAnim");
    }, 200);
    setTimeout(function () {
        $("#browser-8").addClass("firstAnim");
    }, 300);
    setTimeout(function () {
        $("#browser-9").addClass("firstAnim");
    }, 400);
    setTimeout(function () {
        $("#browser-10").addClass("firstAnim");
    }, 500);
}

/*尺寸设置*/
function picsize() {
    var windows_w = $(window).width();
    var windows_h = $(window).height();
    var img_w = $(".homepic").width();
    var img_h = $(".homepic").height();
    var browser0_w = $("#browser-0").width();
    var browser0_w2 = windows_w * 0.16666;
    var x = windows_w / windows_h;
    var y = img_w / img_h;
    $(".modal-right,.slider,.slider .tabcon,.slider .tabcon li,.slider .tabcon li img").height(windows_h);
    if (x > y) {
        $(".homepic img").width("100%").height("auto");
    }
    else {
        $(".homepic img").width("auto").height("100%");
    }
/*    var x1 = browser0_w2 / windows_h;
    var y1 = 366 / 1140;
    if (x1 > y1) {
        $("#browser-0 img").css({"width": "auto", "height": "100%"});
    }
    else {
        $("#browser-0 img").css({"width": "100%", "height": "auto"});
    }*/
    $(".homepic img").width("auto").height("100%");
    $(".browser").height(windows_h);
}

