import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Car } from './car.entity';


@Entity('contracts')
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    borrowerFirstName: string;

    @Column({ type: 'text', nullable: false })
    borrowerLastName: string;

    @Column({ type: 'float', nullable: false })
    borrowerAge: number;

    @Column({ type: 'text', nullable: false })
    startDate: string;

    @Column({ type: 'text', nullable: false })
    contractEndDate: string;

    @Column({ type: 'text', default: 'n/a' })
    deliveredDate: string;

    @Column({ type: 'float', default: 0 })
    pricePaid: number;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @ManyToOne(type => Car, car => car.contracts)
    car: Promise<Car>;


}
