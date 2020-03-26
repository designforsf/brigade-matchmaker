require 'rails_helper'

describe 'Tags', type: :request do
  describe 'GET /api/categories/:category_id/tags' do
    it 'works' do
      get category_tags_path(Category.first)
      expect(response).to have_http_status(200)
    end
  end
end
