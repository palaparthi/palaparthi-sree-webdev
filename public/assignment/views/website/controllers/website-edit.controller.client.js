/**
 * Created by Palaparthi on 5/26/17.
 */
(function () {

    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController(WebsiteService, $routeParams,$location, currentUser) {
        var model = this;

        //model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];

        //event handlers
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(model.uid)
                .then(renderWebsites, errorWebsite);

            WebsiteService.findWebsiteById(model.wid)
                .then(renderWebsite, errorWebsite);

        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = website;
        }

        function errorWebsite(website) {
            model.error = "Error!";
        }


        function deleteWebsite() {

            WebsiteService.deleteWebsite(model.uid,model.wid)
                .then(redirectWebsite,errorWebsite);

        }

        function updateWebsite() {
            if(typeof model.website.name==='undefined' || model.website.name ==='')
            {
                model.error='Website Name is required';
            }
            else {
                var website = {
                    _id: model.website._id,
                    name: model.website.name,
                    developerId: model.uid,
                    description: model.website.description
                };

                WebsiteService.updateWebsite(model.wid, website)
                    .then(redirectWebsite, errorWebsite);
            }

        }

        function redirectWebsite() {
            $location.url('/website');
        }
    }
})();
