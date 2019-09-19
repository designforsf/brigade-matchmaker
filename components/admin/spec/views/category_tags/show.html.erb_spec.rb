require 'rails_helper'

RSpec.describe "category_tags/show", type: :view do
  before(:each) do
    @category_tag = assign(:category_tag, CategoryTag.create!(
      :category => nil,
      :tag => nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(//)
  end
end
