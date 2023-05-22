import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Programs_to_mongo')
    .setDescription(
      'Insert excel and this system will compare it to the database and insert new data',
    )
    .setVersion('1.0')
    .addTag('programs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
