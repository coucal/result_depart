console.log("Angular");
var app = angular.module('stateapp', []);
app.controller('statecontroller', function($scope, LocationService) {
        $scope.DepartId = null;
        $scope.CantonId = null;
        $scope.DepartList = null;
        $scope.CantonList = null;
        $scope.NumTour="1";
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
            $scope.Resultat=null;
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
            LocationService.GetResult($scope.DepartId, $scope.CantonId, $scope.NumTour).then(function(d) {
                $scope.Resultat = d.data;
                console.log(d.data)
                $scope.Display = "Selected " + $scope.DepartId + " Canton Id:" + $scope.CantonId+ " Tour: "+ $scope.NumTour;
              }, function(error) {
                console.log(error);
                alert("error !");
            });
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
            return $http.get("http://api.docsa.fr/depart/cantons/" + DepartId);
        }

        fac.GetResult = function(DepartId, CantonId, NumTour) {
            console.log("GetResult");
            return $http.get("http://api.docsa.fr/depart/resultats/"+ NumTour+ "/" + DepartId+"/"+CantonId);
        }

        return fac;
    });
