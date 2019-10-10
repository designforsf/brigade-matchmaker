require "rails_helper"

RSpec.describe ProjectTagsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/project_tags").to route_to("project_tags#index")
    end

    it "routes to #new" do
      expect(:get => "/project_tags/new").to route_to("project_tags#new")
    end

    it "routes to #show" do
      expect(:get => "/project_tags/1").to route_to("project_tags#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/project_tags/1/edit").to route_to("project_tags#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/project_tags").to route_to("project_tags#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/project_tags/1").to route_to("project_tags#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/project_tags/1").to route_to("project_tags#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/project_tags/1").to route_to("project_tags#destroy", :id => "1")
    end
  end
end
