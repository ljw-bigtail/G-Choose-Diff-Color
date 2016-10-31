var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var w = canvas.width;
var level = [];/*游戏等级*/
var spacing = [];/*不同等级下对应的方块间距*/
var squareW = [];/*不同等级下对应的方块边长*/
var badNum = [];/*颜色差值*/
var score = 0;/*游戏得分*/
var LevelValue = [];
init();/*变量初始化*/

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

/*----------------------游戏开始--------------------------*/
document.getElementById("gameOver").style.display="none";
document.getElementById('start').onclick = function(){
	/*隐藏开始界面*/
	document.getElementById("beginView").style.display = "none";
	/*打开游戏界面*/
	timer();
}
