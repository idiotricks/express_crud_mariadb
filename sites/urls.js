'use strict';

module.exports = function(app) {
  var controllers = require('./controllers');

  app.route('/').all(controllers.sites);
}

