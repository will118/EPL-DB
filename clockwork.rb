require 'clockwork'
	include Clockwork

handler do |job|
  puts "Running #{job}"
end

every(10.seconds, 'frequent.job')
