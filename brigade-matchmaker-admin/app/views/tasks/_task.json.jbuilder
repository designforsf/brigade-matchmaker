json.extract! task, :id, :user_id, :project_id, :description, :completed, :created_at, :updated_at
json.url task_url(task, format: :json)
