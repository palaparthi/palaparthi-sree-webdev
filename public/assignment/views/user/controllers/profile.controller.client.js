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

         //model.user = userService.findUserById(model.userId);
        userService.findUserById(model.userId)
            .then (renderUser, userError);

        function renderUser(user) {
            model.user = user;
        }

        function userError(user) {
            model.error = 'User not found';
        }
        //event handlers
        model.update=update;

        function update() {
            var usr={
              //{_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
                _id:model.user._id,
                username:model.user.username,
                password:model.user.password,
                firstName:model.user.firstName,
                lastName:model.user.lastName
            };
            userService.updateUser(model.userId,usr);
        }

    }

}) ();
