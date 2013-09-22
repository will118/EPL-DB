json.array!(@articles) do |article|
  json.extract! article, :title, :body
  json.url article_url(article, format: :json)
end
