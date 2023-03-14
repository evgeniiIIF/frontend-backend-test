import {
  Controller,
  Post,
  Headers,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ApiService } from './api.service';
import { CreateEntityDto } from './dto/create-entity.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createEntity(
    @Headers('Authorization') token: string,
    @Headers('Content-Type') contentType: string,
    @Headers('creatableEntity') creatableEntity: string,
    @Body() createEntityDto: CreateEntityDto,
  ) {
    const headersValues = { token, contentType, creatableEntity };
    const body = createEntityDto;

    return this.apiService.createEntity(headersValues, body);
  }
}
