import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SupabaseStrategy } from './utils/supabase.strategy';
import { User } from './repositories/user/user-repository.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: false,
        entities: [
          User
        ],
        synchronize: false,
        maxQueryExecutionTime: configService.get("db.maxQueryExecutionTime"),
      }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TodoModule,],
  controllers: [
    TodoController, AppController],
  providers: [
    TodoService, SupabaseStrategy],
  exports: [SupabaseStrategy]
})
export class AppModule { }
