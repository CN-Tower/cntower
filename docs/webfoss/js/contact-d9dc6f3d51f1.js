function contactLoaded(){
    $("#mapBox").click(function(){
        $("#maxdiv").fadeIn();
        $("#mindiv").fadeIn();
    });
    $("#closediv").click(function(){
        $("#maxdiv").fadeOut();
        $("#mindiv").fadeOut();
    });
    var $con16 = $("#con16");
    var $bg = $(".bg");
    var bgTop = $bg[0].offsetTop;
    //生成验证码
    getStr($con16,4);
    $con16.click(function(){
        getStr($(this),5);
    });
    //滚动监听
    var sTop = $(document).scrollTop();
    var winH = $(window).height();
    $bg.css({height:winH/2,backgroundPosition:"50% 0"});
    if(sTop > 50){
        document.querySelector(".con1").classList.add("active");
    }
    $(document).scroll(function(){
        sTop = $(document).scrollTop();
        if(sTop > 50){
            document.querySelector(".con1").classList.add("active");
        }
    });

    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){
        map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(121.494039,31.25681),18);
    }
    function setMapEvent(){
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
        target.addEventListener("click",function(){
            target.openInfoWindow(window);
        });
    }
    function addMapOverlay(){
        var markers = [
            {imageOffset: {width:0,height:-21},position:{lat:31.256934,lng:121.49478}}
        ];
        for(var index = 0; index < markers.length; index++ ){
            var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
            var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
                imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
            })});

            var opts = {
                width: 200,
                title: markers[index].title,
                enableMessage: false
            };
            var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
            marker.setLabel(label);
            addClickHandler(marker,infoWindow);
            map.addOverlay(marker);
        }
       var labels = [
         {position:{lng:121.494749,lat:31.256964},content:"我的标记"}
       ];
       for(var index = 0; index < labels.length; index++){
           var opt = { position: new BMap.Point(labels[index].position.lng,labels[index].position.lat )};
           var label = new BMap.Label(labels[index].content,opt);
           map.addOverlay(label);
       }
    }
    //向地图添加控件
    function addMapControl(){
        var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
        map.addControl(scaleControl);
        var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(navControl);
        var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
        map.addControl(overviewControl);
    }
    var map;
    initMap();
    //[留言板提交按钮]
    $(".contact-right .infoBtn").click(function () {
        if( !sessionStorage.getItem('username') ){
            alert("请先登录后在提交");
        }else{
            var $username = $("#username").val();
            var $useremail = $("#useremail").val();
            var $usertel = $("#usertel").val();
            var $userjob = $("#userjob").val();
            var $usertext = $("#usertext").val();
            //整体获得表单数据
            var  XXX = $("#myform").serialize();
            //console.log("1.---->"+XXX);
            //console.log("2.---->"+$username,$useremail,$usertel,$userjob,$usertext);
            $.ajax({
                url:'/api/user/article',
                type:'post',
                //data:{username:$username,email:$useremail,tel:$usertel,profession:$userjob,text:$usertext},
                data: XXX,
                success: function (data) {
                    //console.log(data);
                    if(data.success){
                        alert(data.message);
                        $(':input','#myform')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .removeAttr('checked')
                            .removeAttr('selected');
                    }else{
                        alert(data.message);
                    }
                }
            });
        }
    });
}
//打开页面监听资源加载
var imgUrl = [
    "./img/contact/aa.jpg",
    "./img/contact/clicktext.png",
    "./img/contact/shanghai.jpg"
];
loadWatcher(imgUrl);

