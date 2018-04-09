(function (window) {
	'use strict';

	var App = window.App || {};
	var $ = window.jQuery;
	
	// Note that all jQuery methods used here return a deferred object, similar to promises, 
	// and these are returned, so calling code can use them.

	function RemoteDataStore(url) {
		if (!url) {
			throw new Error('No remote URL provided');
		}
		this.serverUrl = url;
	}

	RemoteDataStore.prototype.add = function (key, val) {
		return $.post(this.serverUrl, val, function (serverResponse) {
			console.log(serverResponse);
		});
	};

	RemoteDataStore.prototype.getAll = function (cb) {
		return $.get(this.serverUrl, function (serverResponse) {
			// Because a deferred is returned, using a callback isn't mandatory, hence its optional.
			// But the callback is used in Truck.prototype.printOrders
			if (cb) {
				console.log(serverResponse);
				// All responses passed to callback, cb
				cb(serverResponse);
			}
		});
	};

	RemoteDataStore.prototype.get = function (key, cb) {
		return $.get(this.serverUrl + '/' + key, function (serverResponse) {
			// Because a deferred is returned, using a callback isn't mandatory, hence its optional.
			if (cb) {
				console.log(serverResponse);
				cb(serverResponse);
			}
		});
	};

	RemoteDataStore.prototype.remove = function(key) {
		return $.ajax(this.serverUrl + '/' + key, {
			type: 'DELETE'
		});
	};

	App.RemoteDataStore = RemoteDataStore;
	window.App = App;
})(window);
