json.extract! taxonomy, :id, :name, :created_at, :updated_at
json.categories taxonomy.categories, partial: 'categories/category', as: :category
json.url taxonomy_url(taxonomy, format: :json)
