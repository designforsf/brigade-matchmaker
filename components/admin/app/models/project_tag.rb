class ProjectTag < ApplicationRecord
  belongs_to :project
  belongs_to :tag
  belongs_to :taxonomy
  scope :for_project_taxonomy, ->(project, taxonomy) { where(project: project, taxonomy: taxonomy) }
  delegate :name, to: :tag
end
