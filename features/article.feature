Feature: Articles

    Scenario: Populates articles
        Given I am on the articles page
        And I click "Populate"
        Then the page should be full of articles


    Scenario: Wipes all the articles
        Given I am on the articles page
        And I click "Wipe"
        Then the page should have notice message "So delete"
