/**
 * Created by Palaparthi on 6/3/17.
 */
var app = require("../../express");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite)

function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    website._id = (new Date().getTime())+"";
    website.developerId = userId;
    websites.push(website);
    res.sendStatus(200);
}

function findAllWebsitesForUser(req, res) {

    var userId = req.params['userId'];
    var website = [];
    for (var w in websites){
        if(websites[w].developerId === userId){
            websites[w].created = new Date();
            websites[w].accessed = new Date();
            website.push(websites[w])
        }
    }
    res.json(website);
}

function findWebsiteById(req, res){

    var websiteId = req.params['websiteId'];
    for(var w in websites){
        if(websites[w]._id === websiteId){
        res.json(websites[w]);
        return;
        }
     }
     res.json(null);
}

function  updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];
    for(w in websites){
        if(websites[w]._id === websiteId){
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(200);
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var index = -1;
    for (w in websites) {
        if (websites[w]._id === websiteId) {
            index = w;
        }
    }
    if(index != -1) {
        websites.splice(index, 1);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
}