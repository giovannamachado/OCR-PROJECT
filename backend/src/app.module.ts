import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DocumentModule } from './document/document.module'; 
import { MockAuthMiddleware } from './middlewares/auth.middleware'; 
@Module({
  imports: [DocumentModule], 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MockAuthMiddleware) 
      .forRoutes('*');   
  }
}
