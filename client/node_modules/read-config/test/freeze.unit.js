'use strict';

var libmodule = 'freeze',
	freeze = requireLib(libmodule),
	expect = require('chai').expect;

describe(libmodule + ' test:', function() {

	function checkCrudOnObject(name, freezed) {

		describe(name, function() {

			it('should throw error on field modification', function() {
				expect(function() {
					freezed.a = 2;
				}).to.throw();
			});

			it('should throw error on field removal', function() {
				expect(function() {
					delete freezed.a;
				}).to.throw();
			});

			it('should throw error on field addition', function() {
				expect(function() {
					freezed.b = 2;
				}).to.throw();
			});

		});
	}
	checkCrudOnObject('simple object', freeze({ a: 1 }));
	checkCrudOnObject('subobject', freeze({ x: { a: 1 } }).x);

	function checkCrudOnArray(name, freezed) {

		describe(name, function() {

			/* Impossible to freeze:

			it('should throw error on item modification', function() {
				expect(function() {
					freezed[0] = 999;
				}).to.throw();
			});

			it('should throw error on field addition', function() {
				expect(function() {
					freezed[freezed.length] = 999;
				}).to.throw();
			});

			*/

			['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'fill'].forEach(function(method) {
				it('should throw error on ' + method + ' operation', function() {
					expect(function() {
						freezed[method]();
					}).to.throw();
				});
			});

		});
	}
	checkCrudOnArray('simple array', freeze(['a', 'b', 'c']));
	//checkCrudOnArray('subarray', freeze(['x', ['a', 'b', 'c']])[1]);

});
