class WelcomeController < ApplicationController
	layout :choose_layout

	def choose_layout
		"angular"
	end
end
