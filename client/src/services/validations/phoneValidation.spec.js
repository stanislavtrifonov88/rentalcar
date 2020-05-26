import phoneValidation from "./phoneValidation";

describe("currentDaysRented", () => {
  const getPhoneData = (input) => {
    const defaults = {
      number: "359888111444",
    };
    return Object.assign(defaults, input);
  };
  const daysRented = [
    {
      name:
        "case 1.1 (0 digits): if country is +359 but phone number is below 13 digits return false",
      input: { number: "" },
      result: false,
    },
    {
      name:
        "case 1.2 (12 digits): if country is +359 but phone number is below 13 digits return false",
      input: { number: "+35988811144" },
      result: false,
    },
    {
      name:
        "case 1.3 (13 digits): if country is +359 but phone number is 13 digits return true",
      input: { number: "+359888111444" },
      result: true,
    },
    {
      name:
        "case 1.4 (14 digits): if country is +359 but phone number is above 13 digits return false",
      input: { number: "+3598881114444" },
      result: false,
    },
    {
      name:
        "case 1.5 (19 digits): if country is +359 but phone number is above 13 digits return false",
      input: { number: "+359888111444444444" },
      result: false,
    },
    {
      name:
        "case 2.1 (0 digits): if country is +40 but phone number is below 12 digits return false",
      input: { number: ""},
      result: false,
    },
    {
      name:
        "case 2.2 (12 digits): if country is +40 but phone number is below 13 digits return false",
      input: { number: "+4088811144" },
      result: false,
    },
    {
      name:
        "case 2.3 (13 digits): if country is +40 but phone number is 13 digits return true",
      input: { number: "+40888111444" },
      result: true,
    },
    {
      name:
        "case 2.4 (14 digits): if country is +40 but phone number is above 13 digits return false",
      input: { number: "+408881114444" },
      result: false,
    },
    {
      name:
        "case 2.5 (19 digits): if country is +40 but phone number is above 13 digits return false",
      input: { number: "+40888111444444444" },
      result: false,
    },
  ];

  daysRented.forEach((test) => {
    it(test.name, () => {
      //arrange
      const returnedPhoneData = getPhoneData(test.input);
      //act
      const result = phoneValidation(returnedPhoneData);
      //assert
      expect(result).toEqual(test.result);
    });
  });
});
