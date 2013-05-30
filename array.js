
var inherit = require('inherit')
var Tween = require('./tween')

module.exports = ArrayTween

function ArrayTween(array){
	this._from = array
}

inherit(ArrayTween, Tween)

/**
 * generate a tween frame at point `p` between 
 * `this._from` and `this._to`
 * 
 * @param {Number} percentage
 * @return {Array}
 * @api private
 */

ArrayTween.prototype.apply = function(p){
  var from = this._from
  var to = this._to
  var curr = this._curr
  var k = to.length
  while (k--) {
    curr[k] = from[k] + (to[k] - from[k]) * p
  }
  return curr
}
