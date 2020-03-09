import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Car } from './car.entity';


@Entity('classes')
export class Class {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    className: string;

    @Column({ type: 'float', nullable: false })
    price: number;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @OneToMany(type => Car, car => car.className)
    cars: Promise<Car[]>;

}
