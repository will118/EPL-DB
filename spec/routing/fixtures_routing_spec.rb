require "spec_helper"

describe FixturesController do
  describe "routing" do

    it "routes to #index" do
      get("/fixtures").should route_to("fixtures#index")
    end

    it "routes to #new" do
      get("/fixtures/new").should route_to("fixtures#new")
    end

    it "routes to #show" do
      get("/fixtures/1").should route_to("fixtures#show", :id => "1")
    end

    it "routes to #edit" do
      get("/fixtures/1/edit").should route_to("fixtures#edit", :id => "1")
    end

    it "routes to #create" do
      post("/fixtures").should route_to("fixtures#create")
    end

    it "routes to #update" do
      put("/fixtures/1").should route_to("fixtures#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/fixtures/1").should route_to("fixtures#destroy", :id => "1")
    end

  end
end
