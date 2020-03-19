require 'rails_helper'

RSpec.describe TagsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/categories/1/tags').to route_to('tags#index', category_id: '1')
    end

    it 'routes to #new' do
      expect(get: '/api/categories/1/tags/new').to route_to('tags#new', category_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/api/categories/1/tags/1').to route_to('tags#show', category_id: '1', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/api/categories/1/tags/1/edit').to route_to('tags#edit', category_id: '1', id: '1')
    end


    it 'routes to #create' do
      expect(post: '/api/categories/1/tags').to route_to('tags#create', category_id: '1')
    end

    it 'routes to #update via PUT' do
      expect(put: '/api/categories/1/tags/1').to route_to('tags#update', category_id: '1', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/categories/1/tags/1').to route_to('tags#update', category_id: '1', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/api/categories/1/tags/1').to route_to('tags#destroy', category_id: '1', id: '1')
    end
  end
end
