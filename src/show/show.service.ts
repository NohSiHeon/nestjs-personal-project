import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateShowDto } from './dto/create-show.dto';
import _ from 'lodash';
import { Category } from './types/showCategory.type';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly dataSource: DataSource,
  ) {}

  // 공연 등록
  async createShow(
    createShowDto: CreateShowDto,
    createScheduleDtos: CreateScheduleDto[],
  ) {
    // 트랜잭션 생성
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 엔터티 생성 및 데이터 할당
      const show = this.showRepository.create(createShowDto);
      // 엔터티 저장
      const savedShow = await queryRunner.manager.save(show);

      for (const createScheduleDto of createScheduleDtos) {
        const { time, availableSeat } = createScheduleDto;
        await queryRunner.manager.save(Schedule, {
          time,
          availableSeat,
          showId: savedShow.id,
        });
      }
      // 트랜잭션 커밋
      await queryRunner.commitTransaction();

      // 결과 반환
      return savedShow;
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();

      // 에러 던지기
      throw error;
    } finally {
      // QueryRunner 해제
      await queryRunner.release();
    }
  }

  // 공연 조회(전체, 카테고리) 및 검색
  async getShows(category: Category, name: string): Promise<Show[]> {
    console.log(category);
    return await this.showRepository.find({
      where: {
        category,
        name,
      },
      select: ['id', 'name', 'description', 'category', 'totalSeat'],
    });
  }

  // 공연 상세보기
  async getShow(id: number) {
    return await this.verifyShowById(id);
  }

  private async verifyShowById(id: number) {
    const show = await this.showRepository.findOneBy({ id });

    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }
    return show;
  }
}
