require "rails_helper"

RSpec.describe TaxonomiesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/taxonomies").to route_to("taxonomies#index")
    end

    it "routes to #new" do
      expect(:get => "/taxonomies/new").to route_to("taxonomies#new")
    end

    it "routes to #show" do
      expect(:get => "/taxonomies/1").to route_to("taxonomies#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/taxonomies/1/edit").to route_to("taxonomies#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/taxonomies").to route_to("taxonomies#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/taxonomies/1").to route_to("taxonomies#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/taxonomies/1").to route_to("taxonomies#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/taxonomies/1").to route_to("taxonomies#destroy", :id => "1")
    end
  end
end
