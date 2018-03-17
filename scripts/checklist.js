(function (window) {
  'use strict';
  var App = window.App || {};

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler= function(fn) {
    this.$element.on('click', 'input', function(event) {
      var email = event.target.value;
      fn(email)
       .then(function() {
         this.removeRow(email);
       }.bind(this));
    }.bind(this));
  }

  CheckList.prototype.addRow = function (order) {
    this.removeRow(order.emailAddress);

    var rowElement = new Row(order);

    this.$element.append(rowElement.$element)
  }

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-order="checkbox"]')
      .remove();
  }

  // Private
  function Row(order) {
    var $div = $('<div></div>', {
      'data-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: order.emailAddress
    });

    var description = order.size + ' ';
    if (order.groupSelection) {
      description += order.groupSelection + ' ';
    }
    description += order.order + ", ";
    description += ' (' + order.emailAddress + ')';
    description += ' [' + order.sliderLevel + 'x]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    // this.$element name has no meaning. It is simply returned from
    // Row() when a Row object is new'd up.
    this.$element = $div;
  }



  App.CheckList = CheckList;
  window.App = App;
}) (window);
