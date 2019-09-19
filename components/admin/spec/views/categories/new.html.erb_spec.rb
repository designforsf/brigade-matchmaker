require 'rails_helper'

RSpec.describe "categories/new", type: :view do
  before(:each) do
    assign(:category, Category.new(
      :taxonomy => nil,
      :project => nil,
      :name => "MyString"
    ))
  end

  it "renders new category form" do
    render

    assert_select "form[action=?][method=?]", categories_path, "post" do

      assert_select "input[name=?]", "category[taxonomy_id]"

      assert_select "input[name=?]", "category[project_id]"

      assert_select "input[name=?]", "category[name]"
    end
  end
end
