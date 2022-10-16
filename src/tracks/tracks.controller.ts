import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('tracks')
export class TracksController {
	constructor(private trackService: TracksService) {}

	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'picture', maxCount: 1 },
			{ name: 'audio', maxCount: 1 }
		])
	)
	@Post()
	create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
		const { picture, audio } = files;
		return this.trackService.create(dto, picture[0], audio[0]);
	}

	@Get()
	getAll(
		@Query('count') count: number,
		@Query('offset') offset: number,
		@Query('query') query: string
	) {
		return this.trackService.getAll(count, offset, query);
	}

	@Get(':id')
	getOne(@Param('id') id: number) {
		return this.trackService.getOne(id);
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.trackService.delete(id);
	}

	@Post('/comment')
	addComment(@Body() dto: CreateCommentDto) {
		return this.trackService.addComment(dto);
	}

	@Post('listen/:id')
	listen(@Param('id') id: number) {
		return this.trackService.listen(id);
	}
}
