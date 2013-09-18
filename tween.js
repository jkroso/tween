
var extensible = require('extensible')
var ease = require('ease')
var now = require('now')

module.exports = Tween

/**
 * Tweening base class
 *
 * @param {Any} from
 * @param {Any} to
 * @api public
 */

function Tween(from, to){
	this._from = from
	this._to = to
}

/**
 * add extend method
 */

extensible(Tween)

/**
 * default settings
 */

Tween.prototype._ease = ease.linear
Tween.prototype._duration = 500
Tween.prototype.done = false

/**
 * Reset the tweens timer and state. Call this before
 * calling `.next()` for the first time
 *
 *   this.reset()
 *   while (!this.done) this.next()
 *
 * @api public
 */

Tween.prototype.reset = function(){
	this._start = now()
	this.done = false
	return this
}

/**
 * retarget the tween towards `val`. `this.from`
 * will be set to the tweens current value unless
 * `this._to` is currently `null`. Calls `reset()`
 * internally
 *
 *   tween.to({ x: 50, y: 100 })
 *
 * @param {Any} val
 * @return {this}
 * @api public
 */

Tween.prototype.to = function(val){
	if (this._to != null) {
		this._from = this.done === false
			? this.next()
			: this._to
	}
	this._to = val
	this.reset()
	return this
}

/**
 * set the base value to `val`
 *
 * @param {Any} val
 * @return {this}
 * @api public
 */

Tween.prototype.from = function(val){
	this._from = val
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
 *   tween.ease('in-out-sine')
 *
 * @param {String|Function} fn
 * @return {this}
 * @api public
 */

Tween.prototype.ease = function(fn){
	if (typeof fn == 'string') fn = ease[fn]
	if (!fn) throw new Error('invalid easing function')
	this._ease = fn
	return this
}

/**
 * generate the next frame
 *
 * @return {Any}
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
 *   tween(1, 3).frame(.5) // => 2
 *
 * @param {Number} percent
 * @return {Any}
 * @api public
 */

Tween.prototype.frame