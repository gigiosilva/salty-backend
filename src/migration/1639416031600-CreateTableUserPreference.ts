import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUserPreference1639416031600 implements MigrationInterface {
    name = 'CreateTableUserPreference1639416031600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_preferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "preferences" character varying array NOT NULL DEFAULT '{}', "comments" character varying, "is_delivery" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_458057fa75b66e68a275647da2e" UNIQUE ("user_id"), CONSTRAINT "PK_e8cfb5b31af61cd363a6b6d7c25" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_preferences"`);
    }

}
