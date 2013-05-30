
var Tween = require('../array')

var total = 100
var frames = 0
var i = 0
var duration = 50

var from = new Array(20).join(1).split('').map(Number)
var to = new Array(20).join(100 + ',').split(',').map(Number)

console.log('Duration per tween: %dms', duration)
console.log('Total tweens: %d', total)

while (i++ < total) {
	var tween = new Tween(from)
		.to(to)
		.duration(duration)

	while (!tween.done) {
		tween.next()
		frames++
	}
}

console.log('Average number of frames per tween: %d', frames / total)