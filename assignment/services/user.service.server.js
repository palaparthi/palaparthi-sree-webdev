/**
 * Created by Palaparthi on 6/1/17.
 */

var app = require("../../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];


app.get('/api/user/:userId', findUserById );
app.get('/api/user', findUser );
app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser)
//app.get('/api/user', findUserByUsername );


app.get('/api/users', findAllUsers );

function findAllUsers  (req, res) {
    res.send(users);
}


function findUserById(req, res) {

    var userId = req.params['userId'];
    for (var u in users){
        if(users[u]._id === userId){
            res.json(users[u]);
            return;
        }

    }
    res.json(null);

}

function findUserByUsername(req, res) {

    var username = req.query.username;
    for(var u in users){
        if(users[u].username === username){
             res.json(users[u]);
             return;
        }
    }
    //res.sendStatus(404);
    res.json(null);

}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    for(u in users){
        var found=null;
        if(users[u].username === username && users[u].password === password){
            res.json(users[u]);
            return;
        }

    }
    res.json(null);

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
    user._id = (new Date().getTime())+"";
    users.push(user);
    res.json(user);
    //return;
}

function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    //var user = findUserById(userId);
    //var index = users.indexOf(user);
    //users[index] = user;

    for(var u in users){
        if(users[u]._id === userId){
            users[u] = user;
            res.json(users[u]);
            return;
        }

    }
    return res.json(null);
}

function deleteUser(req, res) {

    var userId = req.params['userId'];

    var index = -1;
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
    }
}