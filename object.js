
var inherit = require('inherit')
var Tween = require('./tween')

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

ObjectTween.prototype.apply = function(p){
  var from = this._from
  var to = this._to
  var curr = this._curr
  for (var k in to) {
    curr[k] = from[k] + (to[k] - from[k]) * p
  }
  return curr
}
