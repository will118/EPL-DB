class Team < ActiveRecord::Base
	
	def self.today
    where("created_at >= ?", Time.zone.now.beginning_of_day)
  end

  def self.starting_11_of(team)
  	where(:teamname => team, :starting => true).last(11)
  end

  def self.substitutes_of(team)
  	where(:teamname => team, :starting => false).last(7)
  end

end
