function indexLoaded(){
    /*======================================================
     ->获取$(dom)元素
     ======================================================*/
    var $body = $(document.body),
        $all = $(".container").find("*"),
        $window = $(window),
        $container = $(".container"),
        $clodHorizon = $(".clodHorizon"),
        $clodFar = $(".clodFar"),
        $clodMid = $(".clodMid"),
        $clodNear = $(".clodNear"),
        $sections = $(".sections"),
        $mountainFar = $(".mountainFar"),
        $mountainNear = $(".mountainNear"),
        $secs = [$(".sec.end"),$(".sec.sec1"),$(".sec.sec2"),$(".sec.sec3"),$(".sec.sec4"),$(".sec.sec5"),$(".sec.sec6")];
    /*======================================================
     ->获取元素初始宽高（改变窗口计算元素尺寸的参数）
     ======================================================*/
    var ori = [ [] , [] ];
    var resizeFlag;
    for(i = 0; i < $all.length; i++){
        ori[0][i] = $($all[i]).width();
        ori[1][i] = $($all[i]).height();
    }
    /*======================================================
     ->主要运动元素及其设置和居中
     ======================================================*/
    var $main = [$mountainFar,$mountainNear,$clodHorizon,$clodFar,$clodMid,$clodNear];
    var wW = $window.width(),
        wH = $window.height(),
        ww = wW, hh = wH,
        oW = [];
    for(var i in $main){
        oW[i] = setP($main[i]).W;
        center($(this), oW[i]);
    }
    for(i in $secs){
        setP($secs[i]);
    }
    reset();
    /*======================================================
     ->航行参数
     ======================================================*/
    var axis = 0,            //飞行主轴线
        strN = 8,            //设置起飞点
        dir,                 //方向，true：前进，false：后退
        tLimit = true;       //速度限制
    setMainP();              // 配置主要运动元素的运动参数
    /*======================================================
     ->滑动鼠标滑轮开始探索之旅
     ======================================================*/
    $(document).mousewheel(function(e) {
        //判断方向
        e.deltaY < 0 ? dir = true : dir = false;
        if(resizeFlag){
            reset();
            resizeFlag = false;
        }
        //限制滑动速度
        if(tLimit){
            tLimit = false;
            setTimeout(function(){
                dir ? axis += Math.abs(e.deltaY) : axis -= Math.abs(e.deltaY);
                if(axis > 1){
                    $(".loadingText").fadeOut();
                }else{
                    $(".loadingText").fadeIn();
                }
                //限制轴线区域
                if(axis < 0) axis = 0;
                //开始运动
                //console.log(axis);
                if(axis < 13){
                    $secs[1].fadeOut();
                }else{
                    if(axis < 21){
                        $secs[1].fadeIn();
                        $secs[2].fadeOut();
                        upDown([$secs[1]],axis);
                    }else if(axis < 29){
                        $secs[2].fadeIn();
                        $secs[1].fadeOut();
                        $secs[3].fadeOut();
                        upDown([$secs[2]],axis);
                    }else if(axis < 37){
                        $secs[3].fadeIn();
                        $secs[2].fadeOut();
                        $secs[4].fadeOut();
                        upDown([$secs[3]],axis);
                    }else if(axis < 45){
                        $secs[4].fadeIn();
                        $secs[3].fadeOut();
                        $secs[5].fadeOut();
                        upDown([$secs[4]],axis);
                    }else if(axis < 53){
                        $secs[5].fadeIn();
                        $secs[4].fadeOut();
                        $secs[6].fadeOut();
                        upDown([$secs[5]],axis);
                    }else if(axis < 61){
                        $secs[6].fadeIn();
                        $secs[5].fadeOut();
                        $secs[0].fadeOut();
                        upDown([$secs[6]],axis);
                    }else if(axis < 69){
                        $secs[0].fadeIn();
                        $secs[6].fadeOut();
                        upDown([$secs[0]],axis);
                    }else if(axis >= 69){
                        axis = 69;
                    }
                }
                upDown($main, axis);
                tLimit = true;
                return false;
            },20);
        }
        return false;
    });
    /*======================================================
     ->定义元素飞行的函数	
     ======================================================*/
    function upDown(a,n){
        for(i = 0;i< a.length;i++){
            a[i].css({transform:"translate("+ a[i].Trx[n] +"px,"+ a[i].Try[n] +"px) scale("+ a[i].Z[n] +")",transformOrigin:a[i].Or[n]});
        }
    }
    /*======================================================
     ->设置和获取元素属性的函数、居中定位元素的函数
     ======================================================*/
    function setP(o){
        o.W = o.width();
        o.H = o.height();
        o.T = parseInt(o.css("top"));
        o.L = parseInt(o.css("left"));
        o.R = parseInt(o.css("right"));
        o.B = parseInt(o.css("bottom"));
        if(!o.F){
            o.Z = [];
            o.Try = [];
            o.Trx = [];
            o.Or = [];
        }
        o.F = true;
        return o;
    }
	
    function center(o, w){
        o.css({left: wW/2, marginLeft: -w/2});
    }
    /*======================================================
     ->改变window窗口大小事件及reset()函数
     ======================================================*/
    $window.resize(function(){
        resizeFlag = true;
        reset();
    });
    function reset(){
        //重新获取窗口尺寸
        ww = $window.width();
        hh = $window.height();
        //刷新元素的尺寸
        var ow, oh;
        for(i = 0; i < $all.length; i++){
            ow = ori[0][i] / wW * ww;
            oh = ori[1][i] / wH * hh;
            $($all[i]).width(ow).height(oh);
        }
        //设置元素的属性
        for(var i in $main){
            oW[i] = setP($main[i]).W;
        }
        //重新配置主要运动元素的运动参数
        setMainP();
    }
    /*======================================================
     ->配置主要运动元素的运动参数
     ======================================================*/
    function setMainP(){
        for(var i = 0 ; i < 69; i++){
			$main[0].Z[i] = i*0.01+1;
			$main[1].Z[i] = i*0.01+1;
			$main[2].Z[i] = i*0.001+1;
			$main[3].Z[i] = i*0.002+1;
			$main[4].Z[i] = i*0.006+1;
			$main[5].Z[i] = i*0.008+1;
            for(var j in $main){
                $main[j].Trx[i] = 0;
            }
            if(i < 13){
                if(i<strN){
                    if(i == 0){
                        for (j in $main){
                            $main[j].Try[0] = 0;
                        }
                    }else{
                        $main[0].Try[i] = i/1200 * ww + $main[0].Try[i-1];
                        $main[1].Try[i] = i/600 * ww + $main[1].Try[i-1];
                        $main[2].Try[i] = i/20000 * ww + $main[2].Try[i-1];
                        $main[3].Try[i] = i/8000 * ww + $main[3].Try[i-1];
                        $main[4].Try[i] = i/2000 * ww + $main[4].Try[i-1];
                        $main[5].Try[i] = i/800 * ww + $main[5].Try[i-1];
                    }
                }else{
                    $main[0].Try[i] = i/120 * ww + $main[0].Try[i-1];
                    $main[1].Try[i] = i/60 * ww + $main[1].Try[i-1];
                    $main[2].Try[i] = i/2000 * ww + $main[2].Try[i-1];
                    $main[3].Try[i] = i/800 * ww + $main[3].Try[i-1];
                    $main[4].Try[i] = i/200 * ww + $main[4].Try[i-1];
                    $main[5].Try[i] = i/80 * ww + $main[5].Try[i-1];
                }
            }else if(i < 69){
                if(i == 13){
                    for (j in $main){
                        $main[j].Try[13] = $main[j].Try[12];
                    }
                }else{
                    $main[0].Try[i] = i/9600 * ww + $main[0].Try[i-1];
                    $main[1].Try[i] = i/4800 * ww + $main[1].Try[i-1];
                    $main[2].Try[i] = i/160000 * ww + $main[2].Try[i-1];
                    $main[3].Try[i] = i/64000 * ww + $main[3].Try[i-1];
                    $main[4].Try[i] = i/16000 * ww + $main[4].Try[i-1];
                    $main[5].Try[i] = i/6400 * ww + $main[5].Try[i-1];
                }
                if(i < 21){
                    if(i == 13){
                        $secs[1].Try[i] = 0;
                        $secs[1].Trx[i] = 0;
                        //$secs[1].Or[i] = "50% 23%";
                        $secs[1].Z[i] = 0.1;
                    }else{
                        $secs[1].Try[i] = 0;
                        $secs[1].Trx[i] = 0;
                        //$secs[1].Or[i] = (46+(50-46)/8*(i-13))+"%,"+(23+(50-23)/8*(i-13))+"%";
                        $secs[1].Z[i] = (0.9/8)*(i-13)+0.1;
                    }
                }else if(i < 29){
                    if(i == 21){
                        $secs[2].Try[i] = 0;
                        $secs[2].Trx[i] = 0;
                        //$secs[2].Or[i] = "46% 23%";
                        $secs[2].Z[i] = 0.1;
                    }else{
                        $secs[2].Try[i] = 0;
                        $secs[2].Trx[i] = 0;
                        //$secs[2].Or[i] = (46+(50-46)/8*(i-21))+"%,"+(23+(50-23)/8*(i-21))+"%";
                        $secs[2].Z[i] = (0.9/8)*(i-21)+0.1;
                    }
                }else if(i < 37){
                    if(i == 29){
                        $secs[3].Try[i] = 0;
                        $secs[3].Trx[i] = 0;
                        //$secs[3].Or[i] = "46% 23%";
                        $secs[3].Z[i] = 0.1;
                    }else{
                        $secs[3].Try[i] = 0;
                        $secs[3].Trx[i] = 0;
                        //$secs[3].Or[i] = (46+(50-46)/8*(i-29))+"%,"+(23+(50-23)/8*(i-29))+"%";
                        $secs[3].Z[i] = (0.9/8)*(i-29)+0.1;
                    }
                }else if(i < 45){
                    if(i == 37){
                        $secs[4].Try[i] = 0;
                        $secs[4].Trx[i] = 0;
                        //$secs[4].Or[i] = "46% 23%";
                        $secs[4].Z[i] = 0.1;
                    }else{
                        $secs[4].Try[i] = 0;
                        $secs[4].Trx[i] = 0;
                        //$secs[4].Or[i] = (46+(50-46)/8*(i-37))+"%,"+(23+(50-23)/8*(i-37))+"%";
                        $secs[4].Z[i] = (0.9/8)*(i-37)+0.1;
                    }
                }else if(i < 53){
                    if(i == 45){
                        $secs[5].Try[i] = 0;
                        $secs[5].Trx[i] = 0;
                        //$secs[5].Or[i] = "46% 23%";
                        $secs[5].Z[i] = 0.1;
                    }else{
                        $secs[5].Try[i] = 0;
                        $secs[5].Trx[i] = 0;
                        //$secs[5].Or[i] = (46+(50-46)/8*(i-45))+"%,"+(23+(50-23)/8*(i-45))+"%";
                        $secs[5].Z[i] = (0.9/8)*(i-45)+0.1;
                    }
                }else if(i < 61){
                    if(i == 53){
                        $secs[6].Try[i] = 0;
                        $secs[6].Trx[i] = 0;
                        //$secs[6].Or[i] = "46% 23%";
                        $secs[6].Z[i] = 0.1;
                    }else{
                        $secs[6].Try[i] = 0;
                        $secs[6].Trx[i] = 0;
                        //$secs[6].Or[i] = (46+(50-46)/8*(i-53))+"%,"+(23+(50-23)/8*(i-53))+"%";
                        $secs[6].Z[i] = (0.9/8)*(i-53)+0.1;
                    }
                }else{
                    if(i == 61){
                        $secs[0].Try[i] = 0;
                        $secs[0].Trx[i] = 0;
                        //$secs[0].Or[i] = "46% 23%";
                        $secs[0].Z[i] = 0.1;
                    }else{
                        $secs[0].Try[i] = 0;
                        $secs[0].Trx[i] = 0;
                        //$secs[0].Or[i] = (46+(50-46)/8*(i-61))+"%,"+(23+(50-23)/8*(i-61))+"%";
                        $secs[0].Z[i] = (0.9/8)*(i-61)+0.1;
                    }
                }
            }
        }
    }
}
/*======================================================
    ->监听图片是否加载完成
 ======================================================*/
var imgUrl = [
    "./img/index/clouds-horizon.png",
    "./img/index/clouds-far.png",
    "./img/index/clouds-mid.png",
    "./img/index/clouds-near.png",
    "./img/index/matterhorn.png",
    "./img/index/alps.png",
    "./img/index/cloud-1.png",
    "./img/index/cloud-2.png",
    "./img/index/cloud-3.png",
    "./img/index/cloud-4.png",
    "./img/index/cloud-5.png",
    "./img/index/cloud-6.png",
    "./img/index/cloud-7.png",
    "./img/index/1-cloud-16-9.png",
    "./img/index/2-cloud-16-9.png",
    "./img/index/3-cloud-16-9.png",
    "./img/index/4-cloud-16-9.png",
    "./img/index/views/index.jpg",
    "./img/index/views/about.jpg",
    "./img/index/views/service.jpg",
    "./img/index/views/cases.jpg",
    "./img/index/views/customer.jpg",
    "./img/index/views/contact.jpg"
];
loadWatcher(imgUrl);
