import { Module } from '@nestjs/common';
import { SongsController } from './controllers/songs/songs.controller';
import { SongsService } from './services/songs/songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/typeorm/entities/Song';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
