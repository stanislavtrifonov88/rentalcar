import {MigrationInterface, QueryRunner} from "typeorm";

export class removeOldColumns1588246416803 implements MigrationInterface {
    name = 'removeOldColumns1588246416803'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "borrowerAge"`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "id"`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "borrowerFirstName"`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "borrowerLastName"`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "borrowerAge"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "borrowerAge" double precision NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "borrowerLastName" text NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "borrowerFirstName" text NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" ADD "id" uuid NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" ADD "borrowerAge" double precision NOT NULL`, undefined);
    }

}
