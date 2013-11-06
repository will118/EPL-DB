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
    'West Bromwich Albion': '#090c41',
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
