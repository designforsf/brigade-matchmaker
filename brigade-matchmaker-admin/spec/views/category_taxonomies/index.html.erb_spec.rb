require 'rails_helper'

RSpec.describe "category_taxonomies/index", type: :view do
  before(:each) do
    assign(:category_taxonomies, [
      CategoryTaxonomy.create!(
        :category => nil,
        :taxonomy => nil
      ),
      CategoryTaxonomy.create!(
        :category => nil,
        :taxonomy => nil
      )
    ])
  end

  it "renders a list of category_taxonomies" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
