var app = require('./express');
//var app = express();

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET

}));
/*app.use(session({
    secret: 'ishtam'

}));*/
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var port = process.env.PORT || 3000;
require("./assignment/app");
require("./project/app");
app.listen(port);