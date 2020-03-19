Rails.application.routes.draw do
  scope :api do
    root 'home#index'
    resources :tasks
    resources :categories do
      resources :tags
    end
    resources :projects do
      resources :category_projects
      resources :project_tags, only: %i[index create destroy]
    end
    resources :taxonomies
    resources :matches, only: :create
    devise_for :users
  end
end
