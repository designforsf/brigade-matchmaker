require 'rails_helper'

RSpec.describe "tags/index", type: :view do
  before(:each) do
    assign(:tags, [
      Tag.create!(
        :category => nil,
        :name => "Name"
      ),
      Tag.create!(
        :category => nil,
        :name => "Name"
      )
    ])
  end

  it "renders a list of tags" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
