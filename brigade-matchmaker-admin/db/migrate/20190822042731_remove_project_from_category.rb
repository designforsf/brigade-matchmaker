class RemoveProjectFromCategory < ActiveRecord::Migration[6.0]
  def change
    remove_reference :categories, :project, null: false, foreign_key: true
  end
end
