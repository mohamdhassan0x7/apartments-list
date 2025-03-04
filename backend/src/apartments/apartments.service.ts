import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity';
import { ChildEntity, Repository } from 'typeorm';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>,
  ) {}
  create(createApartmentDto: CreateApartmentDto) {
    const { name, unitNumber, project, price, location, imageUrl } =
      createApartmentDto;
    const apartment = this.apartmentRepository.create({
      name,
      unitNumber,
      project,
      price,
      location,
      imageUrl,
    });
    return this.apartmentRepository.save(apartment);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filters?: { name?: string; price?: number; location?: string },
  ) {
    const query = this.apartmentRepository.createQueryBuilder('apartment');

    if (filters?.name) {
      query.andWhere('apartment.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters?.price) {
      query.andWhere('apartment.price <= :price', { price: filters.price });
    }

    if (filters?.location) {
      query.andWhere('apartment.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    if (!apartment) {
      throw new Error('Apartment not found');
    }
    return apartment;
  }
}
