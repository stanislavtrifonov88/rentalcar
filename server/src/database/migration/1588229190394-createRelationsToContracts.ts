import {MigrationInterface, QueryRunner} from "typeorm";

export class createRelationsToContracts1588229190394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const phone = await queryRunner.query(`SELECT("phone") FROM "customers"`);
        const id = await queryRunner.query(`SELECT("id") FROM "customers"`);

        for (let i = 0; i < phone.length; i++) {
            await queryRunner.query(`UPDATE "contracts" SET "customerPhone" = '${phone[i].phone}' WHERE "id" = '${id[i].id}'`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
