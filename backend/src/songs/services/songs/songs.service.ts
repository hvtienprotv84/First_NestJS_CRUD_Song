import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/typeorm/entities/Song';
import { CreateSongParams, UpdateSongParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}
  fetchSongs(queryParams) {
    const { name, band, minYear, maxYear, maxItems, sortBy, order } =
      queryParams;
    let queryBuilder = this.songRepository.createQueryBuilder('song');

    if (name) {
      queryBuilder = queryBuilder.where('song.name LIKE :name', {
        name: `%${name}%`,
      });
    }
    if (band) {
      queryBuilder = queryBuilder.andWhere('song.band LIKE :band', {
        band: `%${band}%`,
      });
    }
    if (minYear > 0) {
      queryBuilder = queryBuilder.andWhere('song.year >= :minYear', {
        minYear,
      });
    }
    if (maxYear > 0) {
      queryBuilder = queryBuilder.andWhere('song.year <= :maxYear', {
        maxYear,
      });
    }

    queryBuilder = queryBuilder.limit(maxItems || 25);

    queryBuilder = queryBuilder.orderBy(sortBy || 'song.id', order || 'DESC');

    return queryBuilder.getMany();
  }

  createSong(songDetails: CreateSongParams) {
    const newSong = this.songRepository.create({
      ...songDetails,
    });
    return this.songRepository.save(newSong);
  }

  updateSong(id: number, songDetails: UpdateSongParams) {
    return this.songRepository.update({ id }, { ...songDetails });
  }

  deleteSong(id: number) {
    return this.songRepository.delete({ id });
  }

  findByAgeRange(minAge: number, maxAge: number) {
    return `song ${minAge}-${maxAge}`;
  }

  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (file) {
      // Check if the file is a CSV
      if (!file.originalname.endsWith('.csv')) {
        console.log('Uploaded file is not a CSV.');
        return { message: 'Uploaded file is not a CSV.' };
      }

      // Parse the CSV file
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      const results = [];

      await new Promise<void>((resolve, reject) => {
        readableStream
          .pipe(csv({ separator: ';' }))
          .on('data', (row) => {
            const song = new Song();
            song.name = row['Song Name'];
            song.band = row['Band'];
            song.year = row['Year'];
            results.push(song);
          })
          .on('end', () => {
            console.log('Data uploaded successfully.');
            resolve();
          })
          .on('error', (error) => {
            console.error('Error parsing CSV:', error);
            reject(error);
          });
      });

      try {
        await this.songRepository.save(results);
        return { message: 'File uploaded and data saved successfully.' };
      } catch (error) {
        console.error('Error saving songs:', error);
        return { message: 'Error saving songs.' };
      }
    } else {
      console.log('No file uploaded.');
      return { message: 'No file uploaded.' };
    }
  }
}
