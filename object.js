
var Tween = require('./tween')
var merge = require('merge')
var reset = Tween.prototype.reset

module.exports = ObjectTween

function ObjectTween(obj){
	this._from = obj
}

Tween.extend(ObjectTween)

ObjectTween.prototype.frame = function(p){
	var from = this._from
	var to = this._to
	var curr = this._curr
	for (var k in to) {
		curr[k] = from[k] + (to[k] - from[k]) * p
	}
	return curr
}

ObjectTween.prototype.reset = function(){
	this._curr = merge({}, this._from)
	return reset.call(this)
}