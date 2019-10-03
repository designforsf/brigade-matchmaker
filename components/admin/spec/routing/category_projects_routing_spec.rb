require "rails_helper"

RSpec.describe CategoryProjectsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/category_projects").to route_to("category_projects#index")
    end

    it "routes to #new" do
      expect(:get => "/category_projects/new").to route_to("category_projects#new")
    end

    it "routes to #show" do
      expect(:get => "/category_projects/1").to route_to("category_projects#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/category_projects/1/edit").to route_to("category_projects#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/category_projects").to route_to("category_projects#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/category_projects/1").to route_to("category_projects#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/category_projects/1").to route_to("category_projects#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/category_projects/1").to route_to("category_projects#destroy", :id => "1")
    end
  end
end
