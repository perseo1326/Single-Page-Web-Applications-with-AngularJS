(function(){
    'use strict';

    // Create items.component.js file and create a component called items that shows all of the menu items for a particular category.
    angular.module('data')
    .component('item', {
        templateUrl     : 'src/MenuApp/templates/item-description.template.html',
        // controller      : $ctrl,
        bindings        : {
            dish        : '<myDish',
            index       : '@'
        }
    })

})();