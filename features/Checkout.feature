@checkout
Feature: Checkout

  Scenario Outline: Place an order for an item in the cart
    Given the user has added "<Product>" to the cart
    When the user clicks Checkout for "<Product>"
    And enter all the details
    And clicks Place Order
    Then the confirmation message "<Message>" is displayed

    Examples:
      | Product       | Message                |
      | iPhone 13 Pro | Thankyou for the Order |
      | zara coat  3   | Thankyou for the Order |
