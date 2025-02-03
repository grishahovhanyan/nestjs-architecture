import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUsersColumns1737960598226 implements MigrationInterface {
  name = 'AddUsersColumns1737960598226'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "token" character varying`)
    await queryRunner.query(`ALTER TABLE "users" ADD "tokenExpireDate" TIMESTAMP`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tokenExpireDate"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`)
  }
}
