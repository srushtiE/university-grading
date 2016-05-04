// Define AngularJS Application
var uRank = angular.module('UniversityRanking', ['ui.bootstrap']);

// Controller that handles
// login of user and admin
// getting of grade based on the form data
uRank.controller('ApplicationController', function($scope, $log, $http,$window) {
	$log.log("Application Controller");

	// function that is called on submitting the form data from user as guest
	$scope.getGrade = function() {

		// variable that holds university details
		var uniDetails = {
			name : $scope.uniname,
			address : $scope.address,
			city : $scope.city,
			zip : $scope.zipcode
		};
		$window.localStorage.universityName = $scope.uniname;

		// variable that holds on-campus crime details
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
			]
		};

		// http POST call to predict the grade using K-Nearest Neighbour
		$http.post('/calcGrade', data).
		success(function(results) {
			$scope.flag = true;
			$window.localStorage.uniGrade = results;

			// variable to create pie chart
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

			// call for the result page
			window.location='/getResult';
		}).
		error(function(error) {
			// console the error, if any
			console.log(error);
		});
	};

	// user login
	$scope.userLogin = function () {
		$window.localStorage.user = "guest";
		window.location = '/getIndex';
	};

	// admin login
	$scope.adminLogin = function () {
		if (($scope.username == "admin") && ($scope.password == "admin")){
			window.location = '/getAdmin';
			$window.localStorage.user = "admin";
		}else{
			alert("Invalid Credentials! Please try again.");
		}

	}
});