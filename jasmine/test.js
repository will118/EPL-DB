describe("my First test", function() {
    var AppController;
    beforeEach(module('d3App'));
    beforeEach(inject(function($rootScope) {
        $scope = $rootScope.$new();
    }));

    it('Should initialize value to Loading', inject(function($controller) {
    ctrl = $controller('AppController', {
        $scope: $scope
        });
        expect($scope.text).toBe('Helo');
    }));
});
