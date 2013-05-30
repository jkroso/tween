
var chai = require('./chai')
  , tween = require('..')
  , ObjectTween = require('../object')
  , ArrayTween = require('../array')
  , NumberTween = require('../number')
  , now = require('now')
  , tick = require('next-tick')

describe('tween', function () {
  it('should dispatch by type', function () {
    tween({}).should.be.an.instanceOf(ObjectTween)
    tween([]).should.be.an.instanceOf(ArrayTween)
    tween(1).should.be.an.instanceOf(NumberTween)
  })

  it('should error on an invalid type', function () {
    (function(){
      tween(true)
    }).should.throw('no implementation for boolean')
  })
})

describe('object', function(){
  it('should work', function(done){
    var start = now()
    var t = tween({ x: 1 })
      .ease('linear')
      .to({ x: 10 })
      .duration(10)
      .on('end', function(){
        (now() - start).should.be.within(10, 40)
        done()
      })

    t.update(function(o){
      o.should.have.property('x').and.be.within(1, 10)
      tick(function(){
        t.update()
      })
    }).update()
  })
})

describe('array', function(){
  it('should work', function(done){
    var start = now()
    var t = tween([1])
      .ease('linear')
      .to([ 10 ])
      .duration(10)
      .on('end', function(){
        (now() - start).should.be.within(10, 40)
        done()
      })

    t.update(function(o){
      o.should.have.property(0).and.be.within(1, 10)
      tick(function(){
        t.update()
      })
    }).update()
  })
})

describe('number', function(){
  it('should work', function(done){
    var start = now()
    var t = tween(1)
      .ease('linear')
      .to(10)
      .duration(10)
      .on('end', function(){
        (now() - start).should.be.within(10, 20)
        done()
      })

    t.update(function(o){
      o.should.be.a('number').and.be.within(1, 10)
      tick(function(){
        t.update()
      })
    }).update()
  })
})