require 'rails_helper'

RSpec.describe MatchesController, type: :controller do

  let(:valid_attributes) { { taxonomies: { 1 => [{'tagId'=>1}] } } }

  describe 'POST #create' do
    it 'creates a new Match' do
      post :create, params: valid_attributes, session: {}
    end
  end
end
