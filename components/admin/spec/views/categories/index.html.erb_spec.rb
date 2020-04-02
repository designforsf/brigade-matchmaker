require 'rails_helper'

describe 'categories/index', type: :view do
  before(:each) do
    assign(:categories, [
      Category.create!(name: 'Category 1'),
      Category.create!(name: 'Category 2'),
    ])
  end

  it 'renders a list of categories' do
    render
    assert_select 'tr>td', text: 'Category 1', count: 1
    assert_select 'tr>td', text: 'Category 2', count: 1
  end
end
