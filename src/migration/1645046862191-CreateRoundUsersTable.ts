import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRoundUsersTable1645046862191 implements MigrationInterface {
    name = 'CreateRoundUsersTable1645046862191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "round_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "friend_id" character varying, "gift_photo" character varying, "gift_description" character varying, "gift_date" TIMESTAMP WITH TIME ZONE, "has_gift" boolean DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "round_id" uuid, CONSTRAINT "UQ_630b16203d5549a7d4a3d66f910" UNIQUE ("user_id", "friend_id", "round_id"), CONSTRAINT "PK_f403ff9efdfd6f9b1c9637dcfdc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "round_users" ADD CONSTRAINT "FK_2b50fdef5fd1990de06b1e63823" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "round_users" DROP CONSTRAINT "FK_2b50fdef5fd1990de06b1e63823"`);
        await queryRunner.query(`DROP TABLE "round_users"`);
    }

}
