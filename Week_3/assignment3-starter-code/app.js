(function () {
    'use strict';


    angular.module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .constant("API_END_POINT", "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
        .directive("foundItems", FoundItemsDirective);
        // .controller("NarrowItDownDirectiveController", NarrowItDownDirectiveController)

    // Controller to get the serch text
    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService) {
        let controller = this;
        controller.found = [];
        controller.title = "Your choices are...";
        controller.active = false;

        controller.text = "";

        controller.searchText = function () {

            let listItemsPromise = new Promise(function (resolve, reject) {
                if (controller.text === undefined || controller.text.trim() === "") {
                    console.log("Nothing Found.");
                    // TODO: mostrar mensaje de error
                    controller.text = "";
                    controller.found = "";
                    resolve("");
                }

                try {
                    let foundItems = MenuSearchService.getMatchedMenuItems(controller.text);
                    resolve(foundItems);
                } catch (error) {
                    reject(new Error("No hay datos!!!"));
                }
            });
            listItemsPromise.then(function (list) {
                controller.found = list;
                // controller.refreshTitle(list.length);
                controller.active = true;
                console.log("Controller Promise THEN: ", list);
            })
                .catch(function (error) {
                    console.log("Error controller A: ", error);
                })
            controller.active = true;
            
        };

        controller.refreshTitle = function(num){
            controller.title = "You have " + num + " options to choice.";
        };

        controller.removeItem = function(index){
            console.log("indice a eliminar: ", index);
            controller.found.splice(index, 1);
            // controller.refreshTitle(controller.found.length);
        };

    }

    // service to manage the business logic
    MenuSearchService.$inject = ["$http", "API_END_POINT"];
    function MenuSearchService($http, API_END_POINT) {
        let menuSearch = this;

        // Method to get the list items from the server
        menuSearch.getDataFromServer = function () {
            let response = $http({
                method: "GET",
                url: API_END_POINT
            });
            return response;
        }

        menuSearch.getMatchedMenuItems = function (searchTerm) {

            let listItems = [];
            if(searchTerm === ""){
                return "";
            }
            let request = menuSearch.getDataFromServer();
            request.then(function (response) {
                for (let categoryItem in response.data) {
                    response.data[categoryItem].menu_items.forEach(element => {
                        if (searchTerm !== "" && element.description.includes(searchTerm)) {
                            // console.log("push element: ", element);
                            listItems.push(element);
                        }
                    });
                }
            })
                .catch(function (error) {
                    console.log("ERROR: ", error);
                });

            return listItems;
        }
    }


    // Directive definition
    function FoundItemsDirective() {
        let ddo = {
            templateUrl: "listItems.html",
            scope: {
                list : '<myProducts',
                myTitle : '@title',
                myRemove : '&onRemove',
                activeErrorMessage : '<errorMessageIsActive'
            },
            // controller      : 'NarrowItDownDirectiveController as products',
            controller      : NarrowItDownDirectiveController,
            controllerAs    : 'products',
            bindToController    : true
        };
        return ddo;
    }


    function NarrowItDownDirectiveController() {
        let directivecontroller = this;

        directivecontroller.showError = function(isActive){
            console.log("Show Error function: ", directivecontroller.list.length, isActive);
            if(directivecontroller.list.length <= 0 && isActive){
                console.log("showError: true");
                return true;
            }
        return false;
        }
    }



}
)();

// https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js