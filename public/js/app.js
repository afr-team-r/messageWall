var app = angular.module('messageWall', []);

/*app.factory('taskService', function($http) {
    
    var service = {};
    
    service.tasks = {};
    
    service.getTasks = function() {
        
        $http.post('http://127.0.0.1:8080/all').
            success(function(data) {
                service.tasks = data;
            alert(service.tasks.values);
            });  
        
        alert(service.tasks.values);
        return service.tasks.values;
    };
    
    return service;    
});

app.run(function(taskService) {
    taskService.getTasks();
}); */

app.controller('messageController', function($scope, $http) {
    
    $scope.task = {};
    
    $scope.refreshTasks = function() {
       $http.post('http://127.0.0.1:8080/all').
            success(function(data) {
                $scope.tasks = data.values;
            });   
    };
    
    $scope.addTask = function() {
        $http.post('http://127.0.0.1:8080/add', $scope.task);
        $scope.task = {};
    };
    
    setInterval($scope.refreshTasks, 1000);
});