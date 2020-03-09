import {MigrationInterface, QueryRunner} from "typeorm";

export class newInitial1582713914045 implements MigrationInterface {
    name = 'newInitial1582713914045'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "classes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "className" text NOT NULL, "price" double precision NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "borrowerFirstName" text NOT NULL, "borrowerLastName" text NOT NULL, "borrowerAge" double precision NOT NULL, "startDate" text NOT NULL, "contractEndDate" text NOT NULL, "deliveredDate" text NOT NULL DEFAULT 'n/a', "pricePaid" double precision NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "carId" uuid, CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" text NOT NULL, "model" text NOT NULL, "picture" text NOT NULL, "isBorrowed" boolean NOT NULL DEFAULT false, "isDeleted" boolean NOT NULL DEFAULT false, "classNameId" uuid, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_17a246cb31bbb22248b31b08895" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_cce8059f6dc6df9fd9d86b22e01" FOREIGN KEY ("classNameId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_cce8059f6dc6df9fd9d86b22e01"`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_17a246cb31bbb22248b31b08895"`, undefined);
        await queryRunner.query(`DROP TABLE "cars"`, undefined);
        await queryRunner.query(`DROP TABLE "contracts"`, undefined);
        await queryRunner.query(`DROP TABLE "classes"`, undefined);
    }

}
