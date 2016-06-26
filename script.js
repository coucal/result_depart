console.log("Angular");
var app = angular.module('stateapp', []);
app.controller('statecontroller', function($scope, LocationService) {
        $scope.CountryId = null;
        $scope.StateId = null;
        $scope.CountryList = null;
        $scope.StateList = null;
        $scope.StateTextToShow = "Select State";
        $scope.result="";

        LocationService.GetCountry().then(function(d) {
            console.log(d.data)
            $scope.CountryList = d.data.results;
        }, function(error) {
            console.log(error);
            alert("error !");
        });

        $scope.GetState = function() {
            $scope.StateId = null;
            $scope.StateList = null;
            $scope.StateTextToShow = "Please wait..";

            LocationService.GetState($scope.CountryId).then(function(d) {
                scope.StateList = d.data;
                console.log(d.data)
                $scope.StateTextToShow = "Select State";
            }, function(error) {
                console.log(error);
                alert("error !");
            });
        }
        $scope.ShowResult = function() {
            $scope.Result = "Selected " + $scope.countryId + " State Id:" + $scope.StateId;
        }
    })
    .factory('LocationService', function($http) {
        var fac = {};

        fac.GetCountry = function() {
            console.log("GetCountry");
            return $http.get("http://www.citysearch-api.com/fr/departement?login=elections-app&apikey=so434425c17043e56ca7800d728bd5ca773977c3f1");
        }

        fac.GetState = function(countryId) {
            console.log("GetState");
            return $http.get("http://docsa.fr:8080/depart/cantons/" + countryId);
        }

        return fac;
    });
