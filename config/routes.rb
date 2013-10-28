EPLDB::Application.routes.draw do

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

  get '/user/sign_out' => 'welcome#index'

  get '/dashboard' => 'welcome#dashboard'
  get '/settings' => 'welcome#dashboard'
  root to: 'welcome#index'

  get 'possjson/:team' => 'data#livepossjson'
  get 'shotjson/:team' => 'data#liveshotjson'
  get 'targetjson/:team' => 'data#livetargetjson'
  get 'cornerjson/:team' => 'data#livecornerjson'
  get 'fouljson/:team' => 'data#livefouljson'

  get 'fixturesjson/:team' => 'data#fixturesjson'
  get 'nextfixtures/:type' => 'data#nextfixtures'
  get 'scoresjson' => 'data#scores'

  get 'hometeam/:team' => 'data#hometeam'
  get 'awayteam/:team' => 'data#awayteam'

  get 'homesubs/:team' => 'data#homesubs'
  get 'awaysubs/:team' => 'data#awaysubs'

  get 'tablejson' => 'data#tablejson'

  get 'formjson/:team' => 'data#formjson'
  get "/otherformjson/:team" => "data#otherformjson"

  get 'megajson/:team' => 'data#megajson'

  get 'topscorers/:team' => 'data#topscorers'

  get 'livepossbar/:team' => 'data#livepossbar'

  get 'liveshotsbar/:team' => 'data#liveshotsbar'

  get "news/index"

  get "/prematchjson/:team" => "data#prematchjson"

  get "*path" => 'welcome#index'
end