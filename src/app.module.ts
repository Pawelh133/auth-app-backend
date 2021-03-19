import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { DatabaseModule } from './modules/database/database.module';

const typeOrmModuleConfig = TypeOrmModule.forRoot({
  type: 'postgres',
    host: 'localhost',
    port: 5444,
    username: 'postgres',
    password: 'password',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
});

@Module({
  imports: [AuthModule, ProfileModule, typeOrmModuleConfig, DatabaseModule],
})
export class AppModule {}
