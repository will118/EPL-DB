class Teams

  class << self
    def home_team(team)
      hometeam = Fixture.next_1_involving(team).hometeam
      Team.starting_11_of(hometeam)
    end

    def away_team(team)
      awayteam = Fixture.next_1_involving(team).awayteam
      Team.starting_11_of(awayteam)
    end

    def home_subs(team)
      hometeam = Fixture.next_1_involving(team).hometeam
      Team.substitutes_of(hometeam)
    end

    def away_subs(team)
      awayteam = Fixture.next_1_involving(team).awayteam
      Team.substitutes_of(awayteam)
    end
  end

end