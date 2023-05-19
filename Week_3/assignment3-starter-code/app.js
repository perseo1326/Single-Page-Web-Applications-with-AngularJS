(function() {
    'use strict';


    angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("API_END_POINT", "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json");

    // Controller to get the serch text
    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController (MenuSearchService){
        let controller = this;

        controller.text = "beans";

        controller.searchText = function(){
            if( controller.text === undefined || controller.text.trim() === ""){
                console.log("Nothing Found.");
                return;
            }

            let listItemsPromise = MenuSearchService.getMatchedMenuItems(controller.text);
            listItemsPromise.then(function (value){
                console.log("Controlador : ", value);
                controller.found = value;
            })
            .catch( function(error){
                console.log("Error controller A: ", error);
            })
        };
        
    }

    // service to manage the business logic
    MenuSearchService.$inject = ["$http", "API_END_POINT"];
    function MenuSearchService($http, API_END_POINT) {
        let menuSearch = this;

        // Method to get the list items from the server
        menuSearch.getDataFromServer = function() {
            let response = $http({
                method  : "GET",
                url     : API_END_POINT
            });
            return response;    
        }

        menuSearch.getMatchedMenuItems = function(searchTerm){

            return new Promise(function(resolve, reject){
                
                let request = menuSearch.getDataFromServer();
                // console.log("Objeto request: ", request);
                
                request.then(function(response){
                    
                    // console.log("Value: ", response.data);
                    let foundItems = []; 
                    // console.log("valor del http response:", response.data);
                    
                    for(let categoryItem in response.data) {
                        // console.log("DISH: ", categoryItem, response.data[categoryItem]);
                        response.data[categoryItem].menu_items.forEach(element => {
                            // console.log("ELEMENT: ", element);
                            if(element.description.includes(searchTerm)) {
                                foundItems.push(element);
                            }
                        });
                    }
                    
                    console.log("Found Items: ", foundItems);
                    // foundItems = [];
                    
                    if(foundItems.length < 1 ){
                        reject(new Error("No hay datos!!!"));
                    }
                    resolve(foundItems);
                        
                })
                .catch( function(error) {
                    console.log("ERROR: ", error);
                });
            });
        }
    }


    
}
)();