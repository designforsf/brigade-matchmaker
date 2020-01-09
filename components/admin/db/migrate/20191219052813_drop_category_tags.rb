class DropCategoryTags < ActiveRecord::Migration[6.0]
  def change
    drop_table :category_tags
  end
end
