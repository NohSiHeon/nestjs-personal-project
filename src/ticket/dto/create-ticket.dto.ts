import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  // @IsInt()
  // @IsNotEmpty()
  // showId: number;

  // @IsInt()
  // @IsNotEmpty()
  // scheduleId: number;
}
