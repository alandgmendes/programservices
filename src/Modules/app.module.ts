import { Module } from '@nestjs/common';
import { AppController } from '../Controller/app.controller';
import { ServiceHub } from '../Services/app.service.info';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ServiceHub],
})
export class AppModule {}
