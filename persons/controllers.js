'use strict';

var responses = require('../utils/responses');
var Person = require('./Person'); // from .models import Person


exports.persons = async function(request, response) {
  let rows = null;
  const person = new Person();

  if (request.method === 'GET') {
    rows = await person.all();
    responses.Response(rows, response);
  } 

  else if (request.method === 'POST') {
    person.setFirstName(request.body.firstName);
    person.setLastName(request.body.lastName);

    rows = person.create();
    responses.Response(rows, response, 201);
  }
}


exports.person = async function(request, response) {
  let id = request.params.id;
  let rows = null;
  const person = new Person();

  if (request.method === 'GET') {
    person.setId(id);
    rows = await person.get();
    responses.Response(rows, response);
  }

  else if (request.method === 'PATCH') {
    person.setId(id);
    person.setFirstName(request.body.firstName);
    person.setLastName(request.body.lastName);
    rows = await person.update();
    responses.Response(rows, response);
  }

  else if (request.method === 'DELETE') {
    person.setId(id);
    rows = await person.delete();
    responses.Response(rows, response);
  }
}
