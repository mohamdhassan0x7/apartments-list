import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/config/cloudinary.config';

@Controller('apartments')
export class ApartmentsController {
  constructor(
    private readonly apartmentsService: ApartmentsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createApartmentDto: CreateApartmentDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await this.cloudinaryService.uploadImage(
          image,
          'apartments',
        );
      }
      const apartment = this.apartmentsService.create({
        ...createApartmentDto,
        imageUrl,
      });
      return {
        status: 'success',
        data: apartment,
      };
    } catch (error) {
      return {
        status: 'failed',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: error.message || 'Something went wrong',
      };
    }
  }

  @Get()
  async getAllApartments(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('name') name?: string,
    @Query('price') price?: number,
    @Query('location') location?: string,
  ) {
    try {
      const data = await this.apartmentsService.findAll(page, limit, {
        name,
        price,
        location,
      });
      return {
        status: 'success',
        data,
      };
    } catch (error) {
      return {
        status: 'failed',
        message: 'Something went wrong',
      };
    }
  }
  @Get(':id')
  async getApartmentById(@Param('id') id: number) {
    try {
      const data = await this.apartmentsService.findOne(id);
      return {
        status: 'success',
        data,
      };
    } catch (error) {
      return {
        status: 'failed',
        message: 'Something went wrong',
      };
    }
  }
}
