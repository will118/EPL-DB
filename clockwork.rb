require 'clockwork'
	include Clockwork

handler do |job|
  puts "Running #{job}"
end

every(25.seconds, 'Match Recorder') {
  `rake populater:bbc`
}
