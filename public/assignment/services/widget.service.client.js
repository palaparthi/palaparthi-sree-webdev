/**
 * Created by Palaparthi on 5/28/17.
 */
(function() {
    angular
        .module('WebAppMaker')
        .factory('WidgetService', WidgetService)

    function WidgetService($http) {
        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            /*widget._id = (new Date().getTime())+"";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;*/
            var url='/api/page/'+pageId+'/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findWidgetsByPageId(pageId) {
            /*var widget = [];
            for(var w in widgets)
            {
                if(widgets[w].pageId === pageId)
                {
                    widget.push(widgets[w]);
                }
            }
            return widget;*/
            var url = '/api/page/'+pageId+'/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findWidgetById(widgetId) {
            /*for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    return widgets[w];
                }
            }*/
            var url = '/api/widget/'+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWidget(widgetId, widget) {
           /*var oldWidget = findWidgetById(widgetId);
           var index = widgets.indexOf(oldWidget);
           widgets[index] = widget;*/
           var url='/api/widget/'+widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }
    
        function deleteWidget(widgetId) {
            /*var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index,1);*/
            var url='/api/widget/'+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
    
})();