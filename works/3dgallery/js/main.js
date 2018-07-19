window.onload = function() {
	var imgUrl = [
		"./img/1.jpg",
		"./img/2.jpg",
		"./img/3.jpg",
		"./img/4.jpg",
		"./img/5.jpg",
		"./img/6.jpg",
		"./img/7.jpg",
		"./img/8.jpg",
		"./img/9.jpg",
		"./img/10.jpg",
		"./img/11.jpg"
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