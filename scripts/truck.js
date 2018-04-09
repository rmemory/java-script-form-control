// A truck is a basic order manager, which interfaces to the data staore
(function (window) {
	'use strict';
	var App = window.App || {};

	// Constructor
	// Requires a unique truckId and an instance of App.DataStore
	function Truck(truckId, db) {
		this.truckId = truckId;
		this.db = db;
	}

	/* 
	 * API
	 */

	// All of the return statements in this file are to return the deferreds which are
	// returned from jQuery or promises from the regular datastore.js

	// createOrder. 
	// The object parameter can be anything, but it is expected to 
	// have an emailAddress property which serves as the ID for the
	// order.
	// public
	Truck.prototype.createOrder = function (order) {
		console.log('Adding order for ' + order.emailAddress);
		return this.db.add(order.emailAddress, order);
	}

	// deliverOrder. 
	// The customerId must be the customer's email address.
	// public
	Truck.prototype.deliverOrder = function (customerId) {
		console.log('Delivering order for ' + customerId);
		return this.db.remove(customerId);
	}

	// printOrder. 
	// The object parameter can be anything, but it is expected to 
	// have an emailAddress property which serves as the ID for the
	// order.
	// public
	Truck.prototype.printOrders = function (printFn) {
		/*
		 * bind is generally considered to be less performant for these types of situations
		 * It is said "self" is 60% faster than doing a bind though I have no confirmation.
		 */
		var self = this;
		
		return this.db.getAll()
		// orders comes from the db return value
		 .then(function (orders) {
			 var customerIdArray = Object.keys(orders);

			 if (customerIdArray.length > 0) {
				console.log('Truck #' + self.truckId + ' has pending orders:');
				customerIdArray.forEach(function (id) {
					console.log(orders[id]);
					if (printFn) {
						printFn(orders[id]);
					}
				});//.bind(this));
			 }
		 });//.bind(this));
	}

	App.Truck = Truck;
	window.App = App;
}) (window);
