class MatchesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  # POST /matches
  # POST /matches.json
  def create
    @match = Match.new(match_params)
    render json: @match.generate_match.to_json
  end

  private

  def match_params
    params.require(:taxonomies).permit!
  end
end
