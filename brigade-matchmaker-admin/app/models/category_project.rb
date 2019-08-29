class CategoryProject < ApplicationRecord
  belongs_to :category
  belongs_to :project
end
