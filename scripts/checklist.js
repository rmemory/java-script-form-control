(function (window) {
	'use strict';
	var App = window.App || {};
	var $ = window.jQuery;

	function CheckList(selector) {
		if (!selector) {
			throw new Error('No selector provided');
		}

		/* As described in formhandler.js, this is like document.querySelectorAll,
			 although its a jQuery wrapped collection. In this case it will point
			 at the div for the checklist 

			 <div data-order="checklist">
		 */
		this.$element = $(selector);
		if (this.$element.length === 0) {
			throw new Error('Could not find element with selector: ' + selector);
		}
	}

	/*
		Callers of addClickHandler must bind the proper this object, otherwise
		when fn is called, it won't have any knowledge of any of its local 
		data.
	 */
	CheckList.prototype.addClickHandler= function(fn) {
		// 'this' at this location in the code refers to the CheckList object
		var self = this;
		
		this.$element.on('click', 'input', function(event) {
			var email = event.target.value;
			fn(email) // as mentioned above, make sure fn has properly called bind
			 .then(function() {
				 self.removeRow(email);
			 });//.bind(this));
		});//.bind(this));
	}

	/*
	 * addRow to live HTML
	 */
	CheckList.prototype.addRow = function (order) {
		// Make sure an existing order using the same email address doesn't exist
		this.removeRow(order.emailAddress);

		// New up a Row, obtaining the HTML subtree it creates
		var rowElement = new Row(order);

		// this.$element is from the CheckList constructor
		this.$element.append(rowElement.$element)
	}

	/* 
	 * removeRow from live HTML
	 */
	CheckList.prototype.removeRow = function (email) {
		// Look for an input element which has a value of the email address
		// Recall when creating the checkbox, we added the value=somebody@gmail.com
		// so we could find it later (ie. here).
		this.$element
			.find('[value="' + email + '"]')
			// Ancestor must have data-order="checkbox"
			.closest('[data-order="checkbox"]')
			.remove();
	}

	// Private
	/* Using jQuery dynamically create a checkbox, see the comments in index.html
		 for an example. */
	function Row(order) {
		/* Use jQuery to create the div element. The format is:
			$(firstArg, secondArg), where first arg is the elements to create,
			and the second arg is a JSON object of key value pairs which are the
			attributes added to the element. The dash character (-) in data-order requires 
			the quoting, and class is a keyword so it too needs quoting */
		var $div = $('<div></div>', {
			'data-order': 'checkbox',
			'class': 'checkbox'
		});

		// Use jQuery to create a label tag, with no attributes
		var $label = $('<label></label>');

		// Use jQuery to create an input label, with type and value attributes
		var $checkbox = $('<input></input>', {
			type: 'checkbox',
			// Setting the value to the emailAddress associates the checkbox with the emailAddress
			// of the order
			value: order.emailAddress
		});

		// create the text
		var description = order.size + ' ';
		
		// groupSelection might be blank
		if (order.groupSelection) {
			description += order.groupSelection + ' ';
		}
		description += order.order + ", ";
		description += ' (' + order.emailAddress + ')';
		description += ' [' + order.sliderLevel + 'x]';

		// Add the input element and description text to the label
		$label.append($checkbox);
		$label.append(description);
		// Add the label to the div
		$div.append($label);

		// Usage of this.$element here in the Row constructor isn't pointing
		// at the this.$element created in the CheckList constructor. It
		// becomes part of the implied return statement from Row. 
		this.$element = $div;
	}

	App.CheckList = CheckList;
	window.App = App;
}) (window);
