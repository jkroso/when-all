var Promise = require('laissez-faire')
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
	  , promise = new Promise
	
	while (len) block (--len)
	function block (i) {
		once(array[i], function (value) {
			res[i] = value
			if (--pending === 0) promise.resolve(res)
		})
	}

	return promise
}