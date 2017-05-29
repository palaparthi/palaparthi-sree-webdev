(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var model=this;
        model.uid=$routeParams['uid'];
        model.websites=WebsiteService.findWebsitesByUser(model.uid);

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
            WebsiteService.createWebsite(model.uid,website);
            $location.url('/user/'+model.uid+'/website');
        }
    }
})();