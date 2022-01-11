import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableRounds1641931263168 implements MigrationInterface {
    name = 'CreateTableRounds1641931263168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rounds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying NOT NULL, "name" character varying NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "comments" character varying, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9d254884a20817016e2f877c7e7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rounds"`);
    }

}
