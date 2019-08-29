Rails.application.routes.draw do
  resources :category_taxonomies
  resources :tasks
  resources :tags
  resources :categories
  resources :projects
  resources :taxonomies
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
