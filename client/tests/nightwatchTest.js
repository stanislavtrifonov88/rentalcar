const moment = require('moment');

const dateTest = (moment(new Date(), 'MM/DD/YYYY').add(5, 'days')).format('MM/DD/YYYY');
// const navbar = document.querySelector('.Navbar');

module.exports = {
  'Test the car rentals project': function (browser) {
    browser
      .url('http://localhost:8000/dashboard')
      .waitForElementVisible('body')
      .assert.visible('div[data-element="navbar"]')
      .assert.visible('div[data-element="dashboard"]')
      .assert.urlContains('/dashboard')
      .assert.cssProperty('div[data-element="dashboard"]', 'display', 'flex')
      .click('a[data-element="navbarHomeLink"]')
      .setValue('input[type=text]', 'Lada')
      .click('a[data-element="navbarSearchBtn"]')
      .assert.urlContains('/home')
      .assert.not.elementPresent('.card')
      .clearValue('input[type=text]')
      .setValue('input[type=text]', 'Ford')
      .click('a[data-element="navbarSearchBtn"]')
      .assert.visible('div[data-element="allAvailableCarsContainer"]')
      .assert.visible('div[data-element="availableCarCard"]')
      .assert.visible('a[data-element="availableCarCardCheckoutBtn"]')
      .click('a[data-element="availableCarCardCheckoutBtn"]')
      .assert.urlContains('/cars')
      .assert.visible('div[data-element="bookingForm"]')
      .assert.visible('div[data-element="checkoutCarCard"]')
      .assert.visible('div[data-element="priceEstimationCard"]')
      .assert.visible('input[data-name="borrowerFirstName"]')
      .assert.value('input[data-name="borrowerFirstName"]', '')
      .clearValue('input[data-name="borrowerFirstName"]')
      .setValue('input[data-name="borrowerFirstName"]', 'Ivan')
      .assert.value('input[data-name="borrowerFirstName"]', 'Ivan')
      .clearValue('input[data-name="borrowerLastName"]')
      .setValue('input[data-name="borrowerLastName"]', 'Georgiev')
      .assert.value('input[data-name="borrowerLastName"]', 'Georgiev')
      .clearValue('input[data-name="borrowerAge"]')
      .setValue('input[data-name="borrowerAge"]', '25')
      .assert.value('input[data-name="borrowerAge"]', '25')
      .setValue('input[data-name="contractEndDate"]', dateTest)
      .click('button[data-element="bookingFormCheckoutBtn"]')
      .assert.visible('div[data-element="dashboard"]')
      .assert.containsText('div[data-element="dashboard"]', 'Ford')
      .clearValue('input[type=text]')
      .click('a[data-element="navbarHomeLink"]')
      .setValue('input[type=text]', 'Ford')
      .click('a[data-element="navbarSearchBtn"]')
      .assert.not.elementPresent('div[data-element="availableCarCard"]')
      .end();
  },
};
