
var read = require('when/read')
  , Result = require('result')
  , wrap = Result.wrap

/**
 * await the arrival of all values in `obj`
 * 
 * @param {Object} obj
 * @return {Result} for a new Object
 */

module.exports = function(obj){
	var res = {}
	var keys = []
	for (var k in obj) keys.push(k)
	var len = keys.length
	if (len === 0) return wrap(res)
	var pending = len
	var result = new Result
	var receiver = function(i){
		return function(value){
			res[i] = value
			if (--pending === 0) result.write(res)
		}
	}
	var fail = function(e){
		result.error(e)
		// attempt to break loop
		len = 0
	}
	
	while (len--) {
		read(obj[k = keys[len]], receiver(k), fail)
	}

	return result
}
