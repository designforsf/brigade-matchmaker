require 'rails_helper'

describe "categories/edit", type: :view do
  before(:each) do
    @category = assign(:category, Category.create!(name: 'Category 1'))
  end

  it 'renders the edit category form' do
    render
    assert_select 'form[action=?][method=?]', category_path(@category), 'post' do
      assert_select 'input[name=?]', 'category[name]'
    end
  end
end
