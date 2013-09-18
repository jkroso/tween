
var Tween = require('./tween')

module.exports = ObjectTween

function ObjectTween(from, to){
	this._from = from
	this._curr = {}
	this._to = to
}

Tween.extend(ObjectTween)

ObjectTween.prototype.frame = function(p){
	var from = this._from
	var curr = this._curr
	var to = this._to
	for (var k in to) {
		curr[k] = from[k] + ((to[k] - from[k]) * p)
	}
	return curr
}

ObjectTween.prototype.reset = function(){
	Tween.prototype.reset.call(this)
	this._curr = {} // prevent mutation
	return this
}