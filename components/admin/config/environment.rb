# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!
Zeitwerk::Loader.eager_load_all
