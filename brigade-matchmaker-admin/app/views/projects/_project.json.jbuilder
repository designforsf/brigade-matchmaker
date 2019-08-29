json.extract! project, :id, :user_id, :name, :slack_channel, :description, :website_url, :additional_info, :created_at, :updated_at
json.url project_url(project, format: :json)
