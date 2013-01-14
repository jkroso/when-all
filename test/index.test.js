var should = require('chai').should()
  , Promise = require('laissez-faire')
  , fulfilled = Promise.fulfilled
  , rejected = Promise.rejected
  , all = require('../src')

function delay (value, method) {
	var p = new Promise
	setTimeout(function () {
		p[method || 'resolve'](value)
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
   	}).nend(done)
   })
   it('should resolve to the values within the original array', function () {
   	all([1,2,3]).end(function (vals) {
   		vals.should.deep.equal([1,2,3])
   	})
   })
   it('should resolve any promises within the array before resolving itself', function () {
   	all([delay(1), delay(2), delay(3)]).end(function (vals) {
   		vals.should.deep.equal([1,2,3])
   	})
   })
   it('should reject with the first rejection', function () {
   	all([delay(1), delay(2, 'reject'), delay(3)]).end(null, function (val) {
   		vals.should.equal(2)
   	})
   })
})
