class CategoryTaxonomy < ApplicationRecord
  belongs_to :category
  belongs_to :taxonomy
end
