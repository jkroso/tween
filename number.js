
var inherit = require('inherit')
  , Tween = require('./tween')
  , now = require('now')

module.exports = NumberTween

function NumberTween(n){
  this._from = n
}

inherit(NumberTween, Tween)

/**
 * generate a tween frame at point `p` between 
 * `this._from` and `this._to`
 * 
 * @param {Number} percentage
 * @return {Number}
 * @api public
 */

NumberTween.prototype.apply = function(p){
  return this._from + this._diff * p
}

/**
 * Reset the tween.
 * @api public
 */

NumberTween.prototype.reset = function(){
  this._start = now()
  this._diff = (this._to || 0) - this._from
  this.step = Tween.prototype.step
  return this
}