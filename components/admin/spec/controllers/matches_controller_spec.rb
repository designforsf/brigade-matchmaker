require 'rails_helper'

describe MatchesController, type: :controller do
  let(:valid_attributes) { { taxonomies: { 1 => [{'tagId'=>1}] } } }

  describe 'POST #create' do
    it 'creates a new Match' do
      post :create, params: valid_attributes, session: {}
      expect(JSON.parse(response.body)).to eq({ '1' => 1, '2' => 0, '3' => 0, '4' => 0, '5' => 0, '6' => 1, '7' => 0 })
    end
  end
end
