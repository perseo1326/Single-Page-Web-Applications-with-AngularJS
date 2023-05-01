(function () {
	"use strict";

	angular
		.module("ShoppingListCheckOff", [])
		.controller("ToBuyController", ToBuyControllerFunction)
		.controller("AlreadyBoughtController", AlreadyBoughtControllerFunction)
		.service(
			"ShoppingListCheckOffService",
			ShoppingListCheckOffServiceFunction
		);

	// First CONTROLLER "ToBuyController"
    // Inject the service into the controller
    ToBuyControllerFunction.$inject = ["ShoppingListCheckOffService"];
	function ToBuyControllerFunction(ShoppingListCheckOffService) {
		let buyItem = this;

        buyItem.toBought = function (index) {
            return ShoppingListCheckOffService.buyToBoughtList(index);
        };

        buyItem.getBuyList = ShoppingListCheckOffService.getListToBuy();

        buyItem.isEmptyList = function() {
            return ShoppingListCheckOffService.emptyBuyList();
        }
    }

	// Second CONTROLLER "AlreadyBoughtController"
    // Inject the service into the controller
    AlreadyBoughtControllerFunction.$inject = ["ShoppingListCheckOffService"];
	function AlreadyBoughtControllerFunction(ShoppingListCheckOffService) {
        let boughtItem = this;


        boughtItem.boughtList = ShoppingListCheckOffService.getListBought();

        boughtItem.isEmptyList = () => { return ShoppingListCheckOffService.emptyBoughtList() };
    }

	// SERVICE "ShoppingListCheckOffService"
	function ShoppingListCheckOffServiceFunction() {

        let shoppingListService = this;

		// list of items to buy
		shoppingListService.buyList = [
			{ name: "bread", quantity: 1 },
			{ name: "coffee", quantity: 2 },
			{ name: "egss", quantity: 6 },
			{ name: "sausages", quantity: 4 },
			{ name: "sugar", quantity: 1 },
		];

        shoppingListService.boughtList = [];

		shoppingListService.getListToBuy = function () {
			return shoppingListService.buyList;
		};

        shoppingListService.getListBought = function() {
            return shoppingListService.boughtList;
        }

        shoppingListService.buyToBoughtList = function (index) {
            let item = shoppingListService.buyList.splice(index, 1);
            shoppingListService.boughtList.push(item[0]);
        }

        shoppingListService.emptyBuyList = function() {
            if(shoppingListService.buyList.length > 0){
                // has elements
                return true;
            }
            // array is empty
            return false;
        }

        shoppingListService.emptyBoughtList = () => { return shoppingListService.boughtList.length > 0 ? true : false };

	}
})();
