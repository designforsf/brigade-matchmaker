Rails.application.routes.draw do
  def detail(resource_name)
    resources(resource_name, only: %i[index create destroy])
  end

  scope :api do
    root 'home#index'
    resources :tasks
    resources :categories do
      detail :tags
    end
    resources :projects do
      detail :category_projects
      detail :project_tags
    end
    resources :taxonomies
    resources :matches, only: :create
    devise_for :users
  end
end
