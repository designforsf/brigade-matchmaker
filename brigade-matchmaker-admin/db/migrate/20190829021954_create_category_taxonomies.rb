class CreateCategoryTaxonomies < ActiveRecord::Migration[6.0]
  def change
    create_table :category_taxonomies do |t|
      t.references :category, null: false, foreign_key: true
      t.references :taxonomy, null: false, foreign_key: true

      t.timestamps
    end
  end
end
