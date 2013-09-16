
var Tween = require('./tween')
var reset = Tween.prototype.reset

module.exports = NumberTween

function NumberTween(n){
	this._from = n
}

Tween.extend(NumberTween)

NumberTween.prototype.frame = function(p){
	return this._from + this._diff * p
}

NumberTween.prototype.reset = function(){
	this._diff = (this._to || 0) - this._from
	return reset.call(this)
}