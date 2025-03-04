import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  name: string;

  @IsString()
  unitNumber: string;

  @IsString()
  project: string;

  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
