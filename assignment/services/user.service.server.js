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

/*
app.get('/api/user', findAllUsers );

function findAllUsers  (req, res) {
    res.send(users);
}
*/

function findUserById(req, res) {

    var userId = req.params['userId'];
    for (var u in users){
        if(users[u]._id === userId){
            res.send(users[u]);
            return;
        }

    }
    res.sendStatus(404);

}