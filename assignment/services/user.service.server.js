/**
 * Created by Palaparthi on 6/1/17.
 */

var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
/*var googleConfig = {
    clientID     : '181107453234-ub094pacp8p4j1bkb3sniht8ga8fj64e.apps.googleusercontent.com',
    clientSecret : '3H2V1OlhZPGUUjTxOdOKuaQq',
    callbackURL  : 'http://localhost:3000/auth/google/callback'
};*/
passport.use(new GoogleStrategy(googleConfig, googleStrategy));



/*var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];*/


app.get('/api/user/:userId', findUserById );
app.get('/api/user', findUser );
app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.get('/api/users', findAllUsers );
app.post('/api/login', passport.authenticate('local'),login);
app.get('/api/loggedIn', loggedIn);
app.post('/api/logout',logout);
app.post('/api/register',register);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

function findAllUsers  (req, res) {
    res.send(users);
}


function findUserById(req, res) {

    var userId = req.params['userId'];

    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.json(null);
        })
    /*for (var u in users){
        if(users[u]._id === userId){
            res.json(users[u]);
            return;
        }

    }
    res.json(null);*/

}

function findUserByUsername(req, res) {

    var username = req.query.username;

    userModel.findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.json(null)
        });
    /*for(var u in users){
        if(users[u].username === username){
             res.json(users[u]);
             return;
        }
    }
    res.json(null);*/

}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    userModel.findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.json(null)
        });
    /*for(u in users){
        var found=null;
        if(users[u].username === username && users[u].password === password){
            res.json(users[u]);
            return;
        }

    }
    res.json(null);*/

}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    
    if (username && password){
        findUserByCredentials(req, res);
    }
    else if(username && typeof password === 'undefined') {
        findUserByUsername(req,res);
    }
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.send(err)
        });

    /*user._id = (new Date().getTime())+"";
    users.push(user);
    res.json(user);*/
}

function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;

    userModel.updateUser(userId,user)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.json(null);
        });
/*    for(var u in users){
        if(users[u]._id === userId){
            users[u] = user;
            res.json(users[u]);
            return;
        }

    }
    return res.json(null);*/
}

function deleteUser(req, res) {

    var userId = req.params['userId'];

    userModel.deleteUser(userId)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.sendStatus(404);
        });
/*    var index = -1;
    for(var u in users){
        if(users[u]._id === userId){
            index =u;
        }
    }
    if(index !== -1){
    users.splice(index,1);
    res.json(users[u]);
    resp.sendStatus(200);
    }
    else{
        resp.sendStatus(404);
    }*/
}

function localStrategy(username, password, done) {
    userModel.findUserByUsername(username)
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)){
                done(null, user);
            }
            else{
                done(null,false);
            }
        },function (error) {
            done(null,false);
        })
}

function login(req, res) {
    res.json(req.user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function loggedIn(req, res) {
    if(req.isAuthenticated()){
        res.json(req.user);
    }
    else{
        res.send('0');
    }
}

function logout(req,res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel.createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status)
            });
        })
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    //var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  email,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}