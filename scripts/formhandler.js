// jQuery handling of input form in index.html

(function (window) {
	'use strict';
	var App = window.App || {};
	
	// Import jQuery
	var $ = window.jQuery;

	/*
		Constructor
		
		The selector in this case should be a data-* marked HTML element.
		It should be called like this:

			var formHandler = new FormHandler('[data-order = "form"]');

		where the HTML looks like this:

		<form data-order="form">
	*/
	function FormHandler(selector) {
		if (!selector) {
			throw new Error("No selector provided");
		}

		/*
			$(selector) is similar to document.querySelectAll, jQuery returns
			an object which contains a jQuery object that wraps around all 
			matching DOM elements in a jQuery way (thus not entirely like
			document.querySelectAll). Its called a jQuery-wrapped-collection.
			
			In the case of $formElement, the '$' in that case simply indicates 
			it contains elements selected by jQuery. Note that $formElement is
			stored as an "instance variable" by using this, meaning it can be 
			used by other functions added to the prototype, without needing to 
			perform the query each time.
			
			To be clear, in this case, because there is only a single form in 
			the index.html, this.$formElement points at the HTML form element, 
			and it is not in any way wrapped in jQuery. In fact in code below,
			it needs to be re-wrapped in jQuery to get access to jQuery methods.
		 */
		this.$formElement = $(selector);

		// Make sure there is at least one matching element
		if (this.$formElement.length === 0) {
			throw new Error('Could not find element with selector: ' + selector);
		}
	}

	/*
		addSubmitHandler - intercept the post from the input form
		
		fn in this case is a call back which is used to pass in a function
		which is used to consume the data, typically in this case it will
		be used by a Truck to create an order. It is typically called like this

			formHandler.addSubmitHandler(myTruck.createOrder);

		Note that myTruck in this example is bound to the callback function 
		(createOrder) so that the createOrder function has access to the values 
		in myTruck via this, even though as you will see below, we override the 
		myTruck 'this' because we want it to the the form HTML element. 

		This method (addSubmitHandler) simply grabs all of the data from the input
		form, and puts it into a single object as key value pairs. It doesn't 
		perform any interpretation of the data.
	*/
	FormHandler.prototype.addSubmitHandler = function (fn) {
		// Intercept the post request from the submit button using jQuery on.
		// It is somewhat similar to an addEventListener. 
		
		// Note that "this.$formElement" is defined in the constructor above,
		// and note that inside of the "on" method, this points at the HTML
		// element pointed at by this.$formElement.
		this.$formElement.on('submit', function (event) {
			// Intercept the post by preventing the default action
			event.preventDefault();
			
			// data will contain the information returned from the form
			var data = {};
			
			/*
				Calling JQuery with the HTML form, is what allows the serializeArray
				to be called, which returns all of the key/value pairs submitted
				from the HTML form. Note that we are wrapping the HTML for (ie. this)
				in jQuery using he '$' so we have access to the serializeArray method.
			*/
			$(this).serializeArray().forEach(function (item) {
				// Translate the array of data items from the input form into a single object
				data[item.name] = item.value;
				console.log(item.name + ' is ' + item.value);
			});
			console.log(data);
			
			// data object is passed to the callback without any further processing. Also recall 
			// myTruck would become "this" inside of the fn callback code here, but we want
			// this to be the form HTML element, so we are using bind to replace myTruck.
			fn(data)
			 // only reset the form if the callback succeeded
			 .then(function() {
				 // Reset the form after data submission
				 this.reset();
				 // Return focus back to the first element after form submission
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
