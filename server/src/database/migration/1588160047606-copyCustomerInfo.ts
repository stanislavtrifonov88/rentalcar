import { MigrationInterface, QueryRunner } from 'typeorm';
import { birthYear } from '../../shared/constants/dateModifiers';

export class copyCustomerInfo1588160047606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const firstName = await queryRunner.query(
      `SELECT("borrowerFirstName") FROM "contracts"`,
    );
    const lastName = await queryRunner.query(
      `SELECT("borrowerLastName") FROM "contracts"`,
    );
    const age = await queryRunner.query(
      `SELECT("borrowerAge") FROM "contracts"`,
    );
    const ids = await queryRunner.query(`SELECT("id") FROM "contracts"`);
    let dymmy2 = function getRandomInt() {
      return Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100);
    };

    for (let i = 0; i < ids.length; i++) {
      console.log(ids[i].id);
      await queryRunner.query(`INSERT INTO "customers"
            ("phone", "firstName", "lastName", "borrowerAge", "birthdate", "id") 
            VALUES 
            ('${dymmy2()}', '${firstName[i].borrowerFirstName}', '${
        lastName[i].borrowerLastName
      }', '${age[i].borrowerAge}', '${birthYear(age[i].borrowerAge)}', '${
        ids[i].id
      }')
            RETURNING "phone", "isDeleted"`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
