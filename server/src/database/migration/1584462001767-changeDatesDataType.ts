import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDatesDataType1584462001767 implements MigrationInterface {
  name = 'changeDatesDataType1584462001767';

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "tempStartDate" TIMESTAMP`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "tempContractEndDate" TIMESTAMP`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "tempDeliveredDate" TIMESTAMP`,
      undefined,
    );
    await queryRunner.query(
      `UPDATE "contracts" SET "tempStartDate" = "startDate"::TIMESTAMP`,
    );
    await queryRunner.query(
      `UPDATE "contracts" SET "tempContractEndDate" = "contractEndDate"::TIMESTAMP`,
    );
    await queryRunner.query(
      `UPDATE "contracts" SET "tempDeliveredDate" = "deliveredDate"::TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "startDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "startDate" TIMESTAMP NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "contractEndDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "contractEndDate" TIMESTAMP NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "deliveredDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "deliveredDate" TIMESTAMP NULL`,
      undefined,
    );
    await queryRunner.query(
      `UPDATE "contracts" SET "startDate" = "tempStartDate"::TIMESTAMP`,
    );
    await queryRunner.query(
      `UPDATE "contracts" SET "contractEndDate" = "tempContractEndDate"::TIMESTAMP`,
    );
    await queryRunner.query(
      `UPDATE "contracts" SET "deliveredDate" = "tempDeliveredDate"::TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "tempDeliveredDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "tempContractEndDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "tempStartDate"`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "tempDeliveredDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "tempContractEndDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "tempStartDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "deliveredDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "deliveredDate" text NOT NULL DEFAULT 'n/a'`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "contractEndDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "contractEndDate" text NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" DROP COLUMN "startDate"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "startDate" text NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "tempStartDate" TIMESTAMP`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "tempContractEndDate" TIMESTAMP`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD "tempDeliveredDate" TIMESTAMP`,
      undefined,
    );
  }
}
