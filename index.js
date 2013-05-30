
/**
 * Module dependencies.
 */

var type = require('type')

var implementations = {
  object: require('./object'),
  array: require('./array'),
  number: require('./number')
}

/**
 * Initialize a new `Tween` with `x`.
 *
 * @param {Object|Array|Number} x
 * @return {Tween}
 * @api public
 */

module.exports = function(x){
	var Tween = implementations[type(x)]
	if (!Tween) throw new TypeError('no implementation for ' +type(x))
  return new Tween(x)
}
