Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  get "up" => "rails/health#show", as: :rails_health_check

  # Mount ActionCable WebSocket server
  mount ActionCable.server => "/cable"

  root "chat#index"
  post "messages", to: "chat#create"
end
