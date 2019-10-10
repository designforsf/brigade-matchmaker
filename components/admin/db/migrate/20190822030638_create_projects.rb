class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :slack_channel
      t.text :description
      t.text :website_url
      t.text :additional_info

      t.timestamps
    end
  end
end
