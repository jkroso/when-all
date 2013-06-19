
var object = require('../object')
	, array = require('../array')
	, naked = require('../naked')
	, Result = require('result')
  , chai = require('./chai')
	, all = require('..')
	, wrap = Result.wrap

function delay(value, method){
	var result = new Result
	setTimeout(function () {
		result[method || 'write'](value)
	}, Math.random() * 10)
	return result
}

test('when-all', all)
test('when-all/naked', function(array){
	return naked.apply(this, array)
})

function test(what, all){
	describe(what, function(){
		it('should return a Result', function () {
			all([]).should.be.an.instanceOf(Result)
		})
		it('should resolve instantly if the array is empty', function(done){
			all([]).state.should.equal('done')
			all([]).then(function (val) {
				val.should.deep.equal([])
			}).node(done)
		})
		it('should resolve to the values within the original array', function(done){
			all([1,2,3]).then(function (vals) {
				vals.should.deep.equal([1,2,3])
				done()
			})
		})
		it('should resolve any results within the array before resolving itself', function(done){
			all([delay(1), delay(2), delay(3)]).then(function(vals){
				vals.should.deep.equal([1,2,3])
				done()
			})
		})
		it('should error with the first failed Result', function (done) {
			all([delay(1), delay(2, 'error'), delay(3)]).then(null, function(val){
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
			a: delay(new Error('fail'), 'error'),
			b: delay(2),
			c: 3
		}).then(null, function(e){
			e.message.should.equal('fail')
			done()
		})
	})

	it('should handle immediate resolution', function (done) {
		object({
			a: wrap(1),
			b: wrap(2),
			c: wrap(3)
		}).then(function(obj){
			obj.should.deep.equal({a:1,b:2,c:3})
		}).node(done)
	})
})