class Taxonomy < ApplicationRecord
  has_many :category_projects
  has_many :categories, -> { includes(:tags).distinct }, through: :category_projects
  has_many :project_tags
  has_many :projects, through: :project_tags
  validates :name, presence: true
end
