require 'rails_helper'

describe 'ProjectTags', type: :request do
  describe 'GET /api/project/:project_id/project_tags' do
    it 'works!' do
      get project_project_tags_path(Project.first)
      expect(response).to have_http_status(200)
    end
  end
end
