require 'rails_helper'

RSpec.describe "project_tags/edit", type: :view do
  before(:each) do
    @project_tag = assign(:project_tag, ProjectTag.create!())
  end

  it "renders the edit project_tag form" do
    render

    assert_select "form[action=?][method=?]", project_tag_path(@project_tag), "post" do
    end
  end
end
