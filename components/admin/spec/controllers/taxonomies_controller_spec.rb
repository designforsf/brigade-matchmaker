require 'rails_helper'

describe TaxonomiesController, type: :controller do
  login_user
  let(:valid_attributes) { { name: 'A fine taxonomy' } }
  let(:invalid_attributes) { { name: nil } }
  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      Taxonomy.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      taxonomy = Taxonomy.create! valid_attributes
      get :show, params: { id: taxonomy.to_param }, session: valid_session
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
      taxonomy = Taxonomy.create! valid_attributes
      get :edit, params: { id: taxonomy.to_param }, session: valid_session
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Taxonomy' do
        expect {
          post :create, params: { taxonomy: valid_attributes }, session: valid_session
        }.to change(Taxonomy, :count).by(1)
      end

      it 'redirects to the created taxonomy' do
        post :create, params: { taxonomy: valid_attributes }, session: valid_session
        expect(response).to redirect_to(Taxonomy.last)
      end
    end

    context 'with invalid params' do
      it 'returns a success response' do
        post :create, params: { taxonomy: invalid_attributes }, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { name: 'A new name!' } }

      it 'updates the requested taxonomy' do
        taxonomy = Taxonomy.create! valid_attributes
        put :update, params: { id: taxonomy.to_param, taxonomy: new_attributes }, session: valid_session
        taxonomy.reload
        expect(taxonomy.name).to eq('A new name!')
      end

      it 'redirects to the taxonomy' do
        taxonomy = Taxonomy.create! valid_attributes
        put :update, params: { id: taxonomy.to_param, taxonomy: valid_attributes }, session: valid_session
        expect(response).to redirect_to(taxonomy)
      end
    end

    context 'with invalid params' do
      it 'returns a success response' do
        taxonomy = Taxonomy.create! valid_attributes
        put :update, params: { id: taxonomy.to_param, taxonomy: invalid_attributes }, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested taxonomy' do
      taxonomy = Taxonomy.create! valid_attributes
      expect {
        delete :destroy, params: { id: taxonomy.to_param }, session: valid_session
      }.to change(Taxonomy, :count).by(-1)
    end

    it 'redirects to the taxonomies list' do
      taxonomy = Taxonomy.create! valid_attributes
      delete :destroy, params: { id: taxonomy.to_param }, session: valid_session
      expect(response).to redirect_to(taxonomies_url)
    end
  end
end
