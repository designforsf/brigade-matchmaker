class Taxonomy < ApplicationRecord
  has_many :category_taxonomies
  has_many :categories, through: :category_taxonomies
end
