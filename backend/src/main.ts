import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades extras
      forbidNonWhitelisted: true, // erro se enviar props que não estão no DTO
      transform: true, // transforma payloads para os tipos definidos
    }),
  );

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('TypeORM Training API')
    .setDescription('API para treinar conceitos com NestJS + TypeORM + Docker')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
