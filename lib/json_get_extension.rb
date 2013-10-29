module JSONGetExtension

  extend ActiveSupport::Concern

		def json_get(url)
			JSON.parse HTTParty.get(url).response.body
		end
		 
end

ActiveRecord::Base.send(:include, JSONGetExtension)