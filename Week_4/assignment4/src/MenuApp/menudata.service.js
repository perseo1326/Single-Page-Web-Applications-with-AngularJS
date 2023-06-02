(function(){
    'use strict';


    angular.module("data")
    .service("MenuDataService", MenuDataService)
    .constant("URL_API", "https://coursera-jhu-default-rtdb.firebaseio.com");

    MenuDataService.$inject = ["$http", "URL_API" ];
    function MenuDataService($http, URL_API) {
        let menuService = this;
        
        menuService.getAllCategories = function() {

            let response = $http({
                method : 'GET',
                url : ( URL_API + '/categories.json')
            });

            console.log("Categories: ", response);
            return response;
        };

        menuService.getItemsForCategory = function(categoryShortName) {

            let response = $http({
                method : 'GET',
                url : ( URL_API + '/menu_items/' + categoryShortName.catId + '.json')
            });

            // https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/%7BcategoryShortName%7D.json

            console.log("Category Short Name: ", categoryShortName);
            console.log("Items: ", response);
            return response;
        };
    }



})();