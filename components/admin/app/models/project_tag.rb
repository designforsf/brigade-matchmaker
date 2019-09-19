class ProjectTag < ApplicationRecord
  belongs_to :project
  belongs_to :tag
  belongs_to :taxonomy
  delegate :name, to: :tag
end
