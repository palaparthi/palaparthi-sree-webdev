/**
 * Created by Palaparthi on 6/5/17.
 */

(function () {
    angular
        .module('WebAppMaker')

        .directive('wdDraggable', wdDraggable);



    function wdDraggable($http, $routeParams, WidgetService) {

        function linkFunction(scope, element ) {
            var startIndex = -1;
            var stopIndex = -1;
            $(element).sortable({
                start: function (event, ui)
                {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui)
                {
                    stopIndex = ui.item.index();
                    var str = ui.item.context.innerHTML;

                    var pid = $routeParams['pid'];

                    WidgetService.reorderWidget(startIndex, stopIndex, pid)
                    .then(function (response) {

                    });


                }
            } );

        }

        return {
            link: linkFunction,
            controller: sortController
        }
    }
    function sortController(WidgetService, $routeParams) {

        this.sortWidgets = sortWidgets;

        function sortWidgets(startIndex, stopIndex) {
            var pid = $routeParams['pid'];
            WidgetService.reorderWidget(startIndex, stopIndex, pid)
                .then(function (response) {

                });
        }
    }


})();
