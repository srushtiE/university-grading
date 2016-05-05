// Controller that handles result page functions
uRank.controller('ResultController', function($scope, $log, $http, $window,$rootScope) {
    $log.log("Result Controller");
    var input_data;
    $scope.isAdmin = false;
    $scope.isSearchPage = $window.localStorage.searchpage;
    $scope.showJumbo = false;
    $scope.precisionValue = null;

    // initialization function that is called on page load
    $scope.initFunction = function() {
        if($window.localStorage.user == "admin"){
            $scope.isAdmin = true;
        }
        input_data = JSON.parse($window.localStorage.resultData);

        // creating pie chart when all the values are zero
        if((input_data.details.drug == "0") && (input_data.details.arson == "0") && (input_data.details.assault == "0") && (input_data.details.burglary == "0")
            && (input_data.details.fSexOffence == "0") && (input_data.details.liquor == "0") && (input_data.details.manSlaughter == "0") && (input_data.details.weapons == "0")
            && (input_data.details.murder == "0") && (input_data.details.nfSexOffence == "0") && (input_data.details.robbery == "0") && (input_data.details.theft == "0")){
            var pie = new d3pie("pieChart", {
                "header": {
                    "title": {
                        "text": $window.localStorage.universityName + " Grade: " + $window.localStorage.uniGrade,
                        "fontSize": 24,
                        "font": "open sans"
                    },
                    "subtitle": {
                        "text": ".",
                        "color": "#999999",
                        "fontSize": 12,
                        "font": "open sans"
                    },
                    "titleSubtitlePadding": 9
                },
                "footer": {
                    "color": "#999999",
                    "fontSize": 10,
                    "font": "open sans",
                    "location": "bottom-left"
                },
                "size": {
                    "canvasWidth": 690,
                    "pieInnerRadius": "61%",
                    "pieOuterRadius": "100%"
                },
                "data": {
                    "sortOrder": "value-desc",
                    "content": [

                        {
                            "label": "No Crime",
                            "value": 100,
                            "color": "#A2F276"
                        }

                    ]
                },
                "labels": {
                    "outer": {
                        "pieDistance": 32
                    },
                    "inner": {
                        "hideWhenLessThanPercentage": 101
                    },
                    "mainLabel": {
                        "fontSize": 11
                    },
                    "percentage": {
                        "color": "#ffffff",
                        "decimalPlaces": 0
                    },
                    "value": {
                        "color": "#adadad",
                        "fontSize": 11
                    },
                    "lines": {
                        "enabled": true
                    },
                    "truncation": {
                        "enabled": true
                    }
                },
                "tooltips": {
                    "enabled": true,
                    "type": "placeholder",
                    "string": "{label}: {value}, {percentage}%",
                    "styles": {
                        "fadeInSpeed": 492,
                        "backgroundOpacity": 0.35
                    }
                },
                "effects": {
                    "pullOutSegmentOnClick": {
                        "effect": "linear",
                        "speed": 400,
                        "size": 8
                    }
                },
                "misc": {
                    "gradient": {
                        "enabled": true,
                        "percentage": 80
                    }
                }
            });

        }
        else{
            getPie(input_data);
        }
    };

    // creating pie chart based on the input data
    function getPie(chartData){

        var pie = new d3pie("pieChart", {
            "header": {
                "title": {
                    "text": $window.localStorage.universityName + " Grade: " + $window.localStorage.uniGrade,
                    "fontSize": 24,
                    "font": "open sans"
                },
                "subtitle": {
                    "text": ".",
                    "color": "#999999",
                    "fontSize": 12,
                    "font": "open sans"
                },
                "titleSubtitlePadding": 9
            },
            "footer": {
                "color": "#999999",
                "fontSize": 10,
                "font": "open sans",
                "location": "bottom-left"
            },
            "size": {
                "canvasWidth": 690,
                "pieInnerRadius": "61%",
                "pieOuterRadius": "100%"
            },
            "data": {
                "sortOrder": "value-desc",
                "content": [
                    {
                        "label": "Murder",
                        "value": parseInt(chartData.details.murder),
                        "color": "#BCA9F5"
                    },
                    {
                        "label": "ManSlaughter",
                        "value": parseInt(chartData.details.manSlaughter),
                        "color": "#086A87"
                    },
                    {
                        "label": "ForcibleSexOffence",
                        "value": parseInt(chartData.details.fSexOffence),
                        "color": "#F4FA58"
                    },
                    {
                        "label": "NonForcibleSexOffence",
                        "value": parseInt(chartData.details.nfSexOffence),
                        "color": "#0B0B61"
                    },
                    {
                        "label": "Robbery",
                        "value": parseInt(chartData.details.robbery),
                        "color": "#6A0888"
                    },
                    {
                        "label": "Assault",
                        "value": parseInt(chartData.details.assault),
                        "color": "#FF8000"
                    },
                    {
                        "label": "Burglary",
                        "value": parseInt(chartData.details.burglary),
                        "color": "#BDBDBD"
                    },
                    {
                        "label": "Theft",
                        "value": parseInt(chartData.details.theft),
                        "color": "#FE2EF7"
                    },
                    {
                        "label": "Arson",
                        "value": parseInt(chartData.details.arson),
                        "color": "#00FF00"
                    },
                    {
                        "label": "Weapons",
                        "value": parseInt(chartData.details.weapons),
                        "color": "#0B3B0B"
                    },
                    {
                        "label": "Drug",
                        "value": parseInt(chartData.details.drug),
                        "color": "#DF0101"
                    },
                    {
                        "label": "Liquor",
                        "value": parseInt(chartData.details.liquor),
                        "color": "#00FFFF"
                    }
                ]
            },
            "labels": {
                "outer": {
                    "pieDistance": 32
                },
                "inner": {
                    "hideWhenLessThanPercentage": 3
                },
                "mainLabel": {
                    "fontSize": 11
                },
                "percentage": {
                    "color": "#ffffff",
                    "decimalPlaces": 0
                },
                "value": {
                    "color": "#adadad",
                    "fontSize": 11
                },
                "lines": {
                    "enabled": true
                },
                "truncation": {
                    "enabled": true
                }
            },
            "tooltips": {
                "enabled": true,
                "type": "placeholder",
                "string": "{label}: {value}, {percentage}%",
                "styles": {
                    "fadeInSpeed": 492,
                    "backgroundOpacity": 0.35
                }
            },
            "effects": {
                "pullOutSegmentOnClick": {
                    "effect": "linear",
                    "speed": 400,
                    "size": 8
                }
            },
            "misc": {
                "gradient": {
                    "enabled": true,
                    "percentage": 80
                }
            }
        });
    }

    // function on click of Home button
    $scope.goHome = function(){
        if($window.localStorage.user == "admin"){
            window.location='/getAdmin';
        }else if($window.localStorage.user == "guest"){
            window.location='/getIndex';
        }

    }

    // function on click of Get Precision button
    $scope.getPrecision = function(){

        // called only if the user is admin
        if($window.localStorage.user == "admin"){

            // handling of UI elements
            $scope.showJumbo = true;
            var algo = {
                data : $window.localStorage.algo
            }

            // http POST call to get the precision based on the algorithm
            $http.post('/getPrecision', algo).
            success(function(results) {
                $scope.precisionValue = parseFloat(results).toFixed(2)+"%";
            }).
            error(function(error) {
                console.log(error);
            });
        }
    }
});