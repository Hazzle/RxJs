var rxApp = angular.module('rxApp', []);

rxApp.controller('rxController', function rxController($scope, $anchorScroll, $location) {
    $scope.users = [];

    var requestStream = Rx.Observable.interval(3000)
        .map(function () {
            var randomOffset = Math.floor(Math.random() * 500);
            return 'https://api.github.com/users?since=' + randomOffset + 'page=1&per_page=1&client_id=86ec4cc09f775228c518&client_secret=9ee0e82b81139a6c5f97c610d7981cf11967c3c4';
        });

    var responseStream = requestStream
        .flatMap(function (requestUrl) {
            return Rx.Observable.fromPromise($.getJSON(requestUrl));
        });

    responseStream.subscribe(x => addToPage(x));

    function addToPage(data) {
        if (angular.isDefined(data)) {
            $scope.users.push(data);
            $scope.$apply();
        }
        $location.hash('bottom');
        $anchorScroll();
    };
});