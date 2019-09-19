class CreateCategoryTags < ActiveRecord::Migration[6.0]
  def change
    create_table :category_tags do |t|
      t.references :category, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
