import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnsToFoodPlace1637008501810 implements MigrationInterface {
    name = 'AddNewColumnsToFoodPlace1637008501810'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "food_places" ADD "logo" character varying');
      await queryRunner.query('ALTER TABLE "food_places" ADD "country" character varying');
      await queryRunner.query('ALTER TABLE "food_places" ADD "is_custom" character varying NOT NULL DEFAULT false');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "food_places" DROP COLUMN "is_custom"');
      await queryRunner.query('ALTER TABLE "food_places" DROP COLUMN "country"');
      await queryRunner.query('ALTER TABLE "food_places" DROP COLUMN "logo"');
    }
}
