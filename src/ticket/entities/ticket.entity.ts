import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'int', name: 'show_id' })
  showId: number;

  @Column({ type: 'int', name: 'schedule_id' })
  scheduleId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // User 테이블 관계
  @ManyToOne(() => User, (user) => user.ticket, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Show 테이블 관계
  @ManyToOne(() => Show, (show) => show.ticket)
  @JoinColumn({ name: 'show_id' })
  show: Show;

  // 스케줄 테이블 관계
  @ManyToOne(() => Schedule, (schedule) => schedule.ticket, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;
}
