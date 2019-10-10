require 'rails_helper'

RSpec.describe "projects/index", type: :view do
  before(:each) do
    assign(:projects, [
      Project.create!(
        :user => nil,
        :name => "Name",
        :slack_channel => "Slack Channel",
        :description => "MyText",
        :website_url => "MyText",
        :additional_info => "MyText"
      ),
      Project.create!(
        :user => nil,
        :name => "Name",
        :slack_channel => "Slack Channel",
        :description => "MyText",
        :website_url => "MyText",
        :additional_info => "MyText"
      )
    ])
  end

  it "renders a list of projects" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Slack Channel".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
