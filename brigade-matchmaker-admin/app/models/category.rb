class Category < ApplicationRecord
  has_many :category_taxonomies
  has_many :taxonomies, through: :category_taxonomies
  has_many :tags
end
