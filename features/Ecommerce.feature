@Validation
Feature: Login page
    As a registered user
    I want to log in to the application
    So that I can access my account

    Background:
        Given I am on the login page

    Scenario: Successful login with valid credentials
        When I enter username "bansal.shruti48@gmail.com" and password "7Sugarleastreet@"
        And I click the login button
        Then I should be redirected to the home page
        And I should see a welcome message

@checkout

    Scenario Outline: Place an order for an item in the cart
        Given the user has added "<Product>" to the cart
        When the user clicks Checkout for "<Product>"
        And enter all the details
        And clicks Place Order
        Then the confirmation message "<Message>" is displayed

        Examples:
            | Product       | Message                |
            | iPhone 13 Pro | Thankyou for the Order |
            | ZARA COAT 3  | Thankyou for the Order |
