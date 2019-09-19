require 'rails_helper'

RSpec.describe "taxonomies/edit", type: :view do
  before(:each) do
    @taxonomy = assign(:taxonomy, Taxonomy.create!(
      :name => "MyString"
    ))
  end

  it "renders the edit taxonomy form" do
    render

    assert_select "form[action=?][method=?]", taxonomy_path(@taxonomy), "post" do

      assert_select "input[name=?]", "taxonomy[name]"
    end
  end
end
