import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;

  app.enableCors();

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Bookstore Auth API')
    .setDescription(
      'Use these endpoints to authenticate with wishlist and receive an access token.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/`, 'Bootstrap');
  });
}
bootstrap();
