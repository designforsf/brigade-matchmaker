class Category < ApplicationRecord
  has_many :category_projects
  has_many :taxonomies, through: :category_projects
  has_many :tags
  before_destroy :check_if_destroyable!
  validates :name, presence: true
  scope :outside_project_taxonomy, ->(project, taxonomy) do
    joins(<<-SQL,
      LEFT JOIN category_projects
      ON category_projects.category_id = categories.id
      AND category_projects.taxonomy_id = #{taxonomy.id}
      AND category_projects.project_id = #{project.id}
    SQL
    ).where('category_projects.id IS NULL')
  end

  def check_if_destroyable!
    fail unless taxonomies.count < 2
  end
end
