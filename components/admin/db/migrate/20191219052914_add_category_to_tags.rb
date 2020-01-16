class AddCategoryToTags < ActiveRecord::Migration[6.0]
  def change
    add_reference :tags, :category, foreign_key: true
    change_column :tags, :category_id, :integer, null: false
  end
end
