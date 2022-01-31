import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUserFriends1643665597635 implements MigrationInterface {
    name = 'CreateTableUserFriends1643665597635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_friends" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "friend_id" character varying NOT NULL, "gift_photo" character varying, "gift_description" character varying, "gift_date" TIMESTAMP WITH TIME ZONE, "has_gift" boolean DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "round_id" uuid, CONSTRAINT "UQ_1766da616c66e3306b36e81fe38" UNIQUE ("user_id", "friend_id", "round_id"), CONSTRAINT "PK_59c68a26d6f85b8e5df363a0553" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_6237afcb6adb4f636db6b839222" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_6237afcb6adb4f636db6b839222"`);
        await queryRunner.query(`DROP TABLE "user_friends"`);
    }

}
