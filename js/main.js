var can1 = document.getElementById('canvas1');
var cxt1 = can1.getContext('2d');

var can2 = document.getElementById('canvas2');
var cxt2 = can2.getContext('2d');

var w = can1.width;
var h = can1.height;

var lastTime;
var deltaTime;

var fruit;

window.onload = game;

function game (){

	init();

	lastTime = Date.now();
	deltaTime = 0;

	gameloop();
}

function init(){

	createAne();
	
	// fruit = new fruitObj();
	// fruit.init();
	createFruit();
	
	// setInterval(function(){console.log(data.fruitnum,data.double,data.fruitType);},1000)
	
}
var dd = 0;
function gameloop(){

	requestAnimFrame(gameloop);
	
	var curTime = Date.now();
	deltaTime = curTime - lastTime;
	lastTime = curTime;
	if(deltaTime>50){
		deltaTime = 50;
	}
	
	
    drawBackground();
    
    drawAne();
    drawFruit();
    drawDust();
   

    can1.addEventListener('mousemove' , momFollow);
    drawMom();
    touchDetection();
    // console.log(detectionData);
    if(detectionData.length>0){
    	for(var i=0;i<detectionData.length;i++){
    		detectionData[i].draw( detectionData , i );
    	}
    }


    drawBaby();
    babyFollow();

    momHugBaby()
    if(MhugB.length>0){
    	for(var i=0;i<MhugB.length;i++){
    		MhugB[i].draw( i );
    	}
    }

    data.draw();
    data.gameOver();
}



	


