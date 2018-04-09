// Main entry point for order system. Include this script last

(function (window) {
		'use strict';
		var FORM_SELECTOR = '[data-order = "form"]';
		var CHECKLIST_SELECTOR = '[data-order = "checklist"]';
		var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
		
		var App = window.App;
		var Truck = App.Truck;
		var DataStore = App.DataStore;
		// var RemoteDataStore = App.RemoteDataStore;
		
		var FormHandler = App.FormHandler;
		var Validation = App.Validation;
		var CheckList = App.CheckList;
		var webshim = window.webshim;

		// var remoteDs = new RemoteDataStore(SERVER_URL);
		// var myTruck = new Truck('ncc-1701', remoteDs);
		var myTruck = new Truck('ncc-1701', new DataStore());
		window.myTruck = myTruck;
		
		var checkList = new CheckList(CHECKLIST_SELECTOR);
		// when a check list item is selected, have it call Truck.deliverOrder
		// To remove the item from the checklist. Note that we need to bind
		// myTruck here because inside of addClickHandler, when deliverOrder
		// is called, it would refer to the CheckList this, which is incorrect.
		checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
		
		// Intercept the post request
		var formHandler = new FormHandler(FORM_SELECTOR);
		// formHandler.addSubmitHandler(myTruck.createOrder); // by itself, it wont add a checklist row when order is created
		// Here is how we both create the order and also add a checkList row.
		// Note that 'data' is filled in, internally, by the addSubmitHandler code.
		formHandler.addSubmitHandler(function (data) {
			return myTruck.createOrder.call(myTruck, data) //call is a good way to bind a different this, but its not needed here because myTruck will already be 'this'
			 .then(function() { //usage of then means the function will only be called if the createOrder is happy
				checkList.addRow.call(checkList, data); // Yet again, call is not needed because checkList will already be 'this'
			},
			// promise failure
			function() {
				alert("Server unreachable, Try again later");
			});
		});

		// At the moment the addInputHandler is only tied to email address validation. This is just an example.
		formHandler.addInputHandler(Validation.isGmailAddress);
		
		webshim.polyfill('forms forms-ext');
		webshim.setOptions('forms', { addValidators: true, lazyCustomMessages: true });

		myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);
