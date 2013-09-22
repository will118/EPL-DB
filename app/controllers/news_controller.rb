class NewsController < ApplicationController
  def index
  	@articles = Article.first(10)
  end
end
