# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

class Seeder
  attr_accessor :projects, :root_user, :taxonomy_names

  def initialize
    self.projects = JSON.parse(
      File.read(Rails.root.join('db', 'projects.json')),
    ).map(&:deep_symbolize_keys)
  end

  def run!
    create_root_user!
    initialize_taxonomies!
    create_and_link_projects!
  end

  private

  def create_root_user!
    self.root_user = User.first || User.create!(
      email: 'admin@codeforsanfrancisco.org',
      password: '9th&Minna',
    )
  end

  def initialize_taxonomies!
    self.taxonomy_names = [
      'Civic Interests',
      'Skills to Learn',
      'Skills Needed',
    ].map(&:to_sym)
    taxonomy_weights = [1, 2, 2]
    taxonomy_names.zip(taxonomy_weights).each do |taxonomy_name, weight|
      Taxonomy.find_or_create_by!(name: taxonomy_name, weight: weight)
    end
  end

  def create_and_link_projects!
    projects.each do |project_attributes|
      project = find_or_create_project!(project_attributes)
      create_tasks_for_project!(project, project_attributes)
      project_attributes.slice(*taxonomy_names).each do |taxonomy_name, categories|
        taxonomy = Taxonomy.find_by!(name: taxonomy_name)
        categories.each do |category_name, tag_names|
          category = create_and_link_category!(category_name, taxonomy, project)
          tag_names&.each do |tag_name|
            create_and_link_tag!(tag_name, category, project, taxonomy)
          end
        end
      end
    end
  end

  def required_project_attributes
    @required_project_attributes ||= Project.new.attributes.keys.map(&:to_sym)
  end

  def find_or_create_project!(project_attributes)
    Project.find_or_create_by!(
      user: root_user, **project_attributes.slice(*required_project_attributes),
    )
  end

  def create_tasks_for_project!(project, project_attributes)
    project_attributes[:todo_items]&.each do |description|
      Task.create!(project: project, description: description, completed: false)
    end
    project_attributes[:progress_items]&.each do |description|
      Task.create!(project: project, description: description, completed: true)
    end
  end

  def create_and_link_category!(category_name, taxonomy, project)
    category = Category.find_or_create_by!(name: category_name)
    CategoryProject.find_or_create_by!(category: category, project: project, taxonomy: taxonomy)
    category
  end

  def create_and_link_tag!(tag_name, category, project, taxonomy)
    tag = Tag.find_or_create_by!(name: tag_name, category: category)
    ProjectTag.find_or_create_by!(project: project, tag: tag, taxonomy: taxonomy)
  end
end

ApplicationRecord.transaction { Seeder.new.run! } if Taxonomy.none?
