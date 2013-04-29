
var should = require('chai').should()
	, Promise = require('laissez-faire/full')
	, fulfilled = Promise.fulfilled
	, rejected = Promise.rejected
	, array = require('../array')
	, naked = require('../naked')
	, object = require('../object')
	, all = require('..')

function delay (value, method) {
	var p = new Promise
	setTimeout(function () {
		p[method || 'fulfill'](value)
	}, Math.round(Math.random() * 10))
	return p
}

test('when-all', all)
test('when-all/naked', function(array){
	return naked.apply(this, array)
})

function test(what, all){
	describe(what, function () {
		it('should return a promise', function () {
			all([]).should.be.an.instanceOf(Promise)
		})
		it('should resolve instantly if the array is empty', function (done) {
			all([]).state.should.equal('fulfilled')
			all([]).then(function (val) {
				val.should.deep.equal([])
			}).node(done)
		})
		it('should resolve to the values within the original array', function (done) {
			all([1,2,3]).then(function (vals) {
				vals.should.deep.equal([1,2,3])
				done()
			})
		})
		it('should resolve any promises within the array before resolving itself', function (done) {
			all([delay(1), delay(2), delay(3)]).then(function (vals) {
				vals.should.deep.equal([1,2,3])
				done()
			})
		})
		it('should reject with the first rejection', function (done) {
			all([delay(1), delay(2, 'reject'), delay(3)]).then(null, function (val) {
				val.should.equal(2)
				done()
			})
		})
	})
}

describe('object', function () {
	it('resolve to a new Object', function (done) {
		object({
			a: delay(1),
			b: delay(2),
			c: 3
		}).then(function(obj){
			obj.should.deep.equal({a:1,b:2,c:3})
		}).node(done)
	})

	it('should fail if one value fails', function (done) {
		object({
			a: delay(new Error('fail'), 'reject'),
			b: delay(2),
			c: 3
		}).otherwise(function(e){
			e.message.should.equal('fail')
			done()
		})
	})

	it('should handle immediate resolution', function (done) {
		object({
			a:fulfilled(1),
			b:fulfilled(2),
			c:fulfilled(3)
		}).then(function(obj){
			obj.should.deep.equal({a:1,b:2,c:3})
		}).node(done)
	})
})
