import { Show } from 'src/show/entities/show.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'schedules',
})
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  showId: number;

  @Column({ type: 'int', nullable: false })
  availableSeat: number;

  @Column({ type: 'datetime', nullable: false })
  time: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => Show, (show) => show.schedule)
  @JoinColumn({ name: 'show_id' })
  show: Show;

  @OneToMany(() => Ticket, (ticket) => ticket.schedule)
  ticket: Ticket[];
}
