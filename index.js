
var Promise = require('laissez-faire')
  , newFulfilled = Promise.fulfilled
  , read = require('when').read

module.exports = function(array){
	var res = []
	var len = array.length
	var pending = len

	if (!pending) return newFulfilled(res)
	var p = new Promise
	var receiver = function(i){
		return function(value){
			res[i] = value
			if (--pending === 0) p.resolve(res)
		}
	}
	var fail = function(e){
		p.reject(e)
		// break loop if it hasn't already finished
		len = 0
	}
	
	while (len--) read(array[len], receiver(len), fail)

	return p
}
