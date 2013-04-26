
var should = require('chai').should()
	, Promise = require('laissez-faire/full')
	, fulfilled = Promise.fulfilled
	, rejected = Promise.rejected
	, all = require('..')
	, naked = require('../naked')

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
