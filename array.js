
var inherit = require('inherit')
var Tween = require('./tween')
var reset = Tween.prototype.reset

module.exports = ArrayTween

function ArrayTween(array){
	this._from = array
}

Tween.extend(ArrayTween)

ArrayTween.prototype.frame = function(p){
	var from = this._from
	var curr = this._curr
	var to = this._to
	var i = to.length
	while (i--) {
		curr[i] = from[i] + (to[i] - from[i]) * p
	}
	return curr
}

ArrayTween.prototype.reset = function(){
	this._curr = this._from.slice()
	return reset.call(this)
}