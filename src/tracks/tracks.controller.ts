import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('tracks')
export class TracksController {
	constructor(private trackService: TracksService) {}

	@Post()
	create(@Body() dto: CreateTrackDto) {
		return this.trackService.create(dto);
	}

	@Get()
	getAll() {
		return this.trackService.getAll();
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
}
