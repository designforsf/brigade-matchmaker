class Project < ApplicationRecord
  belongs_to :user
  has_many :category_projects
  has_many :project_tags
  has_many :tasks
  has_many :categories, through: :category_projects
  has_many :category_tags, through: :categories
  has_many :tags, through: :project_tags
  scope :for_json, -> do
    includes(
      :tasks,
      :tags,
      categories: :tags,
      project_tags: :taxonomy,
      category_projects: :taxonomy,
    )
  end

  def grouped_categories
    category_projects.group_by { |category_project| category_project.taxonomy.name }
  end

  def grouped_tags
    project_tags.group_by { |project_tag| project_tag.taxonomy.name }
  end

  # TODO: This is sorting in reverse name order. Use a sensible ranking instead.
  def taxonomies
    grouped_categories.merge(grouped_tags).sort.reverse.to_h
  end
end
