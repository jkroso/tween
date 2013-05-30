
var inherit = require('inherit')
  , Tween = require('./tween')
  , now = require('now')

module.exports = ObjectTween

function ObjectTween(obj){
  this._from = obj
}

inherit(ObjectTween, Tween)

/**
 * generate a tween frame at point `p` between 
 * `this._from` and `this._to`
 * 
 * @param {Number} percentage
 * @return {Array}
 * @api private
 */

ObjectTween.prototype.frame = function(p){
  var from = this._from
  var to = this._to
  var curr = this._curr
  for (var k in to) {
    curr[k] = from[k] + (to[k] - from[k]) * p
  }
  return curr
}

/**
 * Reset the tween.
 *
 * @api public
 */

ObjectTween.prototype.reset = function(){
  var from = this._from
  var copy = this._curr = {}
  for (var k in from) copy[k] = from[k]
  this._start = now()
  this.next = Tween.prototype.next
  return this
}