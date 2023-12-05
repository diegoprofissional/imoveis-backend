import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'corretor' })
export class CorretorModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'primeiro_nome' })
  primeiroNome: string

  @Column()
  sobrenome: string

  @Column()
  creci: string

  @Column()
  email: string

  @Column()
  senha: string

  @Column()
  celular: string
}
