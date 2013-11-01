myAppDev = angular.module('backendMock', ['d3App', 'ngMockE2E']);
myAppDev.run(function($httpBackend) {

    targets = [{
        "key": "Fulham",
        "values": [
            [1, 0],
            [2, 0],
            [3, 0],
            [304, 4],
            [305, 4],
            [306, 4],
            [307, 4],
            [308, 4]
        ]
    }, {
        "key": "Chelsea",
        "values": [
            [1, 1],
            [2, 1],
            [3, 1],
            [21, 2],
            [22, 2],
            [23, 2],
            [306, 4],
            [307, 4],
            [308, 4]
        ]
    }]

    $httpBackend.whenGET(/^\/targetjson\//).respond(targets);

});
