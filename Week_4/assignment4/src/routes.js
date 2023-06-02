(function(){
    'use strict';


    // Create routes.js file and configure your routes and view states in it. These routes should be defined in the MenuApp module.

    // angular.module("MenuApp")
    angular.module("data")
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider){
        // UI states and url matches

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'src/MenuApp/templates/home.template.html'
        })

        // categories
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/MenuApp/templates/categories-section.template.html',
            controller: 'CategoriesController as categories',
            resolve: {
                categs: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories()
                        .then(function(response){ return response.data });
                }]
            }
        })

        .state('items', {
            url         : '/items/{catId}',
            templateUrl : 'src/MenuApp/templates/items.template.html',
            controller  : 'ItemsController as items',
            resolve     : {
                dishes       : ['$stateParams', 'MenuDataService', 
                                function($stateParams, MenuDataService){
                                    return MenuDataService.getItemsForCategory($stateParams)
                                        .then(function(response){ return response.data });
                }]
            }
        }

        );

    }

}
)();
