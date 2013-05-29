
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , ease = require('ease')
  , now = require('now')
  , noop = function(){}

/**
 * Initialize a new `Tween` with `obj`.
 *
 * @param {Object|Array} obj
 * @api public
 */

module.exports = function(obj){
  return new Tween(obj)
}

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
  this.apply = Array.isArray(this._from)
    ? this.applyArray
    : this.apply
  this._curr = clone(this._from)
  this._start = now()
  this.step = Tween.prototype.step
  return this
}

/**
 * Tween to `obj` and reset internal state.
 *
 *    tween.to({ x: 50, y: 100 })
 *
 * @param {Object|Array} obj
 * @return {Tween} self
 * @api public
 */

Tween.prototype.to = function(obj){
  this.reset()
  this._to = obj
  return this
}

/**
 * Set duration to `ms` [500].
 *
 * @param {Number} ms
 * @return {Tween} self
 * @api public
 */

Tween.prototype.duration = function(ms){
  this._duration = ms
  this._end = this._start + this._duration
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
 * @return {Tween} self
 * @api private
 */

Tween.prototype.step = function(){
  // duration
  var duration = this._duration
  var elapsed = now() - this._start

  // complete
  if (elapsed >= duration) {
    this._from = this._to
    this._update(this._to)
    this.step = noop
    this.emit('end')
    return this
  }

  this._update(this.apply(this._ease(elapsed / duration)))

  return this
}


/**
 * generate a tween frame at point `p` between 
 * `this._from` and `this._to`
 * 
 * @param {Number} percentage
 * @return {Array}
 * @api private
 */

Tween.prototype.apply = function(p){
  var from = this._from
  var to = this._to
  var curr = this._curr
  for (var k in to) {
    curr[k] = from[k] + (to[k] - from[k]) * p
  }
  return curr
}


/**
 * optimised apply() for arrays
 * 
 * @param {Number} percentage
 * @return {Array}
 * @api private
 */

Tween.prototype.applyArray = function(p){
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

/**
 * Clone `obj`.
 *
 * @api private
 */

function clone(obj) {
  if (Array.isArray(obj)) return obj.slice()
  var ret = {}
  for (var key in obj) ret[key] = obj[key]
  return ret
}

/**
 * Expose `Tween`.
 */

module.exports.Tween = Tween
