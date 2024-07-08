import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../types/showCategory.type';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: Category, nullable: false })
  category: Category;

  @Column({ type: 'varchar', nullable: false })
  place: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'int', nullable: false })
  totalSeat: number;

  @OneToMany(() => Ticket, (ticket) => ticket.show)
  ticket: Ticket[];

  @OneToMany(() => Schedule, (schedule) => schedule.show)
  schedule: Schedule[];
}
