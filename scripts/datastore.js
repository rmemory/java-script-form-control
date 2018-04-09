// Very basic database functionality
(function (window) {
	'use strict';

	// See if App exists, if not create a new one
	var App = window.App || {};
  // import the Promise object
	var Promise = window.Promise;

	// Constructor
	// Create with new. For example,
	// var myData = new App.DataStore();
	function DataStore() {
		this.data = {};
	}

	// Private
	function promiseResolvedWith(value) {
		var promise = new Promise(function (resolve, reject) {
			resolve(value);
			// we aren't even bothering with the reject function.
		});
		return promise;
	}

	/* 
	 * API
	 */

	// add a value, uniquely identified in the data with key
	// public
	DataStore.prototype.add = function (key, val) {
		//this.data[key] = val;
		// null means the add function typically doesn't return any value anyway.
		return promiseResolvedWith(null);
	}

	// get a value, uniquely identified in the data with key
	// public
	DataStore.prototype.get = function (key) {
		// return this.data[key];
		return promiseResolvedWith(this.data[key]);
	}

	// get all values
	// public
	DataStore.prototype.getAll = function () {
		// return this.data;
		return promiseResolvedWith(this.data);
	}

	// remove a value, uniquely identified in the data with key
	// public
	DataStore.prototype.remove = function (key) {
		delete this.data[key];
		return promiseResolvedWith(null);
	}

	// Make the DataStore object (with prototypes) available globally
	App.DataStore = DataStore;
	window.App = App;
})(window);
