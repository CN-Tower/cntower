/*=======================================================
 ->监听页面图片加载是否完成
 ========================================================*/
function loadWatcher(imgUrl){
    var loadingTimer = setInterval(function(){
        var neededImg = [], count=0;
        for(var i in imgUrl){
            neededImg[i]=new Image();
            neededImg[i].src = imgUrl[i];
            if(neededImg[i].height) count++;
        }
        if(count == neededImg.length){
            clearInterval(loadingTimer);
            $(".pageBody").fadeIn();
            $(".loadingBg").fadeOut();
            if(curPage == "index") {
                $(".loadingGif .loader").fadeOut();
                $(".loadingText .title").html("向下滑动鼠标，探秘维弗...");
                $(".loadingGif .startGif").fadeIn();
            }else{
                $(".loadingText").fadeOut();
            }
            switch (curPage){
                case "home_":
                    homeLoaded();
                    break;
                case "about_":
                    aboutLoaded();
                    break;
                case "service_":
                    serviceLoaded();
                    break;
                case "cases_":
                    casesLoaded();
                    break;
                case "customer_":
                    customerLoaded();
                    break;
                case "contact_":
                    contactLoaded();
                    break;
                default:
                    indexLoaded();
                    break;
            }
        }
    },500);
}
/*=======================================================
    ->防止Ctrl+mousewheel放大页面
 ========================================================*/
document.onmousewheel = function(eve){
    var e;
    eve ? e = eve : e = window.event;
    if(e.ctrlKey){
        return false;
    }
};
/*=======================================================
    ->canvas画圆
 ========================================================*/
function drawArc(canvas,n){
    canvas = canvas[0];
    var ctx = canvas.getContext('2d');
    var step, startAngle, endAngle, add = Math.PI * 2 / 100;
    ctx.shadowOffsetX = 0; // 设置水平位移
    ctx.shadowOffsetY = 0; // 设置垂直位移
    ctx.shadowBlur = 0; // 设置模糊度
    ctx.lineWidth = 1.0;
    counterClockwise = false;
    var x;
    var y;
    var radius;
    var animation_interval = 20;
    var varName;

    function actiondo() {
        step = 1;
        startAngle = 550;
        ctx.strokeStyle = '#ffffff';//圆圈颜色
        x = 51;
        y = 51;
        radius = 50;
        varName = setInterval(animation, animation_interval);
    }
    var animation = function() {
        if (step <= n) {
            endAngle = startAngle + add;
            drawArcGo(startAngle, endAngle);
            startAngle = endAngle;
            step++;
        } else {
            clearInterval(varName);
        }

    };
    function drawArcGo(s, e) {
        ctx.beginPath();
        ctx.arc(x, y, radius, s, e, counterClockwise);
        ctx.lineWidth = 2.0;
        ctx.stroke();
    }
    actiondo();

}
/*=======================================================
    ->数字变化,o为$(dom),nmb为目标数字，n为跳动次数，t为时间（单位：ms)
 ========================================================*/
function nmbChange(o,nmb,n,t){
    var dt = t/ n,
        dn = parseInt(nmb/n),
        v = 0;                  //起始值
    var timer = setInterval(function(){
        v += dn;
        if(v > nmb){
            v = nmb;
            clearInterval(timer)
        }
        o.html(v);
    },dt);
}

/*=======================================================
    ->在元素中插入n个随机数字或字母字符
 ========================================================*/
function getStr(o,n){
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var res = "";
    for(var i = 0; i < n; i ++){
        res += chars.charAt(Math.floor(Math.random()*62));
    }
    o.html(res);
}
/*=======================================================
    ->改变窗口大小时重新定义元素尺寸
 ========================================================*/
function winResize(a){
    //var winH = $(window).height();
    //for(var i in a){
    //    a[i].css({height:winH+"px"});
    //}
    //var $all = $(document).find("*");
    //var ori = [ [] , [] ];
    //var wW = $(window).width(),
    //    wH = $(window).height(),
    //    ww = wW, hh = wH;
    //for(var i = 0; i < $all.length; i++){
    //    ori[0][i] = $($all[i]).width();
    //    ori[1][i] = $($all[i]).height();
    //}
    //$(window).resize(function(){
    //    //重新获取窗口尺寸
    //    ww = $(window).width();
    //    hh = $(window).height();
    //    //刷新元素的尺寸
    //    var ow, oh;
    //    for(i = 0; i < $all.length; i++){
    //        ow = ori[0][i] / wW * ww;
    //        oh = ori[1][i] / wH * hh;
    //        $($all[i]).width(ow).height(oh);
    //    }
    //});
}

