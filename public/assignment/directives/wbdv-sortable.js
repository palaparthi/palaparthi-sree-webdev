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
                    console.log(ui.item.index());
                    startIndex = ui.item.index();
                },
                stop: function (event, ui)
                {
                    console.log(ui.item.index());
                    stopIndex = ui.item.index();
                    //var ht = $(ui.item.context.innerHTML);
                    //console.log(ui.item.context.innerHTML);
                    var str = ui.item.context.innerHTML;
                    console.log(str.split('ng-href')[1].split('/')[16].split('">')[0]);
                    var pid = $routeParams['pid'];

                    WidgetService.reorderWidget(startIndex, stopIndex, pid)
                    .then(function (response) {
                        console.log(response.data);
                    });

                    //sortController.sortWidgets(startIndex, stopIndex);
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
