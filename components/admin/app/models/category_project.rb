class CategoryProject < ApplicationRecord
  belongs_to :category
  belongs_to :project
  belongs_to :taxonomy
  delegate :name, to: :category
end
