require 'rails_helper'

describe 'CategoryProjects', type: :request do
  describe 'GET /api/projects/:project_id/category_projects' do
    it 'works' do
      get project_category_projects_path(Project.first)
      expect(response).to have_http_status(200)
    end
  end
end
