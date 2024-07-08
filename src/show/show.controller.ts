import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { RolesGuard } from 'src/auth/roles.guard';
import { Category } from './types/showCategory.type';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';

@UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createShowDto: CreateShowDto,
    @Body('schedule') createScheduleDtos: CreateScheduleDto[],
  ) {
    return await this.showService.createShow(createShowDto, createScheduleDtos);
  }

  @Get()
  async getShows(
    @Query('category') category: Category,
    @Query('name') name: string,
  ) {
    return await this.showService.getShows(category, name);
  }

  @Get(':id')
  async getShow(@Param('id') id: number) {
    return await this.showService.getShow(id);
  }
}
