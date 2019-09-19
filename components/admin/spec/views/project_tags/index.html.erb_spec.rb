require 'rails_helper'

RSpec.describe "project_tags/index", type: :view do
  before(:each) do
    assign(:project_tags, [
      ProjectTag.create!(),
      ProjectTag.create!()
    ])
  end

  it "renders a list of project_tags" do
    render
  end
end
