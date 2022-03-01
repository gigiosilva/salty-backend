import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascadeToRoundUser1646230721226 implements MigrationInterface {
    name = 'AddCascadeToRoundUser1646230721226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "round_users" DROP CONSTRAINT "FK_2b50fdef5fd1990de06b1e63823"`);
        await queryRunner.query(`ALTER TABLE "round_users" ADD CONSTRAINT "FK_2b50fdef5fd1990de06b1e63823" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "round_users" DROP CONSTRAINT "FK_2b50fdef5fd1990de06b1e63823"`);
        await queryRunner.query(`ALTER TABLE "round_users" ADD CONSTRAINT "FK_2b50fdef5fd1990de06b1e63823" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
