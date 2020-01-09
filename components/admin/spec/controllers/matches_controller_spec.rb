require 'rails_helper'

RSpec.describe MatchesController, type: :controller do

  let(:valid_attributes) { { taxonomies: { 1 => [{'tagId'=>1}] } } }

  describe 'POST #create' do
    it 'creates a new Match' do
      pending 'Need to seed the test db'
    end
  end
end
