(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-order = "form"]';
    var CHECKLIST_SELECTOR = '[data-order = "checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders'; // I see you're storing the data when it is saved, but it is not being loaded when the page loads. Are you data mining??
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    /*
    remoteDs is an unused variable. The goal for JS applications is to keep them as small as possible
    So, unused code is frowned upon when going to a production site.
    The less code, the faster the site loads.
    One line won't make a huge difference, but RemoteDataStore gets invoked regardless. If it had
    tons of logic, then it would be invoked needlessly. Javascript is single threaded, so the
    browser will wait the few microseconds till this line is done before moving onto the next.
    */
    var remoteDs = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701', new DataStore());
    // var myTruck = new Truck('ncc-1701', remoteDs);
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck)); // bind() is unnecessary in this case since deliverOrder() will receive implied context of whatever is left of the '.' on invocation
    var formHandler = new FormHandler(FORM_SELECTOR);
    // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    formHandler.addSubmitHandler(function (data) {
      return myTruck.createOrder.call(myTruck, data)
       .then(function() {
        checkList.addRow(data); // The call() here is unnecessary for the same reason as above
      });
    });

    formHandler.addInputHandler(Validation.isGmailAddress);

    myTruck.printOrders(checkList.addRow()); // same here with bind()
})(window);
