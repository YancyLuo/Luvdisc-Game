

var bgpic = new Image();
bgpic.src = './src/background2.jpg';


function drawBackground(){
	
	cxt2.drawImage(bgpic,0,0,w,h);
}

var dustType =[];
for(var i=0 ; i<7 ; i++){
	dustType[i] = new Image();
	dustType[i].src = "./src/dust" + i + ".png";
}



var dusts = [];
for( var i=0 ; i<100 ; i++){
	var dust = {
		x : w*Math.random(), 
		y : h*Math.random(),
		amp : 20 + 10*Math.random(),
		angle : 0,
		type : dustType[ Math.floor(Math.random()*7) ],
	}
	dusts[i] = dust;
}

function drawDust(){

	for(var i=0 ; i<50 ; i++){
		cxt2.save();
		dusts[i].angle += 0.001*deltaTime;
		cxt2.drawImage( dusts[i].type , dusts[i].x + Math.sin(dusts[i].angle) * dusts[i].amp, dusts[i].y);
		cxt2.restore();
	}

	// console.log(dusts[10].type.src);
	
}






