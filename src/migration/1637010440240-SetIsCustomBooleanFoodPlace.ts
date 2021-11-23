import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetIsCustomBooleanFoodPlace1637010440240 implements MigrationInterface {
    name = 'SetIsCustomBooleanFoodPlace1637010440240'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "food_places" DROP COLUMN "is_custom"');
      await queryRunner.query('ALTER TABLE "food_places" ADD "is_custom" boolean NOT NULL DEFAULT false');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "food_places" DROP COLUMN "is_custom"');
      await queryRunner.query('ALTER TABLE "food_places" ADD "is_custom" character varying NOT NULL DEFAULT false');
    }
}
