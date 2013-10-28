EPLDB::Application.routes.draw do
  
  root to: 'welcome#index'

  devise_for :users,
  :controllers => {
    :omniauth_callbacks => "users/omniauth_callbacks",
    :registrations => "registrations"
  }

  devise_scope :user do
    get '/api/current_user' => 'users/sessions#show_current_user', as: 'show_current_user'
    post '/api/check/is_user' => 'users/users#is_user', as: 'is_user'
    post '/api/settings' => 'users/users#update', as: 'settings'
  end

## Welcome/Login Page ##
  get '/user/sign_out' => 'welcome#index'
  get '/dashboard' => 'welcome#dashboard'
  get '/settings' => 'welcome#dashboard'

## Custom JSONs ##
  get "/otherformjson/:team" => "data#otherformjson"
  get "/prematchjson/:team" => "data#prematchjson"
  get 'fixturesjson/:team' => 'data#fixturesjson'
  get 'liveshotsbar/:team' => 'data#liveshotsbar'
  get 'livepossbar/:team' => 'data#livepossbar'
  get 'topscorers/:team' => 'data#topscorers'
  get 'targetjson/:team' => 'data#livetargetjson'
  get 'cornerjson/:team' => 'data#livecornerjson'
  get 'possjson/:team' => 'data#livepossjson'
  get 'shotjson/:team' => 'data#liveshotjson'
  get 'megajson/:team' => 'data#megajson'
  get 'fouljson/:team' => 'data#livefouljson'
  get 'hometeam/:team' => 'data#hometeam'
  get 'awayteam/:team' => 'data#awayteam'
  get 'homesubs/:team' => 'data#homesubs'
  get 'awaysubs/:team' => 'data#awaysubs'
  get 'formjson/:team' => 'data#formjson'
## Next Fixtures ##
  get 'nextfixtures/:type' => 'data#nextfixtures'

## Generic JSONs ## 
  get 'scoresjson' => 'data#scores'
  get 'tablejson' => 'data#tablejson'

## Catch-all ##
  get "*path" => 'welcome#index'

end