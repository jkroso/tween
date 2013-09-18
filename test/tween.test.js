
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
		var t = tween({ x: 1 }, { x: 10 })
			.ease('linear')
			.duration(10)
			.reset()

			while (!t.done) {
				t.next()
					.should.have.property('x')
					.and.be.within(1, 10)
			}

			(now() - start).should.be.within(10, 15)
			t.next().should.eql({ x:10 })
	})

	describe('.to()', function(){
		it('should reset and move `_from`', function(){
			var t = tween({ x: 1 }, { x: 10 })
				.ease('linear')
				.duration(5)
				.reset()
			var start = now()

			while (!t.done) {
				t.next()
					.should.have.property('x')
					.and.be.within(1, 10)
			}

			t.next().should.eql({x:10})
			t.to({ x: 1}).duration(10)

			while (!t.done) {
				t.next()
					.should.have.property('x')
					.and.be.within(1, 10)
			}

			(now() - start).should.be.within(15, 25)
			t.next().should.eql({ x: 1 })
		})
	})
})

describe('array', function(){
	it('should work', function(){
		var t = tween([1], [10])
			.ease('linear')
			.duration(10)
			.reset()
		var start = now()

		while (!t.done) {
			t.next()
				.should.have.property(0)
				.and.be.within(1, 10)
		}

		(now() - start).should.be.within(10, 15)
		t.next().should.eql([ 10 ])
	})
})

describe('number', function(){
	it('should work', function(){
		var start = now()
		var t = tween(1, 10)
			.ease('linear')
			.duration(10)
			.reset()

		while(!t.done) {
			t.next()
				.should.be.a('number')
				.and.be.within(1, 10)
		}

		(now() - start).should.be.within(10, 15)
		t.next().should.equal(10)
	})
})