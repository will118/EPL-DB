class Result < ActiveRecord::Base
  serialize :halftime, Array
  serialize :fulltime, Array
  serialize :incidents, JSON

  def self.past(team)
    where(:team => team).order('date DESC').each do |x|
      tooltip = []
      x['incidents'].each do |y|
        tooltip << [ y['minute'], y['playershort'], y['type'], y['team'] ]
      end
      x['incidents'] = tooltip
    end
  end

end
