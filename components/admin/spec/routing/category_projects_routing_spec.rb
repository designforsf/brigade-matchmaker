require 'rails_helper'

RSpec.describe CategoryProjectsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/projects/1/category_projects').to route_to('category_projects#index', project_id: '1')
    end

    it 'routes to #new' do
      expect(get: '/api/projects/1/category_projects/new').to route_to('category_projects#new', project_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/api/projects/1/category_projects/1').to route_to('category_projects#show', project_id: '1', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/api/projects/1/category_projects/1/edit').to route_to(
        'category_projects#edit', project_id: '1', id: '1',
      )
    end


    it 'routes to #create' do
      expect(post: '/api/projects/1/category_projects').to route_to('category_projects#create', project_id: '1')
    end

    it 'routes to #update via PUT' do
      expect(put: '/api/projects/1/category_projects/1').to route_to(
        'category_projects#update', project_id: '1', id: '1',
      )
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/projects/1/category_projects/1').to route_to(
        'category_projects#update', project_id: '1', id: '1',
      )
    end

    it 'routes to #destroy' do
      expect(delete: '/api/projects/1/category_projects/1').to route_to(
        'category_projects#destroy', project_id: '1', id: '1',
      )
    end
  end
end
