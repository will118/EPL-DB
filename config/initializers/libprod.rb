require Rails.root.join("lib/support/json.rb")
require Rails.root.join("lib/support/procs.rb")
require Rails.root.join("lib/support/namenormaliser.rb")
Dir[File.join(Rails.root, "lib", "prod", "*.rb")].each {|l| require l }
