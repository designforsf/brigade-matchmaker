require 'rails_helper'

describe Tag, type: :model do
  describe '.outside_project_taxonomy' do
    let(:project) { Project.create!(user: User.first, name: 'Test Project') }
    let(:taxonomy) { Taxonomy.find_by(name: 'Skills to Learn') }
    let(:tag) { Tag.find_by(name: 'CSS') }
    before { ProjectTag.create!(taxonomy: taxonomy, project: project, tag: tag) }
    it 'returns all tags outside the project taxonomy' do
      expect(
        described_class.outside_project_taxonomy(project, taxonomy)
      ).to match_array(Tag.where.not(id: tag.id))
    end
  end
end
