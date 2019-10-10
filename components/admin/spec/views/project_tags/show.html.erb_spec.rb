require 'rails_helper'

RSpec.describe "project_tags/show", type: :view do
  before(:each) do
    @project_tag = assign(:project_tag, ProjectTag.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
