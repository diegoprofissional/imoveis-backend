import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class migration1700496947261 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'corretor',
      columns: [{
        name: 'id',
        type: 'serial',
        isPrimary: true

      },
      {
        name: 'creci',
        type: 'varchar(100)'
      },
      {
        name: 'primeiro_nome',
        type: 'varchar(100)'

      },
      {
        name: 'sobrenome',
        type: 'varchar(100)'

      },
      {
        name: 'id_sexo',
        type: 'int'

      },
      {
        name: 'id_cidade',
        type: 'int'

      },
      {
        name: 'email',
        type: 'varchar(100)'

      },
      {
        name: 'senha',
        type: 'varchar(100)'

      },
      {
        name: 'telefone',
        type: 'char(10)'

      },
      {
        name: 'celular',
        type: 'char(11)'

      },
      {
        name: 'data_criacao',
        type: 'timestamp',
        default: 'now()'

      },
      {
        name: 'data_atualizacao',
        type: 'timestamp',
        isNullable: true

      }

      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
