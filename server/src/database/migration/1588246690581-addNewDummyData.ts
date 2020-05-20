import { MigrationInterface, QueryRunner } from 'typeorm';
import * as constants from './constantsMigrations';

export class addNewDummyData1588246690581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`INSERT INTO "cars"
        ("id", "brand", "model", "picture", "isBorrowed", "isDeleted", "classNameId") 
        VALUES 
        ('${constants.golf3_uuid}', 'Volkswagen', 'Golf', '${constants.golfImg1}', TRUE, DEFAULT, '${constants.classB_uuid}'),
        ('${constants.golf4_uuid}', 'Volkswagen', 'Golf', '${constants.golfImg1}', TRUE, DEFAULT, '${constants.classB_uuid}'),
        ('${constants.astra5_uuid}', 'Opel', 'Astra', '${constants.astraImg}', TRUE, DEFAULT, '${constants.classB_uuid}'), 
        ('${constants.corsa6_uuid}', 'Opel', 'Corsa', '${constants.opelCosrsa}', TRUE, DEFAULT, '${constants.classA_uuid}')
         RETURNING "isBorrowed", "isDeleted"`);
    await queryRunner.query(`INSERT INTO "customers"
        ("phone", "firstName", "lastName", "isDeleted", "birthdate") 
        VALUES 
        ('${constants.customer6}', 'Asen', 'Ivanov', DEFAULT, '1988-06-29'),
        ('${constants.customer5}', 'Ivan', 'Ivanov',DEFAULT, '1998-05-29'),
        ('${constants.customer4}', 'Georgi', 'Asenov',DEFAULT, '1978-12-29'),
        ('${constants.customer3}', 'Asen', 'Georgiev',DEFAULT, '1968-04-29')
         RETURNING "isDeleted"`);

    for (let i = 0; i < 9; i++) {
      await queryRunner.query(`INSERT INTO "contracts"
        ("id", "startDate", "contractEndDate", "isDeleted", "carId", "customerPhone", "deliveredDate") 
        VALUES 
        (DEFAULT, '${constants.startDateOverdue2}', '${constants.contractEndDateOverdue2}', DEFAULT,'${constants.golf4_uuid}', '${constants.customer3}', '${constants.contractEndDateOverdue2}')
         RETURNING "isDeleted"`);
    }
    await queryRunner.query(`INSERT INTO "contracts"
        ("id", "startDate", "contractEndDate", "isDeleted", "carId", "customerPhone") 
        VALUES 
        (DEFAULT, '${constants.startDate}', '${constants.contractEndDate}', DEFAULT,'${constants.astra5_uuid}', '${constants.customer6}'), 
        (DEFAULT, '${constants.startDate}', '${constants.contractEndDate14Days}', DEFAULT,'${constants.corsa6_uuid}', '${constants.customer5}'),
        (DEFAULT, '${constants.startDateOverdue1}', '${constants.contractEndDateOverdue1}', DEFAULT,'${constants.golf3_uuid}', '${constants.customer4}'),
        (DEFAULT, '${constants.startDateOverdue2}', '${constants.contractEndDateOverdue2}', DEFAULT,'${constants.golf4_uuid}', '${constants.customer3}')
         RETURNING "isDeleted"`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
