/**
 * Created by Palaparthi on 5/25/17.
 */
(function(){
    angular
        .module('WebAppMaker')
        .factory('userService', userService);
    
    function userService($http) {

        var api={
            findUserById : findUserById,
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            createUser : createUser,
            updateUser : updateUser,
            deleteUser : deleteUser,
            login : login,
            loggedIn : loggedIn,
            logout : logout,
            register : register
        };
        return api;

        function findUserById(userId) {

            var url = '/api/user/'+userId;
            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });

        }

        function findUserByCredentials(username, password) {

            var url = '/api/user?username='+username+'&password='+password;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {

           var url = '/api/user?username='+username;

           return $http.get(url)
               .then(function(resp){
                   return resp.data;
               })

        }

        function createUser(user) {
            var url = '/api/user';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url = '/api/user/'+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function login(username, password) {
            var url = '/api/login';
            var credentials ={
                username: username,
                password: password
            };
            return $http.post(url,credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedIn(){
            var url = '/api/loggedIn';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function logout() {
            var url = '/api/logout';
            return $http.post(url    )
                .then(function (response) {
                    return response.data;
                });
        }
        
        function register(userObj) {
            var url = '/api/register';
            return $http.post(url,userObj)
                .then(function (response) {
                    return response.data;
                })

        }
    }
    
})();

