/**
 * Created by Palaparthi on 6/10/17.
 */

var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");

var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget =reorderWidget;


module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
      return widgetModel.find({_page:pageId})
         .then(function(widgets){
             widget.position = widgets.length;
              return widgetModel.create(widget)
                 .then(function (widget) {
                     pageModel.addWidget(pageId, widget._id);
                     return widget;
                 });

         })

}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId})
        .sort( { position: 1 } );
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id:widgetId}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return widgetModel.remove({_id:widgetId})
        .then(function (status) {
            return pageModel.deleteWidget(pageId,widgetId);
        });
}


function reorderWidget(pageId, startIndex, endIndex){
    return widgetModel.find({_page:pageId},function (err, widgets) {
        widgets.forEach(function (widget) {
            if (startIndex < endIndex) {
                if(widget.position === startIndex){
                widget.position = endIndex;
                widget.save();
            }
            else if (widget.position > startIndex && widget.position <= endIndex) {
                widget.position = widget.position - 1;
            }
        } else {
                if (widget.position === startIndex) {
                    widget.position = endIndex;
                    widget.save();
                }
                else if (widget.position < startIndex && widget.position >= endIndex) {
                    widget.position = widget.position + 1;
                    widget.save();
                }
            }
        });
    });
}