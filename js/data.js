var data = {
	fruitnum : 0,
	double : 0,
	score : 0,
	play : false,
	timer : null,
	fruitType : orange,
	score : 0,
	level : 0,
	draw : drawScore,
	gameOver : gameEnd,
	alpha : 0,
	init : gameInit,
}

var play = document.getElementById('play');
var pause = document.getElementById('pause');
var gameButton = document.getElementById('gameButton');
gameButton.onclick = function(){
	if(data.play == false){
		data.play = true;
		data.init();
		baby.body = babyBody[0];
		baby.bodyCount = 0;
		startTime = new Date();
	}
	else{
		baby.body = babyBody[19];
		data.gameOver();
	}
	
}


function drawScore(){
	
	cxt1.beginPath();
	cxt1.textAlign = 'center';
	cxt1.font = ' 30px Verdana';
	cxt1.fillStyle = 'white' ;
	cxt1.fillText("SCORE:" + data.score , w*0.5 , h*0.05);
	cxt1.closePath();
}


function gameEnd(){
	if(baby.body==babyBody[19] ){
		pause.classList.remove('active');
		play.classList.add('active');
		balls = [];
		
		data.alpha += 0.0005*deltaTime;
		data.play = false;
		cxt1.save();
		cxt1.globalAlpha = data.alpha;
		
		var gradient = cxt1.createLinearGradient(w*0.35,h*0.45,w*0.6,h*0.6);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");

		cxt1.beginPath();
		cxt1.shadowBlur=5;
		cxt1.shadowColor ="white";
		cxt1.shadowOffsetX=20;
		cxt1.shadowOffsetY=10;
		cxt1.textAlign = 'center';
		cxt1.font = 'bold 30px Verdana';
		cxt1.fillStyle = gradient;
		cxt1.fillText("GAME OVER", w*0.5 , h*0.45);
		cxt1.fillText("你的得分:"+data.score,w*0.5,h*0.52);
		cxt1.fillText("小鱼存活时间:"+curShowTimeSeconds+"s",w*0.5,h*0.59);
		cxt1.restore();
	}	

}

function gameInit(){
	data.fruitnum = 0;
	data.double = 0;
	data.score = 0;
	data.alpha = 0;
	play.classList.remove('active');
	pause.classList.add('active');
}

