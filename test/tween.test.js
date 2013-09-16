
var ObjectTween = require('../object')
var NumberTween = require('../number')
var ArrayTween = require('../array')
var tick = require('next-tick')
var chai = require('./chai')
var tween = require('..')
var now = require('now')

describe('tween', function(){
	it('should dispatch by type', function(){
		tween({}).should.be.an.instanceOf(ObjectTween)
		tween([]).should.be.an.instanceOf(ArrayTween)
		tween(1).should.be.an.instanceOf(NumberTween)
	})

	it('should error on an invalid type', function(){
		(function(){
			tween(true)
		}).should.throw('unknown: boolean')
	})
})

describe('object', function(){
	it('should work', function(){
		var start = now()
		var t = tween({ x: 1 })
			.ease('linear')
			.to({ x: 10 })
			.duration(10)
			while (!t.done) {
				var o = t.next();
				o.should.have.property('x').and.be.within(1, 10)
			}
			(now() - start).should.be.within(10, 15)
			o.should.eql({ x:10 })
	})

	describe('.to()', function(){
		it('should reset and move `_from`', function(){
			var start = now()
			var t = tween({ x: 1 })
				.ease('linear')
				.to({ x: 10 })
				.duration(5)

			while (!t.done) {
				var o = t.next()
				o.should.have.property('x').and.be.within(1, 10)
			}

			o.should.eql({x:10})
			t.to({ x: 1}).duration(10)

			while (!t.done) {
				var o = t.next()
				o.should.have.property('x').and.be.within(1, 10)
			}

			o.should.eql({ x: 1 });
			(now() - start).should.be.within(15, 25)
		})
	})
})

describe('array', function(){
	it('should work', function(){
		var start = now()
		var t = tween([1])
			.ease('linear')
			.to([ 10 ])
			.duration(10)

		while (!t.done) {
			var o = t.next()
			o.should.have.property(0).and.be.within(1, 10)
		}

		(now() - start).should.be.within(10, 15)
		o.should.eql([ 10 ])
	})
})

describe('number', function(){
	it('should work', function(){
		var start = now()
		var t = tween(1)
			.ease('linear')
			.to(10)
			.duration(10)

		while(!t.done) {
			var o = t.next()
			o.should.be.a('number').and.be.within(1, 10)
		}

		(now() - start).should.be.within(10, 15)
		o.should.equal(10)
	})
})