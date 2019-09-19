require 'rails_helper'

RSpec.describe "ProjectTags", type: :request do
  describe "GET /project_tags" do
    it "works! (now write some real specs)" do
      get project_tags_path
      expect(response).to have_http_status(200)
    end
  end
end
