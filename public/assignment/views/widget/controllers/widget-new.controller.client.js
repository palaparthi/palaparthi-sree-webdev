/**
 * Created by Palaparthi on 5/28/17.
 */
(function (){
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController',NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var model=this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];

        //event handlers
        model.createHeading=createHeading;
        model.createImage=createImage;
        model.createYouTube=createYouTube;
        model.createhtml=createhtml;

        function createHeading() {
            var widgetHeading={
                widgetType: "HEADING",
                size: 1,
                text: ""
            };
            WidgetService.createWidget(model.pid,widgetHeading)
                .then(redirectWidget, errorWidget);
        }

        function createhtml() {
            var widgethtml={
                widgetType: "HTML",
                text: ""
            };
            wdgt=WidgetService.createWidget(model.pid,widgethtml)
                .then(redirectWidget, errorWidget);
        }

        function createImage() {
            var widgetImage={
                widgetType: "IMAGE",
                width:"100%",
                url:""
            };
            wdgt=WidgetService.createWidget(model.pid,widgetImage)
                .then(redirectWidget, errorWidget);
        }

        function createYouTube() {
            var widgetYouTube={
                widgetType: "YOUTUBE",
                width:"100%",
                url:""
            };
            wdgt=WidgetService.createWidget(model.pid,widgetYouTube)
                .then(redirectWidget, errorWidget);
        }

        function redirectWidget(wdgt){
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget/'+wdgt._id);
        }

        function errorWidget(){
            model.message = "Error!"
        }
    }
})();