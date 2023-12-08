import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class migration1701987854291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'teste2',
            columns: [{
                name: 'id',
                type: 'serial',
                isPrimary: true

            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
