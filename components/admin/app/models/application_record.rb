class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def assert_destroyable!
    throw(:abort) unless destroyable?
  end
end
