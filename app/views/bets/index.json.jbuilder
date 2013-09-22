json.array!(@bets) do |bet|
  json.extract! bet, :homescore, :awayscore, :homeodds, :awayodds
  json.url bet_url(bet, format: :json)
end
