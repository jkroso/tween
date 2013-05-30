
var inherit = require('inherit')
  , Tween = require('./tween')
  , now = require('now')

module.exports = ArrayTween

function ArrayTween(array){
	this._from = array
}

inherit(ArrayTween, Tween)

ArrayTween.prototype.frame = function(p){
  var from = this._from
  var to = this._to
  var curr = this._curr
  var k = to.length
  while (k--) {
    curr[k] = from[k] + (to[k] - from[k]) * p
  }
  return curr
}

ArrayTween.prototype.reset = function(){
  this._curr = this._from.slice()
  this._start = now()
  this.done = false
  return this
}
