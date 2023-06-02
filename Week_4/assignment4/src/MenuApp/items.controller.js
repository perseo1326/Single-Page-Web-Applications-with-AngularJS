(function (){
    'use strict';

    angular.module('data')
    .controller("ItemsController", ItemsController);

    ItemsController.$inject = ["dishes"];
    function ItemsController(dishes) {
        let itemsController = this;

        itemsController.category = dishes.category.name;
        itemsController.total = dishes.menu_items.length;
        itemsController.dishes = dishes.menu_items;

        itemsController.toggleClass = function(x){
            console.log("toggleClass", x);
        }

        console.log("Estamos en items controller", dishes);
        console.log(dishes.menu_items);

    }

})();