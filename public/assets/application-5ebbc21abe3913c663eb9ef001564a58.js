'use strict';

var d3App = angular.module('d3App', ['ngStorage', 'ngRoute', 'nvd3ChartDirectives', 'differenceChart', 'ui.bootstrap','ui.bootstrap.tpls', 'd3App.directives', 'd3App.seasoncontrollers', 'd3App.matchcontrollers', 'd3App.liveservices', 'd3App.accountservices', 'd3App.teamservices', 'd3App.mainGraph'])

.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: '/templates/seasonmode.html',
        controller: 'SeasonModeController'
    })
    .when('/match', {
        templateUrl: '/templates/matchmode.html',
        controller: 'MatchModeController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
'use strict';

angular.module('d3App.matchcontrollers', [])

.controller('MatchModeController', function($scope, $localStorage, $sessionStorage, $http, $timeout, focus, GeneralLiveData, LiveStatsData, TeamFormData, LiveBars, BigData, MatchDetails, HomeAwayTeam) {

    $scope.$storage = $localStorage.$default({
        "badge": true,
        "leaguetable": true,
        "prematch": true,
        "oppoform": true,
        "fixtures": true,
        "teams": true,
        "favteam": "Arsenal",
        "subs": true,
        "liveBars": true,
        "nextFixtures": true
    });

    focus('focusMe');

    $scope.gotLive = false

    $scope.settingsToggle = false

    $scope.selectTeam = function(team) {
        $scope.team = team
    };

    $scope.team = $scope.$storage.favteam;

    // Filter on search, loaded from staticvalues 
    $scope.teamnames = teamnames;

    // Generic default values for instantiation
    $scope.possBar = [{
        "value": 50,
        "type": "crystal-palace"
    }, {
        "value": 50,
        "type": "arsenal"
    }];
    $scope.shotsBar = [{
        "value": 50,
        "type": "crystal-palace"
    }, {
        "value": 50,
        "type": "arsenal"
    }];

    var barposs = function(team) {
        LiveBars.poss(team).then(function(data) {
            $scope.possBar = data;
        })
    }
    var barshots = function(team) {
        LiveBars.shots(team).then(function(data) {
            $scope.shotsBar = data;
        })
    }

    var home = function(team) {
        var hometeam = HomeAwayTeam.home(team);
        hometeam.then(function(data) {
            if (data && data[0] != undefined) {
                $scope.hometeam = data;
                $scope.hometeamname = data[0].teamname
            }
        })
    }

    var away = function(team) {
        var awayteam = HomeAwayTeam.away(team);
        awayteam.then(function(data) {
            if (data && data[0] != undefined) {
                $scope.awayteam = data;
                $scope.awayteamname = data[0].teamname
            }
        })
    }

    var homebench = function(team) {
        var homesubs = HomeAwayTeam.homesubs(team);
        homesubs.then(function(data) {
            $scope.homesubs = data;
        })
    }

    var awaybench = function(team) {
        var awaysubs = HomeAwayTeam.awaysubs(team);
        awaysubs.then(function(data) {
            $scope.awaysubs = data;
        })
    }

    var target = function(team) {
        LiveStatsData.targets(team).then(function(data) {
            $scope.livetargets = data;
            $scope.colourArray = LiveStatsData.colours(data, team);
        })
    }

    var corners = function(team) {
        var corner = LiveStatsData.corner(team)
        corner.then(function(data) {
            $scope.livecorners = data
        })
    }

    var liveshot = function(team) {
        var liveshots = LiveStatsData.shot(team);
        liveshots.then(function(data) {
            $scope.liveshots = data
        })
    };
    
    $scope.xFunction = function(){
                return function(d){
                    return d[0];
                }
            }
    $scope.yFunction = function(){
        return function(d){
            return d[1];
        }
    }

    var liveposs = function(team) {
        var poss = LiveStatsData.poss(team);
        poss.then(function(data) {
            $scope.liveposs = data
        })
    };

    $scope.colourArray = ['#e8000b', '#051246']

    $scope.colorFunction = function() {
        return function(d, i) {
                return $scope.colourArray[i];
        };
    }; 

    $scope.sparkFunction = function() {
        return function(d) {
                return '#bbbbbb'
        };
    };


    var squawkajson = function(team) {
        var megajson = BigData.squawka(team)
        megajson.then(function(data) {
            $scope.megajson = data
        })
    }

    var score = function() {
        var scorePromise = GeneralLiveData.fullscores()
        scorePromise.then(function(data) {
            $scope.results = data
        })
    }
    var livescore = function() {
        var scorePromise = GeneralLiveData.livescores()
        scorePromise.then(function(data) {
            if (data.length > 3) {
                $scope.scores = data,
                $scope.gotLive = true
            };
        })
    }

    var nextfix = function() {
        var nextfixes = GeneralLiveData.nextfixtures()
        nextfixes.then(function(data) {
            $scope.nextfixtures = data
        })
    }

    var table = function() {
        var table = GeneralLiveData.table()
        table.then(function(data) {
            $scope.premtable = data
        })
    };

    var scorer = function(team) {
        var s = GeneralLiveData.scorers(team);
        s.then(function(data) {
            $scope.scorers = data;
        })
    };

    var fixt = function(team) {
        var fixture = GeneralLiveData.fixtures(team);
        fixture.then(function(data) {
            $scope.fixtures = data
        })
    };

    var formteam = function(team) {
        var teamform = TeamFormData.teamform(team);
        teamform.then(function(data) {
            $scope.form = data
        })
    };

    var formoppo = function(team) {
        var oppoform = TeamFormData.oppoform(team);
        oppoform.then(function(data) {
            $scope.otherform = data
            $scope.otherColour = team_colour(data[0]['team'])
        })
    };

    var optatext = function(team) {
        var prematch = MatchDetails.prematch(team);
        prematch.then(function(data) {
            $scope.prematchArray = data
            preMatcher(data);
        })
    };

    var livestats = function() {
        var team = $scope.team;
        liveshot(team);
        liveposs(team);
        corners(team);
        target(team);
    };

    $scope.counter = 0;
    var preMatcher = function(data) {
        $scope.prematchsing = data[$scope.counter];
        if ($scope.counter == 9) {
            $scope.counter = 0
        }
        $scope.counter++;
    };

    $scope.refershInterval = 5;

    setInterval(function() {
        $scope.$apply(function() {
            preMatcher($scope.prematchArray);
            nextfix();
            table();
            livescore();
        })
    }, 10000);

    setInterval(function() {
        $scope.$apply(function() {
            livestats();
        })
    }, 4200);

    var updateTeamDependencies = function(team) {
        if (team == undefined) {
            return null
        } else {
            $scope.myColour = team_colour(team);
            target(team);
            awaybench(team);
            homebench(team);
            formteam(team);
            optatext(team);
            formoppo(team);
            liveposs(team);
            liveshot(team);
            barposs(team);
            barshots(team);
            corners(team);
            scorer(team);
            livescore();
            away(team);
            home(team);
            table();
            score();
            nextfix();
        }
    };
    $scope.$watch('team', updateTeamDependencies);

});
'use strict';

angular.module('d3App.seasoncontrollers', [])

.controller('SeasonModeController', function($scope, $localStorage, $sessionStorage, $http, $timeout, focus, GeneralLiveData, TeamFormData, BigData, MatchDetails, HomeAwayTeam) {

    $scope.diffTeam = "Manchester United";

    $scope.diffSetting = "optascore";

    $scope.$storage = $localStorage.$default({
        "badge": true,
        "leaguetable": true,
        "prematch": true,
        "oppoform": true,
        "fixtures": true,
        "teams": true,
        "favteam": "Arsenal",
        "subs": true,
        "liveBars": true,
        "nextFixtures": true
    });
    $scope.generalView = true


    $scope.defaultCharter = function() {
        $scope.diffChart = false;
        $scope.defaultChart = true
    };
    
    $scope.diffCharter = function() {
        $scope.defaultChart = false;
        $scope.diffChart = true;
    };

    $scope.defaultCharter();

    focus('focusMe');


    $scope.selectTeam = function(team) {
        $scope.team = team
    };

    $scope.seasonResults = function() {
        recent($scope.team);
        $scope.generalView = false
    };

    $scope.generalResults = function() {
        $scope.generalView = true;
        scores();
    };

    $scope.selectForm = function(fix) {
        if (fix.home == $scope.team) {
            formoppo(fix.away);
        } else {
            formoppo(fix.home);
        };
    };

    $scope.settingsToggle = false

    $scope.team = $scope.$storage.favteam;

    

    // Filter on search, loaded from staticvalues 
    $scope.teamnames = teamnames;

    // Generic default values for instantiation
    var home = function(team) {
        var hometeam = HomeAwayTeam.home(team);
        hometeam.then(function(data) {
            if (data && data[0] != undefined) {
                $scope.hometeam = data;
                $scope.hometeamname = data[0].teamname
            }
        })
    }

    var away = function(team) {
        var awayteam = HomeAwayTeam.away(team);
        awayteam.then(function(data) {
            if (data && data[0] != undefined) {
                $scope.awayteam = data;
                $scope.awayteamname = data[0].teamname
            }
        })
    }

    var homebench = function(team) {
        var homesubs = HomeAwayTeam.homesubs(team);
        homesubs.then(function(data) {
            $scope.homesubs = data;
        })
    }

    var awaybench = function(team) {
        var awaysubs = HomeAwayTeam.awaysubs(team);
        awaysubs.then(function(data) {
            $scope.awaysubs = data;
        })
    }

    var squawkajson = function(team) {
        var megajson = BigData.squawka(team);
        megajson.then(function(data) {
            $scope.megajson = data
        })
    }

    var scores = function() {
        var scorePromise = GeneralLiveData.fullscores();
        scorePromise.then(function(data) {
            $scope.results = data
        })
    }
    var recent = function(team) {
        var recentPromise = GeneralLiveData.recent(team);
        recentPromise.then(function(data) {
            $scope.results = data
        })
    }


    var table = function() {
        var table = GeneralLiveData.table();
        table.then(function(data) {
            $scope.premtable = data
        })
    };

    var fixt = function(team) {
        var fixture = GeneralLiveData.fixtures(team);
        fixture.then(function(data) {
            $scope.fixtures = data
        })
    };

    var formteam = function(team) {
        var teamform = TeamFormData.teamform(team);
        teamform.then(function(data) {
            $scope.form = data
        })
    };

    var formoppo = function(team) {
        var oppoform = TeamFormData.teamform(team);
        oppoform.then(function(data) {
            $scope.otherform = data
            $scope.otherColour = team_colour(data[0]['team'])
        })
    };

    var optatext = function(team) {
        var prematch = MatchDetails.prematch(team);
        prematch.then(function(data) {
            $scope.prematchArray = data
            preMatcher(data);
        })
    };

    var nextfix = function() {
        var nextfixes = GeneralLiveData.nextfixtures()
        nextfixes.then(function(data) {
            $scope.nextfixtures = data
        })
    };

    var diff = function(team, diffTeam, setting) {
        if ($scope.diffTeam == undefined) {
            return null
        } else {
        var recentPromise = GeneralLiveData.diff(team, diffTeam, setting);
        recentPromise.then(function(data) {
            $scope.diffData = data;
        })
        };
    };

    $scope.counter = 0;
    var preMatcher = function(data) {
        $scope.prematchsing = data[$scope.counter];
        if ($scope.counter == 9) {
            $scope.counter = 0
        }
        $scope.counter++;
    };

    var getBadge = function(team) {
        $scope.badgehash = (team.replace(/ /g, "_") + ".png")
    };

    $scope.refershInterval = 5;

    setInterval(function() {
        $scope.$apply(function() {
            preMatcher($scope.prematchArray);
        })
    }, 10000);

    setInterval(function() {
        $scope.$apply(function() {
            table();
        })
    }, 100000);

    var updateTeamDependencies = function(team) {
        if (team == undefined) {
            return null
        } else {
            $scope.myColour = team_colour(team);
            squawkajson(team);
            awaybench(team);
            homebench(team);
            getBadge(team);
            formteam(team);
            optatext(team);
            away(team);
            home(team);
            fixt(team);
            nextfix();
            scores();
            table();
            $scope.$storage.favteam = team;
        }
    };
    $scope.$watch('team', updateTeamDependencies);
    $scope.$watchCollection('[team, diffTeam, diffSetting]', function(settings){
        diff(settings[0], settings[1], settings[2]);
    });
});
/*! angularjs-nvd3-directives - v0.0.2-beta - 2013-10-30
* http://cmaurer.github.io/angularjs-nvd3-directives
* Copyright (c) 2013 Christian Maurer; Licensed Apache License, v2.0 */

(function()
{
    angular.module('legendDirectives', [])
        .directive('simpleSvgLegend', function(){
            return {
                restrict: 'EA',
                scope: {
                    id: '@',
                    width: '@',
                    height: '@',
                    margin: '@',
                    x: '@',
                    y: '@',
                    labels: '@',
                    styles: '@',
                    classes: '@',
                    shapes: '@',  //rect, circle, ellipse
                    padding: '@',
                    columns: '@'
                },
                compile: function(){
                    return function link(scope, element, attrs){
                        "use strict";
                        var id,
                            width,
                            height,
                            margin,
                            widthTracker = 0,
                            heightTracker = 0,
                            columns = 1,
                            columnTracker = 0,
                            padding = 10,
                            paddingStr,
                            svgNamespace = 'http://www.w3.org/2000/svg',
                            svg,
                            g,
                            labels,
                            styles,
                            classes,
                            shapes,
                            x = 0,
                            y = 0,
                            container;

                        margin = (scope.$eval(attrs.margin) || {left:5, top:5, bottom:5, right:5});
                        width = (attrs.width  === "undefined" ? ((element[0].parentElement.offsetWidth) - (margin.left + margin.right)) : (+attrs.width - (margin.left + margin.right)));
                        height = (attrs.height === "undefined" ? ((element[0].parentElement.offsetHeight) - (margin.top + margin.bottom)) : (+attrs.height - (margin.top + margin.bottom)));

                        if(!attrs.id){
                            //if an id is not supplied, create a random id.
                            id = 'legend-' + Math.random();
                        } else {
                            id = attrs.id;
                        }
                        container = d3.select(this).classed('legend-' + id, true);

                        if(attrs.columns){
                            columns = (+attrs.columns);
                        }

                        if(attrs.padding){
                            padding = (+attrs.padding);
                        }
                        paddingStr = padding + '';

                        svg = document.createElementNS(svgNamespace, 'svg');
                        if(attrs.width){
                            svg.setAttribute('width', width + '');
                        }

                        if(attrs.height){
                            svg.setAttribute('height', height + '');
                        }
                        svg.setAttribute('id', id);

                        if(attrs.x){
                            x = (+attrs.x);
                        }

                        if(attrs.y){
                            y = (+attrs.y);
                        }

                        element.append(svg);

                        g = document.createElementNS(svgNamespace, 'g');
                        g.setAttribute('transform', 'translate(' + x + ',' + y + ')');

                        svg.appendChild(g);

                        if(attrs.labels){
                            labels = scope.$eval(attrs.labels);
                        }

                        if(attrs.styles){
                            styles = scope.$eval(attrs.styles);
                        }

                        if(attrs.classes){
                            classes = scope.$eval(attrs.classes);
                        }

                        if(attrs.shapes){
                            shapes = scope.$eval(attrs.shapes);
                        }

                        for(var i in labels){

                            var shpe = shapes[i], shape, text, textSize, g1;

                            if( ( columnTracker % columns ) === 0 ){
                                widthTracker = 0;
                                heightTracker = heightTracker + ( padding + ( padding * 1.5 ) );
                            }
                            g1 = document.createElementNS(svgNamespace,'g');
                            g1.setAttribute('transform', 'translate(' +  widthTracker + ', ' + heightTracker + ')');

                            if(shpe === 'rect'){
                                shape = document.createElementNS(svgNamespace, 'rect');
                                //x, y, rx, ry
                                shape.setAttribute('y', ( 0 - ( padding / 2 ) ) + '');
                                shape.setAttribute('width', paddingStr);
                                shape.setAttribute('height', paddingStr);
                            } else if (shpe === 'ellipse'){
                                shape = document.createElementNS(svgNamespace, 'ellipse');
                                shape.setAttribute('rx', paddingStr);
                                shape.setAttribute('ry', ( padding + ( padding / 2 ) ) + '');
                            } else {
                                shape = document.createElementNS(svgNamespace, 'circle');
                                shape.setAttribute('r', ( padding / 2 ) + '');
                            }

                            if(styles && styles[i]){
                                shape.setAttribute('style', styles[i]);
                            }

                            if(classes && classes[i]){
                                shape.setAttribute('class', classes[i]);
                            }

                            g1.appendChild(shape);

                            widthTracker = widthTracker + shape.clientWidth + ( padding + ( padding / 2 ) );

                            text = document.createElementNS(svgNamespace, 'text');
                            text.setAttribute('transform', 'translate(10, 5)');
                            text.appendChild(document.createTextNode(labels[i]));

                            g1.appendChild(text);
                            g.appendChild(g1);

                            textSize = text.clientWidth;
                            widthTracker = widthTracker + textSize + ( padding + ( padding * 0.75 ) );

                            columnTracker++;
                        }
                    };
                }
            };
        });
    function processEvents(chart, scope){

        if(chart.dispatch){
            if(chart.dispatch.tooltipShow){
                chart.dispatch.on('tooltipShow.directive', function(event) {
                    scope.$emit('tooltipShow.directive', event);
                });
            }

            if(chart.dispatch.tooltipHide){
                chart.dispatch.on('tooltipHide.directive', function(event) {
                    scope.$emit('tooltipHide.directive', event);
                });
            }

            if(chart.dispatch.beforeUpdate){
                chart.dispatch.on('beforeUpdate.directive', function(event) {
                    scope.$emit('beforeUpdate.directive', event);
                });
            }

            if(chart.dispatch.stateChange){
                chart.dispatch.on('stateChange.directive', function(event) {
                    scope.$emit('stateChange.directive', event);
                });
            }

            if(chart.dispatch.changeState){
                chart.dispatch.on('changeState.directive', function(event) {
                    scope.$emit('changeState.directive', event);
                });
            }
        }

        if(chart.lines){
            chart.lines.dispatch.on('elementMouseover.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.lines.dispatch.on('elementMouseout.tooltip.directive', function(event) {
                scope.$emit('elementMouseout.tooltip.directive', event);
            });

            chart.lines.dispatch.on('elementClick.directive', function(event) {
                scope.$emit('elementClick.directive', event);
            });
        }

        if(chart.stacked && chart.stacked.dispatch){
            chart.stacked.dispatch.on('areaClick.toggle.directive', function(event) {
                scope.$emit('areaClick.toggle.directive', event);
            });

            chart.stacked.dispatch.on('tooltipShow.directive', function(event){
                scope.$emit('tooltipShow.directive', event);
            });


            chart.stacked.dispatch.on('tooltipHide.directive', function(event){
                scope.$emit('tooltipHide.directive', event);
            });

        }

        if(chart.interactiveLayer){
            if(chart.interactiveLayer.elementMouseout){
                chart.interactiveLayer.dispatch.on('elementMouseout.directive', function(event){
                    scope.$emit('elementMouseout.directive', event);
                });
            }

            if(chart.interactiveLayer.elementMousemove){
                chart.interactiveLayer.dispatch.on('elementMousemove.directive', function(event){
                    scope.$emit('elementMousemove.directive', event);
                });
            }
        }

        if(chart.discretebar){
            chart.discretebar.dispatch.on('elementMouseover.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.discretebar.dispatch.on('elementMouseout.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });
        }

        if(chart.multibar){
            chart.multibar.dispatch.on('elementMouseover.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.multibar.dispatch.on('elementMouseout.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.multibar.dispatch.on('elementClick.directive', function(event) {
                scope.$emit('elementClick.directive', event);
            });     

        }

        if(chart.pie){
            chart.pie.dispatch.on('elementMouseover.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.pie.dispatch.on('elementMouseout.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });
        }

        if(chart.scatter){
            chart.scatter.dispatch.on('elementMouseover.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.scatter.dispatch.on('elementMouseout.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });
        }

        if(chart.bullet){
            chart.bullet.dispatch.on('elementMouseover.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });

            chart.bullet.dispatch.on('elementMouseout.tooltip.directive', function(event) {
                scope.$emit('elementMouseover.tooltip.directive', event);
            });
        }

        if(chart.legend){
            //stateChange
            chart.legend.dispatch.on('stateChange.legend.directive', function(event) {
                scope.$emit('stateChange.legend.directive', event);
            });

            chart.legend.dispatch.on('legendClick.directive', function(d, i) {
                scope.$emit('legendClick.directive', d, i);
            });

        }

        if(chart.controls){
            if(chart.controls.legendClick){
                chart.controls.dispatch.on('legendClick.directive', function(d, i){
                   scope.$emit('legendClick.directive', d, i);
                });
            }
        }

    }

    function configureXaxis(chart, scope, attrs){
    "use strict";
        if(attrs.xaxisorient){
            chart.xAxis.orient(attrs.xaxisorient);
        }
        if(attrs.xaxisticks){
            chart.xAxis.scale().ticks(attrs.xaxisticks);
        }
        if(attrs.xaxistickvalues){
            if(Array.isArray(scope.$eval(attrs.xaxistickvalues))){
                chart.xAxis.tickValues(scope.$eval(attrs.xaxistickvalues));
            } else if(typeof scope.xaxistickvalues() === 'function'){
                chart.xAxis.tickValues(scope.xaxistickvalues());
            }
        }
        if(attrs.xaxisticksubdivide){
            chart.xAxis.tickSubdivide(scope.xaxisticksubdivide());
        }
        if(attrs.xaxisticksize){
            chart.xAxis.tickSize(scope.xaxisticksize());
        }
        if(attrs.xaxistickpadding){
            chart.xAxis.tickPadding(scope.xaxistickpadding());
        }
        if(attrs.xaxistickformat){
            chart.xAxis.tickFormat(scope.xaxistickformat());
        }
        if(attrs.xaxislabel){
            chart.xAxis.axisLabel(attrs.xaxislabel);
        }
        if(attrs.xaxisscale){
            chart.xAxis.scale(scope.xaxisscale());
        }
        if(attrs.xaxisdomain){
            chart.xAxis.domain(scope.xaxisdomain());
        }
        if(attrs.xaxisrange){
            chart.xAxis.range(scope.xaxisrange());
        }
        if(attrs.xaxisrangeband){
            chart.xAxis.rangeBand(scope.xaxisrangeband());
        }
        if(attrs.xaxisrangebands){
            chart.xAxis.rangeBands(scope.xaxisrangebands());
        }
        if(attrs.xaxisshowmaxmin){
            chart.xAxis.showMaxMin((attrs.xaxisshowmaxmin === "true"));
        }
        if(attrs.xaxishighlightzero){
            chart.xAxis.highlightZero((attrs.xaxishighlightzero === "true"));
        }
        if(attrs.xaxisrotatelables){
            chart.xAxis.rotateLabels((+attrs.xaxisrotatelables));
        }
    //    if(attrs.xaxisrotateylabel){
    //        chart.xAxis.rotateYLabel((attrs.xaxisrotateylabel === "true"));
    //    }
        if(attrs.xaxisstaggerlabels){
            chart.xAxis.staggerLabels((attrs.xaxisstaggerlabels === "true"));
        }
    }

    function configureYaxis(chart, scope, attrs){
    "use strict";
        if(attrs.yaxisorient){
            chart.yAxis.orient(attrs.yaxisorient);
        }
        if(attrs.yaxisticks){
            chart.yAxis.scale().ticks(attrs.yaxisticks);
        }
        if(attrs.yaxistickvalues){
            if(Array.isArray(scope.$eval(attrs.yaxistickvalues))){
                chart.yAxis.tickValues(scope.$eval(attrs.yaxistickvalues));
            } else if(typeof scope.yaxistickvalues() === 'function'){
                chart.yAxis.tickValues(scope.yaxistickvalues());
            }
        }
        if(attrs.yaxisticksubdivide){
            chart.yAxis.tickSubdivide(scope.yaxisticksubdivide());
        }
        if(attrs.yaxisticksize){
            chart.yAxis.tickSize(scope.yaxisticksize());
        }
        if(attrs.yaxistickpadding){
            chart.yAxis.tickPadding(scope.yaxistickpadding());
        }
        if(attrs.yaxistickformat){
            chart.yAxis.tickFormat(scope.yaxistickformat());
        }
        if(attrs.yaxislabel){
            chart.yAxis.axisLabel(attrs.yaxislabel);
        }
        if(attrs.yaxisscale){
            chart.yAxis.scale(scope.yaxisscale());
        }
        if(attrs.yaxisdomain){
            chart.yAxis.domain(scope.yaxisdomain());
        }
        if(attrs.yaxisrange){
            chart.yAxis.range(scope.yaxisrange());
        }
        if(attrs.yaxisrangeband){
            chart.yAxis.rangeBand(scope.yaxisrangeband());
        }
        if(attrs.yaxisrangebands){
            chart.yAxis.rangeBands(scope.yaxisrangebands());
        }
        if(attrs.yaxisshowmaxmin){
            chart.yAxis.showMaxMin((attrs.yaxisshowmaxmin === "true"));
        }
        if(attrs.yaxishighlightzero){
            chart.yAxis.highlightZero((attrs.yaxishighlightzero === "true"));
        }
        if(attrs.yaxisrotatelables){
            chart.yAxis.rotateLables(attrs.yaxisrotatelables);
        }
        if(attrs.yaxisrotateylabel){
            chart.yAxis.rotateYLabel((attrs.yaxisrotateylabel === "true"));
        }
        if(attrs.yaxisstaggerlabels){
            chart.yAxis.staggerLabels((attrs.yaxisstaggerlabels === "true"));
        }
    }


    function configureY1axis(chart, scope, attrs){
        "use strict";
        if(attrs.y1axisticks){
            chart.y1Axis.scale().ticks(attrs.y1axisticks);
        }
        if(attrs.y1axistickvalues){
            chart.y1Axis.tickValues(attrs.y1axistickvalues);
        }
        if(attrs.y1axisticksubdivide){
            chart.y1Axis.tickSubdivide(scope.y1axisticksubdivide());
        }
        if(attrs.y1axisticksize){
            chart.y1Axis.tickSize(scope.y1axisticksize());
        }
        if(attrs.y1axistickpadding){
            chart.y1Axis.tickPadding(scope.y1axistickpadding());
        }
        if(attrs.y1axistickformat){
            chart.y1Axis.tickFormat(scope.y1axistickformat());
        }
        if(attrs.y1axislabel){
            chart.y1Axis.axisLabel(attrs.y1axislabel);
        }
        if(attrs.y1axisscale){
            chart.y1Axis.yScale(scope.y1axisscale());
        }
        if(attrs.y1axisdomain){
            chart.y1Axis.domain(scope.y1axisdomain());
        }
        if(attrs.y1axisrange){
            chart.y1Axis.range(scope.y1axisrange());
        }
        if(attrs.y1axisrangeband){
            chart.y1Axis.rangeBand(scope.y1axisrangeband());
        }
        if(attrs.y1axisrangebands){
            chart.y1Axis.rangeBands(scope.y1axisrangebands());
        }
        if(attrs.y1axisshowmaxmin){
            chart.y1Axis.showMaxMin((attrs.y1axisshowmaxmin === "true"));
        }
        if(attrs.y1axishighlightzero){
            chart.y1Axis.highlightZero((attrs.y1axishighlightzero === "true"));
        }
        if(attrs.y1axisrotatelables){
            chart.y1Axis.highlightZero(scope.y1axisrotatelables);
        }
        if(attrs.y1axisrotateylabel){
            chart.y1Axis.rotateYLabel((attrs.y1axisrotateylabel === "true"));
        }
        if(attrs.y1axisstaggerlabels){
            chart.y1Axis.staggerlabels((attrs.y1axisstaggerlabels === "true"));
        }
    }


    function configureY2axis(chart, scope, attrs){
        "use strict";
        if(attrs.y2axisticks){
            chart.y2Axis.scale().ticks(attrs.y2axisticks);
        }
        if(attrs.y2axistickvalues){
            chart.y2Axis.tickValues(scope.$eval(attrs.y2axistickvalues));
        }
        if(attrs.y2axisticksubdivide){
            chart.y2Axis.tickSubdivide(scope.y2axisticksubdivide());
        }
        if(attrs.y2axisticksize){
            chart.y2Axis.tickSize(scope.y2axisticksize());
        }
        if(attrs.y2axistickpadding){
            chart.y2Axis.tickPadding(scope.y2axistickpadding());
        }
        if(attrs.y2axistickformat){
            chart.y2Axis.tickFormat(scope.y2axistickformat());
        }
        if(attrs.y2axislabel){
            chart.y2Axis.axisLabel(attrs.y2axislabel);
        }
        if(attrs.y2axisscale){
            chart.y2Axis.yScale(scope.y2axisscale());
        }
        if(attrs.y2axisdomain){
            chart.y2Axis.domain(scope.y2axisdomain());
        }
        if(attrs.y2axisrange){
            chart.y2Axis.range(scope.y2axisrange());
        }
        if(attrs.y2axisrangeband){
            chart.y2Axis.rangeBand(scope.y2axisrangeband());
        }
        if(attrs.y2axisrangebands){
            chart.y2Axis.rangeBands(scope.y2axisrangebands());
        }
        if(attrs.y2axisshowmaxmin){
            chart.y2Axis.showMaxMin((attrs.y2axisshowmaxmin === "true"));
        }
        if(attrs.y2axishighlightzero){
            chart.y2Axis.highlightZero((attrs.y2axishighlightzero === "true"));
        }
        if(attrs.y2axisrotatelables){
            chart.y2Axis.highlightZero(scope.y2axisrotatelables);
        }
        if(attrs.y2axisrotateylabel){
            chart.y2Axis.rotateYLabel((attrs.y2axisrotateylabel === "true"));
        }
        if(attrs.y2axisstaggerlabels){
            chart.y2Axis.staggerlabels((attrs.y2axisstaggerlabels === "true"));
        }
    }
function initializeMargin(scope, attrs){
        'use strict';
        var margin = (scope.$eval(attrs.margin) || {left: 50, top: 50, bottom: 50, right: 50});
        if (typeof(margin) !== "object") {
            // we were passed a vanilla int, convert to full margin object
            margin = {left: margin, top: margin, bottom: margin, right: margin};
        }
        scope.margin = margin;
    }

    function initializeWidth(scope, attrs, element){
        'use strict';
        var marginAdjustment = 0;
        if(attrs.width === "undefined"){
            scope.width = element[0].parentElement.offsetWidth;
        } else {
            scope.width = (+attrs.width);
        }
        if(!scope.margin.left || !scope.margin.right){
            initializeMargin(scope, attrs, element);
        }
        marginAdjustment = (scope.margin.left + scope.margin.right);
        scope.width = (((scope.width - marginAdjustment) > 0) ? (scope.width - marginAdjustment) : 0);
    }

    function initializeHeight(scope, attrs, element){
        'use strict';
        var marginAdjustment = 0;
        if(attrs.height === "undefined"){
            scope.height = element[0].parentElement.offsetHeight;
        } else {
            scope.height = (+attrs.height);
        }
        if(!scope.margin.top || !scope.margin.bottom){
            initializeMargin(scope, attrs, element);
        }
        marginAdjustment = (scope.margin.top + scope.margin.bottom);
        scope.height = (((scope.height - marginAdjustment) > 0) ? (scope.height - marginAdjustment) : 0);
    }

    function setupDimensions(scope, attrs, element) {
        'use strict';
        initializeWidth(scope, attrs, element);
        initializeHeight(scope, attrs, element);
    }

    function checkElementID(scope, attrs, element, chart, data)
    {

        var dataAttributeChartID; //randomly generated if id attribute doesn't exist

        if(!attrs.id){

            dataAttributeChartID = "chartid" + Math.floor(Math.random()*1000000001);
            angular.element(element).attr('data-chartid', dataAttributeChartID );    

            //if an id is not supplied, create a random id.
            if(d3.select('[data-chartid=' + dataAttributeChartID + '] svg').empty()){
                d3.select('[data-chartid=' + dataAttributeChartID + ']').append('svg')
                .attr('height', scope.height)
                .attr('width', scope.width)
                .datum(data)
                .transition().duration((attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration)))
                .call(chart);
            }
            else{
                d3.select('[data-chartid=' + dataAttributeChartID + '] svg')
                .attr('height', scope.height)
                .attr('width', scope.width)
                .datum(data)
                .transition().duration((attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration)))
                .call(chart);  
            }

        } 
        else{

            if(d3.select('#' + attrs.id + ' svg').empty()){
                d3.select('#' + attrs.id)
                    .append('svg');
            } 
                                         
            d3.select('#' + attrs.id + ' svg')
                .attr('height', scope.height)
                .attr('width', scope.width)
                .datum(data)
                .transition().duration((attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration)))
                .call(chart);
            }
    }    

    angular.module('nvd3ChartDirectives', [])
        .directive('nvd3LineChart', [function(){
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    rightalignyaxis: '@',
                    defaultstate: '@',
                    nodata: '@',
                    margin: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    forcex: '@',
                    forcey: '@',
                    isArea: '@',
                    interactive: '@',
                    clipedge: '@',
                    clipvoronoi: '@',
                    interpolate: '@',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '@',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',  //$watch(watchExpression, listener, objectEquality)

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.lineChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis  === "true"))
                                        .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis  === "true"))
                                        .rightAlignYAxis(attrs.rightalignyaxis === undefined ? false : (attrs.rightalignyaxis  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                        .clipVoronoi(attrs.clipvoronoi === undefined ? false : (attrs.clipvoronoi === "true"))
                                        .interpolate(attrs.interpolate === undefined ? 'linear' : attrs.interpolate)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                        .isArea(attrs.isarea === undefined ? function(){return false;} : function(){ return (attrs.isarea === "true"); });

                                    if (chart.useInteractiveGuideline) {
                                        chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                    }

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3CumulativeLineChart', [function(){
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    rightalignyaxis: '@',
                    defaultstate: '@',
                    nodata: '@',
                    margin: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    forcex: '@',
                    forcey: '@',
                    isArea: '@',
                    interactive: '@',
                    clipedge: '@',
                    clipvoronoi: '@',
                    usevoronoi: '@',
                    average: '&',
                    rescaley: '@',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',  //$watch(watchExpression, listener, objectEquality)

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.cumulativeLineChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis  === "true"))
                                        .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis  === "true"))
                                        .rightAlignYAxis(attrs.rightalignyaxis === undefined ? false : (attrs.rightalignyaxis  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                        .clipVoronoi(attrs.clipvoronoi === undefined ? false : (attrs.clipvoronoi === "true"))
                                        .useVoronoi(attrs.usevoronoi === undefined ? false : (attrs.usevoronoi === "true"))
                                        .average(attrs.average === undefined ? function(d) { return d.average; } : scope.average())
                                        .color(attrs.color === undefined ? d3.scale.category10().range() : scope.color())
                                        .isArea(attrs.isarea === undefined ? false : (attrs.isarea === "true"));
                                        //.rescaleY(attrs.rescaley === undefined ? false : (attrs.rescaley === "true"));

                                    if (chart.useInteractiveGuideline) {
                                        chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                    }

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3StackedAreaChart', [function(){
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showcontrols: '@',
                    nodata: '@',
                    margin: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    forcex: '@', //List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                    forcey: '@', // List of numbers to Force into the Y scale
                    forcesize: '@', // List of numbers to Force into the Size scale

                    interactive: '@',
                    usevoronoi: '@',
                    clipedge: '@',
                    interpolate: '@',
                    style: '@',     //stack, stream, stream-center, expand
                    order: '@',     //default, inside-out
                    offset: '@',    //zero, wiggle, silhouette, expand
                    size: '&',      //accessor to get the point size
                    xScale: '&',
                    yScale: '&',
                    xDomain: '&',
                    yDomain: '&',
                    xRange: '&',
                    yRange: '&',
                    sizeDomain: '&',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.stackedAreaChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .size(attrs.size === undefined ? function(d) { return d.size || 1; } : scope.size())
                                        .forceSize(attrs.forcesize === undefined ? [] : scope.$eval(attrs.forcesize)) // List of numbers to Force into the Size scale
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());

                                    if (chart.useInteractiveGuideline) {
                                        chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                    }

                                    if(attrs.usevoronoi){
                                        chart.useVoronoi((attrs.usevoronoi === "true"));
                                    }

                                    if(attrs.style){
                                        chart.style(attrs.style);
                                    }

                                    if(attrs.order){
                                        chart.order(attrs.order);
                                    }

                                    if(attrs.offset){
                                        chart.offset(attrs.offset);
                                    }

                                    if(attrs.interpolate){
                                        chart.interpolate(attrs.interpolate);
                                    }

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    if(attrs.xscale){
                                        chart.xScale(scope.xscale());
                                    }

                                    if(attrs.yscale){
                                        chart.yScale(scope.yscale());
                                    }

                                    if(attrs.xdomain){
                                        chart.xDomain(scope.xdomain());
                                    }

                                    if(attrs.ydomain){
                                        chart.yDomain(scope.ydomain());
                                    }

                                    if(attrs.sizedomain){
                                        chart.sizeDomain(scope.sizedomain());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3MultiBarChart', [function(){
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    tooltipcontent: '&',
                    color: '&',
                    showcontrols: '@',
                    nodata: '@',
                    reducexticks: '@',
                    staggerlabels: '@',
                    rotatelabels: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    //forcex is not exposed in the nvd3 multibar.js file.  it is not here on purpose.
                    forcey: '@',
                    delay: '@',
                    stacked: '@',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.multiBarChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .reduceXTicks(attrs.reducexticks === undefined ? false: (attrs.reducexticks === "true"))
                                        .staggerLabels(attrs.staggerlabels === undefined ? false : (attrs.staggerlabels === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .rotateLabels(attrs.rotatelabels === undefined ? 0 : attrs.rotatelabels)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                        .delay(attrs.delay === undefined ? 1200 : attrs.delay)
                                        .stacked(attrs.stacked === undefined ? false : (attrs.stacked === "true"));

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3DiscreteBarChart', [function(){
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    tooltipcontent: '&',
                    staggerlabels: '@',
                    color: '&',
                    margin: '&',
                    nodata: '@',
                    x: '&',
                    y: '&',
                    //forcex is not exposed in the nvd3 multibar.js file.  it is not here on purpose.
                    forcey: '@',
                    showvalues: '@',
                    valueformat: '&',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.discreteBarChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .showValues(attrs.showvalues === undefined ? false : (attrs.showvalues === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis  === "true"))
                                        .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .staggerLabels(attrs.staggerlabels === undefined ? false : (attrs.staggerlabels === "true"))
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    if(attrs.valueformat){
                                        chart.valueFormat(scope.valueformat());
                                    }

                                    //events
                                    //https://github.com/mbostock/d3/wiki/Internals#wiki-dispatch
                                    //dispatch: 'tooltipShow', 'tooltipHide', 'beforeUpdate',
                                    //discretebar.dispatch: 'elementMouseout.tooltip', 'elementMouseover.tooltip'

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3HistoricalBarChart', [function(){
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    tooltips: '@',
                    tooltipcontent: '&',
                    color: '&',
                    margin: '&',
                    nodata: '@',
                    x: '&',
                    y: '&',
    //                forcex: '@',
                    forcey: '@',
                    isarea: '@',
                    interactive: '@',
                    clipedge: '@',
                    clipvoronoi: '@',
                    interpolate: '@',
                    highlightPoint: '@',
                    clearHighlights: '@',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.historicalBarChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);

                                    if (chart.useInteractiveGuideline) {
                                        chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                    }

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    if(attrs.valueformat){
                                        chart.valueFormat(scope.valueformat());
                                    }

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3MultiBarHorizontalChart', [function(){
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    tooltipcontent: '&',
                    color: '&',
                    showcontrols: '@',
                    margin: '&',
                    nodata: '@',
                    x: '&',
                    y: '&',
                    //forcex: '@',  //forcex is rebound from multibarhorizontalchart, but is not on multibar
                    forcey: '@',
                    stacked: '@',
                    showvalues: '@',
                    valueformat: '&',
                    //'xDomain', 'yDomain',
                    //state: '@', //stacked, grouped: same as stacked === true, or stacked === false

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.multiBarHorizontalChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .showValues(attrs.showvalues === undefined ? false : (attrs.showvalues === "true"))
                                        .stacked(attrs.stacked === undefined ? false : (attrs.stacked === "true"));

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    if(attrs.valueformat){
                                        chart.valueFormat(scope.valueformat());
                                    }

                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3PieChart', [function(){
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlabels: '@',
                    showlegend: '@',
                    donutLabelsOutside: '@',
                    pieLabelsOutside: '@',
                    labelType: '@',
                    nodata: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    color: '&',
                    donut: '@',
                    donutRatio: '@',
                    labelThreshold: '@',
                    description: '&',
                    tooltips: '@',
                    tooltipcontent: '&',
                    valueFormat: '&',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.pieChart()
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .showLabels(attrs.showlabels === undefined ? false : (attrs.showlabels === "true"))
                                        .labelThreshold(attrs.labelThreshold === undefined ? 0.02 : attrs.labelthreshold)
                                        .labelType(attrs.labeltype === undefined ? 'key' : attrs.labeltype)
                                        .pieLabelsOutside(attrs.pielabelsoutside === undefined ? true : (attrs.pielabelsoutside === "true"))
                                        .valueFormat(attrs.valueformat === undefined ? d3.format(',.2f') : attrs.valueformat)
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .description(attrs.description === undefined ?  function(d) { return d.description; } : scope.description())
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                        .donutLabelsOutside(attrs.donutlabelsoutside === undefined ? false : (attrs.donutlabelsoutside === "true"))
                                        .donut(attrs.donut === undefined ? false : (attrs.donut === "true"))
                                        .donutRatio(attrs.donutratio === undefined ? 0.5 : (attrs.donutratio));

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3ScatterChart', [function(){
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showcontrols: '@',
                    showDistX: '@',
                    showDistY: '@',
                    rightAlignYAxis: '@',
                    fisheye: '@',
                    xPadding: '@',
                    yPadding: '@',
                    tooltipContent: '&',
                    tooltipXContent: '&',
                    tooltipYContent: '&',
                    color: '&',
                    margin: '&',
                    nodata: '@',
                    transitionDuration: '@',
                    shape: '&',
                    onlyCircles: '@',
                    interactive: '@',
                    x: '&',
                    y: '&',
                    size: '&',
                    forceX: '@',
                    forceY: '@',
                    forceSize: '@',
                    xrange: '&',
                    xdomain: '&',
                    xscale: '&',
                    yrange: '&',
                    ydomain: '&',
                    yscale: '&',
                    sizerange: '&',
                    sizedomain: '&',
                    zscale: '&',

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.scatterChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d.x; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d.y; } : scope.y())
                                        .size(attrs.size === undefined ? function(d){ return d.size; }: scope.size())
                                        .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex))
                                        .forceY(attrs.forcey === undefined ? [] : scope.$eval(attrs.forcey))
                                        .forceSize(attrs.forcesize === undefined ? [] : scope.$eval(attrs.forcesize))
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .tooltipContent(attrs.tooltipContent === undefined ? null : scope.tooltipContent())
                                        .tooltipXContent(attrs.tooltipxcontent === undefined ? function(key, x) { return '<strong>' + x + '</strong>'; } : scope.tooltipXContent())
                                        .tooltipYContent(attrs.tooltipycontent === undefined ? function(key, x, y) { return '<strong>' + y + '</strong>'; } : scope.tooltipYContent())
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showDistX(attrs.showdistx === undefined ? false : (attrs.showdistx === "true"))
                                        .showDistY(attrs.showdisty === undefined ? false : (attrs.showdisty === "true"))
                                        .xPadding(attrs.xpadding === undefined ? 0 : (+attrs.xpadding))
                                        .yPadding(attrs.ypadding === undefined ? 0 : (+attrs.ypadding))
                                        .fisheye(attrs.fisheye === undefined ? 0 : (+attrs.fisheye))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                        .transitionDuration(attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration));

                                    if(attrs.shape){
                                        chart.scatter.onlyCircles(false);
                                        chart.scatter.shape(attrs.shape === undefined ? function(d) { return d.shape || 'circle'; } : scope.shape());
                                    }

    //'pointActive', 'clipVoronoi', 'clipRadius', 'useVoronoi'

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);

                                    if(attrs.xscale){
                                        chart.xDomain(scope.xdomain());
                                        chart.xRange(scope.xrange());
                                        chart.xScale(scope.xscale());
                                    }

                                    if(attrs.yscale){
                                        chart.yDomain(scope.ydomain());
                                        chart.yRange(scope.yrange());
                                        chart.yScale(scope.yscale());
                                    }

                                    if(attrs.zscale){
                                        chart.sizeDomain(scope.sizedomain());
                                        chart.sizeRange(scope.sizerange());
                                        chart.zScale(scope.zscale());
                                    }

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3ScatterPlusLineChart', [function(){
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@'
                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){

                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.scatterPlusLineChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d.x; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d.y; } : scope.y())
                                        .size(attrs.size === undefined ? function(d){ return d.size; }: scope.size())
                                        .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .tooltipContent(attrs.tooltipContent === undefined ? null : scope.tooltipContent())
                                        .tooltipXContent(attrs.tooltipxcontent === undefined ? function(key, x) { return '<strong>' + x + '</strong>'; } : scope.tooltipXContent())
                                        .tooltipYContent(attrs.tooltipycontent === undefined ? function(key, x, y) { return '<strong>' + y + '</strong>'; } : scope.tooltipYContent())
                                        .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .showDistX(attrs.showdistx === undefined ? false : (attrs.showdistx === "true"))
                                        .showDistY(attrs.showdisty === undefined ? false : (attrs.showdisty === "true"))
                                        .xPadding(attrs.xpadding === undefined ? 0 : (+attrs.xpadding))
                                        .yPadding(attrs.ypadding === undefined ? 0 : (+attrs.ypadding))
                                        .fisheye(attrs.fisheye === undefined ? 0 : (+attrs.fisheye))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                        .transitionDuration(attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration));

                                    if(attrs.shape){
                                        chart.scatter.onlyCircles(false);
                                        chart.scatter.shape(attrs.shape === undefined ? function(d) { return d.shape || 'circle'; } : scope.shape());
                                    }

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    });
                }
            };
        }])
        .directive('nvd3LinePlusBarChart', [function(){
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    rightalignyaxis: '@',
                    defaultstate: '@',
                    nodata: '@',
                    margin: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    clipvoronoi: '@',
                    interpolate: '@',
    //                'xScale', 'yScale', 'xDomain', 'yDomain', defined

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //yaxis
                    y2axisorient: '&',
                    y2axisticks: '&',
                    y2axistickvalues: '&',
                    y2axisticksubdivide: '&',
                    y2axisticksize: '&',
                    y2axistickpadding: '&',
                    y2axistickformat: '&',
                    y2axislabel: '&',
                    y2axisscale: '&',
                    y2axisdomain: '&',
                    y2axisrange: '&',
                    y2axisrangeband: '&',
                    y2axisrangebands: '&',
                    y2axisshowmaxmin: '@',
                    y2axishighlightzero: '@',
                    y2axisrotatelables: '@',
                    y2axisrotateylabel: '@',
                    y2axisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.linePlusBarChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureY1axis(chart, scope, attrs);
                                    configureY2axis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3LineWithFocusChart', [function(){
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    showlegend: '@',
                    tooltips: '@',
                    showxaxis: '@',
                    showyaxis: '@',
                    rightalignyaxis: '@',
                    defaultstate: '@',
                    nodata: '@',
                    margin: '&',
                    margin2: '&',
                    tooltipcontent: '&',
                    color: '&',
                    x: '&',
                    y: '&',
                    clipvoronoi: '@',
                    interpolate: '@',
                    isArea: '@',
    //                'xScale', 'yScale', 'xDomain', 'yDomain', defined

                    //xaxis
                    xaxisorient: '&',
                    xaxisticks: '&',
                    xaxistickvalues: '&xaxistickvalues',
                    xaxisticksubdivide: '&',
                    xaxisticksize: '&',
                    xaxistickpadding: '&',
                    xaxistickformat: '&',
                    xaxislabel: '@',
                    xaxisscale: '&',
                    xaxisdomain: '&',
                    xaxisrange: '&',
                    xaxisrangeband: '&',
                    xaxisrangebands: '&',
                    xaxisshowmaxmin: '@',
                    xaxishighlightzero: '@',
                    xaxisrotatelables: '@',
                    xaxisrotateylabel: '@',
                    xaxisstaggerlabels: '@',

                    //yaxis
                    yaxisorient: '&',
                    yaxisticks: '&',
                    yaxistickvalues: '&yaxistickvalues',
                    yaxisticksubdivide: '&',
                    yaxisticksize: '&',
                    yaxistickpadding: '&',
                    yaxistickformat: '&',
                    yaxislabel: '@',
                    yaxisscale: '&',
                    yaxisdomain: '&',
                    yaxisrange: '&',
                    yaxisrangeband: '&',
                    yaxisrangebands: '&',
                    yaxisshowmaxmin: '@',
                    yaxishighlightzero: '@',
                    yaxisrotatelables: '@',
                    yaxisrotateylabel: '@',
                    yaxisstaggerlabels: '@',

                    //yaxis
                    y2axisorient: '&',
                    y2axisticks: '&',
                    y2axistickvalues: '&',
                    y2axisticksubdivide: '&',
                    y2axisticksize: '&',
                    y2axistickpadding: '&',
                    y2axistickformat: '&',
                    y2axislabel: '&',
                    y2axisscale: '&',
                    y2axisdomain: '&',
                    y2axisrange: '&',
                    y2axisrangeband: '&',
                    y2axisrangebands: '&',
                    y2axisshowmaxmin: '@',
                    y2axishighlightzero: '@',
                    y2axisrotatelables: '@',
                    y2axisrotateylabel: '@',
                    y2axisstaggerlabels: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                     $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);

                                    //setup height 2
                                    //height 2 is 100

                                    //margin
                                    //nvd3 default is {top: 30, right: 30, bottom: 30, left: 60}

                                    //setup margin 2
                                    //nvd3 default is {top: 0, right: 30, bottom: 20, left: 60}


                                    var chart = nv.models.lineWithFocusChart()
                                        .width(scope.width)
                                        .height(scope.height)
    //                                    .height2()
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                        .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                        .isArea(attrs.isarea === undefined ? function(){return false;} : function(){ return (attrs.isarea === "true"); });

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureY1axis(chart, scope, attrs);
                                    configureY2axis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3BulletChart', [function(){
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    margin: '&',
                    tooltips: '@',
                    tooltipcontent: '&',
                    orient: '@',  // left, right, top, bottom
                    ranges: '&', //ranges (bad, satisfactory, good)
                    markers: '&', // markers (previous, goal)
                    measures: '&', // measures (actual, forecast)
                    tickformat: '&',
                    nodata: '@',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.bulletChart()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .orient(attrs.orient === undefined ? 'left' : attrs.orient)
    //                                    .ranges(attrs.ranges === undefined ? function(d){ return d.ranges; } : scope.ranges())
    //                                    .markers(attrs.markers === undefined ? function(d){ return d.markers; } : scope.markers())
    //                                    .measures(attrs.measures === undefined ? function(d){ return d.measures; } : scope.measures())
                                        .tickFormat(attrs.tickformat === undefined ? null : scope.tickformat())
                                        .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata);

                                    if(attrs.tooltipcontent){
                                        chart.tooltipContent(scope.tooltipcontent());
                                    }

                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3SparklineChart', [function(){
            'use strict';
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    color: '&',
                    xscale: '&',
                    yscale: '&',
                    showvalue: '@',
                    alignvalue: '@',
                    rightalignvalue: '@',
                    nodata: '@',

                    xaxistickformat: '&',
                    yaxistickformat: '&',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    $scope.d3Call = function(data, chart){
                        checkElementID($scope, $attrs, $element, chart, data);
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    setupDimensions(scope, attrs, element);
                                    var chart = nv.models.sparklinePlus()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(scope.margin)
                                        .x(attrs.x === undefined ? function(d){ return d.x; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d.y; } : scope.y())
                                        .color(attrs.color === undefined ? nv.utils.getColor(['#000']) : scope.color())
                                        .showValue(attrs.showvalue === undefined ? true : (attrs.showvalue === "true"))
                                        .alignValue(attrs.alignvalue === undefined ? true : (attrs.alignvalue === "true"))
                                        .rightAlignValue(attrs.rightalignvalue === undefined ? false : (attrs.rightalignvalue === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata);

                                    if(attrs.xScale){
                                        chart.xScale(scope.xScale());
                                    }

                                    if(attrs.yScale){
                                        chart.yScale(scope.yScale());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);
                                    scope.d3Call(data, chart);
                                    nv.utils.windowResize(chart.update);
                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }])
        .directive('nvd3SparklineWithBandlinesChart', [function(){
            'use strict';
            /**
             * http://www.perceptualedge.com/articles/visual_business_intelligence/introducing_bandlines.pdf
             * You need five primary facts about a set of time-series values to construct a bandline:
             * 1) the lowest value,
             * 2) the 25th percentile (i.e., the point at and below which the lowest 25% of the values reside),
             * 3) the median (a.k.a., the 50th percentile, the point at and below which 50% of the values reside),
             * 4) the 75th percentile (i.e., the point at and below which 75% of the values reside), and
             * 5) the highest value.
             */
            return {
                restrict: 'EA',
                scope: {
                    data: '=',
                    width: '@',
                    height: '@',
                    id: '@',
                    margin: '&',
                    x: '&',
                    y: '&',
                    color: '&',
                    xscale: '&',
                    yscale: '&',
                    showvalue: '@',
                    alignvalue: '@',
                    rightalignvalue: '@',
                    nodata: '@',

                    xaxistickformat: '&',
                    yaxistickformat: '&',

                    //angularjs specific
                    objectequality: '@',

                    //d3.js specific
                    transitionduration: '@'

                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                    //expect scope to contain bandlineProperties
                    $scope.d3Call = function(data, chart){

                        var dataAttributeChartID; //randomly generated if id attribute doesn't exist
                        var selectedChart;
                        var sLineSelection;
                        var bandlineData;
                        var bandLines;


                        if(!$attrs.id){

                            dataAttributeChartID = "chartid" + Math.floor(Math.random()*1000000001);
                            angular.element($element).attr('data-chartid', dataAttributeChartID );    

                            selectedChart = d3.select('[data-iem-chartid=' + dataAttributeChartID + '] svg')
                                .attr('height', $scope.height)
                                .attr('width', $scope.width)
                                .datum(data);

                            //chart.yScale()($scope.bandlineProperties.median)
                            //var sLineSelection = d3.select('svg#' + $attrs.id + ' g.nvd3.nv-wrap.nv-sparkline');
                            sLineSelection = d3.select('[data-iem-chartid=' + dataAttributeChartID + '] svg' + ' g.nvd3.nv-wrap.nv-sparkline');
                            bandlineData = [
                                $scope.bandlineProperties.min,
                                $scope.bandlineProperties.twentyFithPercentile,
                                $scope.bandlineProperties.median,
                                $scope.bandlineProperties.seventyFithPercentile,
                                $scope.bandlineProperties.max
                            ];
                            bandLines = sLineSelection.selectAll('.nv-bandline').data([bandlineData]);
                                bandLines.enter().append('g')
                                    .attr('class', 'nv-bandline');

                            selectedChart.transition().duration(($attrs.transitionduration === undefined ? 250 : (+$attrs.transitionduration)))
                                .call(chart);
                        }

                        else{
                            if (!d3.select('#' + $attrs.id+' svg')){
                                d3.select('#' + $attrs.id)
                                    .append('svg');
                            }

                            selectedChart = d3.select('#' + $attrs.id+' svg')
                                .attr('height', $scope.height)
                                .attr('width', $scope.width)
                                .datum(data);

                            //chart.yScale()($scope.bandlineProperties.median)
                            sLineSelection = d3.select('svg#' + $attrs.id + ' g.nvd3.nv-wrap.nv-sparkline');
                            bandlineData = [
                                $scope.bandlineProperties.min,
                                $scope.bandlineProperties.twentyFithPercentile,
                                $scope.bandlineProperties.median,
                                $scope.bandlineProperties.seventyFithPercentile,
                                $scope.bandlineProperties.max
                            ];
                            bandLines = sLineSelection.selectAll('.nv-bandline').data([bandlineData]);
                                bandLines.enter().append('g')
                                    .attr('class', 'nv-bandline');

                            selectedChart.transition().duration(($attrs.transitionduration === undefined ? 250 : (+$attrs.transitionduration)))
                                .call(chart);
                        }
                    };
                }],
                link: function(scope, element, attrs){
                    scope.$watch('data', function(data){
                        if(data){
                            //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                            if(scope.chart){
                                return scope.d3Call(data, scope.chart);
                            }
                            nv.addGraph({
                                generate: function(){
                                    scope.bandlineProperties = {};
                                    var sortedValues, margin = setupDimensions(scope, attrs, element);
                                    var chart = nv.models.sparklinePlus()
                                        .width(scope.width)
                                        .height(scope.height)
                                        .margin(margin)
                                        .x(attrs.x === undefined ? function(d){ return d.x; } : scope.x())
                                        .y(attrs.y === undefined ? function(d){ return d.y; } : scope.y())
                                        .color(attrs.color === undefined ? nv.utils.getColor(['#000']) : scope.color())
                                        .showValue(attrs.showvalue === undefined ? true : (attrs.showvalue === "true"))
                                        .alignValue(attrs.alignvalue === undefined ? true : (attrs.alignvalue === "true"))
                                        .rightAlignValue(attrs.rightalignvalue === undefined ? false : (attrs.rightalignvalue === "true"))
                                        .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata);

                                   //calc bandline data
                                    scope.bandlineProperties.min = d3.min(data, function(d){ return d[1]; });
                                    scope.bandlineProperties.max = d3.max(data, function(d){ return d[1]; });
                                    sortedValues = data.map(function(d){
                                        return d[1];
                                    }).sort(function(a, b){
                                        if(a[0] < b[0]){
                                            return -1;
                                        } else if (a[0] === b[0]){
                                            return 0;
                                        } else {
                                            return 1;
                                        }
                                    });

                                    scope.bandlineProperties.twentyFithPercentile = d3.quantile(sortedValues, 0.25);
                                    scope.bandlineProperties.median = d3.median(sortedValues);
                                    scope.bandlineProperties.seventyFithPercentile = d3.quantile(sortedValues, 0.75);

                                    if(attrs.xScale){
                                        chart.xScale(scope.xScale());
                                    }

                                    if(attrs.yScale){
                                        chart.yScale(scope.yScale());
                                    }

                                    configureXaxis(chart, scope, attrs);
                                    configureYaxis(chart, scope, attrs);
                                    processEvents(chart, scope);

                                    scope.d3Call(data, chart);

                                    nv.utils.windowResize(chart.update);

                                    scope.chart = chart;
                                    return chart;
                                }
                            });
                        }
                    }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
                }
            };
        }]);

    //still need to implement
    //sparkbars??
    //nv.models.multiBarTimeSeriesChart
    //nv.models.multiChart
    //nv.models.scatterPlusLineChart
    //nv.models.linePlusBarWithFocusChart
    //dual y-axis chart

    //crossfilter using $services?
}());
'use strict';

angular.module('differenceChart', []).
   
   directive('diffChart', function ($parse) {
     
     var directiveDefinitionObject = {
         restrict: 'E',
         replace: false,
         link: function (scope, element, attrs) {
           var draw = function(){

          var margin = {
              top: 0,
              right: -50,
              bottom: 10,
              left: 20
          },
              width = 800 - margin.left - margin.right,
              height = 340 - margin.top - margin.bottom;

          var parseDate = d3.time.format("%Y%m%d").parse;

          var x = d3.time.scale()
              .range([0, width]);

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

          var line = d3.svg.area()
              .interpolate("basis")
              .x(function(d) {
                  return x(d.date);
              })
              .y(function(d) {
                  return y(d["MyTeam"]);
              });

          var area = d3.svg.area()
              .interpolate("basis")
              .x(function(d) {
                  return x(d.date);
              })
              .y1(function(d) {
                  return y(d["MyTeam"]);
              });

          d3.selectAll("svg")
                 .remove(); 

          var svg = d3.select(element[0]).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("viewBox", "0 0 740 360")
              .attr("preserveAspectRatio", "xMinYMin meet")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          
              scope.diffData.forEach(function(d) {
                  d.date = parseDate(d.date);
                  d["MyTeam"] = +d["MyTeam"];
                  d["Opponent"] = +d["Opponent"];
              });

              x.domain(d3.extent(scope.diffData, function(d) {
                  return d.date;
              }));

              y.domain([
                  d3.min(scope.diffData, function(d) {
                      return Math.min(d["MyTeam"], d["Opponent"]);
                  }),
                  d3.max(scope.diffData, function(d) {
                      return Math.max(d["MyTeam"], d["Opponent"]);
                  })
              ]);

              svg.datum(scope.diffData);

              svg.append("clipPath")
                  .attr("id", "clip-below")
                  .append("path")
                  .attr("d", area.y0(height));

              svg.append("clipPath")
                  .attr("id", "clip-above")
                  .append("path")
                  .attr("d", area.y0(0));

              svg.append("path")
                  .attr("class", "area above")
                  .attr("clip-path", "url(#clip-above)")
                  .attr("d", area.y0(function(d) {
                      return y(d["Opponent"]);
                  }));

              svg.append("path")
                  .attr("class", "area below")
                  .attr("clip-path", "url(#clip-below)")
                  .attr("d", area);

              svg.append("path")
                  .attr("class", "line")
                  .attr("d", line);

              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);
         
           };
           draw();
           scope.$watch('diffData',draw);
         } 
      };
      return directiveDefinitionObject;
   });

var app = angular.module('d3App.directives', []);

app.directive('focusOn', function() {
    return function(scope, elem, attr) {
        scope.$on('focusOn', function(e, name) {
            if (name === attr.focusOn) {
                elem[0].focus();
            }
        });
    };
});
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.bindHtml","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdownToggle","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]);
angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/carousel/carousel.html","template/carousel/slide.html","template/datepicker/datepicker.html","template/datepicker/popup.html","template/modal/backdrop.html","template/modal/window.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-unsafe-popup.html","template/tooltip/tooltip-popup.html","template/popover/popover.html","template/popover/popover-template.html","template/progressbar/bar.html","template/progressbar/progress.html","template/rating/rating.html","template/tabs/tab.html","template/tabs/tabset-titles.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]);
angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('ui.bootstrap.collapse',['ui.bootstrap.transition'])

// The collapsible directive indicates a block of html that will expand and collapse
.directive('collapse', ['$transition', function($transition) {
  // CSS transitions don't work with height: auto, so we have to manually change the height to a
  // specific value and then once the animation completes, we can reset the height to auto.
  // Unfortunately if you do this while the CSS transitions are specified (i.e. in the CSS class
  // "collapse") then you trigger a change to height 0 in between.
  // The fix is to remove the "collapse" CSS class while changing the height back to auto - phew!
  var fixUpHeight = function(scope, element, height) {
    // We remove the collapse CSS class to prevent a transition when we change to height: auto
    element.removeClass('collapse');
    element.css({ height: height });
    // It appears that  reading offsetWidth makes the browser realise that we have changed the
    // height already :-/
    var x = element[0].offsetWidth;
    element.addClass('collapse');
  };

  return {
    link: function(scope, element, attrs) {

      var isCollapsed;
      var initialAnimSkip = true;
      scope.$watch(function (){ return element[0].scrollHeight; }, function (value) {
        //The listener is called when scollHeight changes
        //It actually does on 2 scenarios: 
        // 1. Parent is set to display none
        // 2. angular bindings inside are resolved
        //When we have a change of scrollHeight we are setting again the correct height if the group is opened
        if (element[0].scrollHeight !== 0) {
          if (!isCollapsed) {
            if (initialAnimSkip) {
              fixUpHeight(scope, element, element[0].scrollHeight + 'px');
            } else {
              fixUpHeight(scope, element, 'auto');
            }
          }
        }
      });
      
      scope.$watch(attrs.collapse, function(value) {
        if (value) {
          collapse();
        } else {
          expand();
        }
      });
      

      var currentTransition;
      var doTransition = function(change) {
        if ( currentTransition ) {
          currentTransition.cancel();
        }
        currentTransition = $transition(element,change);
        currentTransition.then(
          function() { currentTransition = undefined; },
          function() { currentTransition = undefined; }
        );
        return currentTransition;
      };

      var expand = function() {
        if (initialAnimSkip) {
          initialAnimSkip = false;
          if ( !isCollapsed ) {
            fixUpHeight(scope, element, 'auto');
          }
        } else {
          doTransition({ height : element[0].scrollHeight + 'px' })
          .then(function() {
            // This check ensures that we don't accidentally update the height if the user has closed
            // the group while the animation was still running
            if ( !isCollapsed ) {
              fixUpHeight(scope, element, 'auto');
            }
          });
        }
        isCollapsed = false;
      };
      
      var collapse = function() {
        isCollapsed = true;
        if (initialAnimSkip) {
          initialAnimSkip = false;
          fixUpHeight(scope, element, 0);
        } else {
          fixUpHeight(scope, element, element[0].scrollHeight + 'px');
          doTransition({'height':'0'});
        }
      };
    }
  };
}]);

angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse'])

.constant('accordionConfig', {
  closeOthers: true
})

.controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {
  
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if ( closeOthers ) {
      angular.forEach(this.groups, function (group) {
        if ( group !== openGroup ) {
          group.isOpen = false;
        }
      });
    }
  };
  
  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(this.groups.indexOf(group), 1);
    }
  };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('accordion', function () {
  return {
    restrict:'EA',
    controller:'AccordionController',
    transclude: true,
    replace: false,
    templateUrl: 'template/accordion/accordion.html'
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', ['$parse', '$transition', '$timeout', function($parse, $transition, $timeout) {
  return {
    require:'^accordion',         // We need this directive to be inside an accordion
    restrict:'EA',
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl:'template/accordion/accordion-group.html',
    scope:{ heading:'@' },        // Create an isolated scope and interpolate the heading attribute onto this scope
    controller: ['$scope', function($scope) {
      this.setHeading = function(element) {
        this.heading = element;
      };
    }],
    link: function(scope, element, attrs, accordionCtrl) {
      var getIsOpen, setIsOpen;

      accordionCtrl.addGroup(scope);

      scope.isOpen = false;
      
      if ( attrs.isOpen ) {
        getIsOpen = $parse(attrs.isOpen);
        setIsOpen = getIsOpen.assign;

        scope.$watch(
          function watchIsOpen() { return getIsOpen(scope.$parent); },
          function updateOpen(value) { scope.isOpen = value; }
        );
        
        scope.isOpen = getIsOpen ? getIsOpen(scope.$parent) : false;
      }

      scope.$watch('isOpen', function(value) {
        if ( value ) {
          accordionCtrl.closeOthers(scope);
        }
        if ( setIsOpen ) {
          setIsOpen(scope.$parent, value);
        }
      });
    }
  };
}])

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
.directive('accordionHeading', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^accordionGroup',
    compile: function(element, attr, transclude) {
      return function link(scope, element, attr, accordionGroupCtrl) {
        // Pass the heading to the accordion-group controller
        // so that it can be transcluded into the right place in the template
        // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
        accordionGroupCtrl.setHeading(transclude(scope, function() {}));
      };
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
.directive('accordionTransclude', function() {
  return {
    require: '^accordionGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {
        if ( heading ) {
          element.html('');
          element.append(heading);
        }
      });
    }
  };
});

angular.module("ui.bootstrap.alert", []).directive('alert', function () {
  return {
    restrict:'EA',
    templateUrl:'template/alert/alert.html',
    transclude:true,
    replace:true,
    scope: {
      type: '=',
      close: '&'
    },
    link: function(scope, iElement, iAttrs, controller) {
      scope.closeable = "close" in iAttrs;
    }
  };
});

angular.module('ui.bootstrap.bindHtml', [])

  .directive('bindHtmlUnsafe', function () {
    return function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
      scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
        element.html(value || '');
      });
    };
  });
angular.module('ui.bootstrap.buttons', [])

  .constant('buttonConfig', {
    activeClass:'active',
    toggleEvent:'click'
  })

  .directive('btnRadio', ['buttonConfig', function (buttonConfig) {
  var activeClass = buttonConfig.activeClass || 'active';
  var toggleEvent = buttonConfig.toggleEvent || 'click';

  return {

    require:'ngModel',
    link:function (scope, element, attrs, ngModelCtrl) {

      //model -> UI
      ngModelCtrl.$render = function () {
        element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
      };

      //ui->model
      element.bind(toggleEvent, function () {
        if (!element.hasClass(activeClass)) {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
            ngModelCtrl.$render();
          });
        }
      });
    }
  };
}])

  .directive('btnCheckbox', ['buttonConfig', function (buttonConfig) {

  var activeClass = buttonConfig.activeClass || 'active';
  var toggleEvent = buttonConfig.toggleEvent || 'click';

  return {
    require:'ngModel',
    link:function (scope, element, attrs, ngModelCtrl) {

      function getTrueValue() {
        var trueValue = scope.$eval(attrs.btnCheckboxTrue);
        return angular.isDefined(trueValue) ? trueValue : true;
      }

      function getFalseValue() {
        var falseValue = scope.$eval(attrs.btnCheckboxFalse);
        return angular.isDefined(falseValue) ? falseValue : false;
      }

      //model -> UI
      ngModelCtrl.$render = function () {
        element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.bind(toggleEvent, function () {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(element.hasClass(activeClass) ? getFalseValue() : getTrueValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
}]);
/**
* @ngdoc overview
* @name ui.bootstrap.carousel
*
* @description
* AngularJS version of an image carousel.
*
*/
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
.controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
  var self = this,
    slides = self.slides = [],
    currentIndex = -1,
    currentTimeout, isPlaying;
  self.currentSlide = null;

  /* direction: "prev" or "next" */
  self.select = function(nextSlide, direction) {
    var nextIndex = slides.indexOf(nextSlide);
    //Decide direction if it's not given
    if (direction === undefined) {
      direction = nextIndex > currentIndex ? "next" : "prev";
    }
    if (nextSlide && nextSlide !== self.currentSlide) {
      if ($scope.$currentTransition) {
        $scope.$currentTransition.cancel();
        //Timeout so ng-class in template has time to fix classes for finished slide
        $timeout(goNext);
      } else {
        goNext();
      }
    }
    function goNext() {
      //If we have a slide to transition from and we have a transition type and we're allowed, go
      if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
        //We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
        nextSlide.$element.addClass(direction);
        var reflow = nextSlide.$element[0].offsetWidth; //force reflow

        //Set all other slides to stop doing their stuff for the new transition
        angular.forEach(slides, function(slide) {
          angular.extend(slide, {direction: '', entering: false, leaving: false, active: false});
        });
        angular.extend(nextSlide, {direction: direction, active: true, entering: true});
        angular.extend(self.currentSlide||{}, {direction: direction, leaving: true});

        $scope.$currentTransition = $transition(nextSlide.$element, {});
        //We have to create new pointers inside a closure since next & current will change
        (function(next,current) {
          $scope.$currentTransition.then(
            function(){ transitionDone(next, current); },
            function(){ transitionDone(next, current); }
          );
        }(nextSlide, self.currentSlide));
      } else {
        transitionDone(nextSlide, self.currentSlide);
      }
      self.currentSlide = nextSlide;
      currentIndex = nextIndex;
      //every time you change slides, reset the timer
      restartTimer();
    }
    function transitionDone(next, current) {
      angular.extend(next, {direction: '', active: true, leaving: false, entering: false});
      angular.extend(current||{}, {direction: '', active: false, leaving: false, entering: false});
      $scope.$currentTransition = null;
    }
  };

  /* Allow outside people to call indexOf on slides array */
  self.indexOfSlide = function(slide) {
    return slides.indexOf(slide);
  };

  $scope.next = function() {
    var newIndex = (currentIndex + 1) % slides.length;

    //Prevent this user-triggered transition from occurring if there is already one in progress
    if (!$scope.$currentTransition) {
      return self.select(slides[newIndex], 'next');
    }
  };

  $scope.prev = function() {
    var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;

    //Prevent this user-triggered transition from occurring if there is already one in progress
    if (!$scope.$currentTransition) {
      return self.select(slides[newIndex], 'prev');
    }
  };

  $scope.select = function(slide) {
    self.select(slide);
  };

  $scope.isActive = function(slide) {
     return self.currentSlide === slide;
  };

  $scope.slides = function() {
    return slides;
  };

  $scope.$watch('interval', restartTimer);
  function restartTimer() {
    if (currentTimeout) {
      $timeout.cancel(currentTimeout);
    }
    function go() {
      if (isPlaying) {
        $scope.next();
        restartTimer();
      } else {
        $scope.pause();
      }
    }
    var interval = +$scope.interval;
    if (!isNaN(interval) && interval>=0) {
      currentTimeout = $timeout(go, interval);
    }
  }
  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };
  $scope.pause = function() {
    if (!$scope.noPause) {
      isPlaying = false;
      if (currentTimeout) {
        $timeout.cancel(currentTimeout);
      }
    }
  };

  self.addSlide = function(slide, element) {
    slide.$element = element;
    slides.push(slide);
    //if this is the first slide or the slide is set to active, select it
    if(slides.length === 1 || slide.active) {
      self.select(slides[slides.length-1]);
      if (slides.length == 1) {
        $scope.play();
      }
    } else {
      slide.active = false;
    }
  };

  self.removeSlide = function(slide) {
    //get the index of the slide inside the carousel
    var index = slides.indexOf(slide);
    slides.splice(index, 1);
    if (slides.length > 0 && slide.active) {
      if (index >= slides.length) {
        self.select(slides[index-1]);
      } else {
        self.select(slides[index]);
      }
    } else if (currentIndex > index) {
      currentIndex--;
    }
  };
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:carousel
 * @restrict EA
 *
 * @description
 * Carousel is the outer container for a set of image 'slides' to showcase.
 *
 * @param {number=} interval The time, in milliseconds, that it will take the carousel to go to the next slide.
 * @param {boolean=} noTransition Whether to disable transitions on the carousel.
 * @param {boolean=} noPause Whether to disable pausing on the carousel (by default, the carousel interval pauses on hover).
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <carousel>
      <slide>
        <img src="http://placekitten.com/150/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>Beautiful!</p>
        </div>
      </slide>
      <slide>
        <img src="http://placekitten.com/100/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>D'aww!</p>
        </div>
      </slide>
    </carousel>
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
 */
.directive('carousel', [function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    controller: 'CarouselController',
    require: 'carousel',
    templateUrl: 'template/carousel/carousel.html',
    scope: {
      interval: '=',
      noTransition: '=',
      noPause: '='
    }
  };
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:slide
 * @restrict EA
 *
 * @description
 * Creates a slide inside a {@link ui.bootstrap.carousel.directive:carousel carousel}.  Must be placed as a child of a carousel element.
 *
 * @param {boolean=} active Model binding, whether or not this slide is currently active.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
<div ng-controller="CarouselDemoCtrl">
  <carousel>
    <slide ng-repeat="slide in slides" active="slide.active">
      <img ng-src="{{slide.image}}" style="margin:auto;">
      <div class="carousel-caption">
        <h4>Slide {{$index}}</h4>
        <p>{{slide.text}}</p>
      </div>
    </slide>
  </carousel>
  <div class="row-fluid">
    <div class="span6">
      <ul>
        <li ng-repeat="slide in slides">
          <button class="btn btn-mini" ng-class="{'btn-info': !slide.active, 'btn-success': slide.active}" ng-disabled="slide.active" ng-click="slide.active = true">select</button>
          {{$index}}: {{slide.text}}
        </li>
      </ul>
      <a class="btn" ng-click="addSlide()">Add Slide</a>
    </div>
    <div class="span6">
      Interval, in milliseconds: <input type="number" ng-model="myInterval">
      <br />Enter a negative number to stop the interval.
    </div>
  </div>
</div>
  </file>
  <file name="script.js">
function CarouselDemoCtrl($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/200',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' '
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) $scope.addSlide();
}
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
*/

.directive('slide', ['$parse', function($parse) {
  return {
    require: '^carousel',
    restrict: 'EA',
    transclude: true,
    replace: true,
    templateUrl: 'template/carousel/slide.html',
    scope: {
    },
    link: function (scope, element, attrs, carouselCtrl) {
      //Set up optional 'active' = binding
      if (attrs.active) {
        var getActive = $parse(attrs.active);
        var setActive = getActive.assign;
        var lastValue = scope.active = getActive(scope.$parent);
        scope.$watch(function parentActiveWatch() {
          var parentActive = getActive(scope.$parent);

          if (parentActive !== scope.active) {
            // we are out of sync and need to copy
            if (parentActive !== lastValue) {
              // parent changed and it has precedence
              lastValue = scope.active = parentActive;
            } else {
              // if the parent can be assigned then do so
              setActive(scope.$parent, parentActive = lastValue = scope.active);
            }
          }
          return parentActive;
        });
      }

      carouselCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        carouselCtrl.removeSlide(scope);
      });

      scope.$watch('active', function(active) {
        if (active) {
          carouselCtrl.select(scope);
        }
      });
    }
  };
}]);

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, "position") || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        return {
          width: element.prop('offsetWidth'),
          height: element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: element.prop('offsetWidth'),
          height: element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft  || $document[0].documentElement.scrollLeft)
        };
      }
    };
  }]);

angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.position'])

.constant('datepickerConfig', {
  dayFormat: 'dd',
  monthFormat: 'MMMM',
  yearFormat: 'yyyy',
  dayHeaderFormat: 'EEE',
  dayTitleFormat: 'MMMM yyyy',
  monthTitleFormat: 'yyyy',
  showWeeks: true,
  startingDay: 0,
  yearRange: 20,
  minDate: null,
  maxDate: null
})

.controller('DatepickerController', ['$scope', '$attrs', 'dateFilter', 'datepickerConfig', function($scope, $attrs, dateFilter, dtConfig) {
  var format = {
    day:        getValue($attrs.dayFormat,        dtConfig.dayFormat),
    month:      getValue($attrs.monthFormat,      dtConfig.monthFormat),
    year:       getValue($attrs.yearFormat,       dtConfig.yearFormat),
    dayHeader:  getValue($attrs.dayHeaderFormat,  dtConfig.dayHeaderFormat),
    dayTitle:   getValue($attrs.dayTitleFormat,   dtConfig.dayTitleFormat),
    monthTitle: getValue($attrs.monthTitleFormat, dtConfig.monthTitleFormat)
  },
  startingDay = getValue($attrs.startingDay,      dtConfig.startingDay),
  yearRange =   getValue($attrs.yearRange,        dtConfig.yearRange);

  this.minDate = dtConfig.minDate ? new Date(dtConfig.minDate) : null;
  this.maxDate = dtConfig.maxDate ? new Date(dtConfig.maxDate) : null;

  function getValue(value, defaultValue) {
    return angular.isDefined(value) ? $scope.$parent.$eval(value) : defaultValue;
  }

  function getDaysInMonth( year, month ) {
    return new Date(year, month, 0).getDate();
  }

  function getDates(startDate, n) {
    var dates = new Array(n);
    var current = startDate, i = 0;
    while (i < n) {
      dates[i++] = new Date(current);
      current.setDate( current.getDate() + 1 );
    }
    return dates;
  }

  function makeDate(date, format, isSelected, isSecondary) {
    return { date: date, label: dateFilter(date, format), selected: !!isSelected, secondary: !!isSecondary };
  }

  this.modes = [
    {
      name: 'day',
      getVisibleDates: function(date, selected) {
        var year = date.getFullYear(), month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1);
        var difference = startingDay - firstDayOfMonth.getDay(),
        numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,
        firstDate = new Date(firstDayOfMonth), numDates = 0;

        if ( numDisplayedFromPreviousMonth > 0 ) {
          firstDate.setDate( - numDisplayedFromPreviousMonth + 1 );
          numDates += numDisplayedFromPreviousMonth; // Previous
        }
        numDates += getDaysInMonth(year, month + 1); // Current
        numDates += (7 - numDates % 7) % 7; // Next

        var days = getDates(firstDate, numDates), labels = new Array(7);
        for (var i = 0; i < numDates; i ++) {
          var dt = new Date(days[i]);
          days[i] = makeDate(dt, format.day, (selected && selected.getDate() === dt.getDate() && selected.getMonth() === dt.getMonth() && selected.getFullYear() === dt.getFullYear()), dt.getMonth() !== month);
        }
        for (var j = 0; j < 7; j++) {
          labels[j] = dateFilter(days[j].date, format.dayHeader);
        }
        return { objects: days, title: dateFilter(date, format.dayTitle), labels: labels };
      },
      compare: function(date1, date2) {
        return (new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() ) - new Date( date2.getFullYear(), date2.getMonth(), date2.getDate() ) );
      },
      split: 7,
      step: { months: 1 }
    },
    {
      name: 'month',
      getVisibleDates: function(date, selected) {
        var months = new Array(12), year = date.getFullYear();
        for ( var i = 0; i < 12; i++ ) {
          var dt = new Date(year, i, 1);
          months[i] = makeDate(dt, format.month, (selected && selected.getMonth() === i && selected.getFullYear() === year));
        }
        return { objects: months, title: dateFilter(date, format.monthTitle) };
      },
      compare: function(date1, date2) {
        return new Date( date1.getFullYear(), date1.getMonth() ) - new Date( date2.getFullYear(), date2.getMonth() );
      },
      split: 3,
      step: { years: 1 }
    },
    {
      name: 'year',
      getVisibleDates: function(date, selected) {
        var years = new Array(yearRange), year = date.getFullYear(), startYear = parseInt((year - 1) / yearRange, 10) * yearRange + 1;
        for ( var i = 0; i < yearRange; i++ ) {
          var dt = new Date(startYear + i, 0, 1);
          years[i] = makeDate(dt, format.year, (selected && selected.getFullYear() === dt.getFullYear()));
        }
        return { objects: years, title: [years[0].label, years[yearRange - 1].label].join(' - ') };
      },
      compare: function(date1, date2) {
        return date1.getFullYear() - date2.getFullYear();
      },
      split: 5,
      step: { years: yearRange }
    }
  ];

  this.isDisabled = function(date, mode) {
    var currentMode = this.modes[mode || 0];
    return ((this.minDate && currentMode.compare(date, this.minDate) < 0) || (this.maxDate && currentMode.compare(date, this.maxDate) > 0) || ($scope.dateDisabled && $scope.dateDisabled({date: date, mode: currentMode.name})));
  };
}])

.directive( 'datepicker', ['dateFilter', '$parse', 'datepickerConfig', '$log', function (dateFilter, $parse, datepickerConfig, $log) {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/datepicker/datepicker.html',
    scope: {
      dateDisabled: '&'
    },
    require: ['datepicker', '?^ngModel'],
    controller: 'DatepickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0], ngModel = ctrls[1];

      if (!ngModel) {
        return; // do nothing if no ng-model
      }

      // Configuration parameters
      var mode = 0, selected = new Date(), showWeeks = datepickerConfig.showWeeks;

      if (attrs.showWeeks) {
        scope.$parent.$watch($parse(attrs.showWeeks), function(value) {
          showWeeks = !! value;
          updateShowWeekNumbers();
        });
      } else {
        updateShowWeekNumbers();
      }

      if (attrs.min) {
        scope.$parent.$watch($parse(attrs.min), function(value) {
          datepickerCtrl.minDate = value ? new Date(value) : null;
          refill();
        });
      }
      if (attrs.max) {
        scope.$parent.$watch($parse(attrs.max), function(value) {
          datepickerCtrl.maxDate = value ? new Date(value) : null;
          refill();
        });
      }

      function updateShowWeekNumbers() {
        scope.showWeekNumbers = mode === 0 && showWeeks;
      }

      // Split array into smaller arrays
      function split(arr, size) {
        var arrays = [];
        while (arr.length > 0) {
          arrays.push(arr.splice(0, size));
        }
        return arrays;
      }

      function refill( updateSelected ) {
        var date = null, valid = true;

        if ( ngModel.$modelValue ) {
          date = new Date( ngModel.$modelValue );

          if ( isNaN(date) ) {
            valid = false;
            $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
          } else if ( updateSelected ) {
            selected = date;
          }
        }
        ngModel.$setValidity('date', valid);

        var currentMode = datepickerCtrl.modes[mode], data = currentMode.getVisibleDates(selected, date);
        angular.forEach(data.objects, function(obj) {
          obj.disabled = datepickerCtrl.isDisabled(obj.date, mode);
        });

        ngModel.$setValidity('date-disabled', (!date || !datepickerCtrl.isDisabled(date)));

        scope.rows = split(data.objects, currentMode.split);
        scope.labels = data.labels || [];
        scope.title = data.title;
      }

      function setMode(value) {
        mode = value;
        updateShowWeekNumbers();
        refill();
      }

      ngModel.$render = function() {
        refill( true );
      };

      scope.select = function( date ) {
        if ( mode === 0 ) {
          var dt = new Date( ngModel.$modelValue );
          dt.setFullYear( date.getFullYear(), date.getMonth(), date.getDate() );
          ngModel.$setViewValue( dt );
          refill( true );
        } else {
          selected = date;
          setMode( mode - 1 );
        }
      };
      scope.move = function(direction) {
        var step = datepickerCtrl.modes[mode].step;
        selected.setMonth( selected.getMonth() + direction * (step.months || 0) );
        selected.setFullYear( selected.getFullYear() + direction * (step.years || 0) );
        refill();
      };
      scope.toggleMode = function() {
        setMode( (mode + 1) % datepickerCtrl.modes.length );
      };
      scope.getWeekNumber = function(row) {
        return ( mode === 0 && scope.showWeekNumbers && row.length === 7 ) ? getISO8601WeekNumber(row[0].date) : null;
      };

      function getISO8601WeekNumber(date) {
        var checkDate = new Date(date);
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
        var time = checkDate.getTime();
        checkDate.setMonth(0); // Compare with Jan 1
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
      }
    }
  };
}])

.constant('datepickerPopupConfig', {
  dateFormat: 'yyyy-MM-dd',
  closeOnDateSelection: true
})

.directive('datepickerPopup', ['$compile', '$parse', '$document', '$position', 'dateFilter', 'datepickerPopupConfig',
function ($compile, $parse, $document, $position, dateFilter, datepickerPopupConfig) {
  return {
    restrict: 'EA',
    require: 'ngModel',
    link: function(originalScope, element, attrs, ngModel) {

      var closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection;
      var dateFormat = attrs.datepickerPopup || datepickerPopupConfig.dateFormat;

     // create a child scope for the datepicker directive so we are not polluting original scope
      var scope = originalScope.$new();
      originalScope.$on('$destroy', function() {
        scope.$destroy();
      });

      var getIsOpen, setIsOpen;
      if ( attrs.isOpen ) {
        getIsOpen = $parse(attrs.isOpen);
        setIsOpen = getIsOpen.assign;

        originalScope.$watch(getIsOpen, function updateOpen(value) {
          scope.isOpen = !! value;
        });
      }
      scope.isOpen = getIsOpen ? getIsOpen(originalScope) : false; // Initial state

      function setOpen( value ) {
        if (setIsOpen) {
          setIsOpen(originalScope, !!value);
        } else {
          scope.isOpen = !!value;
        }
      }

      var documentClickBind = function(event) {
        if (scope.isOpen && event.target !== element[0]) {
          scope.$apply(function() {
            setOpen(false);
          });
        }
      };

      var elementFocusBind = function() {
        scope.$apply(function() {
          setOpen( true );
        });
      };

      // popup element used to display calendar
      var popupEl = angular.element('<datepicker-popup-wrap><datepicker></datepicker></datepicker-popup-wrap>');
      popupEl.attr({
        'ng-model': 'date',
        'ng-change': 'dateSelection()'
      });
      var datepickerEl = popupEl.find('datepicker');
      if (attrs.datepickerOptions) {
        datepickerEl.attr(angular.extend({}, originalScope.$eval(attrs.datepickerOptions)));
      }

      // TODO: reverse from dateFilter string to Date object
      function parseDate(viewValue) {
        if (!viewValue) {
          ngModel.$setValidity('date', true);
          return null;
        } else if (angular.isDate(viewValue)) {
          ngModel.$setValidity('date', true);
          return viewValue;
        } else if (angular.isString(viewValue)) {
          var date = new Date(viewValue);
          if (isNaN(date)) {
            ngModel.$setValidity('date', false);
            return undefined;
          } else {
            ngModel.$setValidity('date', true);
            return date;
          }
        } else {
          ngModel.$setValidity('date', false);
          return undefined;
        }
      }
      ngModel.$parsers.unshift(parseDate);

      // Inner change
      scope.dateSelection = function() {
        ngModel.$setViewValue(scope.date);
        ngModel.$render();

        if (closeOnDateSelection) {
          setOpen( false );
        }
      };

      element.bind('input change keyup', function() {
        scope.$apply(function() {
          updateCalendar();
        });
      });

      // Outter change
      ngModel.$render = function() {
        var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : '';
        element.val(date);

        updateCalendar();
      };

      function updateCalendar() {
        scope.date = ngModel.$modelValue;
        updatePosition();
      }

      function addWatchableAttribute(attribute, scopeProperty, datepickerAttribute) {
        if (attribute) {
          originalScope.$watch($parse(attribute), function(value){
            scope[scopeProperty] = value;
          });
          datepickerEl.attr(datepickerAttribute || scopeProperty, scopeProperty);
        }
      }
      addWatchableAttribute(attrs.min, 'min');
      addWatchableAttribute(attrs.max, 'max');
      if (attrs.showWeeks) {
        addWatchableAttribute(attrs.showWeeks, 'showWeeks', 'show-weeks');
      } else {
        scope.showWeeks = true;
        datepickerEl.attr('show-weeks', 'showWeeks');
      }
      if (attrs.dateDisabled) {
        datepickerEl.attr('date-disabled', attrs.dateDisabled);
      }

      function updatePosition() {
        scope.position = $position.position(element);
        scope.position.top = scope.position.top + element.prop('offsetHeight');
      }

      var documentBindingInitialized = false, elementFocusInitialized = false;
      scope.$watch('isOpen', function(value) {
        if (value) {
          updatePosition();
          $document.bind('click', documentClickBind);
          if(elementFocusInitialized) {
            element.unbind('focus', elementFocusBind);
          }
          element[0].focus();
          documentBindingInitialized = true;
        } else {
          if(documentBindingInitialized) {
            $document.unbind('click', documentClickBind);
          }
          element.bind('focus', elementFocusBind);
          elementFocusInitialized = true;
        }

        if ( setIsOpen ) {
          setIsOpen(originalScope, value);
        }
      });

      var $setModelValue = $parse(attrs.ngModel).assign;

      scope.today = function() {
        $setModelValue(originalScope, new Date());
      };
      scope.clear = function() {
        $setModelValue(originalScope, null);
      };

      element.after($compile(popupEl)(scope));
    }
  };
}])

.directive('datepickerPopupWrap', [function() {
  return {
    restrict:'E',
    replace: true,
    transclude: true,
    templateUrl: 'template/datepicker/popup.html',
    link:function (scope, element, attrs) {
      element.bind('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });
    }
  };
}]);

/*
 * dropdownToggle - Provides dropdown menu functionality in place of bootstrap js
 * @restrict class or attribute
 * @example:
   <li class="dropdown">
     <a class="dropdown-toggle">My Dropdown Menu</a>
     <ul class="dropdown-menu">
       <li ng-repeat="choice in dropChoices">
         <a ng-href="{{choice.href}}">{{choice.text}}</a>
       </li>
     </ul>
   </li>
 */

angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
  var openElement = null,
      closeMenu   = angular.noop;
  return {
    restrict: 'CA',
    link: function(scope, element, attrs) {
      scope.$watch('$location.path', function() { closeMenu(); });
      element.parent().bind('click', function() { closeMenu(); });
      element.bind('click', function (event) {

        var elementWasOpen = (element === openElement);

        event.preventDefault();
        event.stopPropagation();

        if (!!openElement) {
          closeMenu();
        }

        if (!elementWasOpen) {
          element.parent().addClass('open');
          openElement = element;
          closeMenu = function (event) {
            if (event) {
              event.preventDefault();
              event.stopPropagation();
            }
            $document.unbind('click', closeMenu);
            element.parent().removeClass('open');
            closeMenu = angular.noop;
            openElement = null;
          };
          $document.bind('click', closeMenu);
        }
      });
    }
  };
}]);
angular.module('ui.bootstrap.modal', [])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope, element, attrs) {

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });

        scope.close = function (evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static') {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .directive('modalWindow', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      scope: {
        index: '@'
      },
      replace: true,
      transclude: true,
      templateUrl: 'template/modal/window.html',
      link: function (scope, element, attrs) {
        scope.windowClass = attrs.windowClass || '';

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });
      }
    };
  }])

  .factory('$modalStack', ['$document', '$compile', '$rootScope', '$$stackedMap',
    function ($document, $compile, $rootScope, $$stackedMap) {

      var backdropjqLiteEl, backdropDomEl;
      var backdropScope = $rootScope.$new(true);
      var body = $document.find('body').eq(0);
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        backdropScope.index = newBackdropIndex;
      });

      function removeModalWindow(modalInstance) {

        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        modalWindow.modalDomEl.remove();

        //remove backdrop if no longer needed
        if (backdropIndex() == -1) {
          backdropDomEl.remove();
          backdropDomEl = undefined;
        }

        //destroy scope
        modalWindow.modalScope.$destroy();
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key);
            });
          }
        }
      });

      $modalStack.open = function (modalInstance, modal) {

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });

        var angularDomEl = angular.element('<div modal-window></div>');
        angularDomEl.attr('window-class', modal.windowClass);
        angularDomEl.attr('index', openedWindows.length() - 1);
        angularDomEl.html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);

        if (backdropIndex() >= 0 && !backdropDomEl) {
            backdropjqLiteEl = angular.element('<div modal-backdrop></div>');
            backdropDomEl = $compile(backdropjqLiteEl)(backdropScope);
            body.append(backdropDomEl);
        }
      };

      $modalStack.close = function (modalInstance, result) {
        var modal = openedWindows.get(modalInstance);
        if (modal) {
          modal.value.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
          modalWindow.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      return $modalStack;
    }])

  .provider('$modal', function () {

    var $modalProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                return result.data;
              });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value, key) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $modal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                windowClass: modalOptions.windowClass
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function () {
              modalOpenedDeferred.reject(false);
            });

            return modalInstance;
          };

          return $modal;
        }]
    };

    return $modalProvider;
  });
angular.module('ui.bootstrap.pagination', [])

.controller('PaginationController', ['$scope', '$attrs', '$parse', '$interpolate', function ($scope, $attrs, $parse, $interpolate) {
  var self = this;

  this.init = function(defaultItemsPerPage) {
    if ($attrs.itemsPerPage) {
      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
        self.itemsPerPage = parseInt(value, 10);
        $scope.totalPages = self.calculateTotalPages();
      });
    } else {
      this.itemsPerPage = defaultItemsPerPage;
    }
  };

  this.noPrevious = function() {
    return this.page === 1;
  };
  this.noNext = function() {
    return this.page === $scope.totalPages;
  };

  this.isActive = function(page) {
    return this.page === page;
  };

  this.calculateTotalPages = function() {
    return this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
  };

  this.getAttributeValue = function(attribute, defaultValue, interpolate) {
    return angular.isDefined(attribute) ? (interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute)) : defaultValue;
  };

  this.render = function() {
    this.page = parseInt($scope.page, 10) || 1;
    $scope.pages = this.getPages(this.page, $scope.totalPages);
  };

  $scope.selectPage = function(page) {
    if ( ! self.isActive(page) && page > 0 && page <= $scope.totalPages) {
      $scope.page = page;
      $scope.onSelectPage({ page: page });
    }
  };

  $scope.$watch('totalItems', function() {
    $scope.totalPages = self.calculateTotalPages();
  });

  $scope.$watch('totalPages', function(value) {
    if ( $attrs.numPages ) {
      $scope.numPages = value; // Readonly variable
    }

    if ( self.page > value ) {
      $scope.selectPage(value);
    } else {
      self.render();
    }
  });

  $scope.$watch('page', function() {
    self.render();
  });
}])

.constant('paginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true
})

.directive('pagination', ['$parse', 'paginationConfig', function($parse, config) {
  return {
    restrict: 'EA',
    scope: {
      page: '=',
      totalItems: '=',
      onSelectPage:' &',
      numPages: '='
    },
    controller: 'PaginationController',
    templateUrl: 'template/pagination/pagination.html',
    replace: true,
    link: function(scope, element, attrs, paginationCtrl) {

      // Setup configuration parameters
      var maxSize,
      boundaryLinks  = paginationCtrl.getAttributeValue(attrs.boundaryLinks,  config.boundaryLinks      ),
      directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks     ),
      firstText      = paginationCtrl.getAttributeValue(attrs.firstText,      config.firstText,     true),
      previousText   = paginationCtrl.getAttributeValue(attrs.previousText,   config.previousText,  true),
      nextText       = paginationCtrl.getAttributeValue(attrs.nextText,       config.nextText,      true),
      lastText       = paginationCtrl.getAttributeValue(attrs.lastText,       config.lastText,      true),
      rotate         = paginationCtrl.getAttributeValue(attrs.rotate,         config.rotate);

      paginationCtrl.init(config.itemsPerPage);

      if (attrs.maxSize) {
        scope.$parent.$watch($parse(attrs.maxSize), function(value) {
          maxSize = parseInt(value, 10);
          paginationCtrl.render();
        });
      }

      // Create page object used in template
      function makePage(number, text, isActive, isDisabled) {
        return {
          number: number,
          text: text,
          active: isActive,
          disabled: isDisabled
        };
      }

      paginationCtrl.getPages = function(currentPage, totalPages) {
        var pages = [];

        // Default page limits
        var startPage = 1, endPage = totalPages;
        var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

        // recompute if maxSize
        if ( isMaxSized ) {
          if ( rotate ) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
            endPage   = startPage + maxSize - 1;

            // Adjust if limit is exceeded
            if (endPage > totalPages) {
              endPage   = totalPages;
              startPage = endPage - maxSize + 1;
            }
          } else {
            // Visible pages are paginated with maxSize
            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min(startPage + maxSize - 1, totalPages);
          }
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
          var page = makePage(number, number, paginationCtrl.isActive(number), false);
          pages.push(page);
        }

        // Add links to move between page sets
        if ( isMaxSized && ! rotate ) {
          if ( startPage > 1 ) {
            var previousPageSet = makePage(startPage - 1, '...', false, false);
            pages.unshift(previousPageSet);
          }

          if ( endPage < totalPages ) {
            var nextPageSet = makePage(endPage + 1, '...', false, false);
            pages.push(nextPageSet);
          }
        }

        // Add previous & next links
        if (directionLinks) {
          var previousPage = makePage(currentPage - 1, previousText, false, paginationCtrl.noPrevious());
          pages.unshift(previousPage);

          var nextPage = makePage(currentPage + 1, nextText, false, paginationCtrl.noNext());
          pages.push(nextPage);
        }

        // Add first & last links
        if (boundaryLinks) {
          var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
          pages.unshift(firstPage);

          var lastPage = makePage(totalPages, lastText, false, paginationCtrl.noNext());
          pages.push(lastPage);
        }

        return pages;
      };
    }
  };
}])

.constant('pagerConfig', {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
})

.directive('pager', ['pagerConfig', function(config) {
  return {
    restrict: 'EA',
    scope: {
      page: '=',
      totalItems: '=',
      onSelectPage:' &',
      numPages: '='
    },
    controller: 'PaginationController',
    templateUrl: 'template/pagination/pager.html',
    replace: true,
    link: function(scope, element, attrs, paginationCtrl) {

      // Setup configuration parameters
      var previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true),
      nextText         = paginationCtrl.getAttributeValue(attrs.nextText,     config.nextText,     true),
      align            = paginationCtrl.getAttributeValue(attrs.align,        config.align);

      paginationCtrl.init(config.itemsPerPage);

      // Create page object used in template
      function makePage(number, text, isDisabled, isPrevious, isNext) {
        return {
          number: number,
          text: text,
          disabled: isDisabled,
          previous: ( align && isPrevious ),
          next: ( align && isNext )
        };
      }

      paginationCtrl.getPages = function(currentPage) {
        return [
          makePage(currentPage - 1, previousText, paginationCtrl.noPrevious(), true, false),
          makePage(currentPage + 1, nextText, paginationCtrl.noNext(), false, true)
        ];
      };
    }
  };
}]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module( 'ui.bootstrap.tooltip', [ 'ui.bootstrap.position', 'ui.bootstrap.bindHtml' ] )

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider( '$tooltip', function () {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    animation: true,
    popupDelay: 0
  };

  // Default hide triggers for each show trigger
  var triggerMap = {
    'mouseenter': 'mouseleave',
    'click': 'click',
    'focus': 'blur'
  };

  // The options specified to the provider globally.
  var globalOptions = {};
  
  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
  this.options = function( value ) {
    angular.extend( globalOptions, value );
  };

  /**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
   */
  this.setTriggers = function setTriggers ( triggers ) {
    angular.extend( triggerMap, triggers );
  };

  /**
   * This is a helper function for translating camel-case to snake-case.
   */
  function snake_case(name){
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  /**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = [ '$window', '$compile', '$timeout', '$parse', '$document', '$position', '$interpolate', function ( $window, $compile, $timeout, $parse, $document, $position, $interpolate ) {
    return function $tooltip ( type, prefix, defaultTriggerShow ) {
      var options = angular.extend( {}, defaultOptions, globalOptions );

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      function getTriggers ( trigger ) {
        var show = trigger || options.trigger || defaultTriggerShow;
        var hide = triggerMap[show] || show;
        return {
          show: show,
          hide: hide
        };
      }

      var directiveName = snake_case( type );

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      var template = 
        '<'+ directiveName +'-popup '+
          'title="'+startSym+'tt_title'+endSym+'" '+
          'content="'+startSym+'tt_content'+endSym+'" '+
          'placement="'+startSym+'tt_placement'+endSym+'" '+
          'animation="tt_animation()" '+
          'is-open="tt_isOpen"'+
          'compile-scope="$parent"'+
          '>'+
        '</'+ directiveName +'-popup>';

      return {
        restrict: 'EA',
        scope: true,
        link: function link ( scope, element, attrs ) {
          var tooltip = $compile( template )( scope );
          var transitionTimeout;
          var popupTimeout;
          var $body;
          var appendToBody = angular.isDefined( options.appendToBody ) ? options.appendToBody : false;
          var triggers = getTriggers( undefined );
          var hasRegisteredTriggers = false;

          // By default, the tooltip is not open.
          // TODO add ability to start tooltip opened
          scope.tt_isOpen = false;

          function toggleTooltipBind () {
            if ( ! scope.tt_isOpen ) {
              showTooltipBind();
            } else {
              hideTooltipBind();
            }
          }
          
          // Show the tooltip with delay if specified, otherwise show it immediately
          function showTooltipBind() {
            if ( scope.tt_popupDelay ) {
              popupTimeout = $timeout( show, scope.tt_popupDelay );
            } else {
              scope.$apply( show );
            }
          }

          function hideTooltipBind () {
            scope.$apply(function () {
              hide();
            });
          }
          
          // Show the tooltip popup element.
          function show() {
            var position,
                ttWidth,
                ttHeight,
                ttPosition;

            // Don't show empty tooltips.
            if ( ! scope.tt_content ) {
              return;
            }

            // If there is a pending remove transition, we must cancel it, lest the
            // tooltip be mysteriously removed.
            if ( transitionTimeout ) {
              $timeout.cancel( transitionTimeout );
            }
            
            // Set the initial positioning.
            tooltip.css({ top: 0, left: 0, display: 'block' });
            
            // Now we add it to the DOM because need some info about it. But it's not 
            // visible yet anyway.

            angular.element(document.querySelector('.popover')).remove();
            if ( appendToBody ) {
                $body = $body || $document.find( 'body' );
                $body.append( tooltip );
            } else {
              element.after( tooltip );
            }

            // Get the position of the directive element.
            position = appendToBody ? $position.offset( element ) : $position.position( element );

            // Get the height and width of the tooltip so we can center it.
            ttWidth = tooltip.prop( 'offsetWidth' );
            ttHeight = tooltip.prop( 'offsetHeight' );
            
            // Calculate the tooltip's top and left coordinates to center it with
            // this directive.
            switch ( scope.tt_placement ) {
              case 'right':
                ttPosition = {
                  top: position.top + position.height / 2 - ttHeight / 2,
                  left: position.left + position.width
                };
                break;
              case 'bottom':
                ttPosition = {
                  top: position.top + position.height,
                  left: position.left + position.width / 2 - ttWidth / 2
                };
                break;
              case 'left':
                ttPosition = {
                  top: position.top + position.height / 2 - ttHeight / 2,
                  left: position.left - ttWidth
                };
                break;
              default:
                ttPosition = {
                  top: position.top - ttHeight,
                  left: position.left + position.width / 2 - ttWidth / 2
                };
                break;
            }

            ttPosition.top += 'px';
            ttPosition.left += 'px';

            // Now set the calculated positioning.
            tooltip.css( ttPosition );
              
            // And show the tooltip.
            scope.tt_isOpen = true;
          }
          
          // Hide the tooltip popup element.
          function hide( destroy ) {
            // First things first: we don't show it anymore.
            scope.tt_isOpen = false;

            //if tooltip is going to be shown after delay, we must cancel this
            $timeout.cancel( popupTimeout );
            
            // And now we remove it from the DOM. However, if we have animation, we 
            // need to wait for it to expire beforehand.
            // FIXME: this is a placeholder for a port of the transitions library.
            if ( angular.isDefined( scope.tt_animation ) && scope.tt_animation() ) {
              transitionTimeout = $timeout( function () { remove( destroy ); }, 500 );
            } else {
              remove( destroy );
            }
          }

          function remove( destroy ) {
            if ( destroy ) {
              tooltip.remove();
            } else {
              angular.forEach( tooltip, function( e ) { e.parentNode.removeChild( e ); } );
            }
          }

          /**
           * Observe the relevant attributes.
           */
          attrs.$observe( type, function ( val ) {
            scope.tt_content = val;
          });

          attrs.$observe( prefix+'Title', function ( val ) {
            scope.tt_title = val;
          });

          attrs.$observe( prefix+'Placement', function ( val ) {
            scope.tt_placement = angular.isDefined( val ) ? val : options.placement;
          });

          attrs.$observe( prefix+'Animation', function ( val ) {
            scope.tt_animation = angular.isDefined( val ) ? $parse( val ) : function(){ return options.animation; };
          });

          attrs.$observe( prefix+'PopupDelay', function ( val ) {
            var delay = parseInt( val, 10 );
            scope.tt_popupDelay = ! isNaN(delay) ? delay : options.popupDelay;
          });

          attrs.$observe( prefix+'Trigger', function ( val ) {

            if (hasRegisteredTriggers) {
              element.unbind( triggers.show, showTooltipBind );
              element.unbind( triggers.hide, hideTooltipBind );
            }

            triggers = getTriggers( val );

            if ( triggers.show === triggers.hide ) {
              element.bind( triggers.show, toggleTooltipBind );
            } else {
              element.bind( triggers.show, showTooltipBind );
              element.bind( triggers.hide, hideTooltipBind );
            }

            hasRegisteredTriggers = true;
          });

          attrs.$observe( prefix+'AppendToBody', function ( val ) {
            appendToBody = angular.isDefined( val ) ? $parse( val )( scope ) : appendToBody;
          });

          // if a tooltip is attached to <body> we need to remove it on
          // location change as its parent scope will probably not be destroyed
          // by the change.
          if ( appendToBody ) {
            scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess () {
            if ( scope.tt_isOpen ) {
              hide();
            }
          });
          }

          // Make sure tooltip is destroyed and removed.
          scope.$on('$destroy', function onDestroyTooltip() {
            if ( scope.tt_isOpen ) {
              hide( true );
            } else {
              remove( true );
            }
          });
        }
      };
    };
  }];
})

.directive( 'tooltipPopup', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-popup.html'
  };
})

.directive( 'tooltip', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'tooltip', 'tooltip', 'mouseenter' );
}])

.directive( 'tooltipHtmlUnsafePopup', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
  };
})

.directive( 'tooltipHtmlUnsafe', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter' );
}]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
angular.module( 'ui.bootstrap.popover', [ 'ui.bootstrap.tooltip' ] )
.directive( 'popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html'
  };
})
.directive( 'popover', [ '$compile', '$timeout', '$parse', '$window', '$tooltip', function ( $compile, $timeout, $parse, $window, $tooltip ) {
  return $tooltip( 'popover', 'popover', 'click' );
}])
.directive( 'popoverTemplatePopup', [ '$templateCache', '$compile', function ( $templateCache, $compile ) {
  return {
    restrict: 'EA',
    replace: true,
    scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&', compileScope: '&' },
    templateUrl: 'template/popover/popover-template.html',
    link: function( scope, iElement ) {
      scope.$watch( 'content', function( value ) {
        var contentEl = angular.element( iElement[0].querySelector( '.popover-content' ) );
        contentEl.children().remove();
        contentEl.append( $compile( $templateCache.get( value ).trim() )( scope.compileScope() ) );
      });
    }
  };
}])
.directive( 'popoverTemplate', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'popoverTemplate', 'popover', 'click' );
}]);


angular.module('ui.bootstrap.progressbar', ['ui.bootstrap.transition'])

.constant('progressConfig', {
  animate: true,
  autoType: false,
  stackedTypes: ['success', 'info', 'warning', 'danger']
})

.controller('ProgressBarController', ['$scope', '$attrs', 'progressConfig', function($scope, $attrs, progressConfig) {

    // Whether bar transitions should be animated
    var animate = angular.isDefined($attrs.animate) ? $scope.$eval($attrs.animate) : progressConfig.animate;
    var autoType = angular.isDefined($attrs.autoType) ? $scope.$eval($attrs.autoType) : progressConfig.autoType;
    var stackedTypes = angular.isDefined($attrs.stackedTypes) ? $scope.$eval('[' + $attrs.stackedTypes + ']') : progressConfig.stackedTypes;

    // Create bar object
    this.makeBar = function(newBar, oldBar, index) {
        var newValue = (angular.isObject(newBar)) ? newBar.value : (newBar || 0);
        var oldValue =  (angular.isObject(oldBar)) ? oldBar.value : (oldBar || 0);
        var type = (angular.isObject(newBar) && angular.isDefined(newBar.type)) ? newBar.type : (autoType) ? getStackedType(index || 0) : null;

        return {
            from: oldValue,
            to: newValue,
            type: type,
            animate: animate
        };
    };

    function getStackedType(index) {
        return stackedTypes[index];
    }

    this.addBar = function(bar) {
        $scope.bars.push(bar);
        $scope.totalPercent += bar.to;
    };

    this.clearBars = function() {
        $scope.bars = [];
        $scope.totalPercent = 0;
    };
    this.clearBars();
}])

.directive('progress', function() {
    return {
        restrict: 'EA',
        replace: true,
        controller: 'ProgressBarController',
        scope: {
            value: '=percent',
            onFull: '&',
            onEmpty: '&'
        },
        templateUrl: 'template/progressbar/progress.html',
        link: function(scope, element, attrs, controller) {
            scope.$watch('value', function(newValue, oldValue) {
                controller.clearBars();

                if (angular.isArray(newValue)) {
                    // Stacked progress bar
                    for (var i=0, n=newValue.length; i < n; i++) {
                        controller.addBar(controller.makeBar(newValue[i], oldValue[i], i));
                    }
                } else {
                    // Simple bar
                    controller.addBar(controller.makeBar(newValue, oldValue));
                }
            }, true);

            // Total percent listeners
            scope.$watch('totalPercent', function(value) {
              if (value >= 100) {
                scope.onFull();
              } else if (value <= 0) {
                scope.onEmpty();
              }
            }, true);
        }
    };
})

.directive('progressbar', ['$transition', function($transition) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            width: '=',
            old: '=',
            type: '=',
            animate: '='
        },
        templateUrl: 'template/progressbar/bar.html',
        link: function(scope, element) {
            scope.$watch('width', function(value) {
                if (scope.animate) {
                    element.css('width', scope.old + '%');
                    $transition(element, {width: value + '%'});
                } else {
                    element.css('width', value + '%');
                }
            });
        }
    };
}]);
angular.module('ui.bootstrap.rating', [])

.constant('ratingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null
})

.controller('RatingController', ['$scope', '$attrs', '$parse', 'ratingConfig', function($scope, $attrs, $parse, ratingConfig) {

  this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
  this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
  this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;

  this.createDefaultRange = function(len) {
    var defaultStateObject = {
      stateOn: this.stateOn,
      stateOff: this.stateOff
    };

    var states = new Array(len);
    for (var i = 0; i < len; i++) {
      states[i] = defaultStateObject;
    }
    return states;
  };

  this.normalizeRange = function(states) {
    for (var i = 0, n = states.length; i < n; i++) {
      states[i].stateOn = states[i].stateOn || this.stateOn;
      states[i].stateOff = states[i].stateOff || this.stateOff;
    }
    return states;
  };

  // Get objects used in template
  $scope.range = angular.isDefined($attrs.ratingStates) ?  this.normalizeRange(angular.copy($scope.$parent.$eval($attrs.ratingStates))): this.createDefaultRange(this.maxRange);

  $scope.rate = function(value) {
    if ( $scope.readonly || $scope.value === value) {
      return;
    }

    $scope.value = value;
  };

  $scope.enter = function(value) {
    if ( ! $scope.readonly ) {
      $scope.val = value;
    }
    $scope.onHover({value: value});
  };

  $scope.reset = function() {
    $scope.val = angular.copy($scope.value);
    $scope.onLeave();
  };

  $scope.$watch('value', function(value) {
    $scope.val = value;
  });

  $scope.readonly = false;
  if ($attrs.readonly) {
    $scope.$parent.$watch($parse($attrs.readonly), function(value) {
      $scope.readonly = !!value;
    });
  }
}])

.directive('rating', function() {
  return {
    restrict: 'EA',
    scope: {
      value: '=',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'RatingController',
    templateUrl: 'template/rating/rating.html',
    replace: true
  };
});

/**
 * @ngdoc overview
 * @name ui.bootstrap.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */

angular.module('ui.bootstrap.tabs', [])

.directive('tabs', function() {
  return function() {
    throw new Error("The `tabs` directive is deprecated, please migrate to `tabset`. Instructions can be found at http://github.com/angular-ui/bootstrap/tree/master/CHANGELOG.md");
  };
})

.controller('TabsetController', ['$scope', '$element',
function TabsetCtrl($scope, $element) {

  var ctrl = this,
    tabs = ctrl.tabs = $scope.tabs = [];

  ctrl.select = function(tab) {
    angular.forEach(tabs, function(tab) {
      tab.active = false;
    });
    tab.active = true;
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    if (tabs.length === 1 || tab.active) {
      ctrl.select(tab);
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected
    if (tab.active && tabs.length > 1) {
      //If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {string=} direction  What direction the tabs should be rendered. Available:
 * 'right', 'left', 'below'.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <tabset>
      <tab heading="Vertical Tab 1"><b>First</b> Content!</tab>
      <tab heading="Vertical Tab 2"><i>Second</i> Content!</tab>
    </tabset>
    <hr />
    <tabset vertical="true">
      <tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</tab>
      <tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</tab>
    </tabset>
  </file>
</example>
 */
.directive('tabset', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    require: '^tabset',
    scope: {},
    controller: 'TabsetController',
    templateUrl: 'template/tabs/tabset.html',
    compile: function(elm, attrs, transclude) {
      return function(scope, element, attrs, tabsetCtrl) {
        scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
        scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
        scope.direction = angular.isDefined(attrs.direction) ? scope.$parent.$eval(attrs.direction) : 'top';
        scope.tabsAbove = (scope.direction != 'below');
        tabsetCtrl.$scope = scope;
        tabsetCtrl.$transcludeFn = transclude;
      };
    }
  };
})

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link ui.bootstrap.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link ui.bootstrap.tabs.directive:tabset tabset}.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <div ng-controller="TabsDemoCtrl">
      <button class="btn btn-small" ng-click="items[0].active = true">
        Select item 1, using active binding
      </button>
      <button class="btn btn-small" ng-click="items[1].disabled = !items[1].disabled">
        Enable/disable item 2, using disabled binding
      </button>
      <br />
      <tabset>
        <tab heading="Tab 1">First Tab</tab>
        <tab select="alertMe()">
          <tab-heading><i class="icon-bell"></i> Alert me!</tab-heading>
          Second Tab, with alert callback and html heading!
        </tab>
        <tab ng-repeat="item in items"
          heading="{{item.title}}"
          disabled="item.disabled"
          active="item.active">
          {{item.content}}
        </tab>
      </tabset>
    </div>
  </file>
  <file name="script.js">
    function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
  </file>
</example>
 */

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link ui.bootstrap.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <tabset>
      <tab>
        <tab-heading><b>HTML</b> in my titles?!</tab-heading>
        And some content, too!
      </tab>
      <tab>
        <tab-heading><i class="icon-heart"></i> Icon heading?!?</tab-heading>
        That's right.
      </tab>
    </tabset>
  </file>
</example>
 */
.directive('tab', ['$parse', '$http', '$templateCache', '$compile',
function($parse, $http, $templateCache, $compile) {
  return {
    require: '^tabset',
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/tabs/tab.html',
    transclude: true,
    scope: {
      heading: '@',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, tabsetCtrl) {
        var getActive, setActive;
        if (attrs.active) {
          getActive = $parse(attrs.active);
          setActive = getActive.assign;
          scope.$parent.$watch(getActive, function updateActive(value) {
            scope.active = !!value;
          });
          scope.active = getActive(scope.$parent);
        } else {
          setActive = getActive = angular.noop;
        }

        scope.$watch('active', function(active) {
          setActive(scope.$parent, active);
          if (active) {
            tabsetCtrl.select(scope);
            scope.onSelect();
          } else {
            scope.onDeselect();
          }
        });

        scope.disabled = false;
        if ( attrs.disabled ) {
          scope.$parent.$watch($parse(attrs.disabled), function(value) {
            scope.disabled = !! value;
          });
        }

        scope.select = function() {
          if ( ! scope.disabled ) {
            scope.active = true;
          }
        };

        tabsetCtrl.addTab(scope);
        scope.$on('$destroy', function() {
          tabsetCtrl.removeTab(scope);
        });
        if (scope.active) {
          setActive(scope.$parent, true);
        }


        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      };
    }
  };
}])

.directive('tabHeadingTransclude', [function() {
  return {
    restrict: 'A',
    require: '^tab',
    link: function(scope, elm, attrs, tabCtrl) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
}])

.directive('tabContentTransclude', ['$compile', '$parse', function($compile, $parse) {
  return {
    restrict: 'A',
    require: '^tabset',
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.tabContentTransclude);

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };
  function isTabHeading(node) {
    return node.tagName &&  (
      node.hasAttribute('tab-heading') ||
      node.hasAttribute('data-tab-heading') ||
      node.tagName.toLowerCase() === 'tab-heading' ||
      node.tagName.toLowerCase() === 'data-tab-heading'
    );
  }
}])

.directive('tabsetTitles', ['$http', function($http) {
  return {
    restrict: 'A',
    require: '^tabset',
    templateUrl: 'template/tabs/tabset-titles.html',
    replace: true,
    link: function(scope, elm, attrs, tabsetCtrl) {
      if (!scope.$eval(attrs.tabsetTitles)) {
        elm.remove();
      } else {
        //now that tabs location has been decided, transclude the tab titles in
        tabsetCtrl.$transcludeFn(tabsetCtrl.$scope.$parent, function(node) {
          elm.append(node);
        });
      }
    }
  };
}])

;


angular.module('ui.bootstrap.timepicker', [])

.constant('timepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: true,
  meridians: ['AM', 'PM'],
  readonlyInput: false,
  mousewheel: true
})

.directive('timepicker', ['$parse', '$log', 'timepickerConfig', function ($parse, $log, timepickerConfig) {
  return {
    restrict: 'EA',
    require:'?^ngModel',
    replace: true,
    scope: {},
    templateUrl: 'template/timepicker/timepicker.html',
    link: function(scope, element, attrs, ngModel) {
      if ( !ngModel ) {
        return; // do nothing if no ng-model
      }

      var selected = new Date(), meridians = timepickerConfig.meridians;

      var hourStep = timepickerConfig.hourStep;
      if (attrs.hourStep) {
        scope.$parent.$watch($parse(attrs.hourStep), function(value) {
          hourStep = parseInt(value, 10);
        });
      }

      var minuteStep = timepickerConfig.minuteStep;
      if (attrs.minuteStep) {
        scope.$parent.$watch($parse(attrs.minuteStep), function(value) {
          minuteStep = parseInt(value, 10);
        });
      }

      // 12H / 24H mode
      scope.showMeridian = timepickerConfig.showMeridian;
      if (attrs.showMeridian) {
        scope.$parent.$watch($parse(attrs.showMeridian), function(value) {
          scope.showMeridian = !!value;

          if ( ngModel.$error.time ) {
            // Evaluate from template
            var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
            if (angular.isDefined( hours ) && angular.isDefined( minutes )) {
              selected.setHours( hours );
              refresh();
            }
          } else {
            updateTemplate();
          }
        });
      }

      // Get scope.hours in 24H mode if valid
      function getHoursFromTemplate ( ) {
        var hours = parseInt( scope.hours, 10 );
        var valid = ( scope.showMeridian ) ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
        if ( !valid ) {
          return undefined;
        }

        if ( scope.showMeridian ) {
          if ( hours === 12 ) {
            hours = 0;
          }
          if ( scope.meridian === meridians[1] ) {
            hours = hours + 12;
          }
        }
        return hours;
      }

      function getMinutesFromTemplate() {
        var minutes = parseInt(scope.minutes, 10);
        return ( minutes >= 0 && minutes < 60 ) ? minutes : undefined;
      }

      function pad( value ) {
        return ( angular.isDefined(value) && value.toString().length < 2 ) ? '0' + value : value;
      }

      // Input elements
      var inputs = element.find('input'), hoursInputEl = inputs.eq(0), minutesInputEl = inputs.eq(1);

      // Respond on mousewheel spin
      var mousewheel = (angular.isDefined(attrs.mousewheel)) ? scope.$eval(attrs.mousewheel) : timepickerConfig.mousewheel;
      if ( mousewheel ) {

        var isScrollingUp = function(e) {
          if (e.originalEvent) {
            e = e.originalEvent;
          }
          //pick correct delta variable depending on event
          var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
          return (e.detail || delta > 0);
        };

        hoursInputEl.bind('mousewheel wheel', function(e) {
          scope.$apply( (isScrollingUp(e)) ? scope.incrementHours() : scope.decrementHours() );
          e.preventDefault();
        });

        minutesInputEl.bind('mousewheel wheel', function(e) {
          scope.$apply( (isScrollingUp(e)) ? scope.incrementMinutes() : scope.decrementMinutes() );
          e.preventDefault();
        });
      }

      scope.readonlyInput = (angular.isDefined(attrs.readonlyInput)) ? scope.$eval(attrs.readonlyInput) : timepickerConfig.readonlyInput;
      if ( ! scope.readonlyInput ) {

        var invalidate = function(invalidHours, invalidMinutes) {
          ngModel.$setViewValue( null );
          ngModel.$setValidity('time', false);
          if (angular.isDefined(invalidHours)) {
            scope.invalidHours = invalidHours;
          }
          if (angular.isDefined(invalidMinutes)) {
            scope.invalidMinutes = invalidMinutes;
          }
        };

        scope.updateHours = function() {
          var hours = getHoursFromTemplate();

          if ( angular.isDefined(hours) ) {
            selected.setHours( hours );
            refresh( 'h' );
          } else {
            invalidate(true);
          }
        };

        hoursInputEl.bind('blur', function(e) {
          if ( !scope.validHours && scope.hours < 10) {
            scope.$apply( function() {
              scope.hours = pad( scope.hours );
            });
          }
        });

        scope.updateMinutes = function() {
          var minutes = getMinutesFromTemplate();

          if ( angular.isDefined(minutes) ) {
            selected.setMinutes( minutes );
            refresh( 'm' );
          } else {
            invalidate(undefined, true);
          }
        };

        minutesInputEl.bind('blur', function(e) {
          if ( !scope.invalidMinutes && scope.minutes < 10 ) {
            scope.$apply( function() {
              scope.minutes = pad( scope.minutes );
            });
          }
        });
      } else {
        scope.updateHours = angular.noop;
        scope.updateMinutes = angular.noop;
      }

      ngModel.$render = function() {
        var date = ngModel.$modelValue ? new Date( ngModel.$modelValue ) : null;

        if ( isNaN(date) ) {
          ngModel.$setValidity('time', false);
          $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
        } else {
          if ( date ) {
            selected = date;
          }
          makeValid();
          updateTemplate();
        }
      };

      // Call internally when we know that model is valid.
      function refresh( keyboardChange ) {
        makeValid();
        ngModel.$setViewValue( new Date(selected) );
        updateTemplate( keyboardChange );
      }

      function makeValid() {
        ngModel.$setValidity('time', true);
        scope.invalidHours = false;
        scope.invalidMinutes = false;
      }

      function updateTemplate( keyboardChange ) {
        var hours = selected.getHours(), minutes = selected.getMinutes();

        if ( scope.showMeridian ) {
          hours = ( hours === 0 || hours === 12 ) ? 12 : hours % 12; // Convert 24 to 12 hour system
        }
        scope.hours =  keyboardChange === 'h' ? hours : pad(hours);
        scope.minutes = keyboardChange === 'm' ? minutes : pad(minutes);
        scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
      }

      function addMinutes( minutes ) {
        var dt = new Date( selected.getTime() + minutes * 60000 );
        selected.setHours( dt.getHours(), dt.getMinutes() );
        refresh();
      }

      scope.incrementHours = function() {
        addMinutes( hourStep * 60 );
      };
      scope.decrementHours = function() {
        addMinutes( - hourStep * 60 );
      };
      scope.incrementMinutes = function() {
        addMinutes( minuteStep );
      };
      scope.decrementMinutes = function() {
        addMinutes( - minuteStep );
      };
      scope.toggleMeridian = function() {
        addMinutes( 12 * 60 * (( selected.getHours() < 12 ) ? 1 : -1) );
      };
    }
  };
}]);

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('typeaheadParser', ['$parse', function ($parse) {

  //                      00000111000000000000022200000000000000003333333333333330000000000044000
  var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

  return {
    parse:function (input) {

      var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
      if (!match) {
        throw new Error(
          "Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
            " but got '" + input + "'.");
      }

      return {
        itemName:match[3],
        source:$parse(match[4]),
        viewMapper:$parse(match[2] || match[1]),
        modelMapper:$parse(match[1])
      };
    }
  };
}])

  .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
    function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

  var HOT_KEYS = [9, 13, 27, 38, 40];

  return {
    require:'ngModel',
    link:function (originalScope, element, attrs, modelCtrl) {

      //SUPPORTED ATTRIBUTES (OPTIONS)

      //minimal no of characters that needs to be entered before typeahead kicks-in
      var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

      //minimal wait time after last character typed before typehead kicks-in
      var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

      //should it restrict model values to the ones selected from the popup only?
      var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

      //binding to a variable that indicates if matches are being retrieved asynchronously
      var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

      //a callback executed when a match is selected
      var onSelectCallback = $parse(attrs.typeaheadOnSelect);

      var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

      //INTERNAL VARIABLES

      //model setter executed upon match selection
      var $setModelValue = $parse(attrs.ngModel).assign;

      //expressions used by typeahead
      var parserResult = typeaheadParser.parse(attrs.typeahead);


      //pop-up element used to display matches
      var popUpEl = angular.element('<typeahead-popup></typeahead-popup>');
      popUpEl.attr({
        matches: 'matches',
        active: 'activeIdx',
        select: 'select(activeIdx)',
        query: 'query',
        position: 'position'
      });
      //custom item template
      if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
        popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
      }

      //create a child scope for the typeahead directive so we are not polluting original scope
      //with typeahead-specific data (matches, query etc.)
      var scope = originalScope.$new();
      originalScope.$on('$destroy', function(){
        scope.$destroy();
      });

      var resetMatches = function() {
        scope.matches = [];
        scope.activeIdx = -1;
      };

      var getMatchesAsync = function(inputValue) {

        var locals = {$viewValue: inputValue};
        isLoadingSetter(originalScope, true);
        $q.when(parserResult.source(scope, locals)).then(function(matches) {

          //it might happen that several async queries were in progress if a user were typing fast
          //but we are interested only in responses that correspond to the current view value
          if (inputValue === modelCtrl.$viewValue) {
            if (matches.length > 0) {

              scope.activeIdx = 0;
              scope.matches.length = 0;

              //transform labels
              for(var i=0; i<matches.length; i++) {
                locals[parserResult.itemName] = matches[i];
                scope.matches.push({
                  label: parserResult.viewMapper(scope, locals),
                  model: matches[i]
                });
              }

              scope.query = inputValue;
              //position pop-up with matches - we need to re-calculate its position each time we are opening a window
              //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
              //due to other elements being rendered
              scope.position = $position.position(element);
              scope.position.top = scope.position.top + element.prop('offsetHeight');

            } else {
              resetMatches();
            }
            isLoadingSetter(originalScope, false);
          }
        }, function(){
          resetMatches();
          isLoadingSetter(originalScope, false);
        });
      };

      resetMatches();

      //we need to propagate user's query so we can higlight matches
      scope.query = undefined;

      //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
      var timeoutPromise;

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function (inputValue) {

        resetMatches();
        if (inputValue && inputValue.length >= minSearch) {
          if (waitTime > 0) {
            if (timeoutPromise) {
              $timeout.cancel(timeoutPromise);//cancel previous timeout
            }
            timeoutPromise = $timeout(function () {
              getMatchesAsync(inputValue);
            }, waitTime);
          } else {
            getMatchesAsync(inputValue);
          }
        }

        if (isEditable) {
          return inputValue;
        } else {
          modelCtrl.$setValidity('editable', false);
          return undefined;
        }
      });

      modelCtrl.$formatters.push(function (modelValue) {

        var candidateViewValue, emptyViewValue;
        var locals = {};

        if (inputFormatter) {

          locals['$model'] = modelValue;
          return inputFormatter(originalScope, locals);

        } else {

          //it might happen that we don't have enough info to properly render input value
          //we need to check for this situation and simply return model value if we can't apply custom formatting
          locals[parserResult.itemName] = modelValue;
          candidateViewValue = parserResult.viewMapper(originalScope, locals);
          locals[parserResult.itemName] = undefined;
          emptyViewValue = parserResult.viewMapper(originalScope, locals);

          return candidateViewValue!== emptyViewValue ? candidateViewValue : modelValue;
        }
      });

      scope.select = function (activeIdx) {
        //called from within the $digest() cycle
        var locals = {};
        var model, item;

        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
        model = parserResult.modelMapper(originalScope, locals);
        $setModelValue(originalScope, model);
        modelCtrl.$setValidity('editable', true);

        onSelectCallback(originalScope, {
          $item: item,
          $model: model,
          $label: parserResult.viewMapper(originalScope, locals)
        });

        resetMatches();

        //return focus to the input element if a mach was selected via a mouse click event
        element[0].focus();
      };

      //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
      element.bind('keydown', function (evt) {

        //typeahead is open and an "interesting" key was pressed
        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
          return;
        }

        evt.preventDefault();

        if (evt.which === 40) {
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
          scope.$digest();

        } else if (evt.which === 38) {
          scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
          scope.$digest();

        } else if (evt.which === 13 || evt.which === 9) {
          scope.$apply(function () {
            scope.select(scope.activeIdx);
          });

        } else if (evt.which === 27) {
          evt.stopPropagation();

          resetMatches();
          scope.$digest();
        }
      });

      // Keep reference to click handler to unbind it.
      var dismissClickHandler = function (evt) {
        if (element[0] !== evt.target) {
          resetMatches();
          scope.$digest();
        }
      };

      $document.bind('click', dismissClickHandler);

      originalScope.$on('$destroy', function(){
        $document.unbind('click', dismissClickHandler);
      });

      element.after($compile(popUpEl)(scope));
    }
  };

}])

  .directive('typeaheadPopup', function () {
    return {
      restrict:'E',
      scope:{
        matches:'=',
        query:'=',
        active:'=',
        position:'=',
        select:'&'
      },
      replace:true,
      templateUrl:'template/typeahead/typeahead-popup.html',
      link:function (scope, element, attrs) {

        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function () {
          return scope.matches.length > 0;
        };

        scope.isActive = function (matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function (matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function (activeIdx) {
          scope.select({activeIdx:activeIdx});
        };
      }
    };
  })

  .directive('typeaheadMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
    return {
      restrict:'E',
      scope:{
        index:'=',
        match:'=',
        query:'='
      },
      link:function (scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
        $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
           element.replaceWith($compile(tplContent.trim())(scope));
        });
      }
    };
  }])

  .filter('typeaheadHighlight', function() {

    function escapeRegexp(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    return function(matchItem, query) {
      return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
    };
  });
angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"accordion-group\">\n" +
    "  <div class=\"accordion-heading\" ><a class=\"accordion-toggle\" ng-click=\"isOpen = !isOpen\" accordion-transclude=\"heading\">{{heading}}</a></div>\n" +
    "  <div class=\"accordion-body\" collapse=\"!isOpen\">\n" +
    "    <div class=\"accordion-inner\" ng-transclude></div>  </div>\n" +
    "</div>");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion.html",
    "<div class=\"accordion\" ng-transclude></div>");
}]);

angular.module("template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/alert/alert.html",
    "<div class='alert' ng-class='type && \"alert-\" + type'>\n" +
    "    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/carousel.html",
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\">\n" +
    "    <ol class=\"carousel-indicators\" ng-show=\"slides().length > 1\">\n" +
    "        <li ng-repeat=\"slide in slides()\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>\n" +
    "    </ol>\n" +
    "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
    "    <a ng-click=\"prev()\" class=\"carousel-control left\" ng-show=\"slides().length > 1\">&lsaquo;</a>\n" +
    "    <a ng-click=\"next()\" class=\"carousel-control right\" ng-show=\"slides().length > 1\">&rsaquo;</a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/slide.html",
    "<div ng-class=\"{\n" +
    "    'active': leaving || (active && !entering),\n" +
    "    'prev': (next || active) && direction=='prev',\n" +
    "    'next': (next || active) && direction=='next',\n" +
    "    'right': direction=='prev',\n" +
    "    'left': direction=='next'\n" +
    "  }\" class=\"item\" ng-transclude></div>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<table>\n" +
    "  <thead>\n" +
    "    <tr class=\"text-center\">\n" +
    "      <th><button type=\"button\" class=\"btn pull-left\" ng-click=\"move(-1)\"><i class=\"icon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><button type=\"button\" class=\"btn btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn pull-right\" ng-click=\"move(1)\"><i class=\"icon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    <tr class=\"text-center\" ng-show=\"labels.length > 0\">\n" +
    "      <th ng-show=\"showWeekNumbers\">#</th>\n" +
    "      <th ng-repeat=\"label in labels\">{{label}}</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows\">\n" +
    "      <td ng-show=\"showWeekNumbers\" class=\"text-center\"><em>{{ getWeekNumber(row) }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn\" ng-class=\"{'btn-info': dt.selected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{muted: dt.secondary}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/popup.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" class=\"dropdown-menu\">\n" +
    " <li ng-transclude></li>\n" +
    " <li class=\"divider\"></li>\n" +
    " <li style=\"padding: 9px;\">\n" +
    "   <span class=\"btn-group\">\n" +
    "     <button class=\"btn btn-small btn-inverse\" ng-click=\"today()\">Today</button>\n" +
    "     <button class=\"btn btn-small btn-info\" ng-click=\"showWeeks = ! showWeeks\" ng-class=\"{active: showWeeks}\">Weeks</button>\n" +
    "     <button class=\"btn btn-small btn-danger\" ng-click=\"clear()\">Clear</button>\n" +
    "   </span>\n" +
    "   <button class=\"btn btn-small btn-success pull-right\" ng-click=\"isOpen = false\">Close</button>\n" +
    " </li>\n" +
    "</ul>");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\" ng-click=\"close($event)\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10}\" ng-transclude></div>");
}]);

angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pager.html",
    "<div class=\"pager\">\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"page in pages\" ng-class=\"{disabled: page.disabled, previous: page.previous, next: page.next}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pagination.html",
    "<div class=\"pagination\"><ul>\n" +
    "  <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind-html-unsafe=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/popover/popover-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover-template.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/bar.html",
    "<div class=\"bar\" ng-class='type && \"bar-\" + type'></div>");
}]);

angular.module("template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progress.html",
    "<div class=\"progress\"><progressbar ng-repeat=\"bar in bars\" width=\"bar.to\" old=\"bar.from\" animate=\"bar.animate\" type=\"bar.type\"></progressbar></div>");
}]);

angular.module("template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/rating/rating.html",
    "<span ng-mouseleave=\"reset()\">\n" +
    " <i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" ng-class=\"$index < val && (r.stateOn || 'icon-star') || (r.stateOff || 'icon-star-empty')\"></i>\n" +
    "</span>");
}]);

angular.module("template/tabs/pane.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/pane.html",
    "<div class=\"tab-pane\" ng-class=\"{active: selected}\" ng-show=\"selected\" ng-transclude></div>\n" +
    "");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabs.html",
    "<div class=\"tabbable\">\n" +
    "  <ul class=\"nav nav-tabs\">\n" +
    "    <li ng-repeat=\"pane in panes\" ng-class=\"{active:pane.selected}\">\n" +
    "      <a ng-click=\"select(pane)\">{{pane.heading}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <div class=\"tab-content\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tabs/tabset-titles.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset-titles.html",
    "<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "\n" +
    "<div class=\"tabbable\" ng-class=\"{'tabs-right': direction == 'right', 'tabs-left': direction == 'left', 'tabs-below': direction == 'below'}\">\n" +
    "  <div tabset-titles=\"tabsAbove\"></div>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\" \n" +
    "         ng-repeat=\"tab in tabs\" \n" +
    "         ng-class=\"{active: tab.active}\"\n" +
    "         tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div tabset-titles=\"!tabsAbove\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/timepicker/timepicker.html",
    "<table class=\"form-inline\">\n" +
    " <tr class=\"text-center\">\n" +
    "   <td><a ng-click=\"incrementHours()\" class=\"btn btn-link\"><i class=\"icon-chevron-up\"></i></a></td>\n" +
    "   <td>&nbsp;</td>\n" +
    "   <td><a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><i class=\"icon-chevron-up\"></i></a></td>\n" +
    "   <td ng-show=\"showMeridian\"></td>\n" +
    " </tr>\n" +
    " <tr>\n" +
    "   <td class=\"control-group\" ng-class=\"{'error': invalidHours}\"><input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"span1 text-center\" ng-mousewheel=\"incrementHours()\" ng-readonly=\"readonlyInput\" maxlength=\"2\" /></td>\n" +
    "   <td>:</td>\n" +
    "   <td class=\"control-group\" ng-class=\"{'error': invalidMinutes}\"><input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"span1 text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\"></td>\n" +
    "   <td ng-show=\"showMeridian\"><button type=\"button\" ng-click=\"toggleMeridian()\" class=\"btn text-center\">{{meridian}}</button></td>\n" +
    " </tr>\n" +
    " <tr class=\"text-center\">\n" +
    "   <td><a ng-click=\"decrementHours()\" class=\"btn btn-link\"><i class=\"icon-chevron-down\"></i></a></td>\n" +
    "   <td>&nbsp;</td>\n" +
    "   <td><a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><i class=\"icon-chevron-down\"></i></a></td>\n" +
    "   <td ng-show=\"showMeridian\"></td>\n" +
    " </tr>\n" +
    "</table>");
}]);

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-match.html",
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-popup.html",
    "<ul class=\"typeahead dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
    "    <li ng-repeat=\"match in matches\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\">\n" +
    "        <typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></typeahead-match>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("template/typeahead/typeahead.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead.html",
    "<ul class=\"typeahead dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
    "    <li ng-repeat=\"match in matches\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\">\n" +
    "        <a tabindex=\"-1\" ng-click=\"selectMatch($index)\" ng-bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>\n" +
    "    </li>\n" +
    "</ul>");
}]);
'use strict';

var app = angular.module('d3App.accountservices', [])

// app.factory('SessionService', function($http, $q) {
//     var service = {
//         getCurrentUser: function() {
//             if (service.isAuthenticated()) {
//                 return $q.when(service.currentUser);
//             } else {
//                 return $http.get('/api/current_user').then(function(response) {
//                     return service.currentUser = response.data;
//                 });
//             }
//         },
//         currentUser: null,
//         isAuthenticated: function() {
//             return !!service.currentUser;
//         }
//     };
//     return service;
// });

app.factory('focus', function($rootScope, $timeout) {
    return function(name) {
        $timeout(function() {
            $rootScope.$broadcast('focusOn', name);
        });
    }
});

'use strict';

var app = angular.module('d3App.liveservices', [])

app.factory('LiveBars', function($http, $q) {
    var methods = {};
    methods.poss = function(team) {
        var defer_poss = $q.defer();
        $http.get('/livepossbar/' + team, {
            cache: false
        }).success(function(data) {
            defer_poss.resolve(data);
        });
        return defer_poss.promise;
    }
    methods.shots = function(team) {
        var defer_shots = $q.defer();
        $http.get('/liveshotsbar/' + team, {
            cache: false
        }).success(function(data) {
            defer_shots.resolve(data);
        });
        return defer_shots.promise;
    }
    return methods;
});

app.factory('GeneralLiveData', function($http, $q) {
    var methods = {};

    methods.table = function() {
        var defer_table = $q.defer();
        $http.get('/tablejson/', {
            cache: false
        }).success(function(data) {
            defer_table.resolve(data);
        });
        return defer_table.promise;
    }

    methods.livescores = function() {
        var defer_livescores = $q.defer();
        $http.get('/livescoresjson/', {
            cache: false
        }).success(function(data) {
            defer_livescores.resolve(data);
        });
        return defer_livescores.promise;
    }
   
    methods.fullscores = function() {
        var defer_fullscores = $q.defer();
        $http.get('/fullscoresjson/', {
            cache: false
        }).success(function(data) {
            defer_fullscores.resolve(data);
        });
        return defer_fullscores.promise;
    }
   
    methods.recent = function(team) {
        var defer_recent = $q.defer();
        $http.get('/pastresults/' + team, {
            cache: false
        }).success(function(data) {
            defer_recent.resolve(data);
        });
        return defer_recent.promise;
    }
   
    methods.diff = function(team1, team2, diffSetting) {
        var defer_diff = $q.defer();
        $http.get('/diffjson/' + team1 + '$' + team2 + '$' + diffSetting, {
            cache: false
        }).success(function(data) {
            defer_diff.resolve(data);
        });
        return defer_diff.promise;
    }

    methods.nextfixtures = function() {
        var defer_nextfixtures = $q.defer();
        $http.get('/nextfixtures/' + 'countdown', {
            cache: false
        }).success(function(data) {
            defer_nextfixtures.resolve(data);
        });
        return defer_nextfixtures.promise;
    }

    methods.fixtures = function(team) {
        var deferred = $q.defer();
        $http.get('/fixturesjson/' + team, {
            cache: true
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }
    methods.scorers = function(team) {
        var defer_topscorers = $q.defer();
        $http.get('/topscorers/' + team, {
            cache: false
        }).success(function(data) {
            defer_topscorers.resolve(data);
        });
        return defer_topscorers.promise;
    }
    return methods;
});

app.factory('LiveStatsData', function($http, $q) {
    var methods = {};
    methods.poss = function(team) {
        var defer_liveposs = $q.defer();
        $http.get('/possjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_liveposs.resolve(data);
        });
        return defer_liveposs.promise;
    }
    methods.corner = function(team) {
        var defer_corner = $q.defer();
        $http.get('/cornerjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_corner.resolve(data);
        });
        return defer_corner.promise;
    }
    methods.shot = function(team) {
        var defer_shot = $q.defer();
        $http.get('/shotjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_shot.resolve(data);
        });
        return defer_shot.promise;
    }
    methods.targets = function(team) {
        var defer_target = $q.defer();
        $http.get('/targetjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_target.resolve(data);
        });
        return defer_target.promise;
    }
    methods.colours = function(data, team) {
        var home_team = data[0]['key'];
        var away_team = data[1]['key'];
        return [team_colour(home_team), away_colour_for_graph(away_team)]
    }
    return methods;
});
'use strict';

var app = angular.module('d3App.mainGraph', [])

app.factory('BigData', function($http, $q) {
    var methods = {};
    methods.squawka = function(team) {
        var defer_squawka = $q.defer();
        $http.get('/megajson/' + team, {
            cache: true
        }).success(function(data) {
            defer_squawka.resolve(data);
        });
        return defer_squawka.promise;
    }
    return methods;
});
'use strict';

(function() {

    /**
     * @ngdoc overview
     * @name ngStorage
     */

    angular.module('ngStorage', []).

    /**
     * @ngdoc object
     * @name ngStorage.$localStorage
     * @requires $rootScope
     * @requires $window
     */

    factory('$localStorage', _storageFactory('localStorage')).

    /**
     * @ngdoc object
     * @name ngStorage.$sessionStorage
     * @requires $rootScope
     * @requires $window
     */

    factory('$sessionStorage', _storageFactory('sessionStorage'));

    function _storageFactory(storageType) {
        return [
            '$rootScope',
            '$window',

            function(
                $rootScope,
                $window
            ){
                // #9: Assign a placeholder object if Web Storage is unavailable to prevent breaking the entire AngularJS app
                var webStorage = $window[storageType] || (console.warn('This browser does not support Web Storage!'), {}),
                    $storage = {
                        $default: function(items) {
                            for (var k in items) {
                                angular.isDefined($storage[k]) || ($storage[k] = items[k]);
                            }

                            return $storage;
                        },
                        $reset: function(items) {
                            for (var k in $storage) {
                                '$' === k[0] || delete $storage[k];
                            }

                            return $storage.$default(items);
                        }
                    },
                    _last$storage,
                    _debounce;

                for (var i = 0, k; i < webStorage.length; i++) {
                    // #8, #10: `webStorage.key(i)` may be an empty string (or throw an exception in IE9 if `webStorage` is empty)
                    (k = webStorage.key(i)) && 'ngStorage-' === k.slice(0, 10) && ($storage[k.slice(10)] = angular.fromJson(webStorage.getItem(k)));
                }

                _last$storage = angular.copy($storage);

                $rootScope.$watch(function() {
                    _debounce || (_debounce = setTimeout(function() {
                        _debounce = null;

                        if (!angular.equals($storage, _last$storage)) {
                            angular.forEach($storage, function(v, k) {
                                angular.isDefined(v) && '$' !== k[0] && webStorage.setItem('ngStorage-' + k, angular.toJson(v));

                                delete _last$storage[k];
                            });

                            for (var k in _last$storage) {
                                webStorage.removeItem('ngStorage-' + k);
                            }

                            _last$storage = angular.copy($storage);
                        }
                    }, 100));
                });

                // #6: Use `$window.addEventListener` instead of `angular.element` to avoid the jQuery-specific `event.originalEvent`
                'localStorage' === storageType && $window.addEventListener && $window.addEventListener('storage', function(event) {
                    if ('ngStorage-' === event.key.slice(0, 10)) {
                        event.newValue ? $storage[event.key.slice(10)] = angular.fromJson(event.newValue) : delete $storage[event.key.slice(10)];

                        _last$storage = angular.copy($storage);

                        $rootScope.$apply();
                    }
                });

                return $storage;
            }
        ];
    }

})();
'use strict';
var teamnames = ["Arsenal",
    "Liverpool",
    "Chelsea",
    "Southampton",
    "Everton",
    "Hull City",
    "Manchester City",
    "Newcastle United",
    "Tottenham Hotspur",
    "West Bromwich Albion",
    "Cardiff City",
    "Swansea City",
    "Aston Villa",
    "Manchester United",
    "Stoke City",
    "Norwich City",
    "West Ham United",
    "Fulham",
    "Crystal Palace",
    "Sunderland"
];
var types = ['arsenal', 'chelsea', 'west-bromwich-albion', 'aston-villa', 'liverpool', 'tottenham-hotspur', 'manchester-united', 'stoke-city', 'cardiff-city', 'west-ham-united', 'crystal-palace', 'southampton', 'newcastle-united', 'sunderland', 'norwich-city', 'everton', 'manchester-city', 'swansea-city', 'hull-city', 'fulham'];

var colours = {
    'Arsenal': '#e8000b',
    'Chelsea': '#063381',
    'West Bromwich Albion': '#090c41',
    'Aston Villa': '#5a0029',
    'Liverpool': '#c3001e',
    'Tottenham Hotspur': '#051246',
    'Manchester United': '#ce000e',
    'Stoke City': '#d62331',
    'Cardiff City': '#11006e',
    'West Ham United': '#4c172d',
    'Crystal Palace': '#06347c',
    'Southampton': '#e5002e',
    'Newcastle United': '#383838',
    'Sunderland': '#e30021',
    'Norwich City': '#0f5934',
    'Everton': '#073b8b',
    'Manchester City': '#4db1e6',
    'Swansea City': '#b4b4b4',
    'Hull City': '#f79616',
    'Fulham': '#000000'
};

var awaycolours = {
    'Arsenal': '#edab0f',
    'Chelsea': '#063381',
    'West Bromwich Albion': '#c53348',
    'Aston Villa': '#aa1f6d',
    'Liverpool': '#bbbbbb',
    'Tottenham Hotspur': '#16a8e8',
    'Manchester United': '#ce000e',
    'Stoke City': '#d62331',
    'Cardiff City': '#e5001e',
    'West Ham United': '#4c172d',
    'Crystal Palace': '#06347c',
    'Southampton': '#101010',
    'Newcastle United': '#989898',
    'Sunderland': '#e30021',
    'Norwich City': '#0f5934',
    'Everton': '#073b8b',
    'Manchester City': '#4db1e6',
    'Swansea City': '#b4b4b4',
    'Hull City': '#f79616',
    'Fulham': '#000000'
};

function away_colour_for_graph(name) {
    return awaycolours[name]
}

function team_colour(name) {
    return colours[name];
};
'use strict';

var app = angular.module('d3App.teamservices', [])

app.factory('TeamFormData', function($http, $q) {
    var methods = {};
    methods.teamform = function(team) {
        var defer_teamform = $q.defer();
        $http.get('/formjson/' + team, {
            cache: true
        }).success(function(data) {
            defer_teamform.resolve(data);
        });
        return defer_teamform.promise;
    }
    methods.oppoform = function(team) {
        var defer_oppoform = $q.defer();
        $http.get('/otherformjson/' + team, {
            cache: true
        }).success(function(data) {
            defer_oppoform.resolve(data);
        });
        return defer_oppoform.promise;
    }
    return methods;
});


app.factory('MatchDetails', function($http, $q) {
    var methods = {};
    methods.prematch = function(team) {
        var defer_prematch = $q.defer();
        $http.get('/prematchjson/' + team, {
            cache: true
        }).success(function(data) {
            defer_prematch.resolve(data);
        });
        return defer_prematch.promise;
    }
    return methods;
});


app.factory('HomeAwayTeam', function($http, $q) {
    var methods = {};
    methods.home = function(team) {
        var defer_hometeam = $q.defer();
        $http.get('/hometeam/' + team, {
            cache: true
        }).success(function(data) {
            defer_hometeam.resolve(data);
        });
        return defer_hometeam.promise;
    }
    methods.away = function(team) {
        var defer_awayteam = $q.defer();
        $http.get('/awayteam/' + team, {
            cache: true
        }).success(function(data) {
            defer_awayteam.resolve(data);
        })
        return defer_awayteam.promise;
    }    
    methods.awaysubs = function(team) {
        var defer_awaysubs = $q.defer();
        $http.get('/awaysubs/' + team, {
            cache: true
        }).success(function(data) {
            defer_awaysubs.resolve(data);
        })
        return defer_awaysubs.promise;
    }    
    methods.homesubs = function(team) {
        var defer_homesubs = $q.defer();
        $http.get('/homesubs/' + team, {
            cache: true
        }).success(function(data) {
            defer_homesubs.resolve(data);
        })
        return defer_homesubs.promise;
    }    
    return methods;
});
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45261165-1', 'epldb.co.uk');
  ga('send', 'pageview');



