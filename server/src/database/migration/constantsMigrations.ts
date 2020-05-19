import { timeStamp, birthYear } from '../../shared/constants/dateModifiers';

// Mock class ids for the relation with cars
export const classA_uuid = 'e52040e8-b129-40c8-a255-9161c96107c1';
export const classB_uuid = '65895e56-77ec-47f1-b269-8520813355ec';
export const classC_uuid = '67ffa04b-6faf-4b56-8ce5-2048c15fa0b7';
export const classD_uuid = 'c1b8aa4c-d0fb-43b0-8734-746fdf1839d6';
export const classE_uuid = '3c378c78-2e5b-44a4-b818-108c1aaa46ba';

// Mock car ids for contract relations
export const golf1_uuid = '4eee2b90-788a-4aa8-ae40-8bf0e0d3b446';
export const golf2_uuid = '39a88efb-16c5-4972-95d1-313d585a818d';
export const golf3_uuid = '8d1cd009-ef92-41a0-84e3-24936ad797fe';
export const golf4_uuid = 'f50d4b42-a67e-4c82-9aaf-b753ab087212';
export const astra5_uuid = '58cb5cc1-145e-4630-942e-0a6d6cd814de';
export const corsa6_uuid = 'b2d5d9ff-ef66-400c-8e22-e2e85f070b5c';

// Mock customer phone numbers

export const customer1 = '359888111222';
export const customer2 = '359888111333';
export const customer3 = '359888111444';
export const customer4 = '359888111555';
export const customer5 = '359888111666';
export const customer6 = '359888111777';

// Mock dates
export const startDate = timeStamp();
export const contractEndDate = timeStamp(5);
export const contractEndDate14Days = timeStamp(14);
export const startDateOverdue1 = timeStamp(-14);
export const contractEndDateOverdue1 = timeStamp(-2);
export const startDateOverdue2 = timeStamp(-12);
export const contractEndDateOverdue2 = timeStamp(-6);

// Car images
export const fordFocus = 'http://localhost:3001/img/fordFocus.jpeg';
export const mercedesGClass = `http://localhost:3001/img/MercedesGClass.jpeg`;
export const astraImg = `http://localhost:3001/img/opelAstra.jpeg`;
export const golfImg1 = `http://localhost:3001/img/vwGolf.jpeg`;
export const dodgeRam = `http://localhost:3001/img/dodgeRam.jpeg`;
export const volvo40 = `http://localhost:3001/img/XC40.jpeg`;
export const audiq7 = `http://localhost:3001/img/audiA7.jpeg`;
export const MercedesAMGGTRC190 = `http://localhost:3001/img/MercedesAMG.jpeg`;
export const opelCosrsa = `http://localhost:3001/img/opelCorsa.jpeg`;
export const bmwM3 = `http://localhost:3001/img/bmwM3.jpeg`;
