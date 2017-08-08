/*                     *-------------Hello---------------*                     */
$(function(){
/*---------------------------------header 时间---------------------------------*/
/*                     *-------------start---------------*                     */
    var $header_time=$("#header .header_top .time");
    function time(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var dat = date.getDate();
        var day = date.getDay();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        switch(day){
            case 1: day = "一";break;
            case 2: day = "二";break;
            case 3: day = "三";break;
            case 4: day = "四";break;
            case 5: day = "五";break;
            case 6: day = "六";break;
            case 0: day = "天";break;
        }
        var headerTime=year+" 年 "+month+" 月 "+dat+" 日  星期"+day+"  "+hour+":"+minutes+":"+second;
        $header_time.html(headerTime);
        setTimeout(time,1000);
    }
    time();
/*                    *-------------finish---------------*                     */
/*-----------------------------------搜索--------------------------------------*/
/*                     *-------------start---------------*                     */
var $body=$(document.body);
var $html=$(document).children("html");
var $header_search_in=$("#header_search_in");
var header_search_val;
    $header_search_in.focus(function(){
        header_search_val=$(this).val();
        $(this).val("").css("color","#000");
    }).blur(function(){
        $(this).val(header_search_val).css("color","grey");
    });
/*                    *-------------finish---------------*                     */
/*---------------------------------导航菜单------------------------------------*/
/*                     *-------------start---------------*                     */
    var $header_nav=$("#header .header_nav");
    var $header_nav_wp=$("#header .header_nav_wp");
    var $header_nav_ul=$("#header .header_nav_wp .header_nav_ul");
    var $header_nav_ul_wp=$("#header .header_nav_ul_wp");
    var $header_nav_lis=$header_nav_ul.children();
    var $header_nav_lis_a=$header_nav_ul.find("li a");
    var $header_nav_con_wp=$("#header .header_nav .header_nav_con_wp");
    var $header_nav_con=$("#header .header_nav .header_nav_con");
    var $header_nav_con_div=$header_nav_con.children();
    var $header_nav_side_bg=$("#header .header_nav_side_bg");
    var $header_nav_slider1=$("#header .header_nav_slider1");
    var $header_nav_slider2=$("#header .header_nav_slider2");
    var $header_nav_slider3=$("#header .header_nav_slider3");

    var sy;
    var timer_nav_con;
    var headerNavLisW=$header_nav_lis.first().width();
    var headerNavFlag=0;
    var headerNavTarget=0;

    $header_nav_lis.each(function(i){
        $(this).hover(function(){
            headerNavTarget = i;
            $header_nav_con_div.css("display","none").eq(i).css("display","block");
            $header_nav_lis_a.css({color: "#7a0202"}).eq(headerNavFlag).css({color: "#ff7315"}).end()
                .eq(i).css({color: "#ff7315"});
            $header_nav_slider1.css({left: headerNavTarget * headerNavLisW});
            $header_nav_slider3.stop().animate({left: headerNavTarget * headerNavLisW})
        }).click(function(){
            if(headerNavFlag != i)$header_nav_lis_a.eq(headerNavFlag).css({color: "#7a0202"});
            headerNavFlag=i;
            $header_nav_slider2.stop().animate({left: headerNavTarget * headerNavLisW})
        })
    });

    $header_nav_wp.hover(function(){
        timer_nav_con=setTimeout(navConShow,150);
        function navConShow(){
            $header_nav_ul_wp.css("display","none");
            $header_nav_slider3.css("display","block");
            $header_nav_con.stop().slideDown(function(){
                $header_nav_ul_wp.css("display","none");
            });
            $header_nav_con_wp.stop().slideDown();
        }
    },function(){
        clearTimeout(timer_nav_con);
        $header_nav_lis_a.eq(headerNavFlag).css({color:"#ff7315"});
        if(headerNavTarget!=headerNavFlag)$header_nav_lis_a.eq(headerNavTarget).css({color:"#7a0202"});
        $header_nav_slider1.stop().animate({left:headerNavFlag*headerNavLisW});
        $header_nav_slider3.stop().animate({left:headerNavFlag*headerNavLisW},function(){
            $(this).css("display","none");
            $header_nav_ul_wp.css("display","block");
        });
        $header_nav_con.stop().slideUp(function(){$header_nav_con_div.css("display","none")});
        $header_nav_con_wp.stop().slideUp();
    });

    $(document).scroll(function(e){
        sy=parseInt($body.scrollTop());
        sy_fix=parseInt($html.scrollTop());
        sy ? sy : sy=sy_fix;
        if(sy>130){
            $header_nav.css({position:"fixed",top:"0",left:"0",zIndex:"999"});
            $header_nav_side_bg.css("display","block");
        }else{
            $header_nav.css({position:"relative"});
            $header_nav_side_bg.css("display","none");
        }
    });
/*                    *-------------finish---------------*                     */
/*---------------------------------banner轮播----------------------------------*/
/*                     *-------------start---------------*                     */
    var $nav_index_span=$(".header_nav_con .nav_index span");
    var $nav_index_a=$(".header_nav_con .nav_index a");
    var navIndexBackground=["0","-75px","-150px","-300px","-225px","-525px","-450px","-375px"];

    $nav_index_span.each(function(i){
        $(this).css("backgroundPosition",navIndexBackground[i])
    });
    $nav_index_a.each(function(j){
        $(this).click(function(){
            var i=j+1;
            headerNavFlag = i;
            headerNavTarget=i;
            $header_nav_lis_a.css({color: "#7a0202"}).eq(headerNavFlag).css({color: "#ff7315"}).end()
                .eq(i).css({color: "#ff7315"});
            $header_nav_slider1.css({left: headerNavTarget * headerNavLisW});
            $header_nav_slider3.stop().animate({left: headerNavTarget * headerNavLisW});
            $header_nav_slider2.stop().animate({left: headerNavTarget * headerNavLisW});
            $header_nav_con.delay(400).stop().slideUp(function(){$header_nav_slider3.css("display","none");});
            $header_nav_con_wp.delay(400).stop().slideUp();
        });
    });
/*                    *-------------finish---------------*                     */
/*---------------------------------banner轮播----------------------------------*/
/*                     *-------------start---------------*                     */
    var $con_banner_sidebars=$("#con .banner_sidebar span");
    var $con_banner_bars=$("#con .banner_bar li");
    var $con_banner_window=$("#con .banner_window");
    var $con_banner_box=$("#con .banner_box");
    var $con_banner_comment=$("#con .banner_comment");
    var bannerArray=["湖北云梦皮影艺术家——腾德清先生","精美绝伦的艺术——唐山皮影","西安回民街高家大院——三打白骨精","陕西华县皮影雕刻师——李剑","台湾影子传奇皮影剧团——让小朋友体验皮影艺术","皮影艺术推陈出新——江西大学毕业晚会出现皮影戏"];

    $con_banner_window.hover(function(){
        clearInterval(bannerTimer);
        $con_banner_sidebars.first().stop().animate({marginLeft:"0"},"fast")
            .next().stop().animate({marginRight:"0"},"fast");
    },function(){
        bannerTimer=setInterval(bannerAuto,4000);
        $con_banner_sidebars.first().stop().animate({marginLeft:"-55px"},"fast")
            .next().stop().animate({marginRight:"-55px"},"fast");
    });

    var bannerTimer=setInterval(bannerAuto,4000);
    var bannerTarget=0;
    function bannerAuto(){
        bannerTarget++;
        if(bannerTarget>6){
            bannerTarget=1;
            var bannerBoxX=parseInt($con_banner_box.css("marginLeft"));
            bannerBoxX += 6000;
            $con_banner_box.css("marginLeft",bannerBoxX);
        }
        bannerGo();
    }
    $con_banner_bars.hover(function(){
        if($(this).index()==bannerTarget)return;
        $(this).css({background:"#ff7315"});
    },function(){
        if($(this).index()==bannerTarget)return;
        $(this).css({background:"#fff"});
    }).each(function(i) {
        $(this).click(function () {
            bannerTarget=i;
            bannerGo();
        });
    });

    $con_banner_sidebars.each(function(i) {
        $(this).click(function () {
            if($con_banner_box.is(":animated"))return;
            if(i==0)bannerTarget--;
            if(i==1)bannerTarget++;
            var bannerBoxX=parseInt($con_banner_box.css("marginLeft"));
            if(bannerTarget>6){
                bannerTarget=1;
                bannerBoxX += 6000;
                $con_banner_box.css("marginLeft",bannerBoxX);
            }else if(bannerTarget<-1){
                bannerTarget=4;
                bannerBoxX -= 6000;
                $con_banner_box.css("marginLeft",bannerBoxX);
            }
            bannerGo();
        });
    });
    $con_banner_bars.first().css({background:"#ff7315"}).siblings().css({background:"#fff"});
    function bannerGo(){
        var bannerBarsTarget=bannerTarget;
        if(bannerBarsTarget>5)bannerBarsTarget=0;
        if(bannerBarsTarget<0)bannerBarsTarget=5;
        $con_banner_bars.eq(bannerBarsTarget).css({background:"#ff7315"}).siblings().css({background:"#fff"});
        $con_banner_comment.html(bannerArray[bannerBarsTarget]);
        var bannerBoxX=-bannerTarget*1000-1000;
        $con_banner_box.stop().animate({marginLeft:bannerBoxX},"slow");
    }

/*                    *-------------finish---------------*                     */
/*-----------------------------------对联--------------------------------------*/
/*                     *-------------start---------------*                     */
    var $con_coupletL=$("#con .couplet .fl span");
    var $con_coupletR=$("#con .couplet .fr span");
    var coupletTimer1=setInterval(coupletSwing0,6000);
    var coupletTimer2;
    var coupletX1="10px";
    var coupletX2="-10px";
    var coupletFlag=true;
    var coupletCount=0;
    function coupletSwing0(){
        clearInterval(coupletTimer2);
        coupletTimer2=setInterval(coupletSwing,600);
    }
    function coupletSwing(){
        if(coupletCount<3){
            coupletCount++;
            if(coupletFlag){
                for(var i=0;i<$con_coupletL.length;i++){
                    $con_coupletL.eq(2*i).animate({marginLeft:coupletX1},"fast").end()
                        .eq(2*i+1).animate({marginLeft:coupletX2},"fast");
                    $con_coupletR.eq(2*i).animate({marginLeft:coupletX1},"fast").end()
                        .eq(2*i+1).animate({marginLeft:coupletX2},"fast");
                }
                return coupletFlag=false;
            }else{
                for(i=0;i<$con_coupletL.length;i++){
                    $con_coupletL.eq(2*i).animate({marginLeft:coupletX2},"fast").end()
                        .eq(2*i+1).animate({marginLeft:coupletX1},"fast");
                    $con_coupletR.eq(2*i).animate({marginLeft:coupletX2},"fast").end()
                        .eq(2*i+1).animate({marginLeft:coupletX1},"fast");
                }
                return coupletFlag=true;
            }
        }else {
            $con_coupletL.animate({marginLeft:"0"});
            $con_coupletR.animate({marginLeft:"0"});
            coupletCount=0;
            clearInterval(coupletTimer2);
        }
    }

/*                    *-------------finish---------------*                     */
/*----------------------------------The End-------------------------------------*/
});
/*                     *-------------World---------------*                      */
