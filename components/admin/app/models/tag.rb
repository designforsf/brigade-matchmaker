class Tag < ApplicationRecord
  has_many :category_tags
  has_many :categories, through: :category_tags
end
