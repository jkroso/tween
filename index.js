
var type = require('type')

var types = {
	number: require('./number'),
	object: require('./object'),
	array: require('./array'),
}

/**
 * Initialize a new `Tween` with `x`.
 *
 * @param {Object|Array|Number} from
 * @param {Object|Array|Number} to
 * @return {Tween}
 * @api public
 */

module.exports = function(from, to){
	var Tween = types[type(from)]
	if (Tween) return new Tween(from, to)
	throw new TypeError('unknown: ' + type(from))
}