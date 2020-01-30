

exports.Response = function(data, response, statusCode=200) {
  response.status(statusCode)
  const payload = {
    status: statusCode,
    data: data
  };
  response.json(payload);
  response.end();
}