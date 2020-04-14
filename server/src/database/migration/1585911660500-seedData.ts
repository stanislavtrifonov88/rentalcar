import {MigrationInterface, QueryRunner} from "typeorm";
import * as constants from './constantsMigrations'

export class seedData1585911660500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        
            await queryRunner.query(`INSERT INTO "classes"
            ("id", "className", "price", "isDeleted") 
            VALUES 
            ('${constants.classA_uuid}', 'A', 50, DEFAULT), 
            ('${constants.classB_uuid}', 'B', 70, DEFAULT), 
            ('${constants.classC_uuid}', 'C', 90, DEFAULT), 
            ('${constants.classD_uuid}', 'D', 110, DEFAULT), 
            ('${constants.classE_uuid}', 'E', 130, DEFAULT)  
            RETURNING "id", "isDeleted"`);
            await queryRunner.query(`INSERT INTO "cars"
            ("id", "brand", "model", "picture", "isBorrowed", "isDeleted", "classNameId") 
            VALUES 
            (DEFAULT, 'Opel', 'Corsa', '${constants.opelCosrsa}', DEFAULT, DEFAULT, '${constants.classA_uuid}'), 
            (DEFAULT, 'Opel', 'Astra', '${constants.astraImg}', DEFAULT, DEFAULT, '${constants.classB_uuid}'), 
            ('${constants.golf1_uuid}', 'Volkswagen', 'Golf', '${constants.golfImg1}', TRUE, DEFAULT, '${constants.classB_uuid}'),
            ('${constants.golf2_uuid}', 'Volkswagen', 'Golf', '${constants.golfImg1}', TRUE, DEFAULT, '${constants.classB_uuid}'),
            (DEFAULT, 'BMW', 'M3', '${constants.bmwM3}', DEFAULT, DEFAULT, '${constants.classC_uuid}'),
            (DEFAULT, 'Mercedes', 'AMG-GTR-C190', '${constants.MercedesAMGGTRC190}', DEFAULT, DEFAULT, '${constants.classD_uuid}'),
            (DEFAULT, 'Mercedes', 'G-Class', '${constants.mercedesGClass}', DEFAULT, DEFAULT, '${constants.classE_uuid}'),
            (DEFAULT, 'Dodge', 'Ram', '${constants.dodgeRam}', DEFAULT, DEFAULT, '${constants.classE_uuid}'),
            (DEFAULT, 'Ford', 'Focus', '${constants.fordFocus}', DEFAULT, DEFAULT, '${constants.classB_uuid}'),
            (DEFAULT, 'Audi', 'A7', '${constants.audiq7}', DEFAULT, DEFAULT, '${constants.classE_uuid}'),
            (DEFAULT, 'Volvo', 'XC40', '${constants.volvo40}', DEFAULT, DEFAULT, '${constants.classE_uuid}')
             RETURNING "isBorrowed", "isDeleted"`);
             await queryRunner.query(`INSERT INTO "contracts"
             ("id", "borrowerFirstName", "borrowerLastName", "borrowerAge", "startDate", "contractEndDate", "isDeleted", "carId") 
             VALUES 
             (DEFAULT, 'Bruce', 'Wayne', '36', '${constants.startDate}', '${constants.contractEndDate}', DEFAULT,'${constants.golf1_uuid}'), 
             (DEFAULT, 'General', 'Mutafciiski', '56', '${constants.startDate}', '${constants.contractEndDate14Days}', DEFAULT,'${constants.golf2_uuid}') 

              RETURNING "isDeleted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
