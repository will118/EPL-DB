Feature: Add article
    to add an article
    must submit title and body to a form

    Scenario: Submits an article
        Given I am on the new article page
        And I fill in "article_title" with "This is my title"
        And I fill in "article_body" with "Article textbody"
        When I press "Create Article"
        Then the page should have notice message "Your article was successfully addded."

    Scenario: Wipes all the articles
        Given I am on the articles page
        And I click "Wipe"
        Then the page should have notice message "So delete"

    @javascript
    Scenario: Instant update when quick adding an article
        Given I am on the articles page
        And I fill in "article_title" with "This is my title"
        And I fill in "article_body" with "Article textbody"
        When I press "Add comment"
        Then the page should automatically update with the newest entry
