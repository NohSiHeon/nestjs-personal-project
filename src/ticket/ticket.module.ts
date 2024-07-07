import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from 'src/show/entities/show.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Schedule, Ticket, User])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
