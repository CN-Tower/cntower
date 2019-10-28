window.onload = function() {
	var imgUrl = [
		"./img/1-02bcea62f72c.jpg",
		"./img/2-8ad6f9703910.jpg",
		"./img/3-5e13d639cbbe.jpg",
		"./img/4-12fe49d219b8.jpg",
		"./img/5-d7072902d9a2.jpg",
		"./img/6-4070975f5b6e.jpg",
		"./img/7-eacef14eeb8e.jpg",
		"./img/8-1e73ca806f1e.jpg",
		"./img/9-406053bdf4fc.jpg",
		"./img/10-f77327744acf.jpg",
		"./img/11-ac04d9849631.jpg"
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
			document.getElementsByClassName("loadingBg")[0].style.display = "none";
			document.getElementsByClassName("pageBody")[0].style.display = "block";
			setTimeout(function(){
				loader();
			},50);
		}
	},500);
	function loader(){
		var oimg=document.getElementsByTagName('img');
		var obox=document.getElementsByClassName('box')[0];
		var oimglength=oimg.length;
		var odeg=360/oimglength;
		var lastX,lastY,lastZ,nowX,nowY,nowZ,minuX,minuY,roX=0,roY=-10,timerOfAuto,timerOfStart,count=0,ctrl=false;
		for(var i=0;i<oimglength;i++){
			oimg[i].style.transform='rotateY('+odeg*i+'deg) translateZ(350px)';
			oimg[i].style.transition='transform 1s '+(oimglength-1-i)*0.1+'s';
			count++;
			if(count==oimglength){
				delay=((oimglength-1)*0.1+1)*1000;
				setTimeout(function(){
					autoMove();
				},delay);
			};
		}
		window.onresize=function(){
			setPosition();
		}
		setPosition();
		function setPosition(){
			 var wh=document.documentElement.clientHeight;
			 var ww=document.documentElement.clientWidth;
			 lastZ=wh/2-180+'px';
			 lastX=ww/2-50+'px';
			 obox.style.marginTop=lastZ;
			 obox.style.marginLeft=lastX;	
		};
		
		//自动旋转
		function autoMove(){
			roX -=0.08;
			move();
			timerOfAuto=setTimeout(autoMove,20);
		}
		//旋转函数
		function move(){
			obox.style.transform='rotateX('+roY+'deg)rotateY('+roX+'deg)';
		}
		//判断是移动还是旋转
		document.onkeydown=function(e){
			if(e.ctrlKey)ctrl=true;
		}
		document.onkeyup=function(){
			ctrl=false;
		}
		//拖动旋转或移动图片组
		document.onmousedown=function(e){
			clearInterval(timerOfStart);
			clearTimeout(timerOfAuto);
			e=e||window.event;
			lastX=e.clientX;
			lastY=e.clientY;
			document.onmousemove=function(e){
				e=e||window.event;
				nowX=e.clientX;
				nowY=e.clientY;
				minuX=nowX-lastX;
				minuY=nowY-lastY;
				if(ctrl){
					var top = parseInt(obox.style.marginTop);
					var left = parseInt(obox.style.marginLeft);
					top += minuY;
					left += minuX;
					obox.style.marginTop = top + 'px';
					obox.style.marginLeft = left + 'px';
				}else{
					roX+=minuX*0.2;
					roY-=minuY*0.2;
				}
				move();
				lastX=nowX;
				lastY=nowY;
			}
			document.onmouseup=function(e){
				e=e||window.event;
				this.onmousemove=null;
				if(!ctrl){
					timerOfStart=setInterval(function(){
						minuX *= 0.95;
						minuY *= 0.95;
						roX+=minuX*0.2;
						roY-=minuY*0.2;
						move();
						if(Math.abs(minuX)<0.1 && Math.abs(minuY)<0.1){
							clearInterval(timerOfStart);
							timerOfAuto=setTimeout(autoMove,20);
						}
					},20);
				}else {
					clearInterval(timerOfStart);
					timerOfAuto=setTimeout(autoMove,20);
				}
			}
			return false;
		}
	}
}