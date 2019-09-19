require 'rails_helper'

RSpec.describe "category_tags/index", type: :view do
  before(:each) do
    assign(:category_tags, [
      CategoryTag.create!(
        :category => nil,
        :tag => nil
      ),
      CategoryTag.create!(
        :category => nil,
        :tag => nil
      )
    ])
  end

  it "renders a list of category_tags" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
