( function () {
    'use strict';

    angular.module("LunchCheck", [])
    .controller("LunchCheckController", DILunchCheckController );

    DILunchCheckController.$inject = ['$scope'];

    function DILunchCheckController ($scope) {
        $scope.text = "";
        $scope.eventClick = function () {
            $scope.message = displayMessage($scope.text);
            switch ($scope.message) {
                case NO_DATA:
                    $scope.messageClass = "no-data";
                    $scope.textClass = "no-data";
                    break;
                default:
                    $scope.messageClass = "";
                    $scope.textClass = "ok-data";
            }
        };
    }

    const ENJOY = "Enjoy!";
    const TOO_MUCH = "Too much!";
    const NO_DATA = "Please enter data first!";

    function displayMessage(string) {
        let elements = string.split(',');
        // remove empty elements
        elements = elements.filter(cleanArray);
        console.log("Elements: ", elements);

        if (elements.length == 0 ) {
            return NO_DATA;
        } else if (elements.length >= 4 ) {
            return TOO_MUCH;
        } else {
            return ENJOY;
        }
    }

    function cleanArray(value) {
        value = value.trim();
        if(value !== "") {
            return value;
        }
    }

})();