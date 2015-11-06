
/*global tempCandidate*/
angular.module('starter.controllers', [])
.controller('LoginCtrl', ['$scope', '$state', 'UserService', '$ionicHistory', '$window', 'CandidateService', 'PartyService', function($scope, $state, UserService, $ionicHistory, $window, CandidateService, PartyService) {
    $scope.user = {};
    $scope.loginSubmitForm = function(form)
    {
        if(form.$valid)
        {
            UserService.login($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    console.log(response);
                    console.log(response.data);
                    $window.localStorage["userID"] = response.data.userId;
                    $window.localStorage['token'] = response.data.id;
                    $ionicHistory.nextViewOptions({
                        historyRoot: true,
                        disableBack: true
                    });
                    CandidateService.get($window.localStorage['token'])
                    .then(function(response) {
                        if (response.status === 200) {
                            window.localStorage['candidates'] = response.data;
                            console.log(response.data);
                            console.log(window.localStorage['candidates']);
                        } else {
                        }
                    }, function(response) {
                        console.log(response);
                    });
                    PartyService.get($window.localStorage['token'])
                    .then(function(response) {
                        if (response.status === 200) {
                            window.localStorage['parties'] = response.data;
                            console.log(response.data);
                            console.log(window.localStorage['parties']);
                        } else {
                        }
                    }, function(response) {
                        console.log(response);
                    });
                    
                    $state.go('lobby');
                } else {
                    //SSFAlertsService.showAlert("Error", "Something went wrong, try again.");
                }
            }, function(response) {
                if(response.status === 401)
                {
                    //SSFAlertsService.showAlert("Error", "Incorrect username or password");
                }else if(response.data === null) {
                    //SSFAlertsService.showAlert("Errot", "The connection with the server was unsuccessful, check your internet connection and try again later.");
                }else {
                    //SSFAlertsService.showAlert("Error", "Something went wrong, try again.");
                }
            }
            );
        }
    };
}])
.controller('LandingCtrl', ['$scope', '$state', 'CandidateService', 'PartyService', '$window', function($scope, $state, CandidateService, PartyService, $window) {
    $scope.$on('$ionicView.enter', function() {
    });   
}])

.controller('RegisterCtrl',['$scope', '$state', 'UserService', '$ionicHistory', '$window', 'CandidateService', 'PartyService', function($scope, $state, UserService, $ionicHistory, $window, CandidateService, PartyService) {
    $scope.user = {};
    $scope.repeatPassword = {};
    $scope.loginAfterRegister = function() {
        UserService.login($scope.user)
        .then(function(response) {
            if (response.status === 200) {
                $window.localStorage["userID"] = response.data.userId;
                $window.localStorage['token'] = response.data.id;
                $ionicHistory.nextViewOptions({
                    historyRoot: true,
                    disableBack: true
                    
                });
                    CandidateService.get($window.localStorage['token'])
                    .then(function(response) {
                        if (response.status === 200) {
                            window.localStorage['candidates'] = response.data;
                            console.log(response.data);
                            console.log(window.localStorage['candidates']);
                        } else {
                        }
                    }, function(response) {
                        console.log(response);
                    });
                    PartyService.get($window.localStorage['token'])
                    .then(function(response) {
                        if (response.status === 200) {
                            window.localStorage['parties'] = response.data;
                            console.log(response.data);
                            console.log(window.localStorage['parties']);
                        } else {
                        }
                    }, function(response) {
                        console.log(response);
                    });
                    
                
                $state.go('chooseParty');
            } else {
                $state.go('landing');
            }
            
        });
    };
    $scope.registerSubmitForm = function(form)
    {
        if($scope.user.password == $scope.repeatPassword.password) {
        if(form.$valid)
        {
            UserService.create($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    $scope.loginAfterRegister();
                } else {
                    //SSFAlertsService.showAlert("Error", "Something went wrong, try again.");
                }
            }, function(response) {
                if(response.data === 422) {
                    //SSFAlertsService.showAlert("Error", "That email is already taken");
                    
                } else
                if(response.data === null) {
                    //SSFAlertsService.showAlert("error", "The connection with the server was unsuccessful, check your internet connection and try again later.");
                }else {
                    //SSFAlertsService.showAlert("Error", "Something went wrong, try again.");
                }
            }
            );
        }
    } else {
       // SSFAlertsService.showAlert("Error", "Passwords do not match");
    }
    };
}])
.controller('LobbyCtrl', ['$scope', '$state', '$window', 'UserService', '$ionicHistory', function($scope, $state, $window, UserService, $ionicHistory) {
    $ionicHistory.nextViewOptions({
    historyRoot: true,
    disableBack: true
});
    $scope.logout = function() {
        UserService.logout($window.localStorage.token)
        .then(function(response) {
            if(response.status === 204)
            {
                delete $window.localStorage['token'];
                delete $window.localStorage['userID'];
                $ionicHistory.nextViewOptions({
                    historyRoot: true,
                    disableBack: true
                });
                $state.go('landing');
                
            }else {
                //SSFAlertsService.showAlert("Error", "Could not logout at this moment, try again.");
            }
        });
    };
}])
.controller('PartyCtrl', ['$scope', '$state', 'CandidateService', 'PartyService', '$window', 'UserService', function($scope, $state, CandidateService, PartyService, $window, UserService) {
    $scope.party = {};
    PartyService.get($window.localStorage['token'])
        .then(function(response) {
            if (response.status === 200) {
                $scope.parties = response.data;
                console.log(response.data);
                console.log($scope.parties);
            } else {
            }
        }, function(response) {
            console.log(response);
        });

    $scope.partyChange = function(party) {
        console.log(party.id);
        console.log(party);
        tempParty = party
        return(party);
    };
    $scope.updateVotes = function() {
        console.log("upvote");
        console.log(tempParty)
        console.log(window.localStorage['userParty']);
        UserService.get(window.localStorage['userID'], window.localStorage['token'])
        .then(function(response) {
            if (response.status === 200) {
                console.log(response.data);
                $window.localStorage['userParty'] = response.data.Party;
                PartyService.downvote(window.localStorage['userParty'], window.localStorage['token']);
                PartyService.upvote(tempParty.id, window.localStorage['token']);
                UserService.updateParty(window.localStorage['userID'], tempParty.id, window.localStorage['token'])
            } else {
            }
            }, function(response) {
                console.log(response);
            });

    };
    $scope.user = {value: "-"};
}])
.controller('CandidateCtrl', ['$scope', '$state', 'CandidateService', 'PartyService', '$window', 'UserService', function($scope, $state, CandidateService, PartyService, $window, UserService) {
        CandidateService.get($window.localStorage['token'])
        .then(function(response) {
            if (response.status === 200) {
                $scope.candidates = response.data;
                console.log(response.data);
                console.log($scope.candidates);
            } else {
            }
        }, function(response) {
            console.log(response);
        });
        $scope.candidateChange = function(candidate) {
        tempCandidate = candidate
        console.log(tempCandidate);
        return(candidate);
    };
    $scope.updateVotes = function() {
        console.log("upvote");
        console.log(tempCandidate);
        console.log(window.localStorage['userCandidate']);
        UserService.get(window.localStorage['userID'], window.localStorage['token'])
        .then(function(response) {
            if (response.status === 200) {
                console.log(response.data);
                $window.localStorage['userCandidate'] = response.data.Candidate;
                CandidateService.downvote(window.localStorage['userCandidate'], window.localStorage['token']);
                CandidateService.upvote(tempCandidate.id, window.localStorage['token']);
                UserService.updateCandidate(window.localStorage['userID'], tempCandidate.id, window.localStorage['token']);
            } else {
            }
            }, function(response) {
                console.log(response);
            });

    };
    $scope.user = {value: "-"};
}])
.controller('GraphCtrl', ['$scope', '$state', 'CandidateService', 'PartyService', '$rootScope', '$window', function($scope, $state, CandidateService, PartyService, $rootScope, $window) {
   
    var partyData = PartyService.get($window.localStorage['token'])
    .then(function(response) {
        return response;
    });
    partyData.then(function(data) {
        console.log(data.data);
        $scope.data = [[
            data.data[0].Votes,
            data.data[1].Votes]];
            console.log($scope.data);
            
    });
    $scope.labels = ["Democrat", "Republican"];
    $scope.options = {
        scaleIntegersOnly: true,
        animation: true,
        responsive:true,
        maintainAspectRatio: false,
        scaleOverride: false,
        scaleSteps: 10,
        scaleStepWidth: 1,
        scaleStartValue: 0,
        scaleShowGridLines: false,
        barShowStroke: false,
        barValueSpacing: 1, 
        slaceLabel: "<%=value%)"+"%",
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%=value.toFixed(0) %>"+"%",
    };
    $scope.colours = [{
        fillColor: "rgba(53,119,255,1)",
        strokeColor: "rgba(15,187,25,1)",
        pointColor: "rgba(15,187,25,1)",
        pointStrokeColor: "#fff",
        pointHilightFIll: "#fff",
        pointHighlightStroke:"rgba(151,187,205,0.8)"
    }];
    var candidateData = CandidateService.get($window.localStorage['token'])
    .then(function(response) {
        return response;
    });
    candidateData.then(function(data) {
        console.log(data.data);
        $scope.canData = [];
        $scope.canData[0] = []
        $scope.canLabels = [];
        for(var i = 0; i < data.data.length; i++) {
            $scope.canData[0][i] = data.data[i].Votes
        }
        for(var i = 0; i < data.data.length; i++) {
            $scope.canLabels[i] = data.data[i].Name
        }
            console.log($scope.canData);
            
    });
    $scope.canOptions = {
        scaleIntegersOnly: true,
        animation: true,
        responsive:true,
        maintainAspectRatio: false,
        scaleOverride: false,
        scaleSteps: 10,
        scaleStepWidth: 1,
        scaleStartValue: 0,
        scaleShowGridLines: false,
        barShowStroke: false,
        barValueSpacing: 1, 
        slaceLabel: "<%=value%)"+"%",
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%=value.toFixed(0) %>"+"%",
    };
    $scope.colours = [{
        fillColor: "rgba(53,119,255,1)",
        strokeColor: "rgba(15,187,25,1)",
        pointColor: "rgba(15,187,25,1)",
        pointStrokeColor: "#fff",
        pointHilightFIll: "#fff",
        pointHighlightStroke:"rgba(151,187,205,0.8)"
    }];
}]);                                                                                                                                                                                                                                                                                                                                            