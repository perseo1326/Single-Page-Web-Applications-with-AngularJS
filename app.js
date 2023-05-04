
// IIFE -> Immediately Invoked Function Expression


(function () {
    'use strict';

    angular.module('ShopCategoriesApp', [])
    .controller("ShopCategoriesController", ShopCategoriesControllerFunction)
    .service("GetCategoriesService", GetCategoriesServiceFunction)
    .constant("host", "https://fakestoreapi.com/products");


    ShopCategoriesControllerFunction.$inject = ["GetCategoriesService"];
    function ShopCategoriesControllerFunction (GetCategoriesServiceFunction) {
        let controller = this;

        let promise = GetCategoriesServiceFunction.requestCategories();
        promise.then(
            function(response){ controller.categories = response.data; }
        )
        .catch(
            function (error) { console.log("Algo salio mal!"); 
                    controller.error = "Algo salio mal!"}
        );

        console.log("Controller categories: es indefinido por que se ha ejecutado antes que resolver la promesa!", controller.categories);

        controller.showCategory = function(category){
            let categoryDescriptionPromise = GetCategoriesServiceFunction.getCategoryDetail(category);
            categoryDescriptionPromise.then(
                function(response){ controller.categoryProducts = response.data;
                console.log(controller.categoryProducts); }
            )
            .catch(
                function(error){
                    console.log("Ocurrio un error ");
                    controller.error = "Ocurrio un error en los productos por categoria (" + category + ")";
                }
            );
        };
    }

    // *****************************************************
    // SERVICE 'GetCategoriesService'
    GetCategoriesServiceFunction.$inject = ['$http', 'host'];
    function GetCategoriesServiceFunction($http, host) {
        let catService = this;

        catService.requestCategories = function() {
            let request = {
                method  : "GET",
                url     : (host + "/categories")
            }
            
            let response = $http(request);
            return response;
        };

        catService.requestCategory = function(category) {
            let request = {
                method  : "GET",
                url     : host + "/category/" + category
            };

            let response = $http(request);
            return response;
        };

        catService.getCategoryDetail = function(category){
            let request = {
                method  : "GET",
                url     : host + "/category/" + category
            }
            let response = $http(request);
            return response;
        }

    }



    
} )();