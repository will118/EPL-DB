require_relative "../config/environment"
require_relative "../config/boot"
require 'clockwork'

include Clockwork

handler do |job|
 puts "running the scheduled job #{job}."
end
 
 
every(1.hours, 'Team Form'){`rake populater:teamform`}
every(1.minute, 'Scores'){RemoteAPI.api_save}
every(12.hours, 'Opta Text'){`rake populater:optatext`}
every(4.hours, 'Fixture Schedule'){`rake populater:schedule`}
every(6.hours, 'Squawka Scraper'){`rake populater:squawka`}
every(20.seconds, 'Match Recorder'){MatchManager.run}