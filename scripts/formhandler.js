(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  /*
    The selctor in this case should be a data-* marked HTML element.
    Its called like this:

    var formHandler = new FormHandler('[data-order = "form"]');

    where the HTML looks like this:

    <form data-order="form">
  */
  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    /*
      $(selector) is similar to document.querySelectAll, but jQuery returns
      an object which contains all matching elements
     */
    this.$formElement = $(selector);

    // Make sure there is at least one matching element
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  /*
    fn in this case is a call back which is used to pass in a function
    which is used to consume the data, typically in this case it will
    be used by a Truck to create an order. It is typically called like this

    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));

    Note that myTruck is bound to the callback (createOrder) so that the
    createOrder function has access to the values in myTruck
  */
  FormHandler.prototype.addSubmitHandler = function (fn) {
    // Intercept the post request from the submit button. this.$formElement
    // was defined in the constructor above.
    this.$formElement.on('submit', function (event) {
      // Inside of here, this points to the raw form HTML element
      event.preventDefault();
      var data = {};
      /*
        Calling JQuery with the HTML form, is what allows the serializeArray
        to be called, which returns all of the key/value pairs submitted
        from the HTML form.
      */
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      // data is passed, and also recall myTruck will become "this"
      // inside of the fn callback
      fn(data)
       // only reset the form if the callback succeeded
       .then(function() {
         this.reset();
         this.elements[0].focus();
       }.bind(this));
    });
  }

  FormHandler.prototype.addInputHandler = function (fn) {
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';

      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address';
        event.target.setCustomValidity(message);
      }
    });
  }

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
