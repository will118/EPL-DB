$(document).ready(function () {
    var table = gon.table;
    var fixtures = gon.fixtures;
    var form = gon.form;
    var matchdata = gon.match_data.data.payload.Match[0];
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
    $("#hometeamform").append("<a>" + form[0].team + "<br>" + form[0].form + "</a>");
    $("#awayteamform").append("<a>" + form[1].team + "<br>" + form[1].form + "</a>");

    $("#venue1").append("<a>" + fixtures[0].home + " vs. " + fixtures[0].away + "<br>" + fixtures[0].date + "</a>");
    $("#venue2").append("<a>" + fixtures[1].home + " vs. " + fixtures[1].away + "<br>" + fixtures[1].date + "</a>");
    $("#venue3").append("<a>" + fixtures[2].home + " vs. " + fixtures[2].away + "<br>" + fixtures[2].date + "</a>");
    $("#venue4").append("<a>" + fixtures[3].home + " vs. " + fixtures[3].away + "<br>" + fixtures[3].date + "</a>");

  });