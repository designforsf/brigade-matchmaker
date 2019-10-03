require 'rails_helper'

RSpec.describe "category_projects/edit", type: :view do
  before(:each) do
    @category_project = assign(:category_project, CategoryProject.create!())
  end

  it "renders the edit category_project form" do
    render

    assert_select "form[action=?][method=?]", category_project_path(@category_project), "post" do
    end
  end
end
