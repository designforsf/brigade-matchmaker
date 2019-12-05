class ApplicationController < ActionController::Base
  before_action :authenticate_user!, only: %i[new edit create update destroy]
end
