class ApiScore < ActiveRecord::Base
	serialize :halftime, Array
	serialize :fulltime, Array
	serialize :incidents, JSON

  def self.live(x)
		where(:live => true).order(:date).last(x).each do |x| 
			tooltip = []
			x['incidents'].each do |x| 
				tooltip << [ x['minute'], x['playershort'], x['type'], x['team'] ]
			end
			x['incidents'] = tooltip
		end
	end

  def self.results(x)
  	where(:live => false).order('date DESC').first(x).each do |x| 
			tooltip = []
			x['incidents'].each do |x| 
				tooltip << [ x['minute'], x['playershort'], x['type'], x['team'] ]
			end
			x['incidents'] = tooltip
		end
	end

end
