require 'rails_helper'

RSpec.describe "categories/edit", type: :view do
  before(:each) do
    @category = assign(:category, Category.create!(
      :taxonomy => nil,
      :project => nil,
      :name => "MyString"
    ))
  end

  it "renders the edit category form" do
    render

    assert_select "form[action=?][method=?]", category_path(@category), "post" do

      assert_select "input[name=?]", "category[taxonomy_id]"

      assert_select "input[name=?]", "category[project_id]"

      assert_select "input[name=?]", "category[name]"
    end
  end
end
