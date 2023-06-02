(function(){
    'use strict';


    // Create categories.component.js file and create component called categories that shows all available categories in the menu to the user.
    angular.module("data")
    .component("categories", {
        templateUrl     : 'src/MenuApp/templates/categories.template.html',
        // controller      : $ctrl,
        bindings        : { 
            categs       : '<'
        } 
    } );

})();