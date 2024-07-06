import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  availableSeat: number;

  @IsDate()
  @IsNotEmpty({ message: '날짜를 입력해주세요.' })
  time: Date;
}
