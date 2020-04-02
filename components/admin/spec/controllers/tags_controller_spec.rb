require 'rails_helper'

describe TagsController, type: :controller do
  login_user
  let(:category) { Category.first }
  let(:valid_attributes) { { category_id: category.id, name: 'A tag!' } }
  let(:invalid_attributes) { { category_id: 0, name: nil } }
  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      Tag.create! valid_attributes
      get :index, params: { category_id: category.id }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      tag = Tag.create! valid_attributes
      get :show, params: { category_id: category.id, id: tag.to_param }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #new' do
    it 'returns a success response' do
      get :new, params: { category_id: category.id }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #edit' do
    it 'returns a success response' do
      tag = Tag.create! valid_attributes
      get :edit, params: { category_id: category.id, id: tag.to_param }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Tag' do
        expect {
          post :create, params: { category_id: category.id, tag: valid_attributes }, session: valid_session
        }.to change(Tag, :count).by(1)
      end

      it 'redirects back to the category' do
        post :create, params: { category_id: category.id, tag: valid_attributes }, session: valid_session
        expect(response).to redirect_to(category)
      end
    end

    context 'with invalid params' do
      it 'returns unprocessable entity' do
        post(
          :create, 
          format: :json, 
          params: { category_id: category.id, tag: invalid_attributes }, 
          session: valid_session,
        )
        expect(response).to be_unprocessable
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { name: 'A new name!' } }

      it 'updates the requested tag' do
        tag = Tag.create! valid_attributes
        put :update, params: { category_id: category.id, id: tag.to_param, tag: new_attributes }, session: valid_session
        tag.reload
        expect(tag.name).to eq('A new name!')
      end

      it 'redirects to the tag' do
        tag = Tag.create! valid_attributes
        put :update, params: { category_id: category.id, id: tag.to_param, tag: valid_attributes }, session: valid_session
        expect(response).to redirect_to([category, tag])
      end
    end

    context 'with invalid params' do
      it 'returns unprocessable entity' do
        tag = Tag.create! valid_attributes
        put(
          :update,
          format: :json,
          params: { category_id: category.id, id: tag.to_param, tag: invalid_attributes },
          session: valid_session,
        )
        expect(response).to be_unprocessable
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested tag' do
      tag = Tag.create! valid_attributes
      expect {
        delete :destroy, params: { category_id: category.id, id: tag.to_param }, session: valid_session
      }.to change(Tag, :count).by(-1)
    end

    it 'redirects back to the category' do
      tag = Tag.create! valid_attributes
      delete :destroy, params: { category_id: category.id, id: tag.to_param }, session: valid_session
      expect(response).to redirect_to(category)
    end
  end
end
