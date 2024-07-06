import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from '../types/showCategory.type';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연명을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  @IsEnum(Category, { message: '카테고리 종류를 입력해주세요.' })
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  category: Category;

  @IsString()
  @IsNotEmpty({ message: '장소를 입력해주세요.' })
  place: string;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '이미지를 입력해주세요.' })
  image: string;

  @IsNumber()
  @IsNotEmpty({ message: '총 좌석을 입력해주세요.' })
  totalSeat: number;

  @IsDateString()
  @IsNotEmpty({ message: '공연 일정을 입력해주세요.' })
  time: Date;

  @IsInt()
  @IsNotEmpty({ message: '가능한 좌석을 입력해주세요.' })
  availableSeat: number;
}
