class Match
  attr_accessor :taxonomies

  def initialize(taxonomies)
    self.taxonomies = taxonomies.to_h
    group_categories_and_tags!
  end

  def generate_match
    Project.all.map { |project| { project.id => match_score(project) } }.reduce({}, :merge!)
  end

  private

  def group_categories_and_tags!
    taxonomies.transform_values! do |categories_and_tags|
      categories_and_tags.each_with_object({}) do |type_and_id, grouped_by_id|
        grouped_by_id.merge!(type_and_id) { |_, existing_ids, new_id| (Array(existing_ids) << new_id).uniq }
      end.transform_keys { |parameter_name| parameter_name.remove('Id').pluralize.to_sym }
    end
  end

  def match_score(project)
    taxonomies.sum do |key, tags_and_categories|
      category_ids = tags_and_categories[:categories]
      tag_ids = tags_and_categories[:tags]
      weight = Taxonomy.find(key).weight
      matched_categories = project.categories.where(id: category_ids)
      matched_tags = project.tags.where(id: tag_ids)
      (matched_categories.count + matched_tags.count) * weight
    end
  end
end
