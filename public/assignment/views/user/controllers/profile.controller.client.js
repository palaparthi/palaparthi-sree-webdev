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

         //event handlers
        model.update=update;

        function init() {
            userService.findUserById(model.userId)
                .then (renderUser, userError);
        }

        init();

        function renderUser(user) {
            if(user === null){
                model.error = 'User not found';
            }
            else model.user = user;
        }

        function userError(user) {
            model.error = 'User not found';
        }


        function update() {
            var usr={
                _id:model.user._id,
                username:model.user.username,
                password:model.user.password,
                firstName:model.user.firstName,
                lastName:model.user.lastName,
                email:model.user.email
            };
            userService.updateUser(model.userId,usr)
                .then(messageSuccess, messageFailure);

        function messageSuccess(user) {
            model.message = "Successfully updated the user !";
        }

        function messageFailure(user) {
                model.error = "Error updating";
            }
        }

    }

}) ();
