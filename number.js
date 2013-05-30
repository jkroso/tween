
var inherit = require('inherit')
  , Tween = require('./tween')
  , now = require('now')

module.exports = NumberTween

function NumberTween(n){
  this._from = n
}

inherit(NumberTween, Tween)

NumberTween.prototype.frame = function(p){
  return this._from + this._diff * p
}

NumberTween.prototype.reset = function(){
  this._start = now()
  this._diff = (this._to || 0) - this._from
  this.next = Tween.prototype.next
  return this
}