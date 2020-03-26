require 'rails_helper'

describe 'categories/new', type: :view do
  before(:each) do
    assign(:category, Category.new(name: 'Category 1'))
  end

  it 'renders new category form' do
    render

    assert_select 'form[action=?][method=?]', categories_path, 'post' do
      assert_select 'input[name=?]', 'category[name]'
    end
  end
end
