require 'rails_helper'

describe ProjectTagsController, type: :controller do

  let(:valid_attributes) { { project_id: project.id, tag_id: 1, taxonomy_id: 1 } }
  let(:project) { Project.first }

  let(:invalid_attributes) { { project_id: 0, tag_id: 0, taxonomy_id: 0 } }

  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      ProjectTag.create! valid_attributes
      get :index, params: { project_id: project.id }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    login_user
    context 'with valid params' do
      it 'creates a new ProjectTag' do
        expect do
          post(
            :create,
            format: :json,
            params: { project_id: project.id, project_tag: valid_attributes },
            session: valid_session,
          )
        end.to change(ProjectTag, :count).by(1)
      end

      it 'returns a created response' do
        post(
          :create, 
          format: :json, 
          params: { project_id: project.id, project_tag: valid_attributes }, 
          session: valid_session,
        )
        expect(response).to be_created
      end
    end

    context 'with invalid params' do
      it 'returns unprocessable entity' do
        post(
          :create, 
          format: :json,
          params: { project_id: project.id, project_tag: invalid_attributes },
          session: valid_session,
        )
        expect(response).to be_unprocessable
      end
    end
  end

  describe 'DELETE #destroy' do
    login_user
    it 'destroys the requested project_tag' do
      project_tag = ProjectTag.create! valid_attributes
      expect do
        delete :destroy, params: { project_id: project.id, id: project_tag.to_param }, session: valid_session
      end.to change(ProjectTag, :count).by(-1)
    end

    it 'redirects to the project_tags list for the project' do
      project_tag = ProjectTag.create! valid_attributes
      delete :destroy, params: { project_id: project.id, id: project_tag.to_param }, session: valid_session
      expect(response).to redirect_to(project_project_tags_url)
    end
  end
end
