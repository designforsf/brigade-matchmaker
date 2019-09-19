require 'rails_helper'

RSpec.describe "taxonomies/new", type: :view do
  before(:each) do
    assign(:taxonomy, Taxonomy.new(
      :name => "MyString"
    ))
  end

  it "renders new taxonomy form" do
    render

    assert_select "form[action=?][method=?]", taxonomies_path, "post" do

      assert_select "input[name=?]", "taxonomy[name]"
    end
  end
end
