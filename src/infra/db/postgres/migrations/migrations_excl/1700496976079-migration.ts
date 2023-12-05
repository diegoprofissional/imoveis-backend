import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class migration1700496976079 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tipo_casa',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true

      },
      {
        name: 'tipo',
        type: 'varchar(100)'
      }

      ]
    }))

    await queryRunner.manager.query("insert into tipo_casa(id, tipo) values (1, 'Casa Padrão'), (2, 'Casa em Condomínio'), (3, 'Sobrado')")
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
