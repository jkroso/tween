
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , ease = require('ease')
  , now = require('now')
  , clone = require('clone')

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
Tween.prototype.done = false

/**
 * Reset the tween.
 *
 * @api public
 */

Tween.prototype.reset = function(){
  this._curr = clone(this._from)
  this._start = now()
  this.done = false
  return this
}

/**
 * set target value
 *
 *    tween.to({ x: 50, y: 100 })
 *
 * @param {Object|Array} obj
 * @return {this}
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
  var completion = (now() - this._start) / this._duration

  // complete
  if (completion >= 1) {
    this.done = true
    return this._to
  }

  return this.frame(this._ease(completion))
}

/**
 * Set update function to `fn` or when no
 * argument is given it performs a "step"
 *
 * @param {Function} [fn]
 * @return {this}
 * @api public
 */

Tween.prototype.update = function(fn){
  if (fn) return this.on('update', fn)
  if (!this.done) {
    this.emit('update', this.next())
    if (this.done) this.emit('end')
  }
  return this
}

/**
 * generate a tween frame at point `p` between 
 * `this._from` and `this._to`
 * 
 * @param {Number} percent
 * @return {x}
 * @api public
 */

Tween.prototype.frame = function(percent){
  throw new Error('should be shadowed by a sub-class')
}
