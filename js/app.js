var $canvas = $('#gameCanvas');
//new Pools require a length, width, a number of fish, a color, and the canvas
//Sawa no Puuru  means "Sawa's Pool" in Japanese
var sawaNoPuuru = new Pool($canvas,700,800,2,'blue');
//New bowls require a canvas, x, y height, width, and a radius (optional)
var sawaNoBouru = new Bowl ($canvas,970,400,800,550,260);

var sawaNoPoi = new Poi($canvas);
$canvas.on('mousemove', function(event){
	sawaNoPoi.update(event);
	if(sawaNoPuuru.fishArray.length > 0) sawaNoPuuru.fishArray.forEach(function(key){
		key.updatePoi(sawaNoPoi.x, sawaNoPoi.y);
	});
	if(sawaNoPoi.x > sawaNoPuuru.width && sawaNoPoi.isUnderWater) sawaNoPoi.stopTimer();
});

$canvas.on('mousedown', function(){
	//if(sawaNoPoi.x < sawaNoPuuru.width && !sawaNoPoi.isUnderWater) sawaNoPoi.startTimer();
	if(sawaNoPoi.x < sawaNoPuuru.width && !sawaNoPoi.isUnderWater && !sawaNoPoi.isBroken &&sawaNoPoi.fishArray.length < 1)	sawaNoPoi.startTimer();
	if(sawaNoPoi.fishArray.length >=1) $('.timer').text('Place your fish in the bowl!')
});
$canvas.on('mouseup', function(){
	if(sawaNoPoi.x < sawaNoPuuru.width && sawaNoPoi.isUnderWater && !sawaNoPoi.isBroken) sawaNoPoi.takeCloseFish(sawaNoPuuru);
	if(sawaNoPoi.isUnderWater)sawaNoPoi.stopTimer();

});
//$canvas.mousemove(event, sawaNoPoi);
// $canvas.on('mousemove', function(event){});


var timer2Id = window.setInterval(function(){

		try {
			sawaNoPuuru.displayPool();
			sawaNoBouru.display();
			if(sawaNoPuuru.fishArray.length > 0) sawaNoPuuru.fishArray.forEach(function(key){key.display();});
			sawaNoPoi.display();
			if(sawaNoPoi.fishArray.length >0) {
				sawaNoPoi.fishArray.forEach(function(key){
					key.display();
					key.updatePoi(sawaNoPoi.x, sawaNoPoi.y);
				});
			}
		}
		catch(e){
			$('.timer').text(e);
		}

},41);