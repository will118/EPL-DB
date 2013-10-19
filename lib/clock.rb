require_relative "../config/environment"
require_relative "../config/boot"
require 'clockwork'

include Clockwork

handler do |job|
 puts "running the scheduled job #{job}."
end

# every(1.hours, 'Team Form'){`rake populater:teamform`}
# every(3.hours, 'Opta Text'){`rake populater:optatext`}
# every(4.hours, 'Fixture Schedule'){`rake populater:schedule`}
# every(6.hours, 'Squawka Scraper'){`rake populater:squawka`}
every(20.seconds, 'Match Recorder'){BBC.new.match_manager}