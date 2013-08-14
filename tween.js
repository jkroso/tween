
/**
 * Module dependencies.
 */

var ease = require('ease')
  , now = require('now')

/**
 * Tweening base class
 *
 * @param {x} obj
 * @api public
 */

module.exports = Tween

function Tween(obj) {
  this._from = obj
}

/**
 * default settings
 */

Tween.prototype._ease = ease.linear
Tween.prototype._duration = 500
Tween.prototype.done = false

/**
 * Reset the tween.
 *
 * @api public
 */

Tween.prototype.reset = function(){
  this._start = now()
  this.done = false
  return this
}

/**
 * set target value. if `.to()` has been called before
 * `_from` will be updated to the current frame
 *
 *    tween.to({ x: 50, y: 100 })
 *
 * @param {Object|Array} obj
 * @return {this}
 * @api public
 */

Tween.prototype.to = function(obj){
  if ('_to' in this) this._from = this._curr || this.next()
  this._to = obj
  this.reset()
  return this
}

/**
 * Set duration to `ms` [500].
 *
 * @param {Number} ms
 * @return {this}
 * @api public
 */

Tween.prototype.duration = function(ms){
  this._duration = ms
  return this
}

/**
 * Set easing function to `fn`.
 *
 *    tween.ease('in-out-sine')
 *
 * @param {String|Function} fn
 * @return {this}
 * @api public
 */

Tween.prototype.ease = function(fn){
  fn = typeof fn == 'function' ? fn : ease[fn]
  if (!fn) throw new TypeError('invalid easing function')
  this._ease = fn
  return this
}

/**
 * generate the next frame
 *
 * @return {x}
 * @api public
 */

Tween.prototype.next = function(){
  var progress = (now() - this._start) / this._duration

  if (progress >= 1) {
    this.done = true
    return this._to
  }

  return this.frame(this._ease(progress))
}

/**
 * generate a tween frame at point `p` between 
 * `this._from` and `this._to`. To be defined in
 * sub-classes
 * 
 * @param {Number} percent
 * @return {x}
 * @api public
 */

Tween.prototype.frame