require 'rails_helper'

RSpec.describe "category_tags/new", type: :view do
  before(:each) do
    assign(:category_tag, CategoryTag.new(
      :category => nil,
      :tag => nil
    ))
  end

  it "renders new category_tag form" do
    render

    assert_select "form[action=?][method=?]", category_tags_path, "post" do

      assert_select "input[name=?]", "category_tag[category_id]"

      assert_select "input[name=?]", "category_tag[tag_id]"
    end
  end
end
