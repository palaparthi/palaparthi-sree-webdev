(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var model=this;
        model.uid=$routeParams['uid'];

        function init() {
            WebsiteService.findWebsitesByUser(model.uid)
                .then(renderWebsites, errorWebsite);
        }

        init();

        //event handlers
        model.create=create;

        function create(name, description) {
            if(name === '' || typeof name === 'undefined' || name === null)
            {
                model.message='Website Name is required';
                return;
            }
            var website={
                name:name,
                description:description
            };
            WebsiteService.createWebsite(model.uid,website)
                .then(websiteCreated, errorWebsite);

            function websiteCreated() {
                $location.url('/user/'+model.uid+'/website');
            }

        }

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function errorWebsite(website) {
            model.website = "Error!";
        }

    }
})();