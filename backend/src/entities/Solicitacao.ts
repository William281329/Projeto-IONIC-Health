import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Attachment } from './Attachment';

@Entity({ name: "solicitacao" })
export class Solicitacao {
  // define a chave primária como auto incremento
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false, length: 100 })
  titulo: string;

  @Column({ nullable: false, unique: false, length: 100 })
  tipo: string;

  @Column({ nullable: true, unique: false, length: 150 })
  descricao: string;

  @CreateDateColumn()
  data_criacao: Date;

  @Column({ nullable: true })
  data_arquivado: Date;

  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "id_user",
    referencedColumnName: "id", //id da entidade Usuario
    foreignKeyConstraintName: "fk_id_user_solicitacao",
  })
  criador: User;

  @OneToMany(() => Attachment, attachment => attachment.ticket)
  attachments: Attachment[];

  @Column({ default: 'NEW' })
  status: string
}
