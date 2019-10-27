/**
 * 监听页面图片加载是否完成
 * ===========================================================
 */
var imgUrl = [
    "./img/1.jpg",
    "./img/myphoto.jpg",
    "./img/logo.png"
];
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
        wowLoaded();
        indexLoaded();
    }
},500);