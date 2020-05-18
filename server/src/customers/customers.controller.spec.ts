import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('Customers Controller', () => {
  let controller: CustomersController;
  const customersService = {
    getCustomerByPhone(): any {
      /* empty */
    },
    createNewCustomer(): any {
      /* empty */
    },
    findCustomerByPhone(): any {
      /* empty */
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: CustomersService, useValue: customersService }],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
