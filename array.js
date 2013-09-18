
var Tween = require('./tween')

module.exports = ArrayTween

function ArrayTween(from, to){
	this._from = from
	this._curr = from.slice()
	this._to = to
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
	Tween.prototype.reset.call(this)
	this._curr = [] // prevent mutation
	return this
}