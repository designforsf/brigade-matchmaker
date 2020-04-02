require 'rails_helper'

describe 'category_projects/edit', type: :view do
  before(:each) do
    @category_project = assign(:category_project, CategoryProject.first)
    render
  end

  it 'renders the edit category_project form' do
    assert_select 'form[action=?][method=?]', project_category_project_path(@project, @category_project), 'post' do
    end
  end
end
