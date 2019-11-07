require 'rails_helper'

RSpec.describe "category_projects/index", type: :view do
  before(:each) do
    assign(:category_projects, [
      CategoryProject.create!(),
      CategoryProject.create!()
    ])
  end

  it "renders a list of category_projects" do
    render
  end
end
