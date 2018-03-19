(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order);
  }

  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  }

  Truck.prototype.printOrders = function (printFn) {
    /*
     .bind is generally considered to be less performant for these types of situations
     Here is a nice trick. I've read that it's 60% faster than doing a bind (though I haven't confirmed that anywhere).
     Not to say that bind can't be used...but in this case, self works better.
    */
    var self = this;
    return this.db.getAll()
     .then(function (orders) {
       var customerIdArray = Object.keys(orders);

       console.log('Truck #' + self.truckId + ' has pending orders:');
       customerIdArray.forEach(function (id) {
         console.log(orders[id]);
         if (printFn) {
           printFn(orders[id]);
         }
       });
     });
  }

  App.Truck = Truck;
  window.App = App;
}) (window);
