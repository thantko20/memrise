import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1693141265661 implements MigrationInterface {
    name = 'Test1693141265661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
    }

}
