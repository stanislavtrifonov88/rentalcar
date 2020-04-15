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


}
