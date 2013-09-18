
var Tween = require('./tween')

module.exports = NumberTween

function NumberTween(from, to){
	this._diff = to - from
	this._from = from
	this._to = to
}

Tween.extend(NumberTween)

NumberTween.prototype.frame = function(p){
	return this._from + (this._diff * p)
}

NumberTween.prototype.reset = function(){
	Tween.prototype.reset.call(this)
	this._diff = this._to - this._from
	return this
}