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

        //event handlers
        //model.widgets = WidgetService.findWidgetsByPageId(model.pid);
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        WidgetService.findWidgetsByPageId(model.pid)
            .then(renderWidgets, errorWidget);

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }
        function errorWidget() {
            model.message = "Error!"
        }
        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
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