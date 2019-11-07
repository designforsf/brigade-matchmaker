require 'rails_helper'

RSpec.describe "category_projects/new", type: :view do
  before(:each) do
    assign(:category_project, CategoryProject.new())
  end

  it "renders new category_project form" do
    render

    assert_select "form[action=?][method=?]", category_projects_path, "post" do
    end
  end
end
