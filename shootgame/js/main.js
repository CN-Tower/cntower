/**
 * Created by 苡宁 on 2015/11/17.
 */
/*全局变量*/
var tip = document.getElementById("tip");
var Gover = document.getElementById("over");
var overY = Gover.getElementsByTagName("img")[0];
Gover.style.display = "none";
Gover.style.opacity = 1;
var tipY = tip.getElementsByTagName("img")[0];
var tipN = tip.getElementsByTagName("img")[1];
tip.style.display = "none";
tip.style.opacity = 1;
var readyMain = document.getElementById("readyMain");

var mainHeight;/*main的高度*/
var mainWidth=1366;/*main的宽度*/
var main = document.getElementById('main');
var enemyList = new Array();/*敌人列队*/
var ballList = new Array();/*龙魔法列队*/
var bossList = new Array();/*BOSS魔法弹列队*/
var thingList = new Array();/*怪爆的东西列队*/
var expList = new Array("0","10","20","50","100");/*升级当前等级所需的经验值10 20 50 100*/
var issetBOSS = 0;/*是否存在BOSS，存在为1，反之为0 */
var bossEnemy;/*储存BOSS节点*/
var limitBoss = 2;/*限制BOSS出现的频率*/
var intBossBall;/*储存BOSS攻击无限调用，死亡时clear*/
var intAttackDragonBall;/*创造魔法弹*/
var dragonUp = false; /*上*/
var dragonDown = false;/*下*/
var dragonLeft = false;/*左*/
var dragonRight = false;/*右*/
var ball = false;/*魔法弹*/
var dragonIsAtt = 0; /*记录龙是否为攻击状态 0为否 1为是*/
var gold = 0;/*获得的金币*/
var dragonStrokes = 3;/*龙的大招数量 初始为3*/
var Strokes;/*大招对象*/
var limitStrokes = 0;/*限制同时释放大招的数量*/
var StrokesEnd = 0;/*大招事都释放完全*/
var imgHeight;/*龙的高度*/
var imgWidth;/*龙的宽度*/
var intFlicker;/*储存闪烁的timeout*/
var changing=0;/*正在进化*/
var scoreBox = document.getElementById("uiScore");
scoreBox.style.display="none";
var scoreDiv = document.getElementById("score");
scoreDiv.innerHTML="0 分";/*初始化分时显示板*/
var hpBox = document.getElementById("hp0");/*HP血条*/
var howHp = document.getElementById("hpMax");/*HP血量*/
var expBox = document.getElementById("exp0");/*经验条*/
var howExp = document.getElementById("exp");
var boom = document.getElementById("boom");/*大招数量显示*/
var dragonSmall = new dragon("images/dragon/",10,300,2,10,0,1);/*创建进化龙，small小龙，最后三个：HP为10，经验为0，龙为 1-小龙*/
dragonSmall.enemyNode.style.display="none";/*隐藏龙*/
var backBtn = document.getElementById("back");/*返回按钮*/
backBtn.style.display="none";/*隐藏按钮*/
var isStart = 0;/*是否开始游戏*/
var startGameBtn = document.getElementById("startGame");
var countdown;/*计时器*/

/*音效*/
var bgm = document.getElementById("bgm");/*背景音乐*/
var dragonHit = document.getElementById("dragonHit");/*龙受伤*/
var dragonShoot = document.getElementById("dragonShoot");/*龙发射*/
var dragon1 = document.getElementById("dragon1");
var dragon2 = document.getElementById("dragon2");
var dragon3 = document.getElementById("dragon3");
var dragon4 = document.getElementById("dragon4");
var dragon5 = document.getElementById("dragon5");
var birdDie = document.getElementById("birdDie");
var planeDie = document.getElementById("planeDie");
var ghostDie = document.getElementById("ghostDie");
var bossDie = document.getElementById("bossDie");
var bossShoot = document.getElementById("bossShoot");/*BOSS发射*/
var dragondie = document.getElementById("dragondie");
var LevelUp = document.getElementById("LevelUp");
var boomMusic = document.getElementById("boomMusic");
var BtMouseOver = document.getElementById("BtMouseOver");
var btMouseClick = document.getElementById("btMouseClick");
var gameover = document.getElementById("gameover");
var gameWin = document.getElementById("gameWin");
var gamestart = document.getElementById("gamestart");
var thingtime = document.getElementById("thingtime");
var thinggold = document.getElementById("thinggold");
var thingboom = document.getElementById("thingboom");
var bingo = document.getElementById("bingo");

/*开始游戏调用的setInt*/
var s1,s2,s3,s4,s5,s6,s7,s8,s9,s10;
/*开始游戏*/
function startGame(){
    if(isStart==0){
        /*有初始值的全部初始化*/
        startGameBtn.style.display="none";
        main.style.background="url('images/bg.jpg') center center";
        readyMain.style.display="none";
        bgm.src="music/fight.mp3";
        main.removeChild(dragonSmall.enemyNode);
        dragonSmall = new dragon("images/dragon/",10,300,2,10,0,1);/*创建进化龙，small小龙，最后三个：HP为10，经验为0，龙为 1-小龙*/
        /*加载游戏*/
        hpBox.style.display="block";
        expBox.style.display="block";
        s1 = setInterval(createEnemy,2000);/*创建敌人，enemy*/
        s2 = setInterval(enemyMove,50);/*敌人移动，每250ms移动一次*/
        s3 = setInterval(ballMove,50);/*龙魔法弹移动*/
        s4 = setInterval(ballMoveBoss,50);/*Boss魔法弹移动*/
        s5 = setInterval(dragonMove,10);/*龙移动，10ms检查一次*/
        s6 = setInterval(hitCheck,10);/*检查龙的魔法弹是否有碰撞*/
        s7 = setInterval(hitCheckBoss,10);/*BOSS魔法弹击中*/
        s8 = setInterval(dragonisDead,10);/*检测龙是否死亡*/
        s9 = setInterval(dragonEnemy,10);/*检测龙与敌人是否相撞*/
        s10 = setInterval(thingsL,10);/*检查物品消失*/
        scoreBox.style.display="block";/*显示记分板*/
        dragonSmall.enemyNode.style.display="block";/*显示龙*/
        backBtn.style.display="block";/*显示返回按钮*/
        isStart=1;
        boom.style.background="url(images/ui/boom/boom"+dragonStrokes+".png)";
        gamestart.play();
        /*计时器*/
        countdown=91;
        var timeDown = document.getElementById("time");
        timeDown.style.display="block";
        var timeImg = timeDown.getElementsByTagName("img");
        setTime();
        function setTime() {
            if (countdown == 0) {
                /*游戏结束*/
                gameOver();
                gameWin.play();
            }
            else {
                if(isStart==1)countdown--;
                /*显示时间*/
                if(countdown>=60) {
                    timeImg[1].src="images/num/1.gif";
                    var n = countdown-60;
                    timeImg[3].src="images/num/"+parseInt(n/10)+".gif";
                    timeImg[4].src="images/num/"+parseInt(n%10)+".gif";
                }
                else {
                    timeImg[1].src="images/num/0.gif";
                    var n = countdown;
                    timeImg[3].src="images/num/"+parseInt(n/10)+".gif";
                    timeImg[4].src="images/num/"+parseInt(n%10)+".gif";
                }
            }
            setTimeout(function() {
                setTime()
            },1000)
        }
    }
}
function stopGame(){
    tip.style.display="block";
    stopAll()

}
function stopAll(){
    isStart=0;
    clearInterval(s1);
    clearInterval(s2);
    clearInterval(s3);
    clearInterval(s4);
    clearInterval(s5);
    clearInterval(s6);
    clearInterval(s7);
    clearInterval(s8);
    clearInterval(s9);
    clearInterval(s10);
}
function gameOver(){
    Gover.style.display="block";
    var ss = document.getElementById("overS");
    ss.style.fontSize="30px";
    ss.innerHTML=gold;
    stopAll();
}
function continueGame(){
    isStart=1;
    tip.style.display="none";
    s1 = setInterval(createEnemy,2000);/*创建敌人，enemy*/
    s2 = setInterval(enemyMove,50);/*敌人移动，每250ms移动一次*/
    s3 = setInterval(ballMove,50);/*龙魔法弹移动*/
    s4 = setInterval(ballMoveBoss,50);/*Boss魔法弹移动*/
    s5 = setInterval(dragonMove,10);/*龙移动，10ms检查一次*/
    s6 = setInterval(hitCheck,10);/*检查龙的魔法弹是否有碰撞*/
    s7 = setInterval(hitCheckBoss,10);/*BOSS魔法弹击中*/
    s8 = setInterval(dragonisDead,10);/*检测龙是否死亡*/
    s9 = setInterval(dragonEnemy,10);/*检测龙与敌人是否相撞*/
    s10 = setInterval(thingsL,10);/*检查物品消失*/
    bingo.play();

}

startGameBtn.onmouseover=function(){
    startGameBtn.src="images/startOver.gif";
    BtMouseOver.play();
};
startGameBtn.onmouseout=function(){
    startGameBtn.src="images/start.gif";
};
startGameBtn.onmousedown=function(){
    startGameBtn.src="images/startClick.gif";
    btMouseClick.play();
};
startGameBtn.onmouseup=function(){
    btMouseClick.play();
    startGameBtn.src="images/start.gif";
    startGame();

};


overY.onmouseover=function(){
    BtMouseOver.play();
    overY.src="images/ui/tipYO.gif";
};
overY.onmouseout=function(){
    overY.src="images/ui/tipY.gif";
};
overY.onmousedown=function(){
    btMouseClick.play();
    overY.src="images/ui/tipYC.gif";
};
overY.onmouseup=function(){
    btMouseClick.play();
    overY.src="images/ui/tipY.gif";
    window.location.href="MapleStory.html";
};

tipY.onmouseover=function(){
    BtMouseOver.play();
    tipY.src="images/ui/tipYO.gif";
};
tipY.onmouseout=function(){
    tipY.src="images/ui/tipY.gif";
};
tipY.onmousedown=function(){
    btMouseClick.play();
    tipY.src="images/ui/tipYC.gif";
};
tipY.onmouseup=function(){
    btMouseClick.play();
    tipY.src="images/ui/tipY.gif";
    window.location.href="MapleStory.html";
};
tipN.onmouseover=function(){
    BtMouseOver.play();
    tipN.src="images/ui/tipNO.gif";
};
tipN.onmouseout=function(){
    tipN.src="images/ui/tipN.gif";
};
tipN.onmousedown=function(){
    btMouseClick.play();
    tipN.src="images/ui/tipNC.gif";
};
tipN.onmouseup=function(){
    btMouseClick.play();
    tipN.src="images/ui/tipN.gif";
    continueGame();

};


backBtn.onmouseover=function(){
    BtMouseOver.play();
    backBtn.src="images/ui/backover.gif";
};
backBtn.onmouseout=function(){
    backBtn.src="images/ui/back.gif";
};
backBtn.onmousedown=function(){
    btMouseClick.play();
    backBtn.src="images/ui/backClick.gif";
};
backBtn.onmouseup=function(){
    btMouseClick.play();
    backBtn.src="images/ui/back.gif";
    stopGame();
};
/*main自适应高度，最低600*/
window.onload=function(){
    mainHeight = Math.max(document.documentElement.clientHeight, document.body.offsetHeight,600);/*保证最低高度为600*/
    main.style.height=mainHeight+'px';
};

/*键盘监听*/
document.body.onkeydown=function(){
    var e = window.event || arguments[0];
    if(e.keyCode==32){/*空格 魔法弹*/
        ball=true;
        //dragonSmall.attackDragon();
    }
    if(e.keyCode==37){/*左*/
        dragonLeft = true;/*左*/
    }
    if(e.keyCode==38){/*上*/
        dragonUp = true; /*上*/
    }
    if(e.keyCode==39){/*右*/
        dragonRight = true;/*右*/
    }
    if(e.keyCode==40){/*下*/
        dragonDown = true;/*下*/
    }
    if(e.keyCode==13 ){/*回车 大招*/
        if(limitStrokes==0&&StrokesEnd==0&&dragonSmall.isDead==false&&dragonStrokes>0&&isStart==1){
            dragonStrokes--;
            boom.style.background="url(images/ui/boom/boom"+dragonStrokes+".png)"
            Strokes = new skill();
            StrokesEnd=1;
            limitStrokes=1;
            boomMusic.play();
            setTimeout("removeSkill(Strokes)",2000);
        }

    }
};
document.body.onkeyup=function(){
    var e = window.event || arguments[0];
    if(e.keyCode==32){/*空格 魔法弹*/
        ball=false;
        //setTimeout(dragonSmall.attackEndDragon,600);
        //dragonSmall.attackEndDragon();
    }
    if(e.keyCode==37){/*左*/
        dragonLeft = false;/*左*/
    }
    if(e.keyCode==38){/*上*/
        dragonUp = false; /*上*/
    }
    if(e.keyCode==39){/*右*/
        dragonRight = false;/*右*/
    }
    if(e.keyCode==40){/*下*/
        dragonDown = false;/*下*/
    }
    if(e.keyCode==13 &&dragonSmall.isDead==false){/*回车 大招*/
        limitStrokes=0;
    }
};
function dragonMove(){/*行为函数*/
    if(dragonLeft == true&&dragonSmall.isDead==false){
        dragonSmall.moveLeft();
    }
    if(dragonUp == true&&dragonSmall.isDead==false){
        dragonSmall.moveUp();
    }
    if(dragonRight == true&&dragonSmall.isDead==false){
        dragonSmall.moveRight();
    }
    if(dragonDown == true&&dragonSmall.isDead==false){
        dragonSmall.moveDown();
    }
    if(ball == true&&dragonSmall.isDead==false){
        dragonSmall.attackDragon();

            dragonShoot.play();
    }
    if(ball==false&&dragonSmall.isDead==false){
        dragonSmall.attackEndDragon();
    }
}
/*大招*/
function skill(){/*一次25滴血*/

    this.skillNode = document.createElement("img");
    this.skillNode.style.position="absolute";
    this.skillNode.style.zIndex=0;/*大招最叼*/
    this.skillNode.src="images/skill.gif";
    this.skillNode.style.width="100%";
    this.power = 25;
    this.skllBgNode = document.createElement("div");
    this.skllBgNode.style.position="absolute";
    this.skllBgNode.style.zIndex=0;/*大招背景*/
    this.skllBgNode.style.background="white";
    this.skllBgNode.style.opacity=.8;
    this.skllBgNode.style.height=mainHeight+"px";
    this.skllBgNode.style.width=mainWidth+"px";
    main.appendChild(this.skllBgNode);
    main.appendChild(this.skillNode);
}
/*产生伤害 并且 移出大招 */
function removeSkill(stroke){
    for(var j in enemyList){/*敌人*/
        /*敌人的变化*/
        enemyList[j].status=8;
        enemyList[j].hp=enemyList[j].hp-stroke.power;/*减hp*/
        //console.log(enemyList[j].hp);
        enemyList[j].enemyNode.src=enemyList[j].hitSrc;/*更换敌人为hit效果*/
        //console.log("HIT!");
    }
    setTimeout(removeSkillMore,2000);
    function removeSkillMore(){
        StrokesEnd=0;
        main.removeChild(stroke.skllBgNode);
        main.removeChild(stroke.skillNode);
    }
}
/*进化龙*/
function dragon(imgSrc,x,y,speed,hp,exp,who){
    //alert(1);
    this.enemyNode = document.createElement("img");
    this.enemyNode.style.position="absolute";
    this.enemyNode.style.webkitTransition="";/*清除过渡效果*/
    this.enemyNode.style.zIndex=10;
    this.enemyNode.setAttribute("class","style");/*设置初始class*/
    this.enemyNode.style.left=x+"px";
    this.enemyNode.style.top=y+"px";
    this.maxHp = hp;

    if(who==1){
        imgSrc = imgSrc+"small/";
        var power = 1;
        var addL = 0;
    }
    else if(who==2){
        imgSrc = imgSrc+"middle/";
        var power = 2;
        var addL = 10;
    }
    else if(who==3){
        imgSrc = imgSrc+"big/";
        var power = 5;
        var addL = 65;
    }
    else if(who==4){
        imgSrc = imgSrc+"large/";
        var power = 10;
        var addL = 75;
    }
    else {
        imgSrc = imgSrc+"final/";
        var power = 15;
        var addL = 115;
    }
    //power = 50;
    this.imgSrc=imgSrc;
    this.enemyNode.src = imgSrc+'move.gif';
    this.speed = speed;
    this.hp = hp;
    this.exp = exp;
    this.who = who;
    this.isInvincible = false;/*是否无敌*/
    this.status = 0;
    this.isDead = false;/*是否死亡*/
    main.appendChild(this.enemyNode);
    var imgNode = this.enemyNode;/*龙的节点*/
    getImg();/*获得img宽高*/
    function getImg(){
        imgNode.onload=function(){/*龙的图片加载完全后，获取图片的宽高*/
            imgHeight = imgNode.clientHeight;
            imgWidth = imgNode.offsetWidth;
        };
    }

        hpBox.style.left=parseInt(imgNode.style.left)+addL+"px";
        hpBox.style.top = parseInt(imgNode.style.top)-10+"px";


    //alert(imgWidth);
    /*龙移动*/
    this.moveUp = function(){
        if(parseInt(this.enemyNode.style.top)-this.speed>10){
            hpBox.style.top=parseInt(hpBox.style.top)-this.speed+"px";

            this.enemyNode.style.top=parseInt(this.enemyNode.style.top)-this.speed+"px";
        }

    };
    this.moveDown = function(){
        if(parseInt(this.enemyNode.style.top)+this.speed<mainHeight-imgHeight-10){
            hpBox.style.top=parseInt(hpBox.style.top)+this.speed+"px";
            this.enemyNode.style.top=parseInt(this.enemyNode.style.top)+this.speed+"px";
        }

    };
    this.moveLeft = function(){
        if(parseInt(this.enemyNode.style.left)-this.speed>10){
            hpBox.style.left=parseInt(hpBox.style.left)-this.speed+"px";
            this.enemyNode.style.left=parseInt(this.enemyNode.style.left)-this.speed+"px";
        }

    };
    this.moveRight = function(){
        if(parseInt(this.enemyNode.style.left)+this.speed<mainWidth-imgWidth-10){
            this.enemyNode.style.left=parseInt(this.enemyNode.style.left)+this.speed+"px";
            hpBox.style.left=parseInt(hpBox.style.left)+this.speed+"px";
        }

    };
    /*龙攻击*/
    var intAttackEndDragonLater;/*结束延时*/
    this.attackDragon = function(){
        if(dragonIsAtt==0&&dragonSmall.isDead==false){/*攻击特效*/
            imgNode.src=imgSrc+"magicmissile.gif";
            dragonIsAtt=1;
            clearInterval(intAttackDragonBall);
            clearTimeout(intAttackEndDragonLater);
            intAttackDragonBall = setInterval(attackDragonBall,600);
        }
        function attackDragonBall(){
            if(who==1){
                var bY = parseInt(imgNode.style.top)+parseInt(imgHeight/5*3);
            }
            else if(who==2){
                var bY = parseInt(imgNode.style.top)+parseInt(imgHeight/5*2);
            }
            else if(who==3){
                var bY = parseInt(imgNode.style.top)+parseInt(imgHeight/3*1);
            }
            else if(who==4){
                var bY = parseInt(imgNode.style.top)+parseInt(imgHeight/6*3);
            }
            else {
                var bY = parseInt(imgNode.style.top)+parseInt(imgHeight/5*2);
            }
            if(dragonSmall.isDead==false){
                var newBall = new attBall(imgSrc,parseInt(imgNode.style.left)+imgWidth,bY,10,power);
                ballList.push(newBall);
            }
        }
    };
    /*攻击结束*/
    this.attackEndDragon = function(){/*攻击结束，变回移动状态*/
        if(dragonIsAtt==1&&dragonSmall.isDead==false){
            dragonShoot.play();
            dragonIsAtt=0;
            intAttackEndDragonLater = setTimeout(attackEndDragonLater,600);/*延时600秒 让攻击效果完整*/
        }
        function attackEndDragonLater(){/*攻击结束*/
            if(dragonSmall.isDead==false){
                clearInterval(intAttackDragonBall);
                imgNode.src =imgSrc+"move.gif";
            }
        }
    }
}/*进化龙*/
/*龙的魔法弹*/
function attBall(imgSrc,x,y,speed,power){/*魔法弹对象*/
    this.ballNode = document.createElement("img");
    this.ballNode.style.position="absolute";
    //this.ballNode.style.webkitTransition='all 0.2s linear';/*过渡效果 让移动更平滑*/
    this.ballNode.style.zIndex=100;/*魔法弹最高层*/
    this.ballNode.src = imgSrc+"att.gif";
    this.hitSrc = imgSrc+"hit.gif";
    this.ballNode.style.left=x+"px";
    this.ballNode.style.top=y+"px";
    this.speed = speed;
    this.status = 0;
    this.power = power;
    this.isDead = false;/*是否消失*/
    /*1 2 5 10 15 子弹的威力 设置子弹的宽高*/
    if(power==1){
        this.ballH = 21;
        this.ballW = 30;
    }
    else if(power==2){
        this.ballH = 37;
        this.ballW = 50;
    }
    else if(power==5){
        this.ballH = 57;
        this.ballW = 61;
    }
    else if(power==10){
        this.ballH = 38;
        this.ballW = 157;
    }
    else if(power==15){
        this.ballH = 106;
        this.ballW = 212;
    }
    main.appendChild(this.ballNode);/*将魔法弹添加到main中*/
    /*魔法弹移动*/
    this.move = function () {
        this.ballNode.style.left=parseInt(this.ballNode.style.left)+this.speed+"px";
    }
}/*魔法弹*/

/*BOSS魔法弹*/
function attBallBoss(imgSrc,x,y,speed,power){/*魔法弹对象*/
    this.ballBossNode = document.createElement("img");
    this.ballBossNode.style.position="absolute";
    //this.ballBossNode.style.webkitTransition='all 0.2s linear';/*过渡效果 让移动更平滑*/
    this.ballBossNode.style.zIndex=99;/*魔法弹最高层*/
    this.ballBossNode.src = imgSrc;
    this.ballBossNode.style.right=x+"px";
    this.ballBossNode.style.top=y+"px";
    this.speedBoss = speed;
    this.ballH = 54;
    this.ballW = 145;
    this.power=power;
    this.status = 0;
    this.hitSrc = "images/enemy/boss/attackHit.gif";
    this.isDead = false;/*是否消失*/

    main.appendChild(this.ballBossNode);/*将魔法弹添加到main中*/
    /*魔法弹移动*/
    this.move = function () {
        this.ballBossNode.style.right=parseInt(this.ballBossNode.style.right)+this.speedBoss+"px";
    }

}/*BOSS魔法弹*/

/*enemy 敌人*/
function enemyBird(imgSrc,x,y,speedX,speedY,hp,exp){
    this.enemyNode = document.createElement("img");
    this.enemyNode.style.position="absolute";
    ////this.enemyNode.style.webkitTransition='all 0.5s linear';/*过渡效果 让移动更平滑*/
    this.enemyNode.style.webkitTransition='top 0.5s linear';/*过渡效果 让移动更平滑*/
    //this.enemyNode.style.webkitTransition='right 0.1s linear';/*过渡效果 让移动更平滑*/
    this.enemyNode.style.zIndex=5;
    this.imgSrc = imgSrc+"move.gif";
    this.enemyNode.src = this.imgSrc;
    this.hitSrc = imgSrc+"hit.gif";
    this.dieSrc = imgSrc+"die.gif";
    this.enemyNode.style.right=x+"px";
    this.enemyNode.style.top=y+"px";

    this.hp = hp;
    this.exp = exp;
    this.status = 0;
    this.isDead = false;/*是否死亡*/
    this.isBoss = false;/*是否是BOSS*/
    /*添加敌人的宽度和高度*/
    if(exp==1){/*bird*/
        this.enemyH = 54;
        this.enemyW = 58;
        this.gold = 1;
        this.power = 2;
    }
    else if(exp==7){/*plan*/
        this.enemyH = 41;
        this.enemyW = 59;
        this.gold = 5;
        this.power = 5;
    }
    else if(exp==23){/*ghost*/
        this.enemyH = 92;
        this.enemyW = 107;
        this.gold = 15;
        this.power = 10;
    }
    else if(exp==40){/*boss*/
        this.isBoss = true;
        this.enemyH =163;
        this.enemyW = 183;
        this.gold = 30;
        this.power = 15;
    }
    main.appendChild(this.enemyNode);/*添加节点到main中*/
    /*移动*/
    this.move = function(){
        var k = Math.random();
        var p = parseInt(Math.random()*15);
        if(p>10)p=p+20;
        if(this.exp==40){/*BOSS*/
            bossEnemy = this.enemyNode;
            bossEnemy.style.zIndex=5;/*BOSS在最上*/
            if(k>=0.5){/*向下移动+*/
                if(parseInt(this.enemyNode.style.top)+p>mainHeight-200)k=0.2;/*如果大于下边距 执行向上移动*/
                else this.enemyNode.style.top=parseInt(this.enemyNode.style.top)+p+"px";
            }
            if(k<0.5){/*向上移动-*/
                if(parseInt(this.enemyNode.style.top)-p<90){/*如果小于上边距 执行向上移动*/
                    this.enemyNode.style.top=parseInt(this.enemyNode.style.top)+p+"px";
                }
                this.enemyNode.style.top=parseInt(this.enemyNode.style.top)-p+"px";
            }
            if(parseInt(this.enemyNode.style.right)<40)/*如果还没有完全显示出来就移动，显示出后停止x移动*/
                this.enemyNode.style.right=parseInt(this.enemyNode.style.right)+speedX+"px";
        }/*boss*/
        else if(this.exp>=20){/*ghost*/
            if(k>=0.5){/*向下移动+*/
                if(parseInt(this.enemyNode.style.top)+p>mainHeight-110)k=0.2;/*如果大于下边距 执行向上移动*/
                else this.enemyNode.style.top=parseInt(this.enemyNode.style.top)+p+"px";
            }
            if(k<0.5){/*向上移动-*/
                if(parseInt(this.enemyNode.style.top)-p<80){/*如果小于上边距 执行向上移动*/
                    this.enemyNode.style.top=parseInt(this.enemyNode.style.top)+p+"px";
                }
                else this.enemyNode.style.top=parseInt(this.enemyNode.style.top)-p+"px";
            }
            this.enemyNode.style.right=parseInt(this.enemyNode.style.right)+speedX+"px";
        }/*ghost*/
        else{/*其他只移动x*/
            this.enemyNode.style.right=parseInt(this.enemyNode.style.right)+speedX+"px";
        }
    }/*移动*/
    /*BOSS攻击*/
    this.attack = function(){
        var randomAttack = Math.random();/*概率攻击 0-0.99*/
        if(randomAttack<0.7&&issetBOSS==1&&isStart==1){/*小于0.7攻击，变成攻击状态*/
            bossEnemy.src=imgSrc+"attack.gif";
            setTimeout(attackEnd,1200);
            bossShoot.play();
            console.log(isStart);
        }
    };
    function attackEnd(){/*攻击结束，变回移动状态*/
        if(issetBOSS){
            var bossAttackBall = new attBallBoss("images/enemy/boss/attackBall.gif",parseInt(bossEnemy.style.right)+250,parseInt(bossEnemy.style.top)+50,10,7);
            //alert(bossEnemy.style.right);
            bossList.push(bossAttackBall);
            bossEnemy.src =imgSrc+"move.gif";
        }
    }
}/*enemy 敌人*/

function createEnemy(){/*创建敌人*/
    var random = parseInt(Math.random()*100);/*0-99的随机数*/
    if(random>90&&issetBOSS==0){/*随机产生BOSS，并且BOSS一次只出现一个*/
        if(limitBoss==0&&issetBOSS==0){
            issetBOSS=1;/*记录BOSS*/
            var enemy = new enemyBird("images/enemy/boss/",-200,parseInt(Math.random()*(mainHeight-290)+90),parseInt(Math.random()*4+1),10,50,40);
            intBossBall = setInterval(enemy.attack,3000);
        }
        else if(issetBOSS==0) {
            limitBoss--;
            var enemy = new enemyBird("images/enemy/bird/",-200,parseInt(Math.random()*(mainHeight-110)+50),parseInt(Math.random()*4+1),0,1,1);
        }
        else var enemy = new enemyBird("images/enemy/bird/",-200,parseInt(Math.random()*(mainHeight-110)+50),parseInt(Math.random()*4+1),0,1,1);
    }
    else if(random>70){
        var enemy = new enemyBird("images/enemy/ghost/",-200,parseInt(Math.random()*(mainHeight-190)+80),parseInt(Math.random()*10+1),10,25,23);
    }
    else if(random>40){
        var enemy = new enemyBird("images/enemy/plane/",-200,parseInt(Math.random()*(mainHeight-150)+50),parseInt(Math.random()*7+1),0,5,7);
    }
    else var enemy = new enemyBird("images/enemy/bird/",-200,parseInt(Math.random()*(mainHeight-110)+50),parseInt(Math.random()*4+1),0,1,1);
    enemyList.push(enemy);
    //console.log(enemy.enemyH);
}
/*龙的死亡判断*/
function dragonisDead(){
    if(!dragonSmall.isDead){
        if(dragonSmall.hp<=0){/*龙死亡*/
            gameOver();
            dragondie.play();
            hpBox.style.display="none";
            dragonSmall.isDead=true;
            dragonDie();
            gameover.play();
        }
        else{
            howHp.style.width=parseInt(dragonSmall.hp/dragonSmall.maxHp*100)+"%";/*百分比显示血量*/
        }
    }
}
/*龙死亡动作*/
function dragonDie(){/*死亡后什么都不能干*/
    dragonSmall.enemyNode.src = "images/dragon/dead/die.gif";
    dragonSmall.enemyNode.style.top=parseInt(dragonSmall.enemyNode.style.top)-200+"px";
    dragonSmall.enemyNode.style.left=parseInt(dragonSmall.enemyNode.style.left)-parseInt(imgWidth/4)+"px";
    setTimeout(dieing,10);
}

function dieing(){
    dragonSmall.enemyNode.style.top=parseInt(dragonSmall.enemyNode.style.top)+200+"px";
    dragonSmall.enemyNode.style.webkitTransition="top 1s linear";
}
/*龙被hit 闪烁 无敌*/
function flashing(){
    if(dragonSmall.enemyNode.className == "style")
        dragonSmall.enemyNode.className = "hit";
    else
        dragonSmall.enemyNode.className = "style";
    dragonSmall.status++;
    if(dragonSmall.status>=6) {
        clearTimeout(intFlicker);
        dragonSmall.isInvincible=false;/*闪烁完成 无敌取消*/
    }
    else {
        dragonSmall.isInvincible=true;/*闪烁的时候无敌*/
        intFlicker = setTimeout('flashing()',200);
    }
}
/*敌人移动 和 死亡判定*/
function enemyMove(){
    for(var i in enemyList){
        if(!enemyList[i].isDead){
            if(enemyList[i].status==0){
                enemyList[i].move();
                if(parseInt(enemyList[i].enemyNode.style.right)>1366){/*消失*/
                    main.removeChild(enemyList[i].enemyNode);
                    enemyList.splice(i,1);
                }
            }
            else if(enemyList[i].status==1&&enemyList[i].hp>0){/*hit效果结束 未死亡王*/
                enemyList[i].enemyNode.src = enemyList[i].imgSrc;
                enemyList[i].status--;
                //enemyList[i].isDead=true;
                //main.removeChild(enemyList[i].ballNode);
                //enemyList.splice(i,1);
            }
            else if(enemyList[i].status==1&&enemyList[i].hp<=0){/*击中效果结束，且死亡*/
                enemyList[i].enemyNode.src = enemyList[i].dieSrc;
                if(enemyList[i].exp==1){/*7 23 40*/
                    birdDie.play();
                }
                else if(enemyList[i].exp==7){/*7 23 40*/
                    planeDie.play();
                }
                else if(enemyList[i].exp==23){/*7 23 40*/
                    ghostDie.play();
                }
                else if(enemyList[i].exp==40){/*7 23 40*/
                    bossDie.play();
                }
                setTimeout(newThing(parseInt(enemyList[i].enemyNode.style.right),parseInt(enemyList[i].enemyNode.style.top)),500);
                enemyList[i].isDead=true;
                gold+=enemyList[i].gold;
                scoreDiv.innerHTML=gold+" 分";
                dragonSmall.exp+=enemyList[i].exp;/*经验增加！！！*/
                howExp.style.height = parseInt(dragonSmall.exp/expList[dragonSmall.who]*0.6*100)+40+"%";
                //console.log(howExp.style.height);
                if(dragonSmall.exp>=expList[dragonSmall.who]&&changing==0){
                    howExp.style.backgroundImage ="url('images/ui/expFull.gif')";
                    changing=1;/*表示正在进化*/
                    dragonSmall.who++;/*升级*/
                    //console.log(changing);
                    fl();/*进化时，会闪烁*/
                }
                //console.log(dragonExp);
                //console.log(gold);
                if(enemyList[i].isBoss){
                    enemyList[i].status=50;
                    issetBOSS=0;/*BOSS初始化*/
                    limitBoss = 1;/*BOSS出现的频率*/
                    clearInterval(intBossBall);/*清除攻击*/
                }
                else  enemyList[i].status=17;
            }
            else enemyList[i].status--;
        }
        else{
            if(enemyList[i].status==1){
                main.removeChild(enemyList[i].enemyNode);
                enemyList.splice(i,1);
            }
            else enemyList[i].status--;
        }

    }
}
var ii = 0;
var intF;
function fl(){/*闪烁*/
    if(dragonSmall.enemyNode.style.visibility == "visible")
        dragonSmall.enemyNode.style.visibility = "hidden";
    else
        dragonSmall.enemyNode.style.visibility = "visible";
    ii++;
   if(ii>=10) {
        LevelUp.play();
        howExp.style.backgroundImage ="url('images/ui/expMax.gif')";
        howExp.style.height="40%";
        clearTimeout(intF);
        ii=0;
        dragonChange();
    }
    else intF = setTimeout('fl()',200);
}
function dragonChange(){/*龙进化*/
    main.removeChild(dragonSmall.enemyNode);/*去除以前的龙*/
    dragonSmall.isDead=true;
    clearInterval(intAttackDragonBall);
    /*新的龙*/
    dragonSmall = new dragon("images/dragon/",parseInt(dragonSmall.enemyNode.style.left),parseInt(dragonSmall.enemyNode.style.top),2,parseInt(dragonSmall.who*10),0,dragonSmall.who);/*创建进化龙，small小龙，最后三个：HP为10，经验为0，龙的等级*/
    /*进化完全*/
    changing=0;
}
/*龙魔法弹移动*/
function ballMove(){
    for(var i in ballList){
        if(!ballList[i].isDead){
            if(ballList[i].status==0){
                ballList[i].move();
                if(parseInt(ballList[i].ballNode.style.left)>1366){/*离开视野后 魔法弹消失*/
                    main.removeChild(ballList[i].ballNode);
                    ballList.splice(i,1);
                }
            }
            else if(ballList[i].status==1){
                ballList[i].isDead=true;
                main.removeChild(ballList[i].ballNode);
                ballList.splice(i,1);
            }
            else ballList[i].status--;
        }
    }
}
/*BOSS魔法弹移动*/
function ballMoveBoss(){
    for(var i in bossList){
        if(!bossList[i].isDead){
            if(bossList[i].status==0){
                bossList[i].move();
                if(parseInt(bossList[i].ballBossNode.style.right)>1366){/*BOSS魔法弹消失*/
                    main.removeChild(bossList[i].ballBossNode);
                    bossList.splice(i,1);
                }
            }
            else if(bossList[i].status==1){
                bossList[i].isDead=true;
                main.removeChild(bossList[i].ballBossNode);
                bossList.splice(i,1);
            }
            else bossList[i].status--;
        }
    }
}
/*龙的魔法弹碰撞敌人检测*/
function hitCheck(){
    for(var i in ballList){/*龙魔法弹*/
        var bH = ballList[i].ballH;/*魔法弹高*/
        var bW = ballList[i].ballW;/*魔法弹宽*/
        var bL = parseInt(ballList[i].ballNode.style.left);/*魔法弹左边距*/
        var bT = parseInt(ballList[i].ballNode.style.top);/*魔法弹上边距*/
        for(var j in enemyList){/*敌人*/
            var eH = enemyList[j].enemyH;/*敌人高*/
            var eW = enemyList[j].enemyW;/*敌人宽*/
            var eR = parseInt(enemyList[j].enemyNode.style.right);/*敌人右边距*/
            var eT = parseInt(enemyList[j].enemyNode.style.top);/*敌人上边距*/
            if(bL+eR>=mainWidth-bW-eW&&bL+eR<mainWidth&&bT+bH>eT&&bT<eH+eT&&enemyList[j].status==0&&ballList[i].status==0){/*碰撞*/
                /*魔法弹的变化*/
                ballList[i].status=8;
                ballList[i].ballNode.src=ballList[i].hitSrc;/*更换魔法弹为hit效果*/
                /*hit效果要分类*/
                if(ballList[i].power==15){
                    dragon5.play();
                    ballList[i].ballNode.style.top=parseInt(enemyList[j].enemyNode.style.top)-50+'px';
                    ballList[i].ballNode.style.left=mainWidth-parseInt(enemyList[j].enemyNode.style.right)-eW-50+'px';
                }
                else if(ballList[i].power==10){
                    dragon4.play();
                    ballList[i].ballNode.style.top=parseInt(ballList[i].ballNode.style.top)-80+'px';
                    ballList[i].ballNode.style.left=mainWidth-parseInt(enemyList[j].enemyNode.style.right)-eW-50+'px';
                }
                else if(ballList[i].power==5){
                    dragon3.play();
                    ballList[i].ballNode.style.top=parseInt(ballList[i].ballNode.style.top)-20+'px';
                    ballList[i].ballNode.style.left=mainWidth-parseInt(enemyList[j].enemyNode.style.right)-eW+'px';
                }
                else if(ballList[i].power==2){
                    dragon2.play();
                    ballList[i].ballNode.style.top=parseInt(enemyList[j].enemyNode.style.top)-10+'px';
                    ballList[i].ballNode.style.left=mainWidth-parseInt(enemyList[j].enemyNode.style.right)-eW-10+'px';
                }
                else if(ballList[i].power==1){
                    dragon1.play();
                    //ballList[i].ballNode.style.top=parseInt(enemyList[j].enemyNode.style.top)+'px';
                    ballList[i].ballNode.style.left=mainWidth-parseInt(enemyList[j].enemyNode.style.right)-eW+'px';
                }

                /*敌人的变化*/
                //main.removeChild(ballList[i].ballNode);/*删除魔法弹*/
                //ballList.splice(i,1);/*删除魔法弹*/
                enemyList[j].status=8;
                enemyList[j].hp=enemyList[j].hp-ballList[i].power;/*减hp*/
                //console.log(enemyList[j].hp);
                enemyList[j].enemyNode.src=enemyList[j].hitSrc;/*更换敌人为hit效果*/
                //console.log("HIT!");
                if(ballList.length==0)break;/*如果没有魔法弹 跳出循坏*/
            }
        }
    }
}
/*BOSS的魔法弹碰撞检测*/
function hitCheckBoss(){
    var eH = imgHeight;/*龙高*/
    var eW = imgWidth;/*龙宽*/
    var eR = parseInt(dragonSmall.enemyNode.style.left);/*龙左边距*/
    var eT = parseInt(dragonSmall.enemyNode.style.top);/*龙上边距*/
    for(var i in bossList){/*BOSS魔法弹*/
        var bH = bossList[i].ballH;/*魔法弹高*/
        var bW = bossList[i].ballW;/*魔法弹宽*/
        var bL = parseInt(bossList[i].ballBossNode.style.right);/*魔法弹右边距*/
        var bT = parseInt(bossList[i].ballBossNode.style.top);/*魔法弹上边距*/
        if(bL+eR>=mainWidth-bW-eW&&bL+eR<mainWidth&&bT+bH>eT&&bT<eH+eT&&dragonSmall.isDead==false&&bossList[i].status==0){/*碰撞*/
            /*魔法弹的变化*/
            bossList[i].status=8;
            bossList[i].ballBossNode.style.right=parseInt(bossList[i].ballBossNode.style.right)+eW+"px";
            bossList[i].ballBossNode.src=bossList[i].hitSrc;/*更换魔法弹为hit效果*/
            /*敌人的变化*/
            //main.removeChild(ballList[i].ballNode);/*删除魔法弹*/
            //ballList.splice(i,1);/*删除魔法弹*/

            if(!dragonSmall.isInvincible) { /*如果不无敌*/
                dragonSmall.status=0;
                dragonSmall.hp=dragonSmall.hp-bossList[i].power;/*减hp*/
                dragonHit.play();
                flashing();
            }
            //console.log(enemyList[j].hp);
            //enemyList[j].enemyNode.src=enemyList[j].hitSrc;/*更换龙为hit效果*/
            //console.log("HIT!");
            if(bossList.length==0)break;/*如果没有魔法弹 跳出循坏*/
        }

    }
}
/*龙与敌人 和 龙与物品 的碰撞*/
function dragonEnemy(){
    var bH = imgHeight;/*龙高*/
    var bW = imgWidth;/*龙宽*/
    var bL = parseInt(dragonSmall.enemyNode.style.left);/*龙左边距*/
    var bT = parseInt(dragonSmall.enemyNode.style.top);/*龙上边距*/
    for(var j in enemyList){/*敌人*/
        var eH = enemyList[j].enemyH;/*敌人高*/
        var eW = enemyList[j].enemyW;/*敌人宽*/
        var eR = parseInt(enemyList[j].enemyNode.style.right);/*敌人右边距*/
        var eT = parseInt(enemyList[j].enemyNode.style.top);/*敌人上边距*/
        if(bL+eR>=mainWidth-bW-eW&&bL+eR<mainWidth&&bT+bH>eT&&bT<eH+eT&&dragonSmall.isDead==false&&enemyList[j].isDead==false){/*碰撞*/
            if(!dragonSmall.isInvincible) { /*如果不无敌*/
                dragonSmall.status=0;
                dragonSmall.hp=dragonSmall.hp-enemyList[j].power;/*减hp*/
                dragonHit.play();
                //console.log(dragonSmall.hp);
                flashing();
            }
        }
    }
    for(var j in thingList){/*物品*/
        var eH = thingList[j].thingH;/*敌人高*/
        var eW = thingList[j].thingW;/*敌人宽*/
        var eR = parseInt(thingList[j].thingNode.style.right);/*敌人右边距*/
        var eT = parseInt(thingList[j].thingNode.style.top);/*敌人上边距*/
        if(bL+eR>=mainWidth-bW-eW&&bL+eR<mainWidth&&bT+bH>eT&&bT<eH+eT&&dragonSmall.isDead==false){/*碰撞*/
            if(thingList[j].what==0&&dragonStrokes<7){
                dragonStrokes++;
                boom.style.background="url(images/ui/boom/boom"+dragonStrokes+".png)";
                thingboom.play();
            }
            else if(thingList[j].what==1){
                countdown+=5;
                thingtime.play();
            }
           else if(thingList[j].what==2){
                gold+=10;
                scoreDiv.innerHTML=gold+" 分";
                thinggold.play();
            }
            main.removeChild(thingList[j].thingNode);/*删除物品*/
            thingList.splice(j,1)

        }
    }
}
/*爆的东西*/
function things(x,y){
    this.thingNode = document.createElement("img");
    this.thingNode.style.position="absolute";
    this.thingNode.style.zIndex=99;
    this.thingNode.src = "images/enemy/thing.gif";
    this.thingNode.style.right=x+"px";
    this.thingNode.style.top=y+"px";
    this.thingH = 67;
    this.thingW = 64;
    this.timeE = 1000;/*消失的时间*/
    this.what=parseInt(Math.random()*3);/*0炸弹 1时间 2分数*/
    main.appendChild(this.thingNode);/*将物品添加到main中*/
}
function newThing(x,y){
    if(Math.random()<0.5){/*50概率爆东西*/
        var newThing = new things(x,y);
        thingList.push(newThing);
    }
}
function thingsL(){/*物品消失*/
    for(var i in thingList){
        if(thingList[i].timeE==0){
            main.removeChild(thingList[i].thingNode);
            thingList.splice(i,1);
        }
        else thingList[i].timeE--;
    }
}