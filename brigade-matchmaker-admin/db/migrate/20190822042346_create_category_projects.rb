class CreateCategoryProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :category_projects do |t|
      t.references :category, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
