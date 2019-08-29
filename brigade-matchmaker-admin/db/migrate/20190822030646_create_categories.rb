class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.references :taxonomy, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
