
var read = require('when/read')
  , Result = require('result')
  , wrap = Result.wrap

/**
 * await the arrival of all values in `array`
 * 
 * @param {Array} array
 * @return {Result} for an new array
 */

module.exports = function(array){
	var res = []
	var len = array.length
	if (len === 0) return wrap(res)
	var pending = len
	var p = new Result
	var receiver = function(i){
		return function(value){
			res[i] = value
			if (--pending === 0) p.write(res)
		}
	}
	var fail = function(e){
		p.error(e)
		// attempt to break loop
		len = 0
	}
	
	while (len--) {
		read(array[len], receiver(len), fail)
	}

	return p
}
