export const carsArrayFn = () => {
    const data = [
        {
          id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
          brand: 'Opel',
          model: 'Corsa',
          picture: 'http://localhost:3001/img/opelCorsa.jpeg',
          className: 'A',
          price: 50,
        },
        {
          id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
          brand: 'Opel',
          model: 'Astra',
          picture: 'http://localhost:3001/img/opelCorsa.jpeg',
          className: 'B',
          price: 50,
        },
        {
          id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
          brand: 'BMW',
          model: 'M3',
          picture: 'http://localhost:3001/img/opelCorsa.jpeg',
          className: 'B',
          price: 50,
        },
        {
          id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
          brand: 'VW',
          model: 'Golf',
          picture: 'http://localhost:3001/img/opelCorsa.jpeg',
          className: 'C',
          price: 50,
        },
      ];

      return data;
} 

export const criteriaFn = (input) => {
    const criteria = {
        brand: '',
        model: '',
        className: '',
      };

   return Object.assign(criteria, input)
}

export const opelCorsaMock = () => {
  const corsa = [
    {
      id: 'a580044f-5bda-4397-a5fd-64767a7ef14f',
      brand: 'Opel',
      model: 'Corsa',
      picture: 'http://localhost:3001/img/opelCorsa.jpeg',
      className: 'A',
      price: 50,
    },
  ]

  return corsa;
}
