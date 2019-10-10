require 'rails_helper'

RSpec.describe "taxonomies/show", type: :view do
  before(:each) do
    @taxonomy = assign(:taxonomy, Taxonomy.create!(
      :name => "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
  end
end
