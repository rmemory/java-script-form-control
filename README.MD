This project is an example of usage of JavaScript, jQuery, basic bootstrap, and HTML forms.

There are no fancy graphics here, and in fact nothing more than a pretty basic usage of Bootstrap. But, 
it is a decent example of Java Script modules, jQuery usage, simple validation, and promises and deferreds.

Promises provide a way to handle async code in a manageable way. They allow the code to be easily structured so
that the next steps occur if the current one finishes without error.

Promise objects are always in one of three states: pending, fulfilled, or rejected. Deferred objects only
all callbacks to e registers for fulfilled and rejected (not pending).

Every Promise object has a then method that is triggered when thhe Promise becomes fulfilled. At this point the
callback is invoked, passing whatever value was returned from the previous Promise step. Multiple promises can
be chained together.

datastore.js provides an example of using promises, where as remotedatastore just returns the deferreds 
from jQuery.

A quick way to test it is to use browswer-start after installing NodeJS and NPM, cloning this repo, and cd'ing to the clone.

curl -sL https://deb.nodesource.com/setup | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g browser-sync

browser-sync start --server --browser "Google Chrome" --files "stylesheets/*.css *.html scripts/*.js"
