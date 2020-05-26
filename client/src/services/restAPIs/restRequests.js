export const fetchRequest = async (path, method = 'GET', body = null) => {
  let requestInfo = {};

  if (method !== 'GET') {
    requestInfo = {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  return fetch(path, requestInfo)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw Error(`Failed with status ${res.status}`);
    });
};

export const fetchRequestCustomer = async (path, method = 'GET', body = null) => {
  let requestInfo = {};

  if (method !== 'GET') {
    requestInfo = {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  return fetch(path, requestInfo)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return {

        phone: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        age: '',
        loyaltyDiscount: '',
        geoDiscount: '',
      };
    });
};
