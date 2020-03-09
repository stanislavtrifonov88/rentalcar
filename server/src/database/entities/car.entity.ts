import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Class } from './class.entity';
import { Contract } from './contract.entity'


@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    brand: string;

    @Column({ type: 'text', nullable: false })
    model: string;

    @Column({ type: 'text', nullable: false })
    picture: string;

    @Column({ type: 'boolean', default: false  })
    isBorrowed: boolean;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @ManyToOne(type => Class, className => className.cars)
    className: Promise<Class>;

    @OneToMany(type => Contract, contract => contract.car)
    contracts: Promise<Contract[]>;

}
