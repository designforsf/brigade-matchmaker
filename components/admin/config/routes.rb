Rails.application.routes.draw do
  scope :api do
    root 'projects#index'
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
  end
end
