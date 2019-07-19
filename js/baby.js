var babyTail = [];
for(var i=0;i<8;i++){

	babyTail[i] = new Image();
	babyTail[i].src = "./src/babyTail" + i + ".png";
}

var babyEye = [];
for(var i=0;i<2;i++){
	babyEye[i] = new Image();
	babyEye[i].src = "./src/babyEye" + i + ".png";
}

var babyBody = [];
for(var i=0;i<20;i++){
	babyBody[i] = new Image();
	babyBody[i].src = "./src/babyFade" + i + ".png";
}



var baby = {
	x : w*0.4,
	y : h*0.6,
	angle : 0,

	body : babyBody[0],
	bodyTimer : 0,
	bodyCount : 0,

	tail : babyTail[0],
	tailTimer : 0,
	tailCount : 0,

	eye : babyEye[0],
	eyeTimer :0,
}



function drawBaby() {

	baby.tailTimer += deltaTime;
	if( baby.tailTimer >= 50 ){
		baby.tailCount = (baby.tailCount + 1) % 8;
		baby.tail = babyTail[baby.tailCount];
		baby.tailTimer = 0;
	}

	baby.eyeTimer += deltaTime;
	var blinkTime = 1500 + Math.random()*1500;
	if( baby.eyeTimer >= blinkTime ){
		baby.eye = babyEye[1];
	}
	if( baby.eyeTimer >= blinkTime +200){
		baby.eyeTimer = 0;
		baby.eye = babyEye[0];
	}

	if( data.play ){
		baby.bodyTimer += deltaTime;
		if( baby.bodyCount ==19){
			baby.body = babyBody[19];
			baby.bodyTimer = 0; 
			// game over
		}
		
		if( baby.bodyTimer >= 300 ){
			baby.bodyCount = (baby.bodyCount + 1) % 20;
			baby.body = babyBody[baby.bodyCount];
			baby.bodyTimer = 0; 
		}
	}
	


	cxt1.save();
	// cxt1.clearRect(0,0,w,h);
	cxt1.translate(baby.x , baby.y);
	cxt1.rotate(baby.angle-Math.PI);
	cxt1.drawImage( baby.body , - baby.body.width*0.5 , - baby.body.height*0.5);
	cxt1.drawImage( baby.tail , - baby.tail.width*0.5+25 , - baby.tail.height*0.5 );
	cxt1.drawImage( baby.eye , - baby.eye.width*0.5 , - baby.eye.height*0.5 );
	cxt1.restore();
}

// can1.addEventListener('mousemove' , babyFollow);

function babyFollow(event){
	
	baby.x = (baby.x - mom.x)*0.99+mom.x;
	baby.y = (baby.y - mom.y)*0.99+mom.y;

	var difX = mom.x - baby.x;
	var difY = mom.y - baby.y;
	var difAngle = Math.atan2(difY,difX);

	baby.angle = lerpAngle(difAngle,baby.angle,0.6)
}