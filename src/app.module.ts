import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password8',
        database: 'images',
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
