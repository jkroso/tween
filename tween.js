
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , ease = require('ease')
  , now = require('now')
  , clone = require('clone')
  , noop = function(){}

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
 * Mixin emitter.
 */

Emitter(Tween.prototype)

/**
 * default settings
 */

Tween.prototype._ease = ease.linear
Tween.prototype._duration = 500

/**
 * Reset the tween.
 *
 * @api public
 */

Tween.prototype.reset = function(){
  this._curr = clone(this._from)
  this._start = now()
  this.step = Tween.prototype.step
  return this
}

/**
 * set target value
 *
 *    tween.to({ x: 50, y: 100 })
 *
 * @param {Object|Array} obj
 * @return {Tween} self
 * @api public
 */

Tween.prototype.to = function(obj){
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
 * @return {Tween}
 * @api public
 */

Tween.prototype.ease = function(fn){
  fn = typeof fn == 'function' ? fn : ease[fn]
  if (!fn) throw new TypeError('invalid easing function')
  this._ease = fn
  return this
}

/**
 * Perform a step.
 *
 * @return {this}
 * @api private
 */

Tween.prototype.step = function(){
  var completion = (now() - this._start) / this._duration

  // complete
  if (completion >= 1) {
    this._from = this._to
    this._update(this._to)
    this.step = noop
    this.emit('end')
    return this
  }

  this._update(this.apply(this._ease(completion)))

  return this
}

/**
 * Set update function to `fn` or
 * when no argument is given this performs
 * a "step".
 *
 * @param {Function} fn
 * @return {Tween} self
 * @api public
 */

Tween.prototype.update = function(fn){
  if (!fn) return this.step()
  this._update = fn
  return this
}
