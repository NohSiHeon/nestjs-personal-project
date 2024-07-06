import { Module } from '@nestjs/common';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Schedule])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
