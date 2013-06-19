
var array = require('./array')
  , object = require('./object')

/**
 * dispatch to the appropriate module
 *
 * @param {Object|Arraylike} x
 * @return {Result} new x
 */

module.exports = function(obj){
	return typeof obj.length == 'number'
		? array(obj)
		: object(obj)
}