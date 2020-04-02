require 'rails_helper'

describe TasksController, type: :controller do
  login_user
  let(:valid_attributes) { { project_id: 1 } }
  let(:invalid_attributes) { { project_id: 0 } }
  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      Task.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      task = Task.create! valid_attributes
      get :show, params: {id: task.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #new' do
    it 'returns a success response' do
      get :new, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #edit' do
    it 'returns a success response' do
      task = Task.create! valid_attributes
      get :edit, params: {id: task.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Task' do
        expect {
          post :create, params: {task: valid_attributes}, session: valid_session
        }.to change(Task, :count).by(1)
      end

      it 'redirects to the created task' do
        post :create, params: {task: valid_attributes}, session: valid_session
        expect(response).to redirect_to(Task.last)
      end
    end

    context 'with invalid params' do
      it 'returns a success response' do
        post :create, params: {task: invalid_attributes}, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { description: 'A new description.' } }

      it 'updates the requested task' do
        task = Task.create! valid_attributes
        put :update, params: {id: task.to_param, task: new_attributes}, session: valid_session
        task.reload
        expect(task.description).to eq('A new description.')
      end

      it 'redirects to the task' do
        task = Task.create! valid_attributes
        put :update, params: {id: task.to_param, task: valid_attributes}, session: valid_session
        expect(response).to redirect_to(task)
      end
    end

    context 'with invalid params' do
      it 'returns a success response' do
        task = Task.create! valid_attributes
        put :update, params: {id: task.to_param, task: invalid_attributes}, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested task' do
      task = Task.create! valid_attributes
      expect {
        delete :destroy, params: {id: task.to_param}, session: valid_session
      }.to change(Task, :count).by(-1)
    end

    it 'redirects to the tasks list' do
      task = Task.create! valid_attributes
      delete :destroy, params: {id: task.to_param}, session: valid_session
      expect(response).to redirect_to(tasks_url)
    end
  end

end
