import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../database/entities/customer.entity';

describe('CustomersService', () => {
  let service: CustomersService;

  const customerRepository = {
    find(): any {
      /* empty */
    },
    findOne(): any {
      /* empty */
    },
    save(): any {
      /* empty */
    },
    create(): any {
      /* empty */
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: customerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
