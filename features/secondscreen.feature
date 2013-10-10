Feature: Second Screen
		@javascript
		Scenario: Checks upcoming fixtures have been populated
					Given I am on the fixtures page
					Then the page should have upcoming fixtures
		
		@javascript
		Scenario: Checks the the league table is populated
					Given I am on the fixtures page
					Then the page should have a league table

		Scenario: Checks most recent game squads are there
					Given I am on the fixtures page
					Then the page should have two populated team tables

		@javascript
		Scenario: Checks that home and away form are there
					Given I am on the fixtures page
					Then the page should have two strings of form
					