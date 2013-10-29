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
    json_get(teamform)
  end

  def self.form_get
    form = Form.single_form
    form.each do |d|
      form = d["form"].join(' ')
      team = Form.where(:team => d["team"]).first_or_create
      team.form = form
      team.save
    end
  end

	
end
