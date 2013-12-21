class Poss < ActiveRecord::Base
    validates :awayposs, presence: true
    validates :homeposs, presence: true

    def self.last_where(team)
        where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).last
    end

    def self.involving(team)
        where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize])
    end

    def self.last_data_involving(team)
        team = team.titleize
        last_match = where(["awayteam = ? or hometeam = ?", team, team]).last
        if last_match.hometeam == team
          where(:matchdate => last_match.matchdate, :hometeam => team)
        else
          where(:matchdate => last_match.matchdate, :awayteam => team)
        end
    end

    def hometeam_hyphenated
       downcase_hyphenate("home")[hometeam]
    end

    def awayteam_hyphenated
       downcase_hyphenate("away")[awayteam]
    end

    def over_100?
      if homeposs + awayposs >= 101
          return true
      else
          return false
      end
    end

    def homeposs_percent
      percentage_calc(homeposs, awayposs)[homeposs]
    end

    def awayposs_percent
      percentage_calc(homeposs, awayposs)[awayposs]
    end

end
