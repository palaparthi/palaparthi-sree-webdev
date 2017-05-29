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

        function createHeading() {
            var widgetHeading={
                widgetType: "HEADING",
                size: 0,
                text: ""
            };
            wdgt=WidgetService.createWidget(model.pid,widgetHeading);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget/'+wdgt._id);
        }

        function createImage() {
            var widgetImage={
                widgetType: "IMAGE",
                width:"100%",
                url:""
            };
            wdgt=WidgetService.createWidget(model.pid,widgetImage);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget/'+wdgt._id);
        }

        function createYouTube() {
            var widgetYouTube={
                widgetType: "YOUTUBE",
                width:"100%",
                url:""
            };
            wdgt=WidgetService.createWidget(model.pid,widgetYouTube);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget/'+wdgt._id);
        }
    }
})();