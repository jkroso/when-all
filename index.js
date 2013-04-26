
var Promise = require('laissez-faire/full')
  , fulfilled = Promise.fulfilled
  , read = require('when/read')

/**
 * await the arrival of several values and or promises
 * 
 * @param {Array} values
 * @return {Promise} for an array of values
 */

module.exports = function(array){
	var res = []
	var len = array.length
	var pending = len

	if (!pending) return fulfilled(res)
	var p = new Promise
	var receiver = function(i){
		return function(value){
			res[i] = value
			if (--pending === 0) p.fulfill(res)
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
