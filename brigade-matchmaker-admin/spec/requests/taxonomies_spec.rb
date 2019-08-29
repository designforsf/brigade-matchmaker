require 'rails_helper'

RSpec.describe "Taxonomies", type: :request do
  describe "GET /taxonomies" do
    it "works! (now write some real specs)" do
      get taxonomies_path
      expect(response).to have_http_status(200)
    end
  end
end
