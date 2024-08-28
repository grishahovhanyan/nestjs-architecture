import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1724678162073 implements MigrationInterface {
  name = 'CreateUsersTable1724678162073'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "users" (
          "id" SERIAL NOT NULL, 
          "firstName" character varying NOT NULL, 
          "lastName" character varying NOT NULL, 
          "email" character varying NOT NULL, 
          "birthDate" character varying NOT NULL, 
          "password" character varying NOT NULL, 
          "registeredAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
          CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))
      `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
