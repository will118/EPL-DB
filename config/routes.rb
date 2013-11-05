EPLDB::Application.routes.draw do
  
root to: 'welcome#index'
## Welcome/Login Page ##
  get '/user/sign_out' => 'welcome#index'
  get '/dashboard' => 'welcome#dashboard'
  get '/settings' => 'welcome#dashboard'
## Custom JSONs ##
  get "/otherformjson/:team" => "data#otherformjson"
  get "/prematchjson/:team" => "data#prematchjson"
  get 'liveshotsbar/:team' => 'data#liveshotsbar'
  get 'fixturesjson/:team' => 'data#fixturesjson'
  get 'cornerjson/:team' => 'data#livecornerjson'
  get 'targetjson/:team' => 'data#livetargetjson'
  get 'pastresults/:team' => 'data#pastresults'
  get 'livepossbar/:team' => 'data#livepossbar'
  get 'possjson/:team' => 'data#livepossjson'
  get 'shotjson/:team' => 'data#liveshotjson'
  get 'fouljson/:team' => 'data#livefouljson'
  get 'topscorers/:team' => 'data#topscorers'
  get 'megajson/:team' => 'data#megajson'
  get 'hometeam/:team' => 'data#hometeam'
  get 'awayteam/:team' => 'data#awayteam'
  get 'homesubs/:team' => 'data#homesubs'
  get 'awaysubs/:team' => 'data#awaysubs'
  get 'formjson/:team' => 'data#formjson'
## Next Fixtures ##
  get 'nextfixtures/countdown' => 'data#nextfixtures_countdown'
  get 'nextfixtures/' => 'data#nextfixtures'
## Generic JSONs ## 
  get 'livescoresjson' => 'data#livescores'
  get 'scoresjson' => 'data#scores'
  get 'fullscoresjson' => 'data#dashscores'
  get 'tablejson' => 'data#tablejson'
## Catch-all ##
  get "*path" => 'welcome#index'
end