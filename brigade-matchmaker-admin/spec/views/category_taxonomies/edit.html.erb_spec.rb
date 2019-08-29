require 'rails_helper'

RSpec.describe "category_taxonomies/edit", type: :view do
  before(:each) do
    @category_taxonomy = assign(:category_taxonomy, CategoryTaxonomy.create!(
      :category => nil,
      :taxonomy => nil
    ))
  end

  it "renders the edit category_taxonomy form" do
    render

    assert_select "form[action=?][method=?]", category_taxonomy_path(@category_taxonomy), "post" do

      assert_select "input[name=?]", "category_taxonomy[category_id]"

      assert_select "input[name=?]", "category_taxonomy[taxonomy_id]"
    end
  end
end
