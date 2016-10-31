var n = 60;/*游戏倒计时*/
init();/*变量初始化*/

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var w = canvas.width;
var level = [];/*游戏等级*/
var spacing = [];/*不同等级下对应的方块间距*/
var squareW = [];/*不同等级下对应的方块边长*/
var badNum = [];/*颜色差值*/
var score = 0;/*游戏得分*/
var LevelValue = [];

var levelNum = 0;
/*本色与差异色*/
var R = Math.floor(Math.random()*255),
	G = Math.floor(Math.random()*255),
	B = Math.floor(Math.random()*255);
var formerColor = "rgb("+R+","+G+","+B+")";
var nR = R+badNum[0],
	nG = G+badNum[0],
	nB = B+badNum[0];
var differentColor = "rgb("+nR+","+nG+","+nB+")";
/*差异色块*/
var differentX = Math.floor(Math.random()*level[levelNum]),
	differentY = Math.floor(Math.random()*level[levelNum]);
		
/*游戏开始*/
timer();
drawGame(levelNum);

/*
	倒计时
*/
function timer(){
	var timerObj = document.getElementById("timer");
	setInterval(function(){
		if(n>0){
			n--;
			timerObj.innerHTML = "&nbsp;"+n+"&nbsp;";
		}else{
			console.log("GameOver");
		}
	},1000);
}
/*
	改变分值
*/
function scoreNum(){
	var scoreObj = document.getElementById("score");
	score++;
	scoreObj.innerHTML = "Score:"+score;
}
/*
	初始化函数
*/
function init(){
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
	badNum = [38,28,18,12,10,8,6,4,3,2];
	LevelValue = ["瞎子","色盲","色狼","色鬼","色魔","超级色魔","色即是空","空即是色","孤独求色","氪金狗眼"];
}
/*
	绘制圆角矩形
	画布、x\y轴坐标、正方形边长、填充色
*/
function drawRoundRect(cxt,x,y,r,radius,fillColor){
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
/*
	方块坐标
*/
function rectXY(a){
	return (a+1)*spacing[levelNum]+a*squareW[levelNum];
}

/*
	绘制游戏主界面
*/
function drawGame(levelNum){
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
/*
	监听鼠标坐标是否点击差异色块
	确认点击后开始下一关
*/
 function detect(event){
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
