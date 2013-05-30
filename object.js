
var inherit = require('inherit')
  , Tween = require('./tween')
  , now = require('now')

module.exports = ObjectTween

function ObjectTween(obj){
  this._from = obj
}

inherit(ObjectTween, Tween)

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
  var from = this._from
  var copy = this._curr = {}
  for (var k in from) copy[k] = from[k]
  this._start = now()
  this.done = false
  return this
}
