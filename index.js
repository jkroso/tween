
var type = require('type')

var types = {
	number: require('./number'),
	object: require('./object'),
	array: require('./array'),
}

/**
 * Initialize a new `Tween` with `x`.
 *
 * @param {Object|Array|Number} x
 * @return {Tween}
 * @api public
 */

module.exports = function(x){
	var Tween = types[type(x)]
	if (!Tween) throw new TypeError('unknown: ' + type(x))
	return new Tween(x)
}