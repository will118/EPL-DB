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
		 "Sunderland"];

	var colours = {
    'Arsenal': '#e8000b',  
    'Chelsea': '#063381',
    'West Bromwich Albion': '#090c41',
    'Aston Villa': '#5a0029',
    'Liverpool': '#c3001e',
    'Tottenham Hotspur': '#051246',
    'Manchester United': '#ce000e',
    'Stoke City': '#d62331',
    'Cardiff City': '#e5001e',
    'West Ham United': '#4c172d',
    'Crystal Palace': '#06347c',
    'Southampton': '#e5002e',
    'Newcastle United': '#666666',
    'Sunderland': '#e30021',
    'Norwich City': '#14993e',
    'Everton': '#073b8b',
    'Manchester City': '#4db1e6',
    'Swansea City': '#b4b4b4',
    'Hull City': '#f79616',
    'Fulham': '#000000'
  };
	
function team_colour(name) {
	return colours[name];
};
