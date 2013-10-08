// PIE CHART

$(document).ready(function () {

    var bbcj = $.getJSON("/bbcjson", function(pypy){
                    
    nv.addGraph(function() {


    var chart = nv.models.pieChart()
        
       .x(function(d) { return d.key })
       .y(function(d) { return d.y })
       .showLabels(true)
       .labelThreshold(.05)
       .donut(true);

      d3.select("#pypy1 svg")
          .datum(pypy)
        .transition().duration(1200)
          .call(chart);

   

    nv.utils.windowResize(chart.update);

    return chart;
      })
    });
});

// BIG CHART AT TOP

$(document).ready(function () {
  nv.addGraph(function() {
            var chart = nv.models.lineChart();

           chart.transitionDuration(500);
            chart.xAxis
                .tickFormat(d3.format(',f'));
           
            chart.yAxis
                .tickFormat(d3.format(',f'));
           
            d3.select('#chart svg')
                .datum(gon.d3)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
});

// LIVE POSSESSION

$(document).ready(function () {
      
    $.getJSON("/livepossjson", function(liveposs){

     nv.addGraph(function() {
            var chart = nv.models.lineChart();

           chart.transitionDuration(500);
            chart.xAxis
                .tickFormat(d3.format(',f'));
           
            chart.yAxis
                .tickFormat(d3.format(',.2f'));
           
            d3.select('#liveposschart svg')
                .datum(liveposs)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
             })
       });
});

// LIVE SHOTS

$(document).ready(function () {
      
    $.getJSON("/liveshotjson", function(liveshot){

     nv.addGraph(function() {
            var chart = nv.models.lineChart();

           chart.transitionDuration(500);
            chart.xAxis
                .tickFormat(d3.format(',f'));
           
            chart.yAxis
                .tickFormat(d3.format(',.2f'));
           
            d3.select('#liveshotschart svg')
                .datum(liveshot)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
             })
      });
});

// LIVE FOULS

$(document).ready(function () {
      
    $.getJSON("/livefouljson", function(livefoul){

     nv.addGraph(function() {
            var chart = nv.models.lineChart();

           chart.transitionDuration(500);
            chart.xAxis
                .tickFormat(d3.format(',f'));
           
            chart.yAxis
                .tickFormat(d3.format(',.2f'));
           
            d3.select('#livefoulschart svg')
                .datum(livefoul)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
             })
      });
});
// LIVE CORNERS

$(document).ready(function () {
      
    $.getJSON("/livecornerjson", function(livecorner){

     nv.addGraph(function() {
            var chart = nv.models.lineChart();

           chart.transitionDuration(500);
            chart.xAxis
                .tickFormat(d3.format(',f'));
           
            chart.yAxis
                .tickFormat(d3.format(',.2f'));
           
            d3.select('#livecornerschart svg')
                .datum(livecorner)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
             })
     });
});
// LIVE TARGETS

$(document).ready(function () {
      
    $.getJSON("/livetargetjson", function(livetarget){

     nv.addGraph(function() {
            var chart = nv.models.lineChart();

           chart.transitionDuration(500);
            chart.xAxis
                .tickFormat(d3.format(',f'));
           
            chart.yAxis
                .tickFormat(d3.format(',.2f'));
           
            d3.select('#livetargetschart svg')
                .datum(livetarget)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
             })
     });
});

// API STUFF

$(document).ready(function () {
    var table = gon.table;
    var fixtures = gon.fixtures;
    var form = gon.form;
    var tr;
    for (var i = 0; i < 11; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + table[i].team + "</td>");
        tr.append("<td>" + table[i].played + "</td>");
        tr.append("<td>" + table[i].won + "</td>");
        tr.append("<td>" + table[i].drawn + "</td>");
        tr.append("<td>" + table[i].lost + "</td>");
        tr.append("<td>" + table[i].difference + "</td>");
        tr.append("<td>" + table[i].points + "</td>");
        $('#pltable').append(tr); 
    }
    $("#venue1").append("<a>" + fixtures[0].home + " vs. " + fixtures[0].away + "<br>" + fixtures[0].date + "</a>");
    $("#venue2").append("<a>" + fixtures[1].home + " vs. " + fixtures[1].away + "<br>" + fixtures[1].date + "</a>");
    $("#venue3").append("<a>" + fixtures[2].home + " vs. " + fixtures[2].away + "<br>" + fixtures[2].date + "</a>");
    $("#venue4").append("<a>" + fixtures[3].home + " vs. " + fixtures[3].away + "<br>" + fixtures[3].date + "</a>");

    var spacedaway = _.map(form[1].form, function(num){ return " " + num; });
    var spacedhome = _.map(form[0].form, function(num){ return " " + num; });
    

    $("#hometeamform").append("<a>" + form[0].team + "<br>" + spacedhome + "</a>");
    $("#awayteamform").append("<a>" + form[1].team + "<br>" + spacedaway + "</a>");
});

// PREMATCH QUOTES

$(document).ready(function () {
    var prematch = gon.prematch
    var list = [];

  $(prematch).each(function(i, obj) {
     list.push(obj.text);
    });

  var final_list =  _.reject(list, function(num){ return num.length  == 1; });


    var $target;
    var loadContentIndex = 0;

    $(function() {
        $target = $('#update');
        loadContent(); 
        window.setInterval(loadContent, 8000); 
    });

    function loadContent() {
        $target.fadeOut(function() { 
            $target.text(final_list[loadContentIndex]); 
            $target.fadeIn(); 
        });

        loadContentIndex++; 
        if (final_list.length == loadContentIndex) { 
            loadContentIndex = 0;
        };
    };
});