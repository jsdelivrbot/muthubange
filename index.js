var admin = require('firebase-admin');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var serviceAccount = require("./key/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://muthubange.firebaseio.com"
});

function writeUserData(userId, name, email) {
  console.log("call for writeuserdata");

  admin.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
}

writeUserData("111","test user1","afatahudu.com");



