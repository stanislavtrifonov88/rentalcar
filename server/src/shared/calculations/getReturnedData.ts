// The function provides the basic data needed as input for all unit tests in the calculation folder

export const getReturnCarData = (input) => {
    const defaults = {
      startDate: '2020-05-18T11:55:00.000Z',
      contractEndDate: '2020-05-20T22:01:00.000Z',
      phone: '359888111444',
      age: 52,
      price: 70,
      previousContracts: 54,
    }
    return Object.assign(defaults, input);
  }