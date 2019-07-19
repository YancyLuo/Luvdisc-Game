// var fruitObj = function (){

// 	this.alive = [];
// 	this.x = [];
// 	this.y = [];
// 	this.orange = new Image();
// 	this.blue = new Image();
// }

// fruitObj.prototype.num = 30;

// fruitObj.prototype.init = function() {

// 	for(var i=0;i<this.num;i++){

// 		this.alive[i] = true;
// 		this.x[i] = 0;
// 		this.x[i] = 0;
// 		this.born(i);
// 	}

// 	this.orange.src = './src/fruit.png';
// 	this.blue.sre = './src/blue.png';
// }

// fruitObj.prototype.draw = function() {

// 	for(var i=0;i<this.num;i++){

// 		cxt2.drawImage( this.orange , this.x[i] - this.orange.width , this.y[i] - this.orange.height )
// 	}
// }

// fruitObj.prototype.born = function(i){

// 	var aneId = Math.floor( Math.random()*anes.length );
// 	this.x[i] = anes[aneId].x;
// 	this.y[i] = h - anes[aneId].len;
// }


var fruits = [];
var detectionData = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

var orange = new Image();
orange.src = './src/fruit.png';
var blue = new Image();
blue.src = './src/blue.png';
var fruitsType = [ orange , orange , blue , orange ];

function createFruit (){

	for(var i=0; i<20;i++){
		var aneId = Math.floor( Math.random()*anes.length );
		var aFruit = {
			x : anes[aneId].x,
			y : anes[aneId].heady,
			aneId : aneId,
			l : 0,
			spd : 0.2+Math.random()*1.5,
			fruitType : orange,
		}
		fruits.push(aFruit);
	}
}

function drawFruit(){

		for(var i=0;i<fruits.length;i++){

			if(fruits[i].l<15){

				fruits[i].x = anes[ fruits[i].aneId ].headx;
				fruits[i].l += 0.007*deltaTime;	

			}else{

				fruits[i].y -= fruits[i].spd;
			}

			cxt2.drawImage( fruits[i].fruitType ,
						 fruits[i].x - fruits[i].l*0.5, 
						 fruits[i].y-fruits[i].l*0.5-fruits[i].spd,
						 fruits[i].l,fruits[i].l,)

			if(fruits[i].y<=0){
				var aneId = Math.floor( Math.random()*anes.length );
				fruits[i].x = anes[ aneId ].headx;
				fruits[i].y = anes[ aneId ].heady;
				fruits[i].aneId = aneId;
				fruits[i].l = 0;
				fruits[i].fruitType = fruitsType[ Math.floor( Math.random()*4 )]
			}
		}
}

function touchDetection (){


	for(var i=0;i<fruits.length;i++){
		var difMF = calLength2(mom.x,mom.y,fruits[i].x,fruits[i].y);
		if(difMF<900 && fruits[i].l>=15 && data.play){

			data.fruitnum++;

			if( data.fruitnum%2==0 ){
				data.level = data.fruitnum/2;
				if( data.level >=7 ) data.level = 7;
			}
			
			if( fruits[i].fruitType==blue ){
				data.fruitType = blue;
				data.double++;
			}
			if( fruits[i].fruitType==orange){
				data.fruitType = orange;
			}

			var circle = {
				x : fruits[i].x,
				y : fruits[i].y,
				r : 0,
				alpha : 1,
				color : colors[ Math.floor(Math.random()*10) ],
				draw : drawCircle1,
			};
			detectionData.push(circle);

			var aneId = Math.floor( Math.random()*anes.length );
			fruits[i].x = anes[ aneId ].headx;
			fruits[i].y = anes[aneId ].heady;
			fruits[i].aneId = aneId;
			fruits[i].l = 0;
			fruits[i].fruitType = fruitsType[ Math.floor( Math.random()*4 )];		
		}
	}
}


function drawCircle1( arry , i ){
	// console.log(detectionData.length);
	arry[i].r += 0.05*deltaTime;
	arry[i].alpha -= 0.0006*deltaTime;
	if( arry[i].r<50 ) {
		cxt1.save();
		cxt1.globalAlpha = arry[i].alpha;
		cxt1.beginPath();
		cxt1.lineWidth = 3;
		cxt1.strokeStyle = arry[i].color;
		cxt1.arc( arry[i].x , arry[i].y , arry[i].r , 0 , 2*Math.PI );
		cxt1.closePath();
		cxt1.stroke();
		cxt1.restore();
		 // console.log( r );
	}else{
		arry.shift();
		return false;

	}	
}





	
	



