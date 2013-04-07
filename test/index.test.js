
var should = require('chai').should()
	, Promise = require('laissez-faire')
	, fulfilled = Promise.fulfilled
	, rejected = Promise.rejected
	, all = require('..')

function delay (value, method) {
	var p = new Promise
	setTimeout(function () {
		p[method || 'fulfill'](value)
	}, Math.round(Math.random() * 10))
	return p
}

describe('when-all', function () {
	it('should return a promise', function () {
		all([]).should.be.an.instanceOf(Promise)
	})
	it('should resolve instantly if the array is empty', function (done) {
		all([]).wasFulfilled().should.be.true
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
