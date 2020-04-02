require 'rails_helper'

RSpec.describe ProjectTagsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/projects/1/project_tags').to route_to('project_tags#index', project_id: '1')
    end

    it 'routes to #create' do
      expect(post: '/api/projects/1/project_tags').to route_to('project_tags#create', project_id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/api/projects/1/project_tags/1').to route_to('project_tags#destroy', project_id: '1', id: '1')
    end
  end
end
