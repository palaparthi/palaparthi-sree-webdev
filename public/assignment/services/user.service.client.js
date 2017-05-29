/**
 * Created by Palaparthi on 5/25/17.
 */
(function(){
    angular
        .module('WebAppMaker')
        .factory('userService', userService)
    
    function userService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api={
            findUserById : findUserById,
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            createUser : createUser,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;

        function findUserById(userId) {

            for (var u in users){
                if(users[u]._id === userId){
                    return users[u];
                }

            }
            return null;

        }

        function findUserByCredentials(username, password) {
            for(u in users){
                var found=null;
                if(users[u].username === username && users[u].password === password){
                    found = users[u];
                    return found;

                }

            }
           return found;
        }
        function findUserByUsername(username) {
            //return users.find(function (user) {
             //   user.username === username;

    //        }
           for(var u in users){
               if(users[u].username === username){
                   return users[u];
               }
           }
           return null;

        }

        function createUser(user) {
            user._id = (new Date().getTime())+"";
            users.push(user);
            return user; // not specified in requirement document
        }
        function updateUser(userId, user) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users[index] = user;
        }
        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index,1);
        }
    }
    
})();

