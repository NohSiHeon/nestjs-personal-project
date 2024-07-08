import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';

import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('show/:showId/schedule/:scheduleId/ticket')
  async createTicket(
    @Param('scheduleId') scheduleId: number,
    @Param('showId') showId: number,
    @UserInfo() user: User,
  ) {
    const { point, id } = user;
    return await this.ticketService.createTicket(showId, scheduleId, point, id);
  }

  @Get('ticket')
  async GetAllTickets(@UserInfo() user: User) {
    const { id } = user;
    return await this.ticketService.getAllTickets(id);
  }
}
