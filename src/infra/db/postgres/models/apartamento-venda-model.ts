import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CorretorModel } from './corretor-model'
import { EnderecoModel } from './endereco-model'

@Entity({ name: 'apartamento_venda' })
export class ApartamentoVendaModel {
  @PrimaryGeneratedColumn()
  id: number




  @Column({ name: 'id_anunciante' })
  idAnunciante: number

  @Column({ name: 'id_endereco' })
  idEndereco: number

  @Column()
  dormitorios: number

  @Column()
  suites: number

  @Column()
  banheiros: number

  @Column({ name: 'capacidade_garagem' })
  capacidadeGaragem: number

  @Column({ name: 'area_terreno' })
  areaTerreno: number

  @Column({ name: 'area_construida' })
  areaConstruida: number

  @Column()
  iptu: number

  @Column()
  preco: number

  @Column()
  descricao: string

  @Column()
  dir: string

  @OneToOne(type => CorretorModel, corretorModel => corretorModel)
  @JoinColumn({ name: 'id_anunciante' })
  corretor: CorretorModel;

  @OneToOne(type => EnderecoModel, enderecoModel => enderecoModel)
  @JoinColumn({ name: 'id_endereco' })
  endereco: EnderecoModel;

  miniaturasFotos?: string[]
  fotos?: string[]

}
