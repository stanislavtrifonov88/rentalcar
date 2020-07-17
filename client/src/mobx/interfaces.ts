
export interface FilterStrings {
    brand: string,
    model: string,
    className?: string
}

export interface CheckOutFormInterface {
    phone: string,
    startDate: string | null,
    contractEndDate: string | null,
  }

  export interface ContractInterface {
    id: string,
    startDate: string
    contractEndDate: string
    brand: string
    model: string
    phone: string
    firstName: string
    lastName: string
    birthdate: string
    age: number
    price: number
    previousContracts: number
  }

  export interface CarInterface {
    id: string,
    brand: string,
    model: string,
    picture: string,
    className: string,
    price: number,
  }