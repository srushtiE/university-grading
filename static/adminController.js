// Controller that handles all the admin functionality
uRank.controller('AdminController', function($scope, $log, $http,$window) {
    $log.log("Admin Controller");

    // function that is called on submitting the form data from user as admin
    $scope.getAdminGrade = function() {

        // variable to hold university details
        var uniDetails = {
            name : $scope.uniname,
            address : $scope.address,
            city : $scope.city,
            zip : $scope.zipcode
        };
        $window.localStorage.universityName = $scope.uniname;

        // variable to hold on-campus crime details
        var data = {
            "details":[
                murder = $scope.murder,
                manSlaughter = $scope.manSlaughter,
                fSexOffence = $scope.fSexOffence,
                nfSexOffence = $scope.nfSexOffence,
                robbery = $scope.robbery,
                assault = $scope.assault,
                burglary = $scope.burglary,
                theft =  $scope.theft,
                arson = $scope.arson,
                weapons = $scope.weapons,
                drug = $scope.drug,
                liquor = $scope.liquor
            ],
            "algo" : $scope.algorithm
        };
        $window.localStorage.algo = $scope.algorithm;

        // http POST call to predict the grade using the algorithm provided as input through the form input
        $http.post('/getAdminGrade', data).
        success(function(results) {
            var grade;
            switch(Math.round(results)){
                case 0:
                    grade = 'A+'
                    break;
                case 1:
                    grade = 'A'
                    break;
                case 2:
                    grade = 'A-'
                    break;
                case 3:
                    grade = 'B+'
                    break;
                case 4:
                    grade = 'B'
                    break;
                case 5:
                    grade = 'B-'
                    break;
                case 6:
                    grade = 'C+'
                    break;
                case 7:
                    grade = 'C'
                    break;
                case 8:
                    grade = 'C-'
                    break;
                case 9:
                    grade = 'D+'
                    break;
                case 10:
                    grade = 'D'
                    break;
                case 11:
                    grade = 'D-'
                    break;
                case 12:
                    grade = 'E+'
                    break;
                case 13:
                    grade = 'E'
                    break;
                case 14:
                    grade = 'E-'
                    break;
                case 15:
                    grade = 'F'
                    break;
                default:
                    grade = 'NA'
            }

            $scope.flag = true;
            $window.localStorage.uniGrade = grade;

            // variable to hold data to create pie chart
            var chartData = {
                "details":{
                    murder : $scope.murder,
                    manSlaughter : $scope.manSlaughter,
                    fSexOffence : $scope.fSexOffence,
                    nfSexOffence : $scope.nfSexOffence,
                    robbery : $scope.robbery,
                    assault : $scope.assault,
                    burglary : $scope.burglary,
                    theft : $scope.theft,
                    arson : $scope.arson,
                    weapons : $scope.weapons,
                    drug : $scope.drug,
                    liquor : $scope.liquor
                }
            };
            $window.localStorage.resultData = JSON.stringify(chartData);

            // call to get the result page
            window.location='/getResult';
        }).
        error(function(error) {
            // console the error, if any
            console.log(error);
        });
    };

    // admin log out
    $scope.logout = function(){
        $window.localStorage.clear();
        // render the landing login page
        window.location='/';
    }

});