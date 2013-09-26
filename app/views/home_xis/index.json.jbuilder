json.array!(@home_xis) do |home_xi|
  json.extract! home_xi, :name, :number, :subbed
  json.url home_xi_url(home_xi, format: :json)
end
