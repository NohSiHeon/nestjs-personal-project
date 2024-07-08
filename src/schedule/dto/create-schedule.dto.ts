import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty({ message: '공연 일정을 입력해주세요.' })
  time: string;

  @IsInt()
  @IsNotEmpty({ message: '가능한 좌석을 입력해주세요.' })
  availableSeat: number;
}
