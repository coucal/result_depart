console.log("Angular");
var app = angular.module('stateapp', []);
app.controller('statecontroller', function($scope, LocationService) {
        $scope.DepartId = null;
        $scope.CantonId = null;
        $scope.DepartList = null;
        $scope.CantonList = null;
        $scope.CantonTextToShow = "Choisir un canton";
        $scope.result="";

        LocationService.GetDepart().then(function(d) {
            console.log(d.data)
            $scope.DepartList = d.data.results;
        }, function(error) {
            console.log(error);
            alert("error !");
        });

        $scope.GetCanton = function() {
            $scope.CantonId = null;
            $scope.CantonList = null;
            $scope.CantonTextToShow = "Un instant...";

            LocationService.GetCanton($scope.DepartId).then(function(d) {
                $scope.CantonList = d.data;
                console.log(d.data)
                $scope.CantonTextToShow = "Choisir un canton";
            }, function(error) {
                console.log(error);
                alert("error !");
            });
        }
        $scope.ShowResult = function() {
            $scope.Result = "Selected " + $scope.DepartId + " Canton Id:" + $scope.CantonId;
        }
    })
    .factory('LocationService', function($http) {
        var fac = {};

        fac.GetDepart = function() {
            console.log("GetDepart");
            return $http.get("http://www.citysearch-api.com/fr/departement?login=elections-app&apikey=so434425c17043e56ca7800d728bd5ca773977c3f1");
        }

        fac.GetCanton = function(DepartId) {
            console.log("GetCanton");
            return $http.get("http://docsa.fr:8080/depart/cantons/" + DepartId);
        }

        fac.GetResult = function(DepartId) {
            console.log("GetCanton");
            return $http.get("http://docsa.fr:8080/depart/result/" + DepartId);
        }

        return fac;
    });
