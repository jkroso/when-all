
var map = require('map/async')

module.exports = all

/**
 * unbox all arguments
 * @return {Result} arguments
 */

all.naked = all.args = function(){
	return all(arguments)
}

/**
 * unbox all values in `obj`
 * 
 * @param {Object|Array} obj
 * @return {Result} for a new `obj`
 */

function all(obj){
	return map(obj, identity)
}

/**
 * its a feature of map that any returned
 * values inside of a Result will be unboxed
 * 
 * @param {x} a
 * @return {x}
 */

function identity(a){ return a}