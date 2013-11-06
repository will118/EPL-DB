module RedisService

	@redis = Redis.new

	def self.db
		@redis
	end

	def self.get
		@redis.get
	end

	def self.set_if_expired(key, timeout, &block)
		data = @redis.get key
		if data.nil?
			data = block.call
			@redis.setex(key, timeout, data.to_json)
		end
		return data
	end
	
end
