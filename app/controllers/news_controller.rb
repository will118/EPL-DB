class NewsController < ApplicationController
  def index
  	@articles = Article.first(16)
  end
end
