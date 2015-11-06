angular.module('RESTConnection', [])
.constant('ENDPOINT_URL', 'https://political-backend-pthiemann.c9.io/api/')
.service('UserService', ['$http', 'ENDPOINT_URL',
function($http, ENDPOINT_URL) {
    var service = this,
    path = 'Voters/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.create = function (user) {
        return $http.post(getUrl(), user);
    };
    service.login = function(user) {
        return $http.post(getUrl()+"login", user);
    }
    service.logout = function(token) {
        return $http({
            url: getUrl()+"logout",
            method: "POST",
            headers: {
                'Authorization': token
            }
        })
    }
    service.get = function(userID, token) {
        return $http({
            url: getUrl()+userID,
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
    }
    service.updateParty = function(userID, party, token) {
        return $http({
            url: getUrl()+userID,
            method: "PUT",
            data: {"Party": party},
            headers: {
                'Authorization': token,
            }
        })
    }
    service.updateCandidate = function(userID, candidate, token) {
        return $http({
            url: getUrl()+userID,
            method: "PUT",
            data: {"Candidate": candidate},
            headers: {
                'Authorization': token,
            }
        })
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
    service.upvote = function(partyID, token) {
        return $http({
            url: getUrl()+"upvote",
            method: "POST",
            headers: {
                'Authorization': token,
                'id': partyID
            }
        })
    }
    service.downvote = function(partyID, token) {
        return $http({
            url: getUrl()+"downvote",
            method:"POST",
            headers: {
                'Authorization': token,
                'id': partyID
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
    service.upvote = function(candidateID, token) {
        return $http({
            url: getUrl()+"upvote/",
            method: "POST",
            headers: {
                'Authorization': token,
                'id': candidateID
            }
        })
    }
    service.downvote = function(candidateID, token) {
        return $http({
            url: getUrl()+"downvote/",
            method:"POST",
            headers: {
                'Authorization': token,
                'id': candidateID
            }
        })    
    }
}]) 