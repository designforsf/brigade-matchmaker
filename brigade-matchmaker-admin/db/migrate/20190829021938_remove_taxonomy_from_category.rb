class RemoveTaxonomyFromCategory < ActiveRecord::Migration[6.0]
  def change
    remove_reference :categories, :taxonomy, null: false, foreign_key: true
  end
end
