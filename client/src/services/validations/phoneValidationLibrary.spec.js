import phoneValidationLibrary from "./phoneValidationLibrary";

describe("currentDaysRented", () => {
  const getPhoneData = (input) => {
    const defaults = {
      number: "359888111444",
      country: "BG",
    };
    return Object.assign(defaults, input);
  };
  const daysRented = [
    {
      name:
        "case 1.1 (0 digits): if country is BG but phone number is below 13 digits return false",
      input: { number: "", country: "BG" },
      result: false,
    },
    {
      name:
        "case 1.2 (12 digits): if country is BG but phone number is below 13 digits return false",
      input: { number: "+35988811144", country: "BG" },
      result: false,
    },
    {
      name:
        "case 1.3 (13 digits): if country is BG but phone number is 13 digits return true",
      input: { number: "+359888111444", country: "BG" },
      result: true,
    },
    {
      name:
        "case 1.4 (14 digits): if country is BG but phone number is above 13 digits return false",
      input: { number: "+3598881114444", country: "BG" },
      result: false,
    },
    {
      name:
        "case 1.5 (19 digits): if country is BG but phone number is above 13 digits return false",
      input: { number: "+359888111444444444", country: "BG" },
      result: false,
    },
    {
      name:
        "case 2.1 (0 digits): if country is RO but phone number is below 12 digits return false",
      input: { number: "", country: "RO" },
      result: false,
    },
    {
      name:
        "case 2.2 (12 digits): if country is RO but phone number is below 13 digits return false",
      input: { number: "+4088811144", country: "RO" },
      result: false,
    },
    {
      name:
        "case 2.3 (13 digits): if country is RO but phone number is 13 digits return true",
      input: { number: "+40888111444", country: "RO" },
      result: true,
    },
    {
      name:
        "case 2.4 (14 digits): if country is RO but phone number is above 13 digits return false",
      input: { number: "+408881114444", country: "RO" },
      result: false,
    },
    {
      name:
        "case 2.5 (19 digits): if country is RO but phone number is above 13 digits return false",
      input: { number: "+40888111444444444", country: "RO" },
      result: false,
    },
  ];

  daysRented.forEach((test) => {
    it(test.name, () => {
      //arrange
      const returnedPhoneData = getPhoneData(test.input);
      //act
      const result = phoneValidationLibrary(returnedPhoneData);
      //assert
      expect(result).toEqual(test.result);
    });
  });
});
