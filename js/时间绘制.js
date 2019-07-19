var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var R = 8;
// const endTime = new Date(2018,3,28,18,35,50);
var startTime = new Date();
var curShowTimeSeconds =0;
var balls = [] ;
 const colorss = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	curShowTimeSeconds = getCurShowTimeSeconds();
	
	data.timer = setInterval( startTimer ,50);
	function startTimer(){
		if(!data.play) {
			render(context);
			return false;
		}else{
			render(context);
			update();
		}	
	}
	
	


function update(){
	var nextTime = getCurShowTimeSeconds();
	var nextHours = parseInt(nextTime/3600); 
	var nextMinutes =parseInt((nextTime-nextHours*3600)/60);
	var nextSeconds = parseInt(nextTime%60);

	var hours = parseInt(curShowTimeSeconds/3600); 
	var minutes =parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = parseInt(curShowTimeSeconds%60);

	if(nextSeconds!=seconds){

		if( parseInt(nextHours/10) != parseInt(hours/10) ){
			addBalls( 0 , 0 , parseInt( hours/10 ) );
		}
		if( nextHours%10 != hours%10 ){
			addBalls( 16*(R+1) , 0 , hours%10 );
		}


		if( parseInt(nextMinutes/10) != parseInt(minutes/10) ){
			addBalls( 42*(R+1) , 0 , parseInt( minutes/10 ) );
		}
		if( nextMinutes%10 != minutes%10 ){
			addBalls( 58*(R+1) , 0 , minutes%10 );
		}


		if( parseInt(nextSeconds/10) != parseInt(seconds/10) ){
			addBalls( 84*(R+1) , 0 , parseInt( seconds/10 ) );
		}
		if( nextSeconds%10 != seconds%10 ){
			addBalls( 100*(R+1) , 0 , seconds%10 );
		}

		curShowTimeSeconds = nextTime;
	}

	updateBalls();

}

function getCurShowTimeSeconds(){
	var curTime = new Date();
	// var ret = endTime.getTime() - curTime.getTime();
	var ret = curTime.getTime() - startTime.getTime();
	ret = Math.round(ret/1000);
	return ret >= 0 ? ret : 0;
}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours = parseInt(curShowTimeSeconds/3600); 

	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);

	var seconds = parseInt(curShowTimeSeconds%60);

	renderDigit( 0 , 0 , parseInt(hours/10) , cxt );
	renderDigit( 16*(R+1) , 0 , parseInt(hours%10) , cxt );
	renderDigit( 32*(R+1) , 0 , 10 , cxt );

	renderDigit( 42*(R+1) , 0 , parseInt(minutes/10) , cxt );
	renderDigit( 58*(R+1) , 0 , parseInt(minutes%10) , cxt );
	renderDigit( 74*(R+1) , 0 , 10 , cxt );

	renderDigit( 84*(R+1) , 0 , parseInt(seconds/10) , cxt );
	renderDigit( 100*(R+1) , 0 , parseInt(seconds%10) , cxt );
}

function renderDigit ( x , y , num , cxt ) {

	cxt.fillStyle = 'rgb(0,102,153)';

	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc( x+j*2*(R+1)+(R+1), y+i*2*(R+1)+(R+1) , R , 0 , 2*Math.PI);

				cxt.closePath();
				cxt.fill();
			}
	
	for(var i=0;i<balls.length;i++){
		cxt.beginPath();
		cxt.arc( balls[i].x , balls[i].y , R , 0 , 2*Math.PI);
		cxt.closePath();
		cxt.fillStyle=balls[i].color;
		cxt.fill();
	}
	
}

function addBalls( x , y , num ){
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+j*2*(R+1)+(R+1),
					y:y+i*2*(R+1)+(R+1),
					vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
					vy:-5,
					g:1.5+Math.random(),
					color:colorss[ Math.ceil( Math.random()*9 ) ]
				}

				balls.push(aBall);
			}
		
	
}

function updateBalls (){
	for(var i=0;i<balls.length;i++){

		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>=WINDOW_HEIGHT-R){
			balls[i].y = WINDOW_HEIGHT-R;
			balls[i].vy= -0.8*balls[i].vy;
		}

	}
	var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + R > 0 && balls[i].x -R < WINDOW_WIDTH )
            balls[cnt++] = balls[i]
        while( balls.length > cnt ){
        balls.pop();
    }
}