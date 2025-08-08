Rails.application.routes.draw do
  post '/login', to: 'auth#login'
  post '/admins', to: 'admins#create'
  get '/agenda', to: 'agenda#index'
end 