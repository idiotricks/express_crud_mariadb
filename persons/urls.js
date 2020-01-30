'use strict';

module.exports = function(app) {
  var controllers = require('./controllers');

  app.route('/persons').all(controllers.persons);
  app.route('/persons').post(controllers.persons);
  app.route('/persons/:id').get(controllers.person);
  app.route('/persons/:id').patch(controllers.person);
  app.route('/persons/:id').delete(controllers.person);
}