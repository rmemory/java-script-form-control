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

		// var remoteDs = new RemoteDataStore(SERVER_URL);
		// var myTruck = new Truck('ncc-1701', remoteDs);
		var myTruck = new Truck('ncc-1701', new DataStore());
		window.myTruck = myTruck;
		
		var checkList = new CheckList(CHECKLIST_SELECTOR);
		checkList.addClickHandler(myTruck.deliverOrder);
		
		var formHandler = new FormHandler(FORM_SELECTOR);
		// formHandler.addSubmitHandler(myTruck.createOrder);
		formHandler.addSubmitHandler(function (data) {
			return myTruck.createOrder.call(myTruck, data)
			 .then(function() {
				checkList.addRow.call(checkList, data);
			});
		});

		formHandler.addInputHandler(Validation.isGmailAddress);

		myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);
