'use strict';

module.exports = freeze;

function freeze(obj) {
	return Array.isArray(obj) ? freezeArray(obj) : freezeObj(obj);
}

function freezeArray(arr) {
	var result = arr.map(function(item) {
		return isFreezable(item) ? freeze(item) : item;
	});
	return blockArrayMethods(result);
}

function freezeObj(obj) {
	var result = {};
	Object.keys(obj).forEach(function(key) {
		var member = obj[key];
		result[key] = isFreezable(member) ? freeze(member) : member;
	});
	result = Object.freeze(result);
	return result;
}

function isFreezable(x) {
	return x !== null && x !== undefined && typeof x === 'object';
}

function blockArrayMethods(arr) {
	var methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'fill'];
	methods.forEach(function(method) {
		arr[method] = function() {
			throw new Error('Cannot execute ' + method + ' on frozen array');
		};
	});
	return arr;
}
