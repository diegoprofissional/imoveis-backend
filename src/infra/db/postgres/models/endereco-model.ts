import { Entity, PrimaryGeneratedColumn, Column, IsNull, OneToMany } from "typeorm"


@Entity({ name: 'endereco' })
export class EnderecoModel {

  @PrimaryGeneratedColumn()
  id: number;



  @Column({ name: 'pais' })
  pais: string;

  @Column({ name: 'cidade' })
  cidade: string;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'logradouro' })
  logradouro: string;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'bairro' })
  bairro: string;

  @Column({ name: 'data_criacao', default: 'now()' })
  dataCriacao: string;

  @Column({ name: 'data_atualizacao', nullable: true })
  dataAtualizacao: string;

}
