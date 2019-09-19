require "rails_helper"

RSpec.describe CategoryTagsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/category_tags").to route_to("category_tags#index")
    end

    it "routes to #new" do
      expect(:get => "/category_tags/new").to route_to("category_tags#new")
    end

    it "routes to #show" do
      expect(:get => "/category_tags/1").to route_to("category_tags#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/category_tags/1/edit").to route_to("category_tags#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/category_tags").to route_to("category_tags#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/category_tags/1").to route_to("category_tags#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/category_tags/1").to route_to("category_tags#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/category_tags/1").to route_to("category_tags#destroy", :id => "1")
    end
  end
end
