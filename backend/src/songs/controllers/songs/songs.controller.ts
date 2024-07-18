import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSongDto } from 'src/songs/dtos/CreateSong.dto';
import { UpdateSongDto } from 'src/songs/dtos/UpdateSong.dto';
import { SongsService } from 'src/songs/services/songs/songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}
  @Get()
  getSongs(@Query() queryParams) {
    return this.songService.fetchSongs(queryParams);
  }

  @Post()
  createSong(@Body() createSongDto: CreateSongDto) {
    return this.songService.createSong(createSongDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.songService.uploadFile(file);
  }

  @Put(':id')
  async updateSongById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    await this.songService.updateSong(id, updateSongDto);
  }

  @Delete(':id')
  async deleteSongById(@Param('id', ParseIntPipe) id: number) {
    await this.songService.deleteSong(id);
  }
}
