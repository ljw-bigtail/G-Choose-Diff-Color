/*-----------------------封装的函数------------------------*/
var scoreName = function() {
	if (0 < score && score <= 14) {
		return 1;
	} else if (14 < score && score <= 24) {
		return 2;
	} else if (24 < score && score <= 32) {
		return 3;
	} else if (32 < score && score <= 44) {
		return 4;
	} else if (44 < score && score <= 56) {
		return 5;
	} else if (56 < score && score <= 70) {
		return 6;
	} else if (70 < score && score <= 86) {
		return 7;
	} else if (86 < score && score <= 100) {
		return 8;
	} else if (100 < score && score <= 120) {
		return 9;
	} else {
		return 10;
	}
}
/*
	倒计时
*/
var timer = function(){
	var timerObj = document.getElementById("timer");
	var n = 45;
	drawGame(levelNum);
	setInterval(function(){
		if(n>0){
			n--;
			timerObj.innerHTML = n;
			drawGame(levelNum);
		}else{
			/*关闭游戏界面*/
			document.getElementById("gameOn").style.display = "none";
			/*打开结束页面*/
			document.getElementById("gameOver").style.display="block";
			/*打印等级称号*/
			document.getElementById("heavy").innerHTML = "\"" + LevelValue[scoreName()] + "\"";
		}
	},1000);
}
/*-----------------------封装的函数------------------------*/
/*
	改变分值
*/
var scoreNum = function(){
	var scoreObj = document.getElementById("score");
	score++;
	scoreObj.innerHTML = "Score:"+score;
}
/*-----------------------封装的函数------------------------*/
/*
	初始化函数
*/
var init = function(){
	/*MaxLevel : 136*/
	level = [
		2,2,
		3,3,3,
		4,4,4,4,
		5,5,5,5,5,5,5,5,5,5,
		6,6,6,6,6,6,6,6,6,6,6,6,
		7,7,7,7,7,7,7,7,7,7,7,7,7,7,
		8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
		9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,
		10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
		10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
	for (var i = 0; i < level.length; i++) {
		spacing[i] = level[i]*(-2)+24;
	}
	for (var i = 0; i < level.length; i++) {
		squareW[i] = Math.floor((w-(level[i]+1)*(level[i]*(-2)+24))/level[i]);
	}	
	badNum = [38,28,18,12,10,8,6,4,3,2];/*色差*/
	LevelValue = ["瞎子","色盲","色狼","色鬼","色魔","超级色魔","色即是空","空即是色","孤独求色","氪金狗眼"];/*等级名称*/
}
/*-----------------------封装的函数------------------------*/
/*
	方块坐标
*/
var rectXY = function(a){
	return (a+1)*spacing[levelNum]+a*squareW[levelNum];
}
/*-----------------------封装的函数------------------------*/
/*
	绘制圆角矩形
	画布、x\y轴坐标、正方形边长、填充色
*/
var drawRoundRect = function(cxt,x,y,r,radius,fillColor){
	cxt.save();
	cxt.translate(x,y);
	
	cxt.beginPath();
	cxt.arc(r-radius,r-radius,radius,0,Math.PI/2);
	cxt.lineTo(radius,r);
	cxt.arc(radius,r-radius,radius,Math.PI/2,Math.PI);
	cxt.lineTo(0,radius);
	cxt.arc(radius,radius,radius,Math.PI,Math.PI*3/2);
	cxt.lineTo(r-radius,0);
	cxt.arc(r-radius,radius,radius,Math.PI*3/2,Math.PI*2);
	cxt.lineTo(r,r-radius);
	cxt.closePath();
	
	cxt.fillStyle = fillColor?fillColor:"black";
	cxt.fill();
	cxt.restore();
}
/*-----------------------封装的函数------------------------*/
/*
	监听鼠标坐标是否点击差异色块
	确认点击后开始下一关
*/
var detect = function(event){
	var x = event.clientX - canvas.getBoundingClientRect().left;
	var y = event.clientY - canvas.getBoundingClientRect().top;

	drawRoundRect(context,rectXY(differentX),rectXY(differentY),squareW[levelNum],6,differentColor);

	if(context.isPointInPath(x,y)){
		levelNum++;
		differentX = Math.floor(Math.random()*level[levelNum]);
		differentY = Math.floor(Math.random()*level[levelNum]);
		R = Math.floor(Math.random()*255);
		G = Math.floor(Math.random()*255);
		B = Math.floor(Math.random()*255);
		formerColor = "rgb("+R+","+G+","+B+")";
		nR = R+badNum[0];
		nG = G+badNum[0];
		nB = B+badNum[0];
		differentColor = "rgb("+nR+","+nG+","+nB+")";
		context.clearRect(0,0,500,500);
		drawGame(levelNum);
		scoreNum();
	}
}
/*-----------------------封装的函数------------------------*/
/*
	绘制游戏主界面
*/
var drawGame = function(levelNum){
	//画背景
	/*drawRoundRect(context,0,0,500,8,"#283739");*/
	//画方块
	for (var i = 0; i < level[levelNum]; i++){
		for (var j = 0; j < level[levelNum]; j++){
			drawRoundRect(context,rectXY(i),rectXY(j),squareW[levelNum],6,formerColor);
		}
	}
	drawRoundRect(context,rectXY(differentX),rectXY(differentY),squareW[levelNum],6,differentColor);
	canvas.addEventListener('click',detect);
}