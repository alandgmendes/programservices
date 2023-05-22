import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  Body,
} from '@nestjs/common';
import * as xlsx from 'xlsx';
import { ServiceHub } from '../Services/app.service.info';
import { Express, Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileCreateDto } from 'src/DTO/fileCreate.Dto';

@Controller()
export class AppController {
  constructor(private readonly serviceHub: ServiceHub) {}

  @Get()
  getInfo(): Promise<string> {
    return this.serviceHub.getInfo();
  }

  @Post('upload')
  async getHello(@Body() fileCreateDto: FileCreateDto) {
    return this.serviceHub.postFile(fileCreateDto.base64);
  }
}
