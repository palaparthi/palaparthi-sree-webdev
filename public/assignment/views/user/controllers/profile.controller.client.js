/**
 * Created by Palaparthi on 5/25/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, userService) {

        var model = this; //instead of using $scope we bind this to instance of the controller
         model.userId = $routeParams['uid'];

         model.user = userService.findUserById(model.userId);


    }

}) ();
