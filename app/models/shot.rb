class Shot < ActiveRecord::Base
  validates :awayshots, presence: true
  validates :homeshots, presence: true

    def self.last_where(team)
        where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).last
    end

    def self.most_recent_1(team)
        where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).order('created_at DESC').first
    end

    def self.most_recent_data(last, team)
        where(["awayteam = ? and matchdate = ? or hometeam = ? and matchdate = ?", team.titleize, last, team.titleize, last])
    end

    def homeshots_percent
      percentage_calc(homeshots, awayshots)[homeshots]
    end

    def awayshots_percent
      percentage_calc(homeshots, awayshots)[awayshots]
    end

    def hometeam_hyphenated
       downcase_hyphenate("home")[hometeam]
    end

    def awayteam_hyphenated
       downcase_hyphenate("away")[awayteam]
    end

end
