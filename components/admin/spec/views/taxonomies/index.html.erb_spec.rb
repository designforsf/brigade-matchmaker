require 'rails_helper'

RSpec.describe "taxonomies/index", type: :view do
  before(:each) do
    assign(:taxonomies, [
      Taxonomy.create!(
        :name => "Name"
      ),
      Taxonomy.create!(
        :name => "Name"
      )
    ])
  end

  it "renders a list of taxonomies" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
