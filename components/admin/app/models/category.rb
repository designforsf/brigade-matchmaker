class Category < ApplicationRecord
  has_many :category_projects
  has_many :taxonomies, through: :category_projects
  has_many :category_tags
  has_many :tags, through: :category_tags
  before_destroy :check_if_destroyable!

  def check_if_destroyable!
    fail unless taxonomies.count < 2
  end
end
