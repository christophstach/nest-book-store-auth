import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SingleSignOnToken {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text' })
  data: string;
}
