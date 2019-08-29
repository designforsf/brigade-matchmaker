require "rails_helper"

RSpec.describe CategoryTaxonomiesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/category_taxonomies").to route_to("category_taxonomies#index")
    end

    it "routes to #new" do
      expect(:get => "/category_taxonomies/new").to route_to("category_taxonomies#new")
    end

    it "routes to #show" do
      expect(:get => "/category_taxonomies/1").to route_to("category_taxonomies#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/category_taxonomies/1/edit").to route_to("category_taxonomies#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/category_taxonomies").to route_to("category_taxonomies#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/category_taxonomies/1").to route_to("category_taxonomies#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/category_taxonomies/1").to route_to("category_taxonomies#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/category_taxonomies/1").to route_to("category_taxonomies#destroy", :id => "1")
    end
  end
end
