require "spec_helper"

describe HomeXisController do
  describe "routing" do

    it "routes to #index" do
      get("/home_xis").should route_to("home_xis#index")
    end

    it "routes to #new" do
      get("/home_xis/new").should route_to("home_xis#new")
    end

    it "routes to #show" do
      get("/home_xis/1").should route_to("home_xis#show", :id => "1")
    end

    it "routes to #edit" do
      get("/home_xis/1/edit").should route_to("home_xis#edit", :id => "1")
    end

    it "routes to #create" do
      post("/home_xis").should route_to("home_xis#create")
    end

    it "routes to #update" do
      put("/home_xis/1").should route_to("home_xis#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/home_xis/1").should route_to("home_xis#destroy", :id => "1")
    end

  end
end
