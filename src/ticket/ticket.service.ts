import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Show } from 'src/show/entities/show.entity';
import { DataSource, Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly dataSource: DataSource,
  ) {}

  async createTicket(
    showId: number,
    scheduleId: number,
    point: number,
    id: number,
  ): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 스케줄이 있는 공연 존재 조회
      const schedule = await this.scheduleRepository.findOne({
        where: {
          id: scheduleId,
          show: { id: showId },
        },
        relations: ['show'],
      });

      // 스케줄 있는 공연 에러 처리
      if (!schedule) {
        throw new NotFoundException('존재하지 않는 일정입니다.');
      }

      // 포인트 부족 에러 처리
      if (point < 30000) {
        throw new BadRequestException('포인트가 부족합니다.');
      }

      // 좌석 부족 에러 처리
      if (schedule.availableSeat <= 0) {
        throw new Error('예매할 수 있는 좌석이 없습니다.');
      }

      const ticket = new Ticket();
      ticket.userId = id;
      ticket.scheduleId = schedule.id;
      ticket.showId = schedule.showId;
      console.log('[Ticket]', ticket);
      await queryRunner.manager.save(ticket);

      // 가능 좌석 차감
      schedule.availableSeat -= 1;
      // 포인트 차감
      point -= 30000;

      // 변경된 데이터 반영
      await queryRunner.manager.update(User, { id }, { point });
      await queryRunner.manager.save(schedule);

      await queryRunner.commitTransaction();

      return {
        // ticketId: savedTicket.id,
        showId: schedule.show.id,
        scheduleId: schedule.id,
        time: schedule.time,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async getAllTickets(id: number) {
    const tickets = await this.ticketRepository.find({
      where: {
        userId: id,
      },
      select: {
        id: true,
        createdAt: true,
        show: {
          name: true,
          place: true,
          price: true,
        },
        schedule: {
          time: true,
        },
      },
      relations: ['show', 'schedule'],
      order: {
        createdAt: 'desc',
      },
    });
    return tickets;
  }
}
