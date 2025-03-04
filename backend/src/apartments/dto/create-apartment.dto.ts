import { IsOptional, IsPositive, IsString,  } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  name: string;

  @IsString()
  unitNumber: string;

  @IsString()
  project: string;

  @IsPositive()
  price: number;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
