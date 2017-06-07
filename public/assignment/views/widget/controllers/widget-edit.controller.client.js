/**
 * Created by Palaparthi on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController',EditWidgetController);
    
    function EditWidgetController($routeParams, $location, WidgetService) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];

        function init() {
            WidgetService.findWidgetById(model.wgid)
                .then(renderWidget, errorWidget);
        }

        init();

        //event handlers
        model.widgetUrl = widgetUrl;
        model.editHeading = editHeading;
        model.deleteWidget=deleteWidget;
        model.editImage=editImage;
        model.editYouTube=editYouTube;


        function widgetUrl(widget) {
            if(widget) {
                var url;
                if (widget.widgetType === 'HTML')
                    url = 'views/widget/templates/widget-heading-edit.view.client.html';
                else
                    url = 'views/widget/templates/widget-' + widget.widgetType.toLowerCase() + '-edit.view.client.html';
                return url;
            }
        }

        function editHeading() {
            var widgetHeading={
                _id: model.widget._id,
                widgetType: model.widget.widgetType,
                pageId: model.pid,
                size: model.widget.size,
                text: model.widget.text
            };
            WidgetService.updateWidget(model.wgid,widgetHeading)
                .then(redirectWidget, errorWidget);
        }
        
        function deleteWidget() {
            WidgetService.deleteWidget(model.wgid)
                .then(redirectWidget, errorWidget);
        }

        function editImage() {
            var widgetImage={
                _id: model.widget._id,
                widgetType: model.widget.widgetType,
                pageId: model.pid,
                width:model.widget.width,
                url: model.widget.url
            };
            WidgetService.updateWidget(model.wgid,widgetImage)
                .then(redirectWidget, errorWidget);
        }

        function editYouTube() {
            var widgetYouTube={
                _id: model.widget._id,
                widgetType: model.widget.widgetType,
                pageId: model.pid,
                width:model.widget.width,
                url: model.widget.url
            };
            WidgetService.updateWidget(model.wgid,widgetYouTube)
                .then(redirectWidget, errorWidget);;
        }

        function renderWidget(widget) {
            model.widget = widget;
            model.width = model.widget.width;
        }
        function errorWidget() {
            model.message = "Error!"
        }
        function redirectWidget() {
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget');
        }


    }
})();