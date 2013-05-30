
var inherit = require('inherit')
  , Tween = require('./tween')
  , now = require('now')

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

/**
 * Reset the tween.
 *
 * @api public
 */

ArrayTween.prototype.reset = function(){
  this._curr = this._from.slice()
  this._start = now()
  this.next = Tween.prototype.next
  return this
}
