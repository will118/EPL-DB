AAAAMILNE::Application.routes.draw do
    

  get "static_pages/home"
  get "static_pages/help"
  get 'possjson/:team' => 'fixtures#livepossjson'
  get 'shotjson/:team' => 'fixtures#liveshotjson'
  get 'targetjson/:team' => 'fixtures#livetargetjson'
  get 'cornerjson/:team' => 'fixtures#livecornerjson'
  get 'fouljson/:team' => 'fixtures#livefouljson'

  get 'fixturesjson/:team' => 'fixtures#fixturesjson'

  get 'hometeam/:team' => 'fixtures#hometeam'
  get 'awayteam/:team' => 'fixtures#awayteam'
  
  get 'tablejson' => 'fixtures#tablejson'
  
  get 'formjson/:team' => 'fixtures#formjson'
  
  get 'megajson/:team' => 'fixtures#megajson'
  
  get 'topscorers/:team' => 'fixtures#topscorers'
  
  get 'liveposspie' => 'fixtures#liveposspie'

  get "news/index"
  get "/prematchjson(.:format)" => "fixtures#prematchjson"
  get "/prematchjson/:id(.:format)" => "fixtures#prematchjsonid"
  resources :articles


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root to: 'static_pages#home'
  
  mount JasmineRails::Engine => "/specs" if defined?(JasmineRails)
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
