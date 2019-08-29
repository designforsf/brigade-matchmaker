require 'rails_helper'

RSpec.describe "CategoryTaxonomies", type: :request do
  describe "GET /category_taxonomies" do
    it "works! (now write some real specs)" do
      get category_taxonomies_path
      expect(response).to have_http_status(200)
    end
  end
end
