import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableFaqs1642436961367 implements MigrationInterface {
    name = 'CreateTableFaqs1642436961367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "faqs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "faqs"`);
    }

}
