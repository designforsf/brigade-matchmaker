require 'rails_helper'

RSpec.describe "category_tags/edit", type: :view do
  before(:each) do
    @category_tag = assign(:category_tag, CategoryTag.create!(
      :category => nil,
      :tag => nil
    ))
  end

  it "renders the edit category_tag form" do
    render

    assert_select "form[action=?][method=?]", category_tag_path(@category_tag), "post" do

      assert_select "input[name=?]", "category_tag[category_id]"

      assert_select "input[name=?]", "category_tag[tag_id]"
    end
  end
end
