import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class migration1700496966597 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'endereco',
      columns: [{
        name: 'id',
        type: 'serial',
        isPrimary: true

      },
      {
        name: 'pais',
        type: 'varchar(100)'
      },
      {
        name: 'cidade',
        type: 'varchar(100)'

      },
      {
        name: 'estado',
        type: 'varchar(100)'

      },
      {
        name: 'logradouro',
        type: 'varchar(100)'

      },
      {
        name: 'cep',
        type: 'varchar(100)'

      },
      {
        name: 'bairro',
        type: 'varchar(100)'

      },

      {
        name: 'data_criacao',
        type: 'timestamp'

      },
      {
        name: 'data_atualizacao',
        type: 'timestamp'

      }

      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
