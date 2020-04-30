import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Car } from './car.entity';
import { Customer } from './customer.entity';


@Entity('contracts')
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', nullable: false })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: false })
    contractEndDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    deliveredDate: Date;

    @Column({ type: 'float', default: 0 })
    pricePaid: number;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @ManyToOne(type => Car, car => car.contracts, {eager: true})
    car: Car;

    @ManyToOne(type => Customer, customer => customer.contracts, {eager: true})
    customer: Customer;

}
