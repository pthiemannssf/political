angular.module('RESTConnection', [])
.constant('ENDPOINT_URL', 'https://political-backend-pthiemann.c9.io/api/')
.service('UserService', ['$http', 'ENDPOINT_URL',
function($http, ENDPOINT_URL) {
    var service = this,
    path = 'Users/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.create = function (user) {
        return $http.post(getUrl(), user);
    };
    service.login = function(user) {
        return $http.post(getUrl()+"login", user);
    }
}])
.service('PartyService', ['$http', 'ENDPOINT_URL', 
function($http, ENDPOINT_URL) {
    var service = this,
    path = 'Parties/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.get = function (token) {
        return $http({
            url: getUrl(),
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
    }
}]) 
.service('CandidateService', ['$http', 'ENDPOINT_URL', 
function($http, ENDPOINT_URL) {
    var service = this,
    path = 'Candidates/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.get = function (token) {
        return $http({
            url: getUrl(),
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
    }
}]) 