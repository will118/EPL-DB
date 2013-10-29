require Rails.root.join("lib/support/json.rb") 
Dir[File.join(Rails.root, "lib", "prod", "*.rb")].each {|l| require l }