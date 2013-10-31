describe("myApp", function() {
 
    beforeEach(module('d3App'));
    beforeEach(module('d3App.controllers'));

    describe("AppController", function() {
       var mockService = {
        someAsyncCall: function (x){
          return 'weee';
        }
      }
    
        var scope;
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            // scope.text = "Hello World!";
            $controller("AppController", {
                $scope: scope,
                sessionProvider: mockService
            });
        }));
 
        it("should double d", function() {
            expect(scope.text).toBe("Hello World!");
        });
    });
});