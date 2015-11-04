angular.module('starter.controllers', [])
.controller('LoginCtrl', ['$scope', '$state', 'UserService', '$ionicHistory',  function($scope, $state, UserService, $ionicHistory) {
    $scope.user = {};
    $scope.loginSubmitForm = function(form)
    {
        if (form.$valid)
        {
            UserService.login($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    console.log(response);
                    $ionicHistory.nextViewOptions({
                        historyRoot: true,
                        disableBack: true
                    })
                    $state.go('lobby');
                } else {
                    alert("Something went wrong, try again.");
                }
            }, function(response) {
                if(response.status === 401)
                {
                    alert("Incorrect username or password");
                }else if(response.data === null) {
                    alert("The connection with the server was unsuccessful, check your internet connection and try agian later.");
                }else {
                    alert("Something went wrong, try again.");
                }
            })
        }
    }
}])
.controller('LandingCtrl', ['$scope', '$state', 'CandidateService', 'PartyService', function($scope, $state, CandidateService, PartyService) {
    
}])

.controller('RegisterCtrl',['$scope', '$state', 'UserService', '$ionicHistory', '$window', function($scope, $state, UserService, $ionicHistory, $window) {
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