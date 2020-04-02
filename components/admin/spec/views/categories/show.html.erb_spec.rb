require 'rails_helper'

describe 'categories/show', type: :view do
  before(:each) do
    @category = assign(:category, Category.create!(name: 'Category 1'))
    @category.tags.create!(name: 'Tag 1')
    render
  end

  it 'renders an Add button to create a new tag' do
    assert_select '.card-header>button', text: 'Add'
  end

  it 'renders a badge for each tag' do
    assert_select '.badge-danger', text: /Tag 1/, count: 1
  end

  it 'renders a link to delete the tags' do
    assert_select '.badge-danger>a', text: '×', count: 1
  end
end
