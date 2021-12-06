import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUserAddresses1638826684576 implements MigrationInterface {
    name = 'CreateTableUserAddresses1638826684576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_addresses_week_availability_enum" AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY')`);
        await queryRunner.query(`CREATE TABLE "user_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "name" character varying, "street" character varying, "district" character varying, "city" character varying, "state" character varying, "country" character varying, "zip_code" character varying, "complement" character varying, "long_address" character varying, "week_availability" "public"."user_addresses_week_availability_enum" array DEFAULT '{}', "latitude" character varying, "longitude" character varying, "food_place_id" uuid, CONSTRAINT "UQ_7a5100ce0548ef27a6f1533a5ce" UNIQUE ("user_id"), CONSTRAINT "PK_8abbeb5e3239ff7877088ffc25b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_addresses" ADD CONSTRAINT "FK_f255bf10f6cf66b2b4605f82126" FOREIGN KEY ("food_place_id") REFERENCES "food_places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_addresses" DROP CONSTRAINT "FK_f255bf10f6cf66b2b4605f82126"`);
        await queryRunner.query(`DROP TABLE "user_addresses"`);
        await queryRunner.query(`DROP TYPE "public"."user_addresses_week_availability_enum"`);
    }

}
