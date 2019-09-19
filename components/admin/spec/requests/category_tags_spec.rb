require 'rails_helper'

RSpec.describe "CategoryTags", type: :request do
  describe "GET /category_tags" do
    it "works! (now write some real specs)" do
      get category_tags_path
      expect(response).to have_http_status(200)
    end
  end
end
