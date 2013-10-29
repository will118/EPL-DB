class Fixture < ActiveRecord::Base

	def self.next_8
		order(:kickoff).first(8)
	end

	def link_save(rawurl, jsonurl, lineupurl)
		self.rawlink = rawurl
		self.jsonurl = jsonurl
		self.lineup_url = lineupurl
		self.save
	end

	def got_json?
		jsonurl != nil
	end

	def got_team!
		self.gotteam = true
		self.save
	end

	def missing_link?
		rawlink == nil
	end

	def missing_team?
		gotteam != nil
	end

	def missing_team_source?
		lineup_url != nil
	end

	def missing_json?
		jsonurl != nil 
	end

	def no_team?
		gotteam == nil
	end

	def out_of_date_teams?
		updated_at >= (Time.now.utc - 360)
	end

	def self.involving(team)
    where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize])
	end
	
	def self.next_1_involving(team)
    where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).order(:kickoff).first
	end

	def self.by_team(team)
      Fixture.involving(team).order(:kickoff).map do |x|
        { 
        	"home" => x.hometeam, 
        	"away" => x.awayteam, 
        	"date" => x.kickoff.to_formatted_s(:long_ordinal).gsub(/2013\s/, "") 
        }
      end
	end

end
