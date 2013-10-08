require_relative "../config/environment"
require_relative "../config/boot"
require 'clockwork'

include Clockwork

handler do |job|
 puts "running the scheduled job #{job}."
end

every(25.seconds, 'Match Recorder'){Module::BBC.new.recorder}