// Controller that handles the search page functions
uRank.controller('SearchController', function($scope, $log, $http, $window) {
    $log.log("Search Controller");
    $scope.university={
        entitys:[]
    };
    $scope.gradeFlag = false;

    // function to handle typeahead of the search box
    $scope.formatLabel= function(model){
        for (var i=0;i<$scope.university.entitys.length; i++) {
            if (model == $scope.university.entitys[i].uni_id) {
                $window.localStorage.grade = $scope.university.entitys[i].uni_grade;
                $window.localStorage.uni_details = JSON.stringify($scope.university.entitys[i].details);
                $window.localStorage.universityName = $scope.university.entitys[i].uni_name;
                return $scope.university.entitys[i].uni_name;
            }
        }
    }

    // initialization function that is called on page load
    $scope.initFunction = function() {
        searchUniNames();
    };

    // function to get all the university names for typeahead input
    function searchUniNames(){
        $http.get('/getNames').
        success(function(results) {
            var entityData = results;
            for (var i=0;i< entityData.length;i++) {
                $scope.university.entitys.push(results[i]);
            }
        }).
        error(function(error) {
            console.log(error);
        });
    }

    // function that is called on click of search glyphicon
    $scope.showSearchResult = function(){
        $scope.gradeFlag = true;
        $window.localStorage.uniGrade = $window.localStorage.grade;
        var searchdata = JSON.parse($window.localStorage.uni_details);

        // variable that is given as input to create pie chart
        var chartData = {
            "details":{
                murder : searchdata[0],
                manSlaughter : searchdata[1],
                fSexOffence : searchdata[2],
                nfSexOffence : searchdata[3],
                robbery : searchdata[4],
                assault : searchdata[5],
                burglary : searchdata[6],
                theft : searchdata[7],
                arson : searchdata[8],
                weapons : searchdata[9],
                drug : searchdata[10],
                liquor : searchdata[11],
            }
        };
        $window.localStorage.resultData = JSON.stringify(chartData);

        // get result page
        window.location='/getResult';
    }

});
