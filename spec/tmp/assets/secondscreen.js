// PIE CHART

function pieCallback(pypy){
                    
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
      });
};

// BIG CHART AT TOP

function megaCallback(mega){

     nv.addGraph(function() {
            var chart = nv.models.lineChart();

           chart.transitionDuration(500);
            chart.xAxis
                .tickFormat(d3.format(',f'));
           
            chart.yAxis
                .tickFormat(d3.format(',f'));
           
            d3.select('#chart svg')
                .datum(mega)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
};

// LIVE POSSESSION

function possCallback(liveposs){
      
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
};

// LIVE SHOTS

function shotCallback(liveshot){
      
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
};

// LIVE FOULS

function foulCallback(livefoul){
      
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
 
};
// LIVE CORNERS

function cornerCallback(livecorner){
      

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
 
};
// LIVE TARGETS

function targCallback(livetarget){
      
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

};

// TABLE API

function tableCallback(table){
  var tr;
  for (var i = 0; i < Math.min(table.length,11); i++) {
      tr = $('<tr/>');
      tr.append("<td>" + table[i].team + "</td>");
      tr.append("<td>" + table[i].played + "</td>");
      tr.append("<td>" + table[i].won + "</td>");
      tr.append("<td>" + table[i].drawn + "</td>");
      tr.append("<td>" + table[i].lost + "</td>");
      tr.append("<td>" + table[i].difference + "</td>");
      tr.append("<td>" + table[i].points + "</td>");
      $('#pltable').append(tr); 
  };
}

function fixturesCallback(fixtures) {

  for (var i = 0; i < Math.min(fixtures.length, 4); i++) {
    $("#venue"+i).append("<a>" + fixtures[i].home + " vs. " + fixtures[i].away + "<br>" + fixtures[i].date + "</a>");
  };  
};

function formCallback(form){
    
    var spacedaway = _.map(form[1].form, function(num){ return " " + num; });
    var spacedhome = _.map(form[0].form, function(num){ return " " + num; });
    
    $("#hometeamform").append("<a>" + form[0].team + "<br>" + spacedhome + "</a>");
    $("#awayteamform").append("<a>" + form[1].team + "<br>" + spacedaway + "</a>");
    
};

// PREMATCH QUOTES

function prematchCallback(prematch){
   
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
 };

function setupTables(){
   $.getJSON("/tablejson", tableCallback);
   $.getJSON("/fixturesjson", fixturesCallback);
   $.getJSON("/formjson", formCallback);
   $.getJSON("/prematchjson", prematchCallback);
   $.getJSON("/bbcjson", pieCallback);
   $.getJSON("/megajson", megaCallback);
   $.getJSON("/livepossjson", possCallback);
   $.getJSON("/livetargetjson", targCallback);
   $.getJSON("/liveshotjson", shotCallback);
   $.getJSON("/livefouljson", foulCallback);
   $.getJSON("/livecornerjson", cornerCallback);
};
