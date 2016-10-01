var express = require('express');
var app = express();
var moment = require('moment');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/:param', function(req, res) {

  var input = req.params.param;
  var natural = null;
  var unix = null;

  // if string contains only digits > coerce and convert to ms
  !isNaN(input) && (input*= 1000);

  // momentjs will warn if we just pass a string, so we'll pass it a date obj
  input = new Date(input);

  if (moment(input).isValid()) {
    natural = moment(input).format('MMMM D, YYYY');
    unix = moment(input).unix();
  }

  res.json({ natural: natural, unix: unix });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Listening on: ' + port);
});
