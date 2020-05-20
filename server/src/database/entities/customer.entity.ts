import {
    Entity,
    Column,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { Contract } from './contract.entity'
import { Car } from './car.entity';


@Entity('customers')
export class Customer {
    @PrimaryColumn({ type: 'bigint', nullable: false })
    phone: number;

    @Column({ type: 'text', nullable: false })
    firstName: string;

    @Column({ type: 'text', nullable: false })
    lastName: string;

    @Column({ type: 'date', nullable:false })
    birthdate: Date;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @OneToMany(type => Contract, contract => contract.customer)
    contracts: Promise<Contract[]>;

}
