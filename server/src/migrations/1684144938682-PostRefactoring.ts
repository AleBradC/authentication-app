import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1684144938682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE book ADD COLUMN price int`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
