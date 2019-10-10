require 'rails_helper'

RSpec.describe "projects/new", type: :view do
  before(:each) do
    assign(:project, Project.new(
      :user => nil,
      :name => "MyString",
      :slack_channel => "MyString",
      :description => "MyText",
      :website_url => "MyText",
      :additional_info => "MyText"
    ))
  end

  it "renders new project form" do
    render

    assert_select "form[action=?][method=?]", projects_path, "post" do

      assert_select "input[name=?]", "project[user_id]"

      assert_select "input[name=?]", "project[name]"

      assert_select "input[name=?]", "project[slack_channel]"

      assert_select "textarea[name=?]", "project[description]"

      assert_select "textarea[name=?]", "project[website_url]"

      assert_select "textarea[name=?]", "project[additional_info]"
    end
  end
end
