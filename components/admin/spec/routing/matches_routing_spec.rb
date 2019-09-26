require 'rails_helper'

RSpec.describe MatchesController, type: :routing do
  describe 'routing' do
    it 'routes to #create' do
      expect(post: '/matches').to route_to('matches#create')
    end
  end
end
