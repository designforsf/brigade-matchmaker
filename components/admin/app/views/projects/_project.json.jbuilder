json.extract! project, :id, :user_id, :name, :slack_channel, :description, :website_url, :additional_info, :created_at, :updated_at
json.url project_url(project, format: :json)
json.categories project.categories, partial: 'categories/category', as: :category
json.tags project.tags, partial: 'tags/tag', as: :tag
json.tasks project.tasks, partial: 'tasks/task', as: :task
json.taxonomies project.taxonomies do |taxonomy, tags|
  json.name taxonomy
  json.tags tags, partial: 'tags/tag', as: :tag
end
