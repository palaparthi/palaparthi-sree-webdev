/**
 * Created by Palaparthi on 5/28/17.
 */
(function (){
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController)

    function WidgetListController($routeParams, WidgetService, $sce){
        var model = this;
        model.uid=$routeParams['uid'];
        model.wid=$routeParams['wid'];
        model.pid=$routeParams['pid'];


        function init() {
            WidgetService.findWidgetsByPageId(model.pid)
                .then(renderWidgets, errorWidget);
        }

        init();

        //event handlers
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }
        function errorWidget() {
            model.message = "Error!"
        }
        function widgetUrl(widget) {
            // if(widget.type==='HTML')
            //     var url = 'views/widget/templates/widget-heading.view.client.html';
            // else
            var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }
})();