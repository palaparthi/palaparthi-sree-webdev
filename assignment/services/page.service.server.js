/**
 * Created by Palaparthi on 6/4/17.
 */
var app = require("../../express");
var pageModel = require('../model/page/page.model.server');

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/website/:websiteId/page/:pageId', deletePage);


function createPage(req, res) {

    var page = req.body;
    var websiteId= req.params['websiteId'];
    pageModel.createPage(websiteId , page)
        .then(function (page) {
            res.json(page);
        },function (err) {
            res.send(err);
        });
    /*
    page._id = (new Date().getTime())+"";
    page.websiteId = websiteId;
    pages.push(page);
    res.sendStatus(200);*/

}

function findAllPagesForWebsite(req, res) {

    var websiteId= req.params['websiteId'];
    pageModel.findAllPagesForWebsite(websiteId)
        .then(function (page) {
            res.json(page);
        },function (err) {
            res.send(err);
        });
/*    var page = [];
    for (var p in pages){
        if(pages[p].websiteId === websiteId){
            pages[p].created = new Date();
            pages[p].accessed = new Date();
            page.push(pages[p])
        }
    }
    res.json(page);*/
}

function findPageById(req, res){

    var pageId = req.params['pageId'];

    pageModel.findPageById(pageId)
        .then(function (page) {
            res.json(page);
        },function (err) {
            res.json(null);
        });
    /*for(var p in pages){
        if(pages[p]._id === pageId){
            res.json(pages[p]);
            return;
        }
    }
    res.json(null);*/
}

function updatePage(req, res) {

    var pageId = req.params['pageId'];
    var page = req.body;

    pageModel.updatePage(pageId,page)
        .then(function (page) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
/*
    for(var p in pages){
        if(pages[p]._id === pageId){
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
*/

}

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var websiteId = req.params['websiteId'];
    //var page = req.body;

    pageModel.deletePage(websiteId, pageId)
        .then(function (page) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
   /* var index =-1;
    for(var p in pages){
        if(pages[p]._id === pageId){
        index = p;
        }
    }
    if(index != -1) {
        pages.splice(index, 1);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }*/
}