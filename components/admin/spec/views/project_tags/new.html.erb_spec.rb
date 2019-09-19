require 'rails_helper'

RSpec.describe "project_tags/new", type: :view do
  before(:each) do
    assign(:project_tag, ProjectTag.new())
  end

  it "renders new project_tag form" do
    render

    assert_select "form[action=?][method=?]", project_tags_path, "post" do
    end
  end
end
