import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptService } from './gpt.service';  // Importando o GptService

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GptService],  // Registrando o GptService
})
export class AppModule {}
