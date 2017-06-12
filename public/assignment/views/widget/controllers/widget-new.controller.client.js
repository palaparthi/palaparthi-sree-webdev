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
        model.createText=createText;

        function createHeading() {
            var widgetHeading={
                type: "HEADING",
                size: 1,
                text: ""
            };
            WidgetService.createWidget(model.pid,widgetHeading)
                .then(redirectWidget, errorWidget);
        }

        function createhtml() {
            var widgethtml={
                type: "HTML",
                text: ""
            };
            wdgt=WidgetService.createWidget(model.pid,widgethtml)
                .then(redirectWidget, errorWidget);
        }

        function createImage() {
            var widgetImage={
                type: "IMAGE",
                width:"100%",
                url:""
            };
            wdgt=WidgetService.createWidget(model.pid,widgetImage)
                .then(redirectWidget, errorWidget);
        }

        function createText() {
            var widgetText={
                type: "TEXT",
                text:"",
                rows:0,
                placeholder:"",
                formatted:false
            };
            wdgt=WidgetService.createWidget(model.pid,widgetText)
                .then(redirectWidget, errorWidget);
        }


        function createYouTube() {
            var widgetYouTube={
                type: "YOUTUBE",
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