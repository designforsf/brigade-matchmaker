require 'rails_helper'

RSpec.describe "category_projects/show", type: :view do
  before(:each) do
    @category_project = assign(:category_project, CategoryProject.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
