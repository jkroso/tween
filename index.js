
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
 * @param {Object|Array} x
 * @return {Tween}
 * @api public
 */

module.exports = function(x){
  return new implementations[type(x)](x)
}
