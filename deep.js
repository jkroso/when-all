
var ResType = require('result-type')
  , map = require('map/async')
  , when = require('when')

module.exports = unbox

/**
 * unbox all values in `obj` recursively
 * 
 * @param {Object|Array} obj
 * @return {Result} for a new `obj`
 */

function unbox(value){
	if (value instanceof ResType) return when(value, unbox)
	if (value && typeof value == 'object') return unboxAll(value)
	return value
}

function unboxAll(obj){
	return map(obj, unbox)
}