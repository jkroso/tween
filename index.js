
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , ease = require('ease');

/**
 * Expose `Tween`.
 */

module.exports = Tween;

/**
 * Initialize a new `Tween` with `obj`.
 *
 * @param {Object|Array} obj
 * @api public
 */

function Tween(obj) {
  if (!(this instanceof Tween)) return new Tween(obj);
  this._from = obj;
}

/**
 * Mixin emitter.
 */

Emitter(Tween.prototype);

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
  this.isArray = Array.isArray(this._from);
  this._curr = clone(this._from);
  this._start = now();
  delete this.step;
  return this;
};

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
  this.reset();
  this._to = obj;
  return this;
};

/**
 * Set duration to `ms` [500].
 *
 * @param {Number} ms
 * @return {Tween} self
 * @api public
 */

Tween.prototype.duration = function(ms){
  this._duration = ms;
  this._end = this._start + this._duration;
  return this;
};

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
  fn = typeof fn == 'function' ? fn : ease[fn];
  if (!fn) throw new TypeError('invalid easing function');
  this._ease = fn;
  return this;
};

/**
 * Perform a step.
 *
 * @return {Tween} self
 * @api private
 */

Tween.prototype.step = function(){
  // duration
  var duration = this._duration;
  var elapsed = now() - this._start

  // complete
  if (elapsed >= duration) {
    this._from = this._to;
    this._update(this._to)
    this.step = function(){}
    this.emit('end')
    return this
  }

  // tween
  var from = this._from;
  var to = this._to;
  var curr = this._curr;
  var n = this._ease(elapsed / duration);

  if (this.isArray) {
    var k = to.length
    while (k--) {
      curr[k] = from[k] + (to[k] - from[k]) * n;
    }
  } else {
    for (var k in to) {
      curr[k] = from[k] + (to[k] - from[k]) * n;
    }
  }

  this._update(curr);
  return this;
};

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
  if (!fn) return this.step();
  this._update = fn;
  return this;
};

/**
 * Clone `obj`.
 *
 * @api private
 */

function clone(obj) {
  if (Array.isArray(obj)) return obj.slice();
  var ret = {};
  for (var key in obj) ret[key] = obj[key];
  return ret;
}

/**
 * Get a timestamp
 * 
 * @return {Number}
 * @api private
 */

var now = function(){
  return performance.now()
}

// fallback
if (!function(){return this}().performance) now = Date.now
