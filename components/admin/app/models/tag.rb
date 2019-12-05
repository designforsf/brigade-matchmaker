class Tag < ApplicationRecord
  has_many :category_tags
  has_many :project_tags
  has_many :categories, through: :category_tags
  scope :outside_project_taxonomy, ->(project, taxonomy) do
    joins(<<-SQL,
      LEFT JOIN project_tags
      ON project_tags.tag_id = tags.id
      AND project_tags.taxonomy_id = #{taxonomy.id}
      AND project_tags.project_id = #{project.id}
    SQL
    ).where('project_tags.id IS NULL')
  end
end
