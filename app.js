var rxApp = angular.module('rxApp', []);

rxApp.controller('rxController', function rxController($scope) {
    $scope.phones = [];

    $scope.source = Rx.Observable.interval(300).take(3)
        .map(i => [
            {
                id: '1',
                name: 'Nexus S',
                snippet: 'Fast just got faster with Nexus S.'
            }, {
                id: '2',
                name: 'Motorola XOOM™ with Wi-Fi',
                snippet: 'The Next, Next Generation tablet.'
            }, {
                id: '3',
                name: 'MOTOROLA XOOM™',
                snippet: 'The Next, Next Generation tablet.'
            }
        ][i]);

    $scope.ids = angular.copy($scope.source).map(x => parseInt(x.id))
        .reduce((x, y) => x + y)
        .subscribe(x => console.log(x));

    $scope.source.subscribe(x => addToPage(x));


    function addToPage(data){
        if (angular.isDefined(data)){
            $scope.phones.push(data);
            $scope.$apply();
        }
    };
});