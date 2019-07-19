var momTail = [];
for(var i=0;i<8;i++){

	momTail[i] = new Image();
	momTail[i].src = "./src/bigTail" + i + ".png";
}

var momEye = [];
for(var i=0;i<2;i++){
	momEye[i] = new Image();
	momEye[i].src = "./src/bigEye" + i + ".png";
}

var momBodyO = [];
for(var i=0;i<8;i++){
	momBodyO[i] = new Image();
	momBodyO[i].src = "./src/bigSwim" + i + ".png";
}

var momBodyB = [];
for(var i=0;i<8;i++){
	momBodyB[i] = new Image();
	momBodyB[i].src = "./src/bigSwimBlue" + i + ".png";
}


var mom = {
	x : w*0.5,
	y : h*0.5,
	angle : 0,
	body : momBodyO[0],
	tail : momTail[0],
	tailTimer : 0,
	tailCount : 0,
	eye : momEye[0],
	eyeTimer : 0,
}

var MhugB = [];
var heartpic = new Image();
heartpic.src = './src/heart.png';

function drawMom() {

	mom.tailTimer += deltaTime;
	if( mom.tailTimer >= 50 ){
		mom.tailCount = (mom.tailCount + 1) % 8;
		mom.tail = momTail[mom.tailCount];
		mom.tailTimer = 0;
	}

	mom.eyeTimer += deltaTime;
	var blinkTime = 1500 + Math.random()*1500;
	if( mom.eyeTimer >= blinkTime ){
		mom.eye = momEye[1];
	}
	if( mom.eyeTimer >= blinkTime +200){
		mom.eyeTimer = 0;
		mom.eye = momEye[0];
	}

	if(data.fruitType == orange){
		
			mom.body = momBodyO[ data.level ];
		
	}

		if( data.fruitType == blue ){
			var countB = data.double;
			if( countB >=7 ) countB = 7;
				mom.body = momBodyB[ countB ];
		}
	

	cxt1.save();
	cxt1.clearRect(0,0,w,h);
	cxt1.translate(mom.x , mom.y);
	cxt1.rotate(mom.angle-Math.PI);
	cxt1.drawImage( mom.body , - mom.body.width*0.5 , - mom.body.height*0.5);


	cxt1.drawImage( mom.tail , - mom.tail.width*0.5+30 , - mom.tail.height*0.5 );
	
	

	cxt1.drawImage( mom.eye , - mom.eye.width*0.5 , - mom.eye.height*0.5 );
	cxt1.restore();
}

// can1.addEventListener('mousemove' , momFollow);
can1.addEventListener('touchmove',momFollow);

function momFollow(event){
	if(data.play){
		var mx = event.clientX - can1.getBoundingClientRect().left;
		var my = event.clientY - can1.getBoundingClientRect().top;
		console.log("X:"+mx , "Y:"+my);
		mom.x = (mom.x - mx)*0.9+mx;
		mom.y = (mom.y - my)*0.9+my;

		var difX = mx - mom.x;
		var difY = my - mom.y;
		var difAngle = Math.atan2(difY,difX);

		mom.angle = lerpAngle(difAngle,mom.angle,0.6)	
	}

}

function momHugBaby(){

	var difMB = calLength2( mom.x , mom.y , baby.x , baby.y );
	if( difMB<1600 && data.play ){
		if(data.fruitnum ==0){
			return false;
		}else{

// console.log("double:"+data.double+"num*5:"+data.fruitnum*5+"data.level:"+data.level);
			data.score += data.double * data.fruitnum*2 * data.level;

			data.fruitnum = 0;
			data.double = 0;
			data.level = 0;
			data.fruit = orange;
			baby.bodyCount = 0;

			var heart = {
				x : baby.x,
				y : baby.y,
				hw : 0,
				hh : 0,
				alpha : 1,
				color : 'white',
				draw : drawHeart,
			};
			MhugB.push(heart);
		}
		
	}
}

function drawHeart(i){
	MhugB[i].hw += 0.05*deltaTime;
	MhugB[i].hh += 0.05*deltaTime;
	MhugB[i].alpha -= 0.0004*deltaTime;
	if( MhugB[i].hw<100 ) {
		cxt1.save();
		cxt1.globalAlpha = MhugB[i].alpha;
		cxt1.drawImage( heartpic , MhugB[i].x, MhugB[i].y , MhugB[i].hw , MhugB[i].hh );
		cxt1.restore();
	}else{
		MhugB.shift();
	}
	
}