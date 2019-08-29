require 'rails_helper'

RSpec.describe "category_taxonomies/show", type: :view do
  before(:each) do
    @category_taxonomy = assign(:category_taxonomy, CategoryTaxonomy.create!(
      :category => nil,
      :taxonomy => nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(//)
  end
end
