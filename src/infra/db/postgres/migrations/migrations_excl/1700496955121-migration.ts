import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class migration1700496955121 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'casa_venda',
      columns: [{
        name: 'id',
        type: 'serial',
        isPrimary: true

      },
      {
        name: 'id_anunciante',
        type: 'int'
      },
      {
        name: 'dormitorios',
        type: 'smallint'

      },

      {
        name: 'banheiros',
        type: 'smallint'

      },
      {
        name: 'suites',
        type: 'smallint'

      },

      {
        name: 'area_construida',
        type: 'smallint',
        isNullable: true

      },
      {
        name: 'area_terreno',
        type: 'smallint',
        isNullable: true

      },
      {
        name: 'area_reformado',
        type: 'smallint',
        isNullable: true

      },
      {
        name: 'preco',
        type: 'int'

      },
      {
        name: 'iptu',
        type: 'int'

      },
      {
        name: 'descricao',
        type: 'text',
        isNullable: true

      },
      {
        name: 'capacidade_garagem',
        type: 'smallint'

      },

      {
        name: 'piscina',
        type: 'boolean',
        default: false

      },
      {
        name: 'pintura_recente',
        type: 'boolean',
        default: false

      },
      {
        name: 'recem_construido',
        type: 'boolean',
        default: false

      },
      {
        name: 'recem_reformado',
        type: 'boolean',
        default: false

      },
      {
        name: 'fino_acabamento',
        type: 'boolean',
        default: false

      },
      {
        name: 'hidromassagem',
        type: 'boolean',
        default: false

      },

      {
        name: 'quadra_esportes',
        type: 'boolean',
        default: false

      },
      {
        name: 'forrado',
        type: 'boolean',
        default: false

      },
      {
        name: 'playground',
        type: 'boolean',
        default: false

      },
      {
        name: 'salao_festas',
        type: 'boolean',
        default: false

      },
      {
        name: 'mobiliado',
        type: 'boolean',
        default: false

      },

      {
        name: 'sauna',
        type: 'boolean',
        default: false

      },

      {
        name: 'garagem_coberta',
        type: 'boolean',
        default: false

      },
      {
        name: 'lajotado',
        type: 'boolean',
        default: false

      },
      {
        name: 'sacada',
        type: 'boolean',
        default: false

      },
      {
        name: 'pe_direito_alto',
        type: 'boolean',
        default: false

      },
      {
        name: 'jardim_inverno',
        type: 'boolean',
        default: false

      },
      {
        name: 'alpendre',
        type: 'boolean',
        default: false

      },
      {
        name: 'quintal',
        type: 'boolean',
        default: false

      },
      {
        name: 'garagem',
        type: 'boolean',
        default: false

      },
      {
        name: 'dir',
        type: 'varchar(10)'

      },
      {
        name: 'slug',
        type: 'varchar(100)',
        default: false

      },
      {
        name: 'status',
        type: 'int'

      },
      {
        name: 'id_endereco',
        type: 'int',
        isNullable: true
      },

      {
        name: 'numero_visualizacoes',
        type: 'int',
        default: 0

      },
      {
        name: 'destaque',
        type: 'boolean',
        default: false

      },
      {
        name: 'data_criacao',
        type: 'timestamp',
        default: 'now()'

      },
      {
        name: 'data_atualizacao',
        type: 'timestamp',
        default: 'now()'

      }

      ]
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
