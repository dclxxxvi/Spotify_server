import { Track } from './tracks.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Comment } from './comments.model';

@Module({
	imports: [SequelizeModule.forFeature([Track, Comment])],
	controllers: [TracksController],
	providers: [TracksService]
})
export class TracksModule {}
