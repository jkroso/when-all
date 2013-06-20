
var Result = require('result')
	, deep = require('../deep')
  , chai = require('./chai')
	, all = require('..')
	, wrap = Result.wrap

function delay(value, method){
	var result = new Result
	setTimeout(function(){
		result[method || 'write'](value)
	}, Math.random() * 10)
	return result
}

test('all()', all)
test('all.args()', function(array){
	return all.args.apply(this, array)
})

function test(what, all){
	describe(what, function(){
		it('should return a Result', function(){
			all([]).should.be.an.instanceOf(Result)
		})
		it('should resolve instantly if the array is empty', function(done){
			all([]).state.should.equal('done')
			all([]).then(function(val){
				val.should.deep.equal([])
			}).node(done)
		})
		it('should resolve to the values within the original array', function(done){
			all([1,2,3]).then(function(vals){
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
		it('should error with the first failed Result', function(done){
			all([delay(1), delay(2, 'error'), delay(3)]).then(null, function(val){
				val.should.equal(2)
				done()
			})
		})
	})
}

describe('object', function (){
	it('resolve to a new Object', function(done){
		all({
			a: delay(1),
			b: delay(2),
			c: 3
		}).then(function(obj){
			obj.should.deep.equal({a:1,b:2,c:3})
		}).node(done)
	})

	it('should fail if one value fails', function(done){
		all({
			a: delay(new Error('fail'), 'error'),
			b: delay(2),
			c: 3
		}).then(null, function(e){
			e.message.should.equal('fail')
			done()
		})
	})

	it('should handle immediate resolution', function(done){
		all({
			a: wrap(1),
			b: wrap(2),
			c: wrap(3)
		}).then(function(obj){
			obj.should.deep.equal({a:1,b:2,c:3})
		}).node(done)
	})
})

describe('deep', function(){
	it('recur down till everything is unboxed', function(done){
		deep(wrap({
			a: delay('a'),
			b: delay([
				wrap(1),
				delay(2)
			]),
			c: 'c'
		})).then(function(obj){
			obj.should.eql({
				a: 'a',
				b: [1, 2],
				c: 'c'
			})
		}).node(done)
	})

	it('should handle failing results', function(done){
		var error = new Error(this.test.title)
		deep({
			a: 2,
			b: delay(error, 'error')
		}).then(null, function(e){
			e.should.equal(error)
		}).node(done)
	})
})