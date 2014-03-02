
var ResType = require('result-type')
var Result = require('result')
var map = require('map/async')
var coerce = Result.coerce
var when = Result.when

module.exports = function(value){
  return coerce(unbox(value))
}

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