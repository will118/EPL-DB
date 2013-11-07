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
              right: 0,
              bottom: 10,
              left: 20
          },
              width = 830 - margin.left - margin.right,
              height = 420 - margin.top - margin.bottom;

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

