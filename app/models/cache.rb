class Cache < ActiveRecord::Base
	serialize :json
	class << self
		def need_new_countdown?
			if Cache.count == 0
				return true
			else	
				last = where(:kind_of => 'countdown').last
				if last.updated_at <= 1.day.ago
					return true
				else
					return false
				end
			end
		end

		def last_countdown
			where(:kind_of => 'countdown').last.json
		end
	end
end
