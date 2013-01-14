var Promise = require('laissez-faire')
  , fulfilled = Promise.fulfilled
  , once = require('when').once

module.exports = all

/**
 * Create a promise for an array
 *
 *   all([
 *     getPage('google.com'),
 *     getPage('google.co.nz')
 *   ]).then(compare)
 *
 * @param {Array} array
 * @param {Function} fn to apply to each value
 */

function all (array) {
	var res = []
	  , len = array.length
	  , pending = len

	if (!pending) return fulfilled(res)
	
	var promise = new Promise
	
	while (len--) once(array[len], receiver(len))

	function receiver (i) {
		return function (value) {
			res[i] = value
			if (--pending === 0) promise.resolve(res)
		}
	}

	return promise
}