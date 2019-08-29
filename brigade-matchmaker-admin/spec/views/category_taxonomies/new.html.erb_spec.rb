require 'rails_helper'

RSpec.describe "category_taxonomies/new", type: :view do
  before(:each) do
    assign(:category_taxonomy, CategoryTaxonomy.new(
      :category => nil,
      :taxonomy => nil
    ))
  end

  it "renders new category_taxonomy form" do
    render

    assert_select "form[action=?][method=?]", category_taxonomies_path, "post" do

      assert_select "input[name=?]", "category_taxonomy[category_id]"

      assert_select "input[name=?]", "category_taxonomy[taxonomy_id]"
    end
  end
end
