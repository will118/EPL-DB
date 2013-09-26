json.array!(@fixtures) do |fixture|
  json.extract! fixture, :hometeam, :awayteam, :kickoff, :competition
  json.url fixture_url(fixture, format: :json)
end
