Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'api/auth/registrations'
    }

    namespace :auth do
      resources :sessions, only: [:index]
    end

    scope module: :apps do
      resources :profiles, only: [:show, :edit, :update]
    end
    scope module: :apps do
      resources :posts, only: [:show, :create, :destroy]
    end
  end
end