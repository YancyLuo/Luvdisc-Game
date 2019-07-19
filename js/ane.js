var anes = [];

function createAne() {

	for(var i=0;i<50;i++){
		var setx = i*16 + Math.random()*5;
		var sety = h - 200 - 50*Math.random();

		var aAne = {
			x : setx,
			headx : setx,
			heady : sety,
			color : colors[ Math.floor(Math.random()*10) ],
			amp : 20 + 40*Math.random(),
			angle : 0,
		}
		anes[i] = aAne;
	}
}

function drawAne(){

	cxt2.save();
	cxt2.globalAlpha = 0.8;
	// cxt2.globalCompositeOperation = 'darker';
	cxt2.lineWidth = 15;
	cxt2.strokeStyle = '#3b154e';
	cxt2.lineCap = 'round';

	for(var i=0;i<anes.length;i++){
	  	anes[i].angle +=0.002*deltaTime;
	  	anes[i].headx = anes[i].x+Math.sin(anes[i].angle)*anes[i].amp;
		cxt2.beginPath();
		
		cxt2.moveTo( anes[i].x , h );
		cxt2.quadraticCurveTo( anes[i].x , anes[i].heady+100,
							   anes[i].headx , anes[i].heady );
		cxt2.stroke();

	}
	cxt2.restore();

}

