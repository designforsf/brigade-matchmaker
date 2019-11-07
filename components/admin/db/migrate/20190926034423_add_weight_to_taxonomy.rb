class AddWeightToTaxonomy < ActiveRecord::Migration[6.0]
  def change
    add_column :taxonomies, :weight, :integer
  end
end
