function homeLoaded(){
/*=======================================================
 ->主页导航隐现效果
 ========================================================*/
    var $navBar = $("#nav"),
        $document = $(document),
        $window = $(window),
        $htmlBody = $(document.html,document.body),
        $parts = $(".part");
    var sTop = $document.scrollTop(),
        winH = $window.height();
    $navBar.css({transition:"margin 0.5s ease-in",backgroundColor:"transparent",marginTop:"20px"})
        .find("a").css({color:"#fff"}).end().find("img").attr("src","img/about/white.png");
    //鼠标滑动导航条效果
    $document.scroll(function(){
        sTop = $document.scrollTop();
        //console.log(sTop);
        if(sTop>0){
            $navBar.css({backgroundColor:"#fff",marginTop:"0"})
                .find("a").css({color:"#000"}).end().find("img").attr("src","img/about/colour.png");
        }else{
            $navBar.css({backgroundColor:"transparent",marginTop:"20px"})
                .find("a").css({color:"#fff"}).end().find("img").attr("src","img/about/white.png");
        }
    });
/*=======================================================
    ->页面元素自适应窗口高度
 ========================================================*/
    $parts.css({height:winH+"px"});
    $window.resize(function(){
        winH = $window.height();
        $parts.css({height:winH+"px"});
    });
/*=======================================================
    ->canvas和数字变化
 ========================================================*/
    //变化数字
    var $span1 = $(".banner .cycle span").eq(0);
    var $span2 = $(".banner .cycle span").eq(1);
    var $span3 = $(".banner .cycle span").eq(2);
    nmbChange($span1,8,4,500);
    nmbChange($span2,300,20,1500);
    nmbChange($span3,1000,28,2000);
    //canvas
    var $canvas1 = $("#canvas1");
    var $canvas2 = $("#canvas2");
    var $canvas3 = $("#canvas3");
    drawArc($canvas1,20);
    drawArc($canvas2,65);
    drawArc($canvas3,90);
/*=======================================================
    ->首页轮播图
 ========================================================*/
    //init
    var $banner = $(".banner"),
        $ban = $banner.find(".ban"),
        $bL = $banner.find(".bL"),
        $bL1 = $banner.find(".bL li").eq(0),
        $bL2 = $banner.find(".bL li").eq(1),
        $bR = $banner.find(".bR"),
        $bR1 = $banner.find(".bR li").eq(0),
        $bR2 = $banner.find(".bR li").eq(1),
        $bars = $banner.find(".bar li");
    var banH = $banner.height();
    $ban.css({height:banH});
    $bL.children().css({height:banH});
    $bL1.css({top:"0",left:"0"});
    $bL2.css({top:banH,left:"0"});
    $bR.children().css({height:banH});
    $bR1.css({top:"0",left:"0"});
    $bR2.css({top:-banH,left:"0"});
    $bars.eq(0).css({background:"#fff"});
    var tar = 1;
    //自动轮播
    var bTimer = setInterval(bAuto,4000);
    function bAuto(){
        tar++;
        if(tar > 5) tar = 1;
        bannerGo();
    }
    //手动轮播
    $bars.each(function(i){
        $(this).click(function(){
            clearInterval(bTimer);
            tar = i+1;
            $(this).css("background","transparent").eq(i).css("background","#fff");
            bannerGo();
            bTimer = setInterval(bAuto,4000);
        });
    });
    //轮播函数
    function bannerGo(){
        $bars.css("background","transparent").eq(tar-1).css("background","#fff");
        $bL2.css({background:"url('./img/home/banners"+tar+".jpg') no-repeat 0,0",backgroundSize:"cover"});
        $bR2.css({background:"url('./img/home/banners"+tar+".jpg') no-repeat 0,0",backgroundSize:"cover"});
        $bL1.stop().animate({top:-banH},function(){
            $(this).css({background:"url('./img/home/banners"+tar+".jpg') no-repeat 0,0",backgroundSize:"cover",top:"0"});
        });
        $bL2.stop().animate({top:0},function(){
            $(this).css({top:banH});
        });
        $bR1.stop().animate({top:banH},function(){
            $(this).css({background:"url('./img/home/banners"+tar+".jpg') no-repeat 0,0",backgroundSize:"cover",top:"0"});
        });
        $bR2.stop().animate({top:0},function(){
            $(this).css({top:-banH});
        });
    }
/*=======================================================*/
    //laztload
    $("img.lazy").lazyload({effect: "fadeIn"});
//[section][part1]
//[part1Lift]部分
    var $part1Lift = $("section .part1Lift");
    var $par1Vedio1 = $("section .part1Lift div video");
    $part1Lift.mouseenter(function () {
        $(this).find("span").css("opacity",1);
        $par1Vedio1.css("opacity",1);
    });
    $part1Lift.mouseleave(function () {
        $(this).find("span").css("opacity",0);
        $par1Vedio1.css("opacity",0);
    });
//[part1Right][Top]部分
    var $part1RightTop = $("section .part1Right .part1RightTop");
    var $par1Vedio2 = $("section .part1Right .part1RightTop div video");
    $part1RightTop.mouseenter(function () {
        $(this).find("span").css("opacity",1);
        $par1Vedio2.css("opacity",1);
    });
    $part1RightTop.mouseleave(function () {
        $(this).find("span").css("opacity",0);
        $par1Vedio2.css("opacity",0);
    });
//[part1Right][Button]部分
    var $part1RightButton = $("section .part1Right .part1RightButtonLeft");
    var $par1Vedio3 = $("section .part1Right .part1RightButtonLeft div video");
    $part1RightButton.mouseenter(function () {
        $(this).find("span").css("opacity",1);
        $par1Vedio3.css("opacity",1);
    });
    $part1RightButton.mouseleave(function () {
        $(this).find("span").css("opacity",0);
        $par1Vedio3.css("opacity",0);
    });
//[part1Right][Button][one]部分
    var $part1RightButtonOne = $("section .part1Right .part1RightButtonRight .one");
    var $par1Vedio4 = $("section .part1Right .part1RightButtonRight .one div video");
    $part1RightButtonOne.mouseenter(function () {
        $(this).find("span").css("opacity",1);
        $par1Vedio4.css("opacity",1);
    });
    $part1RightButtonOne.mouseleave(function () {
        $(this).find("span").css("opacity",0);
        $par1Vedio4.css("opacity",0);
    });
//[part1Right][Button][two]部分
    var $part1RightButtonTwo = $("section .part1Right .part1RightButtonRight .two");
    var $par1Vedio5 = $("section .part1Right .part1RightButtonRight .two div video");
    $part1RightButtonTwo.mouseenter(function () {
        $(this).find("span").css("opacity",1);
        $par1Vedio5.css("opacity",1);
    });
    $part1RightButtonTwo.mouseleave(function () {
        $(this).find("span").css("opacity",0);
        $par1Vedio5.css("opacity",0);
    });

//[section][part2]
//[showGroup]部分
    var $showGroupDl = $("section .part2 .showGroup dl");
    var index1;
    $showGroupDl.mouseenter(function () {
        index1 = $(this).index();
        $(this).find("dt img").attr("src","./img/home/ico_service0"+(index1+1)+".gif");
    });
    $showGroupDl.mouseleave(function () {
        $showGroupDl.eq(index1).find("dt img").attr("src","./img/home/ico_service0"+(index1+1)+".png");
    });
//[section][part3]
//[showImg]部分
    var $showImgDiv = $("section .part3 .showImg div");
    $showImgDiv.css({backgroundSize:"100%,100%"});
    var index2;
    $showImgDiv.mouseenter(function () {
        $(this).css({backgroundSize:"110%,110%"});
        index2 = $(this).index();
        $(this).find(".showImgSpan1").css("opacity",0);
        $(this).find(".showImgSpan2").css("opacity",0);
    });
    $showImgDiv.mouseleave(function () {
        $(this).css({backgroundSize:"100%,100%"});
        $showImgDiv.eq(index2).find(".showImgSpan1").css("opacity",1);
        $showImgDiv.eq(index2).find(".showImgSpan2").css("opacity",1);
    });
//[aside]部分
    $("aside .prev").mouseenter(function () {
        $(this).find("div").stop().animate({'height': '0'}, 300);

        $('img', this).css({'marginTop': '-88px'});
    });
    $("aside .prev").mouseleave(function() {
        $(this).find("div").stop().animate({'height': '100%'}, 300);
        $('img', this).css({'marginTop': '0px'});
    });
    $("aside .next").mouseenter(function () {
        $(this).find("div").stop().animate({'height': '0'}, 300);

        $('img', this).css({'marginTop': '-88px'});
    });
    $("aside .next").mouseleave(function() {
        $(this).find("div").stop().animate({'height': '100%'}, 300);
        $('img', this).css({'marginTop': '0px'});
    });

    //测试滚轮监听
    var $asideSpan = $(".thisNum");
    var offsetTopPart1 = $("section .part1").offset().top-winH/2;
    //console.log(offsetTopPart1);//625,第一页
    var offsetTopPart2 = $("section .part2").offset().top-winH/2;
    //console.log(offsetTopPart2);//1225，第二页
    var offsetTopPart3 = $("section .part3").offset().top-winH/2;
    //console.log(offsetTopPart3);//1825，第三页
    var sHA=[offsetTopPart1,offsetTopPart2,offsetTopPart3];
    $(window).scroll(function () {
        sTop = $document.scrollTop();
        if(sTop < sHA[0]){
            $asideSpan.html("1");
        }else if( sTop >= sHA[0] && sTop < sHA[1]){
            $asideSpan.html("2");
        }else if(sTop >= sHA[1] && sTop < sHA[2]){
            $asideSpan.html("3");
        }else if(sTop >= sHA[2]){
            $asideSpan.html("4");
        }
    });
    //点击上下翻页
    var $prev = $("aside .prev");
    var $next = $("aside .next");
    $prev.click(function () {
        var n = Number($asideSpan.html());
        n = n - 1;
        if(n < 1 ) n = 1;
        console.log(n);
        n = n - 1;
        $('html,body').stop().animate({'scrollTop':n*winH});
    });
    $next.click(function () {
        var n = Number($asideSpan.html());
        n = n + 1;
        if(n > 4 ) n = 4;
        console.log(n);
        n = n - 1;
        $('html,body').stop().animate({'scrollTop':n*winH});
    });
//验证码部分
    var $loginSpan = $(".loginDiv .yanzhengInput span");
    var $registerSpan = $(".registerDiv .yanzhengInput span");
    getStr($loginSpan,4);
    $loginSpan.click(function () {
        getStr($loginSpan,4);
    });
    $("#usertext").focus(function () {

    }).blur(function () {
        var str = $("#usertext").val();
        if( !str ){
            $(this).val("").attr({"placeholder":"验证码不能为空"});
        }else if( str!= $loginSpan.text() ){
            $(this).val("").attr({"placeholder":"验证码有误"});
            getStr($loginSpan,4);
            //noPass();
            return false;
        }else{
            $loginBtn.css({"background":"red"});
        }
    });
    getStr($registerSpan,4);
    $registerSpan.click(function () {
        getStr($registerSpan,4);
    });
    $("#registerText").focus(function () {
    }).blur(function () {
        var str = $("#registerText").val();
        if( !str ){
            $(this).val("").attr({"placeholder":"验证码不能为空"});
        }else if( str != $registerSpan.text() ){
            $(this).val("").attr({"placeholder":"验证码有误"});
            //noPass();
            return false;
        }else{
            $registerBtn.css({"background":"red"});
        }
    });
//[登录注册]部分
    var $loginDiv = $(".loginDiv");//登录框
    var $loginBtn = $("#loginBtn");//登录按钮

    var $registerBtn = $("#registerBtn");//注册按钮
    var $registerDiv = $(".registerDiv");//注册框

    $loginDiv.css("height",winH);//自动获得一屏高
    $registerDiv.css("height",winH);//自动获得一屏高
    $loginDiv.hide();
    $registerDiv.hide();

    //切换[马上登录]
    $(".registerDiv .form_reg_btn a").click(function () {
        $registerDiv.hide();
        $loginDiv.show();
        getlogin();
    });
    //切换[马上注册]
    $(".loginDiv .form_reg_btn a").click(function () {
        $registerDiv.show();
        $loginDiv.hide();
    });

    var $loginClose = $(".infoDiv .close");//登录框关闭
    $loginClose.click(function () {
        $loginDiv.addClass('animated zoomOutUp');
        setTimeout(function () {
            $loginDiv.removeClass('zoomOutUp');
        },1500);
        $loginDiv.slideUp("slow");
        window.onmousewheel=document.onmousewheel= function () {
            return true;
        };
        $("#username").val("");
        $("#userpass").val("");
        $("#userText").val("");
    });
    var $registerClose = $(".registerDiv .close");//注册框关闭
    $registerClose.click(function () {
        $registerDiv.addClass('animated zoomOutDown');
        setTimeout(function () {
            $registerDiv.removeClass('zoomOutDown');
        },1500);
        $registerDiv.fadeOut("slow");
        window.onmousewheel=document.onmousewheel= function () {
            return true;
        };
        $("#username1").val("");
        $("#userpass1").val("");
        $("#resetpass").val("");
        $("#registerText").val("");
    });

//[登录/注册框隐藏显示]
    var $login = $(".asideleft li");
    $login.eq(0).click(function () {
        getlogin();
        $('html,body').scrollTop(0);
        $loginDiv.slideDown("slow");
        window.onmousewheel=document.onmousewheel= function () {
            return false;
        };
    });
    $login.eq(1).click(function () {

        $('html,body').scrollTop(0);
        $registerDiv.fadeIn("slow");
        window.onmousewheel=document.onmousewheel= function () {
            return false;
        };
    });
//[登录验证，提交]
    //$loginBtn.attr("disabled","true");//禁止按钮
    $loginBtn.css({"background":"#999"});//禁止下是灰色
    $loginBtn.click(function () {
        var $username = $("#username").val();
        var $userpass = $("#userpass").val();
        $.ajax({
            url:'/api/webfoss/user/login',
            type:'post',
            data:{username:$username,userpass:$userpass},
            success: function (data) {
                console.log(data);
                if(data.success){
                    alert(data.message);
                    sessionStorage.setItem('username',data.username);
                    if($('#checkBox').is(':checked')) {
                        localStorage.setItem('username',data.username);
                    }
                    $loginDiv.hide();
                    $("#username").val("");
                    $("#userpass").val("");
                    $("#usertext").val("");
                    getSession();
                    //window.location.reload();
                }else{
                    alert(data.message);
                }
            }
        });
    });
//[注册验证]
    //验证不通过函数
    var noPass = function () {
        $(".infoDiv").addClass('animated shake');
        setTimeout(function () {
            $(".infoDiv").removeClass('shake');
        },500);
    }
    $registerBtn.attr("disabled","true");//禁止按钮
    $registerBtn.css({"background":"#999"});//禁止下是灰色
    //用户名验证
    $("#username1").focus(function () {
        $(this).attr({"placeholder":"请输入邮箱或手机号"});
    }).blur(function () {
        var str = $("#username1").val();
        var emailReg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var telReg = /^1[3|4|5|7|8][0-9]{9}$/;
        if( !str ){
            $(this).val("").attr({"placeholder":"不能为空"});
            //noPass();
            //$(this).focus();
            return false;
        }else if( !(emailReg.test(str) || telReg.test(str)) ){
            $(this).val("").attr({"placeholder":"请输入正确格式"});
            //noPass();
            //$(this).focus();
            return false;
        }
    });
    //密码验证
    $("#userpass1").focus(function () {
        $(this).attr({"placeholder":"请输入密码"});
    }).blur(function () {
        var str = $("#userpass1").val();
        var reg = /^[^\d\s].{7,15}$/;
        if( !str ){
            $(this).val("").attr({"placeholder":"不能为空"});
            //noPass();
            //$(this).focus();
            return false;
        }else if( !reg.test(str) ){
            $(this).val("").attr({"placeholder":"首字母为数字的密码(8-16)位"});
            //noPass();
            //$(this).focus();
            return false;
        }
    });
    //重复密码验证
    $("#resetpass").focus(function () {
        $(this).attr({"placeholder":"重复密码"});
    }).blur(function () {
        var resetStr = $("#resetpass").val();
        var passStr = $("#userpass1").val();
        if( !resetStr ){
            $(this).val("").attr({"placeholder":"不能为空"});
            //noPass();
            //$(this).focus();
            return false;
        }else if( resetStr != passStr){
            $(this).val("").attr({"placeholder":"两次密码不一致"});
            $("#userpass1").val("").attr({"placeholder":"两次密码不一致"});
            //noPass();
        }else{
            $registerBtn.removeAttr("disabled","true");//解除按钮
            //$registerBtn.css({"background":"red"});//解除下是红色
        }
    });
    //[注册提交]
    $registerBtn.click(function () {
        var $username = $("#username1").val();
        var $userpass = $("#userpass1").val();
        $.ajax({
            url:'/api/webfoss/user/register',
            type:'post',
            data:{username:$username,userpass:$userpass},
            success: function (data) {
                //console.log(data);
                if(data.success){
                    //console.log(data);
                    alert(data.message);
                    sessionStorage.setItem('username',data.username);
                    $registerDiv.hide();
                    $("#username1").val("");
                    $("#userpass1").val("");
                    $("#resetpass").val("");
                    $("#registerText").val("");
                    getSession();
                    //window.location.href = "home.html";
                }else{
                    alert(data.message);
                    $("#username1").val("");
                }
            }
        });
    });
    //[登陆后显示效果]
    var $userloginDiv = $(".userloginDiv");
    $userloginDiv.mouseenter(function () {
        //console.log("有效");
        $(this).stop().animate({"right":0});
    }).mouseleave(function () {
        $(this).stop().animate({"right":"-110px"});
    });
    //[退出按钮]
    $("#loginOut").click(function () {
        if( confirm("确定要退出吗？") ){
            sessionStorage.removeItem('username');
            getSession();
        }else{
            alert("隐藏部分");
        }
    });
    //[查询是否有sessionStorage]
    getSession();
    function getSession(){
        if(sessionStorage.getItem('username')){

            var str = sessionStorage.getItem('username');
            $("#userloginDivSpan").text(str);

            $(".asideleft").css({"display":"none"});
            $(".userloginDiv").css({"display":"block"});
        }else{
            $(".asideleft").css({"display":"block"});
            $(".userloginDiv").css({"display":"none"});
        }
    }
    getlogin();
    function getlogin(){
        if(localStorage.getItem('username')){
            var str = localStorage.getItem('username');
            $("#username").val(str);
        }
    }
}
//打开页面监听资源加载
var imgUrl = [
    "./img/about/yuan.png",
    "./img/home/banners1.jpg",
    "./img/home/banners2.jpg",
    "./img/home/banners3.jpg",
    "./img/home/banners4.jpg",
    "./img/home/banners5.jpg",
    "./img/home/aboutleft.jpg",
    "./img/home/bg_more.png",
    "./img/home/aboutrighttop.jpg",
    "./img/home/leftbox.jpg",
    "./img/home/lefttopbox.jpg",
    "./img/home/leftbottombox.jpg"
];
loadWatcher(imgUrl);









