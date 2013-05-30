
var Tween = require('../')

function random(n) {
	var arr = [];
	while (n--) arr.push(Math.random() * 100);
	return arr;
}

var from = random(20)

var total = 100
var frames = 0
var i = 0
var duration = 50

function next(){
	if (i++ === total) return log(frames, total)
	var tween = Tween(from)
		.to(random(20))
		.update(function(){
			frames++
			setImmediate(step)
		})
		.duration(duration)
		.on('end', next)

	function step(){
		tween.step()
	}

	step()
}

next()

function log(frames, total){
	console.log('Duration per tween: %dms', duration)
	console.log('Total tweens: %d', total)
	console.log('Average number of frames per tween: %d', frames / total)
}