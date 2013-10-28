class Form < ActiveRecord::Base

	def self.of(team)
		where(:team => team.titleize)
	end

	def self.of_other(team)
    next_fix = Fixture.next_1_involving(team)
    if next_fix.hometeam == team.titleize
      where(:team => (next_fix.awayteam))
    else next_fix.awayteam == team.titleize
      where(:team => (next_fix.hometeam))
    end
	end
  
  def self.single_form
    teamform = "http://api.statsfc.com/premier-league/form.json?key=#{ENV["STATS_KEY"]}"
    JSON.parse HTTParty.get(teamform).response.body
  end

	
end
