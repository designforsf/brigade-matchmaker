Rails.application.routes.draw do
  resources :tasks
  resources :tags
  resources :categories
  resources :category_tags
  resources :projects do
    resources :category_projects
    resources :project_tags
  end
  resources :taxonomies
  resources :matches, only: :create
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
