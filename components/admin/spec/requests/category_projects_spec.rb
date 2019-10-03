require 'rails_helper'

RSpec.describe "CategoryProjects", type: :request do
  describe "GET /category_projects" do
    it "works! (now write some real specs)" do
      get category_projects_path
      expect(response).to have_http_status(200)
    end
  end
end
