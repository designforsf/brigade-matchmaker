require 'rails_helper'

describe CategoryProjectsController, type: :controller do
  login_user

  let(:project) { Project.first }
  let(:valid_attributes) { { project_id: project.id, category_id: 1, taxonomy_id: 1 } }
  let(:invalid_attributes) { { project_id: 0, category_id: 0, taxonomy_id: 0 } }
  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      CategoryProject.create! valid_attributes
      get :index, params: { project_id: project.id }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      category_project = CategoryProject.create! valid_attributes
      get :show, params: { project_id: project.id, id: category_project.to_param }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #new' do
    it 'returns a success response' do
      get :new, params: { project_id: project.id }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #edit' do
    it 'returns a success response' do
      category_project = CategoryProject.create! valid_attributes
      get :edit, params: { project_id: project.id, id: category_project.to_param }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new CategoryProject' do
        expect {
          post :create, params: { project_id: project.id, category_project: valid_attributes }, session: valid_session
        }.to change(CategoryProject, :count).by(1)
      end

      it 'redirects to the created category_project' do
        post :create, params: { project_id: project.id, category_project: valid_attributes }, session: valid_session
        expect(response).to redirect_to([project, CategoryProject.last])
      end
    end

    context 'with invalid params' do
      it 'returns a success response' do
        post(
          :create,
          format: :json,
          params: { project_id: project.id, category_project: invalid_attributes },
          session: valid_session,
        )
        expect(response).to be_unprocessable
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { valid_attributes }

      it 'updates the requested category_project' do
        category_project = CategoryProject.create! valid_attributes
        put :update, params: { project_id: project.id, id: category_project.to_param, category_project: new_attributes }, session: valid_session
        category_project.reload
        expect(category_project.project).to eq(project)
      end

      it 'redirects to the category_project' do
        category_project = CategoryProject.create! valid_attributes
        put :update, params: { project_id: project.id, id: category_project.to_param, category_project: valid_attributes }, session: valid_session
        expect(response).to redirect_to([project, category_project])
      end
    end

    context 'with invalid params' do
      it 'returns a success response' do
        category_project = CategoryProject.create! valid_attributes
        put :update, params: { project_id: project.id, id: category_project.to_param, category_project: invalid_attributes }, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested category_project' do
      category_project = CategoryProject.create! valid_attributes
      expect {
        delete :destroy, params: { project_id: project.id, id: category_project.to_param }, session: valid_session
      }.to change(CategoryProject, :count).by(-1)
    end

    it 'redirects to the category_projects list' do
      category_project = CategoryProject.create! valid_attributes
      delete :destroy, params: { project_id: project.id, id: category_project.to_param }, session: valid_session
      expect(response).to redirect_to(project_category_projects_url(project))
    end
  end
end
