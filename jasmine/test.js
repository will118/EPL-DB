describe("controller tests", function() {
    var AppController;
    beforeEach(module('d3App'));
    beforeEach(module('backendMock'));
    beforeEach(inject(function($rootScope, $controller, _LiveStatsData_) {
        LiveStatsData = _LiveStatsData_
        $scope = $rootScope.$new();
        ctrl = $controller('AppController', { $scope: $scope });
    }));

    it('should initialize default team', function() {
        expect($scope.team).toBe('Arsenal');
    });

    it('loads the static team names', function() {
         expect($scope.teamnames).toContain("Norwich City", "Fulham")
    });

    it('should have default colours', function() {
        expect($scope.colourArray).toEqual(['#e8000b', '#051246'])
    });

    it('should disable GET-ing of the league if it has been toggled off', function() {
         expect(true).toBe(false)
    });
});
