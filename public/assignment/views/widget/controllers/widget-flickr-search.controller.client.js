/**
 * Created by Palaparthi on 6/4/17.
 */
(function (){
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, WidgetService,$location){
        var model = this;
        model.uid=$routeParams['uid'];
        model.wid=$routeParams['wid'];
        model.pid=$routeParams['pid'];
        model.wgid=$routeParams['wgid'];

        function init() {
            WidgetService.findWidgetById(model.wgid)
                .then(renderWidget, errorWidget);
        }

        init();

        //event handlers
        model.searchPhotos= searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {

                model.widget.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";
                WidgetService.updateWidget(model.wgid, model.widget)
                    .then(redirectWidget, errorWidget);

        }
        function redirectWidget() {
            $location.url("/user/"+model.uid+"/website/"+model.wid+"/page/"+model.pid+"/widget/"+model.wgid);
        }

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }

        function renderWidget(widget) {
            model.widget = widget;
        }

        function errorWidget(widget) {
            model.message = "Error!";
        }

    }
})();

