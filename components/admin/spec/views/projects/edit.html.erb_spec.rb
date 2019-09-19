require 'rails_helper'

RSpec.describe "projects/edit", type: :view do
  before(:each) do
    @project = assign(:project, Project.create!(
      :user => nil,
      :name => "MyString",
      :slack_channel => "MyString",
      :description => "MyText",
      :website_url => "MyText",
      :additional_info => "MyText"
    ))
  end

  it "renders the edit project form" do
    render

    assert_select "form[action=?][method=?]", project_path(@project), "post" do

      assert_select "input[name=?]", "project[user_id]"

      assert_select "input[name=?]", "project[name]"

      assert_select "input[name=?]", "project[slack_channel]"

      assert_select "textarea[name=?]", "project[description]"

      assert_select "textarea[name=?]", "project[website_url]"

      assert_select "textarea[name=?]", "project[additional_info]"
    end
  end
end
