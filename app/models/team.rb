class Team < ActiveRecord::Base
	
  def self.wipe_data_of(team1, team2)
    where(:teamname => team1).delete_all
    where(:teamname => team2).delete_all
  end

  def self.today
    where("created_at >= ?", Time.zone.now.beginning_of_day)
  end

  def self.starting_11_of(team)
  	where(:teamname => team, :starting => true).last(11)
  end

  def self.substitutes_of(team)
  	where(:teamname => team, :starting => false).last(7)
  end

  def self.bbc_scraped_name(player, team, starting)
    name = player.inner_text.strip.gsub(/\s+/, ' ').gsub(/'\s{1}/, '')
    where(:player => name, :teamname => team, :starting => starting).first_or_create
  end

end
