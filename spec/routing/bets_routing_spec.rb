require "spec_helper"

describe BetsController do
  describe "routing" do

    it "routes to #index" do
      get("/bets").should route_to("bets#index")
    end

    it "routes to #new" do
      get("/bets/new").should route_to("bets#new")
    end

    it "routes to #show" do
      get("/bets/1").should route_to("bets#show", :id => "1")
    end

    it "routes to #edit" do
      get("/bets/1/edit").should route_to("bets#edit", :id => "1")
    end

    it "routes to #create" do
      post("/bets").should route_to("bets#create")
    end

    it "routes to #update" do
      put("/bets/1").should route_to("bets#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/bets/1").should route_to("bets#destroy", :id => "1")
    end

  end
end
