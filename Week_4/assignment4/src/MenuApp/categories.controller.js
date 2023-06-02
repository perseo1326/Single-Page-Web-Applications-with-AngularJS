(function(){

    angular.module('data')
    .controller("CategoriesController", CategoriesController);

    CategoriesController.$inject = ["categs"];
    function CategoriesController(categs){
        let catController = this;

        catController.categs = categs;
        console.log("Categories: ", categs);
    }

})();
