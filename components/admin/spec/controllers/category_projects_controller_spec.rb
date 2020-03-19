require 'rails_helper'

describe CategoryProjectsController, type: :controller do
  login_user

  let(:valid_attributes) { {} }

  let(:invalid_attributes) { {} }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # CategoryProjectsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      CategoryProject.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      category_project = CategoryProject.create! valid_attributes
      get :show, params: {id: category_project.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #new' do
    it 'returns a success response' do
      get :new, params: { project_id: 1 }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #edit' do
    it 'returns a success response' do
      category_project = CategoryProject.create! valid_attributes
      get :edit, params: {id: category_project.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new CategoryProject' do
        expect {
          post :create, params: {category_project: valid_attributes}, session: valid_session
        }.to change(CategoryProject, :count).by(1)
      end

      it 'redirects to the created category_project' do
        post :create, params: {category_project: valid_attributes}, session: valid_session
        expect(response).to redirect_to(CategoryProject.last)
      end
    end

    context 'with invalid params' do
      it 'returns a success response' do
        post :create, params: {category_project: invalid_attributes}, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { {} }

      it 'updates the requested category_project' do
        category_project = CategoryProject.create! valid_attributes
        put :update, params: {id: category_project.to_param, category_project: new_attributes}, session: valid_session
        category_project.reload
        expect(response).to eq({})
      end

      it 'redirects to the category_project' do
        category_project = CategoryProject.create! valid_attributes
        put :update, params: {id: category_project.to_param, category_project: valid_attributes}, session: valid_session
        expect(response).to redirect_to(category_project)
      end
    end

    context 'with invalid params' do
      it 'returns a success response' do
        category_project = CategoryProject.create! valid_attributes
        put :update, params: {id: category_project.to_param, category_project: invalid_attributes}, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested category_project' do
      category_project = CategoryProject.create! valid_attributes
      expect {
        delete :destroy, params: {id: category_project.to_param}, session: valid_session
      }.to change(CategoryProject, :count).by(-1)
    end

    it 'redirects to the category_projects list' do
      category_project = CategoryProject.create! valid_attributes
      delete :destroy, params: {id: category_project.to_param}, session: valid_session
      expect(response).to redirect_to(category_projects_url)
    end
  end

end
