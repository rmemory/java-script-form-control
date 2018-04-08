This project is an example of usage of JavaScript, jQuery, basic bootstrap, and HTML forms.

There are no fancy graphics here, and in fact nothing more than a pretty basic usage of Bootstrap. But, 
it is a decent example of Java Script modules, jQuery usage, simple validation, and promises and deferreds.

A quick way to test it is to use browswer-start after installing NodeJS and NPM, cloning this repo, and cd'ing to the clone.

curl -sL https://deb.nodesource.com/setup | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g browser-sync

browser-sync start --server --browser "Google Chrome" --files "stylesheets/*.css *.html scripts/*.js"
