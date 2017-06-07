/**
 * Created by Palaparthi on 5/26/17.
 */
(function () {

    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController)

    function EditWebsiteController(WebsiteService, $routeParams,$location) {
        var model = this;

        model.uid = $routeParams['uid'];
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
            model.website = "Error!";
        }


        function deleteWebsite() {

            WebsiteService.deleteWebsite(model.wid)
                .then(redirectWebsite,errorWebsite);

        }

        function updateWebsite(name, description) {

            var website = {
                _id: model.website._id,
                name: model.website.name,
                developerId: model.uid,
                description: model.website.description
            };

            WebsiteService.updateWebsite(model.wid, website)
                .then(redirectWebsite, errorWebsite);

        }
        function redirectWebsite() {
            $location.url('/user/'+model.uid+'/website');
        }
    }
})();
