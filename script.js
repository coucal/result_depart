console.log("Angular");
  var app=angular.module('stateapp',[]);
  app.controller('statecontroller',['$scope','$http',function($scope,$http) {
    console.log("scope");
    $http.get("http://www.citysearch-api.com/fr/departement?login=elections-app&apikey=so434425c17043e56ca7800d728bd5ca773977c3f1").then(function(response) {
      console.log(response.data);
      $scope.states=response.data.results;
    },function(err) {
      console.log(err);
    });
  }]);
