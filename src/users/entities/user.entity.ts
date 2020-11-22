import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username', 'email', 'googleId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  googleId: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  fistName: string;

  @Column()
  lastName: string;

  @Column()
  picture: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
