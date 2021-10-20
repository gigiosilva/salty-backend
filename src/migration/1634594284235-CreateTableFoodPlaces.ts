import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFoodPlaces1634594284235 implements MigrationInterface {
    name = 'CreateTableFoodPlaces1634594284235'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "food_places" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "name" character varying NOT NULL, 
            "website" character varying, 
            CONSTRAINT "UQ_e907e65711f5381182005f3f9ed" UNIQUE ("name"), 
            CONSTRAINT "PK_b1fc27cd6bd5cd78300dbbf113d" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "food_places"');
    }
}
