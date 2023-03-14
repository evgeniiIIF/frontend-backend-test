import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { map } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  createEntity(headersValues: any, body: any) {
    let url = `https://pro100sto.amocrm.ru/api/v4/${headersValues.creatableEntity}`;
    // return headersValues;
    return this.httpService
      .post(url, body, {
        headers: {
          'Content-Type': headersValues.contentType,
          Authorization: headersValues.token,
        },
      })
      .pipe(map((response) => response.data));
  }
}
