import {MigrationInterface, QueryRunner} from "typeorm";

export class addCustomersNewTable1588159987112 implements MigrationInterface {
    name = 'addCustomersNewTable1588159987112'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "customers" ("phone" bigint NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "borrowerAge" double precision NOT NULL, "id" uuid NOT NULL, "birthdate" date NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_88acd889fbe17d0e16cc4bc9174" PRIMARY KEY ("phone"))`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "customerPhone" bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "startDate" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "contractEndDate" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_d88b4ec204d87aeddea8dcc257a" FOREIGN KEY ("customerPhone") REFERENCES "customers"("phone") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_d88b4ec204d87aeddea8dcc257a"`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "contractEndDate" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "startDate" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "customerPhone"`, undefined);
        await queryRunner.query(`DROP TABLE "customers"`, undefined);
    }

}
