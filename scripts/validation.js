(function (window) {
  'use strict';

  var App = window.App || {};
  var Validation = {
    isGmailAddress: function(email) {
      return /.+@gmail\.com$/.test(email);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
