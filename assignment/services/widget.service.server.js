/**
 * Created by Palaparthi on 6/4/17.
 */
var app = require('../../express');


var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var widgetModel = require("../model/widget/widget.model.server");

/*var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "order":1},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order":2},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/", "order": 3},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": 4},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": 5},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E", "order": 6},
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": 7}
];*/

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/page/:pageId/widget/:widgetId', deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget", reorderWidget);

function createWidget(req, res) {

    var pageId = req.params['pageId'];
    var widget = req.body;

    widgetModel.createWidget(pageId,widget)
        .then(function (widget) {
            res.json(widget)
        }, function (err) {
            res.send(err);
        });
    /*widget._id = (new Date().getTime())+"";
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);*/
}

function findAllWidgetsForPage(req, res) {

    var pageId = req.params['pageId'];

    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widget) {
            res.json(widget)
        }, function (err) {
            res.send(err);
        });
    /*var widget = [];
    for(var w in widgets)
    {
        if(widgets[w].pageId === pageId)
        {
            widget.push(widgets[w]);
        }
    }
     res.json(widget);*/
}

function findWidgetById(req, res) {

    var widgetId = req.params['widgetId'];

    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget)
        }, function (err) {
            res.json(null);
        });
    /*for(var w in widgets){
        if(widgets[w]._id === widgetId){
             res.json(widgets[w]);
             return;
        }
    }
    res.json(null);*/
}

function updateWidget(req, res) {

    var widgetId = req.params['widgetId'];
    var widget=req.body;

    widgetModel.updateWidget(widgetId,widget)
        .then(function (widget) {
            res.sendStatus(200)
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}

function deleteWidget(req, res) {

    var widgetId = req.params['widgetId'];
    var pageId = req.params['pageId'];
    widgetModel.deleteWidget(pageId,widgetId)
        .then(function (widget) {
            res.sendStatus(200)
        }, function (err) {
            res.sendStatus(404);
        });
    /*var index = -1;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            index = w;
        }
    }
    if(index != -1) {
        widgets.splice(index, 1);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }*/

}



function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget = null;
    /*for(var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widget = widgets[w];
            break;
        }
    }*/
    widget=widgetModel.findWidgetById(widgetId);

    //widget.url = '/assignment/uploads/'+filename;

    var w={
        url:'/assignment/uploads/'+filename
    };

    widgetModel.updateWidget(widgetId,w)
        .then(function(){
            var callbackUrl   = "/assignment/#!/website/"+websiteId+'/page/'+pageId+'/widget/'+widgetId;
            res.redirect(callbackUrl);
        });
}

/*function reorderWidget(req, res){
    var startIndex = req.query['initial'];
    var stopIndex = req.query['final'];
    var pageId = req.params['pageId'];
    var widgets=widgetModel.find( {_id: id } )
        .sort( { order: 1 } );
    console.log(widgets);
    var initial_widgets=widgets;
    var wdgts=[];
    //widgets=wdgts;
    var index1=0;
    var index2=0;
    for(var w in widgets)
    {
        if(widgets[w].pageId === pageId)
        {
            wdgts.push(widgets[w]);
        }
    }

    var widget=wdgts[startIndex];
    wdgts.splice(startIndex,1);
    wdgts1 = wdgts.slice(0,stopIndex);
    wdgts2 = wdgts.slice(stopIndex,wdgts.length);
    wdgts1.push(widget);
    wdgts1=wdgts1.concat(wdgts2);
    var finalWidget=[];
    var index=0;
    while(index2<initial_widgets.length)
    {
        if(initial_widgets[index2] === wdgts1[index1])
        {
            finalWidget[index++]=initial_widgets[index2];
            index1++;
            index2++;
        }
        else if(wdgts1.indexOf(initial_widgets[index2]) === -1)
        {
            finalWidget[index++] = initial_widgets[index2++];
        }
        else if(wdgts1.indexOf(initial_widgets[index2]) >= 0)
        {
            finalWidget[index++] = wdgts1[index1++];
            index2++;
        }
    }
    widgets=finalWidget;
    res.json(widgets);
}*/
function reorderWidget(req, res){
    var pageId = req.params['pageId'];
    var startIndex = parseInt(req.query.initial);
    var endIndex = parseInt(req.query.final);
    widgetModel.reorderWidget(pageId, startIndex, endIndex)
        .then(function (widget) {
            res.json(widget);
        }, function (error) {
            res.sendStatus(500).send(error);
        })
}