require 'rails_helper'

RSpec.describe CategoriesController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/categories').to route_to('categories#index')
    end

    it 'routes to #new' do
      expect(get: '/api/categories/new').to route_to('categories#new')
    end

    it 'routes to #show' do
      expect(get: '/api/categories/1').to route_to('categories#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/api/categories/1/edit').to route_to('categories#edit', id: '1')
    end


    it 'routes to #create' do
      expect(post: '/api/categories').to route_to('categories#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/api/categories/1').to route_to('categories#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/categories/1').to route_to('categories#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/api/categories/1').to route_to('categories#destroy', id: '1')
    end
  end
end
